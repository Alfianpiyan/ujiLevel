import { NextResponse } from "next/server";
import connection from "@/app/lib/db";
import bcrypt from "bcryptjs";

// GET - Ambil semua petugas
export async function GET() {
  try {
    const conn = await connection();
    const [rows] = await conn.execute(`
      SELECT 
        id_petugas,
        nama,
        email,
        no_telp,
        role
      FROM petugas
      ORDER BY id_petugas ASC
    `);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Gagal memuat data" }, { status: 500 });
  }
}

// POST - Tambah petugas baru
export async function POST(request) {
  try {
    const { nama, email, password, no_telp, role } = await request.json();

    // Validasi
    if (!nama || !email || !password) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const conn = await connection();
    
    // Cek email sudah ada atau belum
    const [existing] = await conn.execute(
      "SELECT id_petugas FROM petugas WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }

    // Insert petugas baru
    await conn.execute(
      "INSERT INTO petugas (nama, email, password, no_telp, role) VALUES (?, ?, ?, ?, ?)",
      [nama, email, hashedPassword, no_telp || null, role || "petugas"]
    );

    return NextResponse.json({ message: "Petugas berhasil ditambahkan" }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Gagal menambahkan petugas" }, { status: 500 });
  }
}