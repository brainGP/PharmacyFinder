import React from 'react'
import { FiSearch } from "react-icons/fi";

function TitleScreen(){
    return(
        <div class="px-[80px] flex flex-col gap-[40px] justify-center items-center">
            <p class="text-[64px] font-medium">Хурдан Шуурхай<b class="flex items-center justify-center font-bold text-[#005500]">Амархан</b></p>
            
            <p class="text-[20px] font-bold text-[#2090FF]">Хамгийн ойрхон, хурднаар эмийн сан орж хэрэгтэй эмээ олж аваарай</p>
            <div class="flex items-center w-[858px] gap-[14px] h-[64px] rounded-[20px] border shadow-lg">
                <FiSearch class="text-[20px] m-[14px]"/>   
                <input type="text" class="w-full outline-none" placeholder="Эм, эмийн сан хайх"></input>
                <h3 class="w-[96px] rounded-[20px] content-center text-center m-[8px] bg-[#005500] text-[16px] text-white h-[48px]">Хайх</h3>
            </div>  
            <div class="flex items-center gap-[24px]">
                <p class="content-center font-semibold px-[24px] h-[32px] rounded-[20px] text-white bg-[#2090FF] text-[12px]">Байршил</p>
                <p class="content-center font-semibold px-[24px] h-[32px] rounded-[20px] text-white bg-[#2090FF] text-[12px]">Эм найрлага</p>
                <p class="content-center font-semibold px-[24px] h-[32px] rounded-[20px] text-white bg-[#2090FF] text-[12px]">Нярай хүүхэд</p>
                <p class="content-center font-semibold px-[24px] h-[32px] rounded-[20px] text-white bg-[#2090FF] text-[12px]">Эм</p>
            </div>
        </div>
    )
}

export default TitleScreen