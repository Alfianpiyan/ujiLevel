import connection from "@/app/lib/db";

export async function PUT(req, context) {
  try {
    const params = await context.params;
    const { id } = params;
    
    const { status } = await req.json();

    const conn = await connection();

    await conn.execute(
      `UPDATE ppdb SET status_pembayaran = ? WHERE id = ?`,
      [status, id]
    );

    return Response.json({ message: "Status berhasil diupdate" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return Response.json({ error: "Gagal update" }, { status: 500 });
  }
}
