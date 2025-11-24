import connection from "@/app/lib/db";

export async function GET() {
  try {
    const conn = await connection();

    const [rows] = await conn.execute("SELECT id, nama_jurusan FROM jurusan");

    return Response.json({
      status: 200,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: 500,
      message: "Gagal mengambil data jurusan",
      error: error.message,
    });
  }
}
