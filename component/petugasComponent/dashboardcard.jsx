import { getDashboardStats } from "@/app/lib/action";

export default async function DashboardCards() {
  const result = await getDashboardStats();

  if (!result.success) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error: {result.error}</p>
      </div>
    );
  }

  const stats = result.data;

  const items = [
    { 
      title: "Total Pendaftar", 
      value: stats?.totalPendaftar || 0,
      description: "Seluruh calon siswa",
      color: "bg-[#15518a]",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      title: "Lulus Verifikasi", 
      value: stats?.lulusVerifikasi || 0,
      description: "Sudah diverifikasi",
      color: "bg-green-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      title: "Belum Diverifikasi", 
      value: stats?.belumDiverifikasi || 0,
      description: "Menunggu verifikasi",
      color: "bg-orange-500",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item, i) => (
        <div 
          key={i} 
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${item.color} p-3 rounded-lg text-white`}>
              {item.icon}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 font-medium mb-1">{item.title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{item.value}</p>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}