import { NextResponse } from "next/server";
import connection from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { message: "Harus login dulu" },
        { status: 401 }
      );
    }

    const user_id = session.user.id;

    const conn = await connection();
    const [rows] = await conn.execute(
      `SELECT ijazah, akta, kk, foto, rapor, skl, status_verifikasi
       FROM ppdb
       WHERE user_id = ?`,
      [user_id]
    );
    await conn.end();

    if (!rows.length) return NextResponse.json(null);

    // frontend-mu mengharapkan status per berkas
    const data = {
      ...rows[0],
      status_ijazah: rows[0].status_verifikasi,
      status_akta: rows[0].status_verifikasi,
      status_kk: rows[0].status_verifikasi,
      status_foto: rows[0].status_verifikasi,
      status_rapor: rows[0].status_verifikasi,
      status_skl: rows[0].status_verifikasi,
    };

    return NextResponse.json(data);
  } catch (err) {
    console.error("GET VERIFIKASI ERROR:", err);
    return NextResponse.json(
      { message: "Gagal mengambil data berkas", error: err.message },
      { status: 500 }
    );
  }
}
