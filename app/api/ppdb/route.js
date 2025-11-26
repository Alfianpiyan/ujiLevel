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

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Harus login dulu" },
        { status: 401 }
      );
    }

    const user_id = session.user.id;
    const gelombang = 1;

    const uploadDir = path.join(process.cwd(), "public/uploads");
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

      return "/uploads/" + filename;
    }

    const ijazah = await saveFile("ijazah");
    const akta = await saveFile("akta");
    const kk = await saveFile("kk");
    const foto = await saveFile("foto");
    const rapor = await saveFile("rapor");
    const skl = await saveFile("skl");
    const bukti_pembayaran = await saveFile("bukti_pembayaran");

    const status_pembayaran = "pending";

    const conn = await connection();

    
    // hitung jumlah pendaftar → buat nomor urut
    const [countRows] = await conn.execute("SELECT COUNT(*) AS total FROM ppdb");
    const idPendaftar = String(countRows[0].total + 1).padStart(3, "0");

    // tahun ajaran otomatis
    const year = new Date().getFullYear();
    const short1 = String(year).slice(2);     
    const short2 = String(year + 1).slice(2);
    const tahunAjaran = short1 + short2;      

    // nomor pendaftaran akhir
    const nomor_pendaftaran = `PPD-${tahunAjaran}-${idPendaftar}`;

    await conn.execute(
      `INSERT INTO ppdb 
      (nomor_pendaftaran, nama_lengkap, nisn, tanggal_lahir, jurusan_id, user_id,
      ijazah, akta, kk, foto, rapor, skl, gelombang, bukti_pembayaran,
      status_pembayaran, tanggal_upload)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        nomor_pendaftaran,
        nama_lengkap,
        nisn,
        tanggal_lahir,
        jurusan_id,
        user_id,
        ijazah,
        akta,
        kk,
        foto,
        rapor,
        skl,
        gelombang,
        bukti_pembayaran,
        status_pembayaran
      ]
    );


    await conn.end();

    return NextResponse.json({
      status: true,
      message: "Pendaftaran berhasil!",
      nomor_pendaftaran,
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
