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

    // Validasi TEXT pakai Zod
    const validated = registerSchema.safeParse(rawData);

    if (!validated.success) {
      console.error(validated.error.flatten().fieldErrors);
      throw new Error("Validasi gagal");
    }

    // Ambil file bukti bayar
    const file = formData.get("bukti_pembayaran");
    let savedPath = null;

    if (!file || !file.name) {
      throw new Error("Bukti pembayaran wajib diupload");
    }

    // Upload file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, file.name);
    await writeFile(uploadPath, buffer);

    savedPath = "/uploads/" + file.name;

    // Hash password
    const hash = bcrypt.hashSync(validated.data.password);

    // INSERT lengkap (sudah termasuk nama_pengirim)
    await connection.execute(
      `
      INSERT INTO users (
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
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
        validated.data.nominal // ← FIXED
      ]
    );

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    throw new Error(err.message || "Terjadi kesalahan");
  }

  redirect("/login");
}

export async function loginUser(formData) {
  const rawData = Object.fromEntries(formData);

  try {
    await signIn("credentials", {
      email: rawData.email,
      password: rawData.password,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    return { error: "Email atau password salah" };
  }
}
