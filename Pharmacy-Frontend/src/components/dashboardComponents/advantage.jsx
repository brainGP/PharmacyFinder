import React from 'react'
import { IoSearch } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa6";

function Advantage(){
    return(
    <div class="m-[80px]">
            <p class="text-center font-semibold text-[20px]">Бидний Давуу Тал</p>
        <div class="my-[10px] flex text-center">
            <div class="my-[25px] flex flex-col gap-[10px] flex-1">
                <div class="w-[64px] h-[64px] bg-[#005500]/10 rounded-[20px] flex mx-auto">
                    <IoSearch class="text-[#005500] text-[32px] mx-auto mt-auto mb-auto"/>
                </div>
                <p class="text-[20px] font-semibold text-[#353941]">Бодит цагийн хайлт</p>
                <p class="text-[14px] font-medium text-[#72747A]">Хамгийн сүүлийн үеийн бодит цагийн мэдээллээр эмийг шууд хайж олно</p>
            </div>
            <div class="my-[25px] flex flex-col gap-[10px] flex-1">
                <div class="w-[64px] h-[64px] bg-[#1873CC]/10 rounded-[20px] flex mx-auto">
                    <GrLocation class="text-[#1873CC] text-[32px] mx-auto mt-auto mb-auto"/>
                </div>
                <p class="text-[20px] font-semibold text-[#353941]">Бодит цагийн хайлт</p>
                <p class="text-[14px] font-medium text-[#72747A]">Хамгийн сүүлийн үеийн бодит цагийн мэдээллээр эмийг шууд хайж олно</p>
            </div>
            <div class="my-[25px] flex flex-col gap-[10px] flex-1">
                <div class="w-[64px] h-[64px] bg-[#005500]/10 rounded-[20px] flex mx-auto">
                    <FaRegClock class="text-[#005500] text-[32px] mx-auto mt-auto mb-auto"/>
                </div>
                <p class="text-[20px] font-semibold text-[#353941]">Бодит цагийн хайлт</p>
                <p class="text-[14px] font-medium text-[#72747A]">Хамгийн сүүлийн үеийн бодит цагийн мэдээллээр эмийг шууд хайж олно</p>
            </div>
        </div>
        </div>
    )
}

 //bg-[#1873CC]/10 
export default Advantage