"use server";

import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import connection from "@/app/lib/db";
import { redirect } from "next/navigation";
import { registerSchema } from "@/app/lib/validations/registerSchema";

export async function registerUser(formData) {
  try {
    const rawData = Object.fromEntries(formData);

    const validated = registerSchema.safeParse(rawData);
    if (!validated.success) throw new Error("Validasi gagal");

    const file = formData.get("bukti_pembayaran");
    if (!file || !file.name) throw new Error("Bukti pembayaran wajib diupload");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/formulir");

    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, file.name);
    await writeFile(uploadPath, buffer);

    const savedPath = "/formulir/" + file.name;

    const hash = bcrypt.hashSync(validated.data.password);

    const conn = await connection(); 
    await conn.execute(
      `INSERT INTO users (
        nama,
        email,
        password,
        nisn,
        asal_sekolah,
        tempat,
        tanggal_lahir,
        jenis_kelamin,
        agama,
        alamat,
        nama_orang_tua,
        pekerjaan_orang_tua,
        no_hp_ortu,
        no_hp_casis,
        bukti_pembayaran,
        nama_pengirim,
        nominal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        validated.data.nama,
        validated.data.email,
        hash,
        validated.data.nisn,
        validated.data.asal_sekolah,
        validated.data.tempat,
        validated.data.tanggal_lahir,
        validated.data.jenis_kelamin,
        validated.data.agama,
        validated.data.alamat,
        validated.data.nama_orang_tua,
        validated.data.pekerjaan_orang_tua,
        validated.data.no_hp_ortu,
        validated.data.no_hp_casis, savedPath, 
        validated.data.nama_pengirim,
        validated.data.nominal
      ]
    );
    await conn.end();

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    throw new Error(err.message || "Terjadi kesalahan");
  }

  redirect("/login");
}

export async function getDashboardStats() {
  let conn;
  try {
    conn = await connection();
    
    // Total Pendaftar - semua data di tabel ppdb
    const [totalPendaftar] = await conn.execute(
      'SELECT COUNT(*) as count FROM pendaftaran'
    );

    // Lulus Verifikasi - berdasarkan status_pembayaran = 'verifikasi'
    const [lulusVerifikasi] = await conn.execute(
      `SELECT COUNT(*) as count FROM pendaftaran WHERE status_pembayaran = 'verifikasi'`
    );

    // Belum Diverifikasi - status_pembayaran = 'pending'
    const [belumDiverifikasi] = await conn.execute(
      `SELECT COUNT(*) as count FROM pendaftaran WHERE status_pembayaran = 'pending'`
    );

    return {
      success: true,
      data: {
        totalPendaftar: totalPendaftar[0].count,
        lulusVerifikasi: lulusVerifikasi[0].count,
        belumDiverifikasi: belumDiverifikasi[0].count,
      }
    };

  } catch (error) {
    console.error("DASHBOARD STATS ERROR:", error);
    return {
      success: false,
      error: error.message || "Gagal mengambil data dashboard"
    };
  } finally {
    if (conn) await conn.end();
  }
}