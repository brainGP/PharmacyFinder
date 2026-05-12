import React from 'react'
import { GrLocation } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa6";

function PharmacyInfo(){
    return (
        <>
        <div class="border-2 border-[#B2CCB2] rounded-[20px] flex p-[20px] w-full gap-[22px] max-h-[148px]">
            <img class="w-[108px] h-[108px] rounded-[8px]" src="https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=eB6M9QDw9RYKvhXxkZ9vuw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=177.17133&pitch=0&thumbfov=100"></img>
            <div class="flex flex-col gap-[10px] text-[#72747A]">
                <h4 class="text-[26px] font-bold text-[#353941]">Monos Selbe</h4>
                <h5 class="flex items-center text-[16px] font-semibold gap-[10px]"><GrLocation class="text-[24px]"/>500м зайд</h5>
                <h5 class="flex items-center text-[16px] font-semibold gap-[10px]"><FaRegClock class="text-[24px]"/>8:00-20:00</h5>
            </div>
        </div>
        </>
    )
}

export default PharmacyInfo