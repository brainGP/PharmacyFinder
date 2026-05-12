import React from 'react'
import { FiSearch } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div class="flex items-center gap-[32px] border-b-[1px] border-[#cbcbcb] px-[80px] h-[104px]">
      <Link to="/*">
        <h1 class="text-[#005500] font-semibold text-3xl">Pharmacy</h1>
      </Link>
      <div class="flex items-center flex-1 h-[48px] bg-[#F2F6F2] rounded-[20px]">
        <FiSearch class="text-[20px] m-[14px]"/>
        <input type="text" placeholder="Та юу хайж байна вэ?" class="w-full h-full border-0 outline-none bg-[#F2F6F2] rounded-r-[20px]"></input>
      </div>
      <p class="flex h-[48px] items-center text-[#005500] text-[16px] font-bold gap-[14px] px-[14px]"><GrLocation class="text-[24px]"/>Байршил</p>
      <FaRegHeart class="text-[#005500] text-[24px] h-[48px] " />
      <Link to="/login">
        <p class="flex rounded-[20px] h-[48px] px-[14px] gap-[12px] bg-[#005500] text-white items-center text-[16px] font-medium"><RiAccountCircleLine class="text-[24px]"/>Нэвтрэх</p>
      </Link>
    </div>
  )
}

export default Header

