import { NextResponse } from "next/server";
import connection from "@/app/lib/db";

export async function GET() {
  try {
    const conn = await connection();
    const [rows] = await conn.execute("SELECT id, nama_jurusan FROM jurusanTb");

    return NextResponse.json(
      { data: rows }, 
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Gagal mengambil data jurusan" }, 
      { status: 500 }
    );
  }
}
 