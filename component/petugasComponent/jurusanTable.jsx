export default function JurusanTable() {
  const jurusan = [
    { name: "Rekayasa Perangkat Lunak", kuota: 120, terisi: 90 },
    { name: "Teknik Komputer & Jaringan", kuota: 100, terisi: 80 },
    { name: "Multimedia", kuota: 80, terisi: 70 },
    { name: "Akuntansi", kuota: 60, terisi: 55 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-4">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Jurusan</th>
            <th className="p-3 border">Kuota</th>
            <th className="p-3 border">Terisi</th>
            <th className="p-3 border">Sisa</th>
          </tr>
        </thead>

        <tbody>
          {jurusan.map((j, i) => (
            <tr key={i}>
              <td className="p-3 border">{j.name}</td>
              <td className="p-3 border">{j.kuota}</td>
              <td className="p-3 border">{j.terisi}</td>
              <td className="p-3 border">{j.kuota - j.terisi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
