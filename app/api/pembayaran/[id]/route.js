import connection from "@/app/lib/db";

export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    const { status_verifikasi } = await req.json();

    console.log("ID:", id)
    console.log("STATUS:", status_verifikasi)

    const allowed = ["pending", "verifikasi", "tolak"];
    if (!allowed.includes(status_verifikasi)) {
      return Response.json({ message: "Status tidak valid!" }, { status: 400 });
    }

    const conn = await connection();
    await conn.execute(
      `UPDATE ppdb SET status_verifikasi = ? WHERE id = ?`,
      [status_verifikasi, id]
    );

    return Response.json({ message: "Status berhasil diupdate" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    return Response.json({ error: "Gagal update" }, { status: 500 });
  }
}
