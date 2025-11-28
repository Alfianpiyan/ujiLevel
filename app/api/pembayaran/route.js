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
        ijazah,
        kk,
        akta,
        rapor,
        foto,
        skl,
        status_verifikasi,
        tanggal_upload
      FROM ppdb
      ORDER BY id DESC
    `);

    return Response.json(Array.isArray(rows) ? rows : []);
  } catch (err) {
    console.error("API ERROR:", err);
    return Response.json([], { status: 500 });
  }
}
