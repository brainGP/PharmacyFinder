import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from './productCard'
import { MdKeyboardArrowRight } from "react-icons/md";

function DisplayArea(props){
  const {titleText, linkText} = props
  return (
    <div class="px-[80px] py-[32px]">
        <div class="flex mb-[20px]">
            <h4 class="text-[32px] font-bold">{titleText}</h4>
            <Link to="/products" className="text-[16px] text-[#1A661A] ml-auto flex items-center">
              {linkText}<MdKeyboardArrowRight className="text-[24px]"/>
            </Link>
        </div>
        <div class="flex gap-[32px] items-center">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>    
        </div>
    </div>
  )
}

export default DisplayArea