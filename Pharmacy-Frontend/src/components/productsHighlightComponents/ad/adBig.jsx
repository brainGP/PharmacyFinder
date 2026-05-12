import React from 'react'

function AdBig(){
    return(
        <div class="min-h-[650px] w-[723px] rounded-[20px] bg-[#F1FAFE] flex items-center justify-center p-[20px]">
            <div class="flex flex-col gap-[24px]">
                <h5 class="bg-[#28A745] rounded-[8px] text-[20px] font-medium text-white py-[6px] px-[16px] content-start mr-auto">25% OFF</h5>
                <h5 class="text-[36px] font-bold">Black Garlic Oil</h5>
                <h5 class="text-[32px] font-semibold">Хар сармисны тостой илүү хүчтэй, өтгөн үс.</h5>
                <h5 class="text-[16px] font-medium text-[#353941] line-through">₮37000</h5>
                <h5 class="adPriceNew">₮37000</h5>
            </div>
            <img src="./images/kara-sarimsak-yagi 1.png"/>
        </div>
    )
}

export default AdBig