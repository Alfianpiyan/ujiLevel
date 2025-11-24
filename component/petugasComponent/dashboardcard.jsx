export default function DashboardCards() {
  const items = [
    { title: "Total Pendaftar", value: 120 },
    { title: "Lulus Verifikasi", value: 95 },
    { title: "Belum Diverifikasi", value: 25 },
    { title: "Total Pembayaran", value: "Rp 12.000.000" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, i) => (
        <div key={i} className="p-6 bg-white rounded-xl shadow">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-2xl font-bold mt-3">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
