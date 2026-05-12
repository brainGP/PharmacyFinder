import React from 'react'
import { IoLocation } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";

function Contact(){
    return(
        <div class="text-white flex flex-col gap-[14px]">
            <p class="mb-[6px] text-[20px]">Холбоо барих</p>
            <p class="flex gap-[8px] items-center text-[16px]"><IoLocation class="text-[20px]"/>Sukhbaatar, Ulaanbatar</p> 
            <p class="flex gap-[8px] items-center text-[16px]"><BsFillTelephoneFill class="text-[20px]"/>+976 99119911</p>  
            <p class="flex gap-[8px] items-center text-[16px]"><IoMail class="text-[20px]"/>Sample@gmail.com</p>  
        </div>
    )
}

export default Contact