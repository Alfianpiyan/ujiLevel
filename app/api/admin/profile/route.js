import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const conn = await connection();
    const [rows] = await conn.execute(
      "SELECT id_petugas, nama, email, no_telp, role FROM petugas WHERE id_petugas = ?",
      [session.user.id]
    );

    if (!rows.length) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Gagal memuat data" }, { status: 500 });
  }
}