"use client";

import { useState } from "react";

export default function FAQ() {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "Apa saja jurusan yang tersedia di SMK Taruna Bhakti?",
      answer: "SMK Taruna Bhakti menyediakan 6 program keahlian: Teknik Komputer dan Jaringan (TKJ), Rekayasa Perangkat Lunak (RPL), Desain Komunikasi Visual (DKV), Animasi, Produksi Siaran Program Televisi (PSPT), dan Teknik Elektronika Industri (TEI)."
    },
    {
      question: "Bagaimana cara melakukan pendaftaran?",
      answer: "Pendaftaran dapat dilakukan dengan mengisi formulir online di website resmi kami. Setelah mengisi formulir, calon siswa melakukan pembayaran biaya pendaftaran dan mengunggah berkas-berkas yang diperlukan."
    },
    {
      question: "Apa saja persyaratan pendaftaran?",
      answer: "Persyaratan pendaftaran meliputi: Fotokopi akta kelahiran dan KK, fotokopi ijazah/surat keterangan lulus, pas foto 3x4, mengisi formulir pendaftaran, dan membayar biaya pendaftaran."
    },
    {
      question: "Apakah ada tes masuk untuk calon siswa?",
      answer: "Ya, calon siswa akan mengikuti tes akademik dasar, wawancara, dan tes bakat minat untuk menentukan jurusan yang sesuai dengan kemampuan dan minat siswa."
    },
    {
      question: "Berapa besar biaya pendidikan di SMK Taruna Bhakti?",
      answer: "Biaya pendidikan bervariasi tergantung gelombang pendaftaran dan jurusan yang dipilih. Silakan lihat bagian biaya pendidikan di website untuk informasi lengkap mengenai rincian biaya."
    },
    {
      question: "Bayar pendaftaran bisa nyicil nggak?",
      answer: "Ya, bisa. Kami menyediakan opsi pembayaran bertahap (cicilan) untuk meringankan biaya pendaftaran awal, silakan hubungi kontak PPDB."
    },
    {
      question: "Apakah ada beasiswa di SMK Taruna Bhakti?",
      answer: "Kami menyediakan program beasiswa prestasi akademik dan non-akademik, serta beasiswa dari pihak industri atau pemerintah. Detail dapat dilihat di laman resmi PPDB."
    },
    {
      question: "Apakah lulusan SMK Taruna Bhakti sudah terserap di dunia kerja?",
      answer: "Ya, kami memiliki kerjasama dengan berbagai perusahaan dan industri untuk penempatan kerja. Lulusan kami telah terserap di berbagai perusahaan ternama dengan tingkat penyerapan yang tinggi."
    }
  ];

  return (
    <section id="faq" className="w-full py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Pertanyaan Umum
          </h2>
          <p className="text-gray-600">
            Temukan jawaban atas pertanyaan yang sering diajukan
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-[#15518a] transition-colors"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-sm md:text-base">
                  {item.question}
                </span>
                <div className={`w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openItems.includes(index) ? "bg-[#15518a] rotate-180" : ""
                }`}>
                  <svg
                    className={`w-4 h-4 transition-colors ${
                      openItems.includes(index) ? "text-white" : "text-gray-600"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openItems.includes(index) 
                    ? "max-h-96 opacity-100" 
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-4 pt-2 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center p-6 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-gray-700 mb-4">
            Masih ada pertanyaan? <span className="font-semibold">Hubungi kami!</span>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+62212745678"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#15518a] text-white rounded-lg hover:bg-[#0f3d6b] transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (021) 2745-678
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.9 11.9 0 00-3.48-8.413"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}