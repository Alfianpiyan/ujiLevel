"use client" 
import PeriodePendaftaran from "@/component/landComponent/periodeland"
import PpdbPage from "@/component/userComponent/ppdb"

export default function PagePpdb () {
    return (
        <div className="-mt-10">
            <PeriodePendaftaran />
            <PpdbPage />
        </div>
        
    )
}