"use client"

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"



export default function Pagination(){
    const params = useParams();
    const path = usePathname()
    const search = useSearchParams();
    console.log(path)
    console.log()
    const router = useRouter();
    const [_any,id] = params.home
    const handleNextPage = ()=>{
        console.log(params)
    
       router.push(`/home/${Number(id ?? 1)+1}?zipcode=test`)
    }
    const handlePreviousPage = ()=>{
        router.push(`/home/'${Number(id ?? 1)-1}?zipcode=test`)
    }
    return (
        <div className="join mx-2 grid grid-cols-2">
        {id>0 && <button className="btn btn-outline join-item w-full" onClick={handlePreviousPage}>Previous page</button>}
        <button className="btn btn-outline join-item w-full" onClick={handleNextPage}>Next</button>
      </div>
    )
}