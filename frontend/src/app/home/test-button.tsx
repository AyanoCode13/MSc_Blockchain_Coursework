"use client"
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react"




export default function TestButton(){
    const router = useRouter();

    const { mutate } = api.property.create.useMutation({
       onSuccess:()=>{
        router.refresh();
       }

        
    })
    const handleListProperty = async ()=>{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        mutate({
            name: "test",
            description:"test",
            price:1,
            address:"test",
            city:"test",
            country:"test",
            zipcode:"test",
            nr_rooms:1,
            nr_baths:1,
            property_type:"House",
            accomodation_type:"Buy",
            thumbnail:"test",
            gallery:["test"],
            availeble:true,
            owner:accounts[0],
            available:true,
            created_at:new Date(),
            updated_at:new Date(),
        })
    }
    
    
    return (
        <button className="btn btn-primary" onClick={handleListProperty}>Test Tranzaction</button>
    );
}