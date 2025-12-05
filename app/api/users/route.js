import { NextResponse } from "next/server";
import connection from "@/app/lib/db";

export async function GET() {
  try {
    const conn = await connection();
    const [rows] = await conn.execute(`
      SELECT 
        p.id,
        p.nomor_pendaftaran,
        p.nama_lengkap as nama,
        p.nisn as NISN,
        p.tanggal_lahir,
        u.email,
        u.asal_sekolah,
        p.status_verifikasi
      FROM pendaftaran p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.tanggal_upload DESC
    `);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Gagal memuat data user" }, 
      { status: 500 }
    );
  }
}