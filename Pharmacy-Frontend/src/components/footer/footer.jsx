import React from 'react'
import Contact from './contact'
import AboutUs from './aboutUs'
import Doctor from './doctor'
import Socials from './socials'
function Footer(){
    return(
        <div class="bg-[#304A2F] px-[80px] py-[32px]">
            <div class="flex border-b-[1px] pb-[32px] justify-evenly">
                <Contact/>
                <AboutUs/>
                <Doctor/>
                <Socials/>
            </div>
            <div class="text-white text-[16px] flex gap-[24px]">  
                <p>© 2026 FEE. All rights reserved.</p>
                <p class="ml-auto">Terms and Conditions</p>
                <p>Privacy Policy</p>
            </div>
        </div>
    )
}

export default Footer