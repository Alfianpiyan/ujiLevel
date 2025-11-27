import connection from "@/app/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "petugas") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const conn = await connection();
    const [rows] = await conn.execute(`
      SELECT 
        id,
        nama_lengkap,
        nisn,
        status_pembayaran
      FROM ppdb
      ORDER BY id DESC
    `);

    await conn.end();
    return NextResponse.json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error("GET Pendaftar ERROR:", err);
    return NextResponse.json([], { status: 500 });
  }
}
