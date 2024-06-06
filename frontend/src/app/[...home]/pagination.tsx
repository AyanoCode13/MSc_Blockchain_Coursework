"use client"

import { useParams, useRouter } from "next/navigation"



export default function Pagination(){
    const params = useParams();
    const router = useRouter();
    const [_any,id] = params.home
    const handleNextPage = ()=>{
        router.push(`/home/${Number(id ?? 1)+1}`)
    }
    const handlePreviousPage = ()=>{
        router.push(`/home/${Number(id ?? 1)-1}`)
    }
    return (
        <div className="join mx-2 grid grid-cols-2">
        <button className="btn btn-outline join-item" onClick={handlePreviousPage}>Previous page</button>
        <button className="btn btn-outline join-item" onClick={handleNextPage}>Next</button>
      </div>
    )
}