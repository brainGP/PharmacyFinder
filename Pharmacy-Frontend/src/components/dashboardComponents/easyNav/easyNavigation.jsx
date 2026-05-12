import React from 'react'
import PharmacyInfo from './pharmacyInfo'
import Map from './map'
import { MdKeyboardArrowRight } from "react-icons/md";

function EasyNavigation(){
    return(
        
        <div class="flex gap-[32px] px-[80px] py-[32px]">
            <div class="flex-1 flex flex-col gap-[20px]">
                <div class="flex">
                    <h4 class="text-[32px] font-bold">Ойрхон Эмийн Сан</h4>
                    <h5 class="text-[16px] text-[#1A661A] ml-auto flex items-center">Дэлгэрэнгүй<MdKeyboardArrowRight class="text-[24px]"/></h5>
                </div>
                <PharmacyInfo></PharmacyInfo>
                <PharmacyInfo></PharmacyInfo>
                <PharmacyInfo></PharmacyInfo>
            </div>
            <div class="flex-1 flex flex-col gap-[20px]">
                <div class="flex">
                    <h4 class="text-[32px] font-bold">Газрын зураг</h4>
                    <h5 class="text-[16px] text-[#1A661A] ml-auto flex items-center">Бүтэн харах<MdKeyboardArrowRight class="text-[24px]"/></h5>
                </div>
                <Map></Map>
            </div>
        </div>
    )
}

export default EasyNavigation