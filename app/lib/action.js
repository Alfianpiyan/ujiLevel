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
    // Convert FormData → object
    const rawData = Object.fromEntries(formData);

    // Validasi pakai Zod
    const validated = registerSchema.safeParse(rawData);
    if (!validated.success) throw new Error("Validasi gagal");

    // Upload file bukti pembayaran
    const file = formData.get("bukti_pembayaran");
    if (!file || !file.name) throw new Error("Bukti pembayaran wajib diupload");

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

    const uploadPath = path.join(uploadDir, file.name);
    await writeFile(uploadPath, buffer);
    const savedPath = "/uploads/" + file.name;

    // Hash password
    const hash = bcrypt.hashSync(validated.data.password);

    // INSERT user
    const conn = await connection(); // 🔹 HARUS AWAIT
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
        validated.data.no_hp_casis,
        savedPath,
        validated.data.nama_pengirim,
        validated.data.nominal
      ]
    );
    await conn.end(); // 🔹 TUTUP koneksi

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    throw new Error(err.message || "Terjadi kesalahan");
  }

  redirect("/login");
}

export async function loginUser(formData) {
  const rawData = Object.fromEntries(formData);
  // login dengan NextAuth dijalankan di API route
}
