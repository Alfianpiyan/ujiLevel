import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connection from "@/app/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ message: "Anda harus login" }, { status: 401 });
    }

    const userId = session.user.id; // ← ambil user_id

    const form = await req.formData();
    const conn = await connection();

    const nama_lengkap = form.get("nama_lengkap");
    const nisn = form.get("nisn");
    const tanggal_lahir = form.get("tanggal_lahir");
    const jurusan_id = form.get("jurusan_id");
    const metode_pembayaran = form.get("metode_pembayaran");

    const [rows] = await conn.execute("SELECT COUNT(*) as total FROM ppdb");
    const nomor = rows[0].total + 1;
    const nomor_pendaftaran = `PPDB-${new Date().getFullYear()}-${String(nomor).padStart(5,"0")}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    async function saveFile(field) {
      const file = form.get(field);
      if (!file || typeof file === "string") return null;

      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
      await writeFile(filePath, buffer);
      return `/uploads/${file.name}`;
    }

    const ijazah = await saveFile("ijazah");
    const akta = await saveFile("akta");
    const kk = await saveFile("kk");
    const foto = await saveFile("foto");
    const rapor = await saveFile("rapor");
    const sk_nilai = await saveFile("sk_nilai");

    await conn.execute(
      `INSERT INTO ppdb
      (nomor_pendaftaran, nama_lengkap, nisn, tanggal_lahir, jurusan_id,
      metode_pembayaran, ijazah, akta, kk, foto, rapor, sk_nilai, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nomor_pendaftaran,
        nama_lengkap,
        nisn,
        tanggal_lahir,
        jurusan_id,
        metode_pembayaran,
        ijazah,
        akta,
        kk,
        foto,
        rapor,
        sk_nilai,
        userId, // ← wajib
      ]
    );

    await conn.end();

    return Response.json({ message: "Pendaftaran berhasil disimpan!" });

  } catch (err) {
    console.log(err);
    return Response.json({ message: "Error", error: err.message }, { status: 500 });
  }
}
