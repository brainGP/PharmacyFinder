import React from 'react'
import { IoMapOutline } from "react-icons/io5";


function ProductCard(){
    return(
        <div class="rounded-[8px] border-[1px] border-[#E5EEE5] p-[24px] h-[340px] flex flex-col gap-[20px]">
            <img class="w-[186px] h-[186px] rounded-[20px]" src="https://images.unsplash.com/photo-1546659934-038aab8f3f3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaWNhbHxlbnwwfDJ8MHx8fDI%3D" alt="equipment"></img>
            <div class="flex flex-col text-black w-full h-full text-[16px] font-bold">
                <p>Immunos 60</p>
                <p class="text-[12px] text-[#72747A] mt-auto mb-auto">Tylenol</p>
                <div class="text-[#005500] flex mt-auto">
                    <p class="">30,000₮</p>
                    <p class="ml-auto flex items-center"><IoMapOutline class="text-[14px] mx-[8px]"/>5.4km</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard