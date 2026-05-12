import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
function Socials(){
    return(
        <div class="text-white">
            <p class="text-[20px] mb-[20px]">Сошиал суваг</p>
            <div class="flex gap-[24px] text-[40px]">
                <FaFacebook />
                <FaLinkedin />
                <FaInstagram />
                <FaYoutube />
            </div>
        </div>
    )
}

export default Socials