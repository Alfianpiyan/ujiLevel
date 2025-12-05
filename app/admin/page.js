import connection from "@/app/lib/db";

export default async function AdminDashboard() {
  let stats = {
    totalPendaftar: 0,
    belumDiverifikasi: 0,
    pembayaranMasuk: 0,
    totalPetugas: 0,
  };

  let activities = [];

  try {
    const conn = await connection();

    // Get statistics
    const [statsResult] = await conn.execute(`
      SELECT 
        COUNT(*) as total_pendaftar,
        SUM(CASE WHEN status_verifikasi = 'pending' THEN 1 ELSE 0 END) as belum_verifikasi,
        SUM(CASE WHEN status_verifikasi = 'verifikasi' THEN 1 ELSE 0 END) as pembayaran_masuk
      FROM pendaftaran
    `);

    if (statsResult.length > 0) {
      stats.totalPendaftar = statsResult[0].total_pendaftar || 0;
      stats.belumDiverifikasi = statsResult[0].belum_verifikasi || 0;
      stats.pembayaranMasuk = statsResult[0].pembayaran_masuk || 0;
    }

    // Get total petugas
    const [petugasResult] = await conn.execute(`
      SELECT COUNT(*) as total FROM petugas
    `);
    stats.totalPetugas = petugasResult[0]?.total || 0;

    // Get recent activities (last 5 registrations)
    const [activitiesResult] = await conn.execute(`
      SELECT 
        nama_lengkap,
        tanggal_upload,
        status_verifikasi
      FROM pendaftaran 
      ORDER BY tanggal_upload DESC 
      LIMIT 5
    `);
    activities = activitiesResult;

    await conn.end();
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Admin</h1>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#15518a] p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Pendaftar</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalPendaftar}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Belum Diverifikasi</p>
            <p className="text-3xl font-bold text-gray-900">{stats.belumDiverifikasi}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500 p-3 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Pembayaran Masuk</p>
            <p className="text-3xl font-bold text-gray-900">{stats.pembayaranMasuk}</p>
          </div>
        </div>

        {/* Aktivitas Terbaru */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-[#15518a] px-6 py-3">
              <h3 className="text-sm font-medium text-white">Pendaftaran Terbaru</h3>
            </div>
            
            {activities.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>Belum ada aktivitas</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {activities.map((activity, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">{activity.nama_lengkap}</span>
                        <span className="text-gray-600"> mendaftar PPDB</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          activity.status_verifikasi === "verifikasi"
                            ? "bg-green-100 text-green-700"
                            : activity.status_verifikasi === "tolak"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {activity.status_verifikasi === "verifikasi"
                            ? "Terverifikasi"
                            : activity.status_verifikasi === "tolak"
                            ? "Ditolak"
                            : "Pending"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.tanggal_upload).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Info Sistem */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Sistem</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Status Server</h3>
              </div>
              <p className="text-green-600 font-medium text-lg">Online</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#15518a] p-2 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Total Petugas Aktif</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats.totalPetugas}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}