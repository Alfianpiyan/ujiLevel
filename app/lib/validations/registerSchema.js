import { z } from "zod";

export const registerSchema = z.object({
  nama: z.string().min(4, "Nama minimal 4 huruf"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  nisn: z.string().min(5),
  asal_sekolah: z.string().min(3),
  tempat: z.string().min(2),
  tanggal_lahir: z.string(),
  jenis_kelamin: z.string(),
  agama: z.string(),
  alamat: z.string(),
  nama_orang_tua: z.string(),
  pekerjaan_orang_tua: z.string(),
  no_hp_ortu: z.string(),
  no_hp_casis: z.string(),
  nama_pengirim: z.string().min(3, "Nama pengirim wajib diisi"),
  nominal: z.coerce.number().min(1, "Nominal wajib diisi"),
});
