import React from 'react'
import { LuCalendarClock } from "react-icons/lu";

function NewsOld(){
    return(
        <div class="rounded-[20px] flex gap-[20px] h-[200px]">
            <img class="h-[200px] rounded-l-[20px]"src="https://cdn.britannica.com/25/93825-050-D1300547/collection-newspapers.jpg"/>
            <div class="flex flex-col gap-[12px]">
                <div class="flex items-center gap-1">
                    <h5 class="bg-[#E5EEE5] rounded-[8px] text-[14px] px-[12px] py-[8px] text-[#4D884D]">Doctor</h5>
                    <LuCalendarClock class="text-[24px] text-[#4D884D]"/>
                    <h5 class="text-[13px]">2026.4.10</h5>
                </div>
                <h5 class="text-[36px] font-medium">Гарчиг</h5>
                <h5 class="text-[16px]">Тайлбар</h5>
                <h5 class="rounded-[8px] bg-[#4D884D] text-white text-[14px] py-[14px] px-[24px] mr-auto">Дэлгэрэнгүй</h5>
            </div>
        </div>
    )
}

export default NewsOld