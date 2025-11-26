import connection from "@/app/lib/db";

export async function GET() {
  try {
    const conn = await connection();

    const [rows] = await conn.execute(`
      SELECT 
        id,
        nomor_pendaftaran,
        nama_lengkap,
        bukti_pembayaran,
        status_pembayaran,
        tanggal_upload
      FROM ppdb
      ORDER BY id DESC
    `);

    // pastikan array
    return Response.json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error("API ERROR:", err);

    // tetap return array biar tidak error di UI
    return Response.json([], { status: 500 });
  }
}
