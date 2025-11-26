import DataTable from "@/component/petugasComponent/dataTable";

export default function Page() {
  return (
    <div className="flex w-full">

      <main className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Data Pendaftar</h1>
        <DataTable />
      </main>
    </div>
  );
}
