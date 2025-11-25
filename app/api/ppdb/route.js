import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import connection from "@/app/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const nama_lengkap = formData.get("nama_lengkap");
    const nisn = formData.get("nisn");
    const tanggal_lahir = formData.get("tanggal_lahir");
    const jurusan_id = formData.get("jurusan_id");
    const metode_pembayaran = formData.get("metode_pembayaran");

    // ===============================
    // 1) CEK SESSION
    // ===============================
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Harus login dulu" },
        { status: 401 }
      );
    }

    const user_id = session.user.id;

    // ===============================
    // 2) GEL0MBANG MANUAL
    // ===============================
    const gelombang = 1;

    // ===============================
    // 3) SIMPAN FILE UPLOAD
    // ===============================
    const uploadDir = path.join(process.cwd(), "public/formulir");

    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    async function saveFile(name) {
      const file = formData.get(name);
      if (!file) return null;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = Date.now() + "-" + file.name;
      const filePath = path.join(uploadDir, filename);

      await writeFile(filePath, buffer);

      return "/formulir/" + filename;
    }

    const ijazah = await saveFile("ijazah");
    const akta = await saveFile("akta");
    const kk = await saveFile("kk");
    const foto = await saveFile("foto");
    const rapor = await saveFile("rapor");
    const sk_nilai = await saveFile("sk_nilai");
    const bukti_pembayaran = await saveFile("bukti_pembayaran");

    // ===============================
    // 4) GENERATE NOMOR PENDAFTARAN
    // ===============================
    const nomor_pendaftaran = "PPDB-" + Date.now();

    // ===============================
    // 5) DEFAULT PEMBAYARAN OTOMATIS
    // ===============================
    const total_biaya = 4750000;
    const total_dibayar = 0;             // petugas yang verifikasi nanti
    const sisa_pembayaran = total_biaya; // awalnya full

    // status awal
    const status_pembayaran = "pending";

    // ===============================
    // 6) SIMPAN DATA PPDB
    // ===============================
    const conn = await connection();

    await conn.execute(
      `INSERT INTO ppdb 
      (nomor_pendaftaran, nama_lengkap, nisn, tanggal_lahir, jurusan_id, user_id, metode_pembayaran,
       ijazah, akta, kk, foto, rapor, sk_nilai, gelombang, bukti_pembayaran,
       total_biaya, total_dibayar, sisa_pembayaran, status_pembayaran)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nomor_pendaftaran,
        nama_lengkap,
        nisn,
        tanggal_lahir,
        jurusan_id,
        user_id,
        metode_pembayaran,
        ijazah,
        akta,
        kk,
        foto,
        rapor,
        sk_nilai,
        gelombang,
        bukti_pembayaran,
        total_biaya,
        total_dibayar,
        sisa_pembayaran,
        status_pembayaran
      ]
    );

    await conn.end();

    return NextResponse.json({
      status: true,
      message: "Pendaftaran berhasil!",
      nomor_pendaftaran,
      metode_pembayaran,
      gelombang,
      status_pembayaran,
    });

  } catch (err) {
    console.error("PPDB ERROR:", err);
    return NextResponse.json(
      { message: "Gagal mendaftar", error: err.message },
      { status: 500 }
    );
  }
}
