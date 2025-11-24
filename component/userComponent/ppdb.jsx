import PeriodePendaftaran from "../landComponent/periodeland";

export default function PpdbPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">PPDB</h1>
      <div className="mb-10">
        <PeriodePendaftaran />
      </div>

      <div className="p-6 bg-white rounded-xl shadow space-y-4">

        <p>
          <b>Status:</b> Sedang Diproses
        </p>

        <div>
          <b>Jurusan Dipilih:</b>
          <p>Rekayasa Perangkat Lunak (RPL)</p>
        </div>

        <div>
          <b>Syarat Berkas:</b>
          <ul className="list-disc ml-6 text-gray-700">
            <li>Scan Raport</li>
            <li>Foto 3x4</li>
            <li>KK</li>
            <li>Akta Kelahiran</li>
          </ul>
        </div>

        <button className="px-4 py-2 bg-blue-700 text-white rounded">
          Upload / Perbaiki Berkas
        </button>

      </div>
    </div>
  );
}
