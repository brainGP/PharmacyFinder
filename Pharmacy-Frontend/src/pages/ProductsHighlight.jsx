import React from 'react'
import Header from '../components/header'
import TitleMenu from '../components/productsHighlightComponents/titleMenu'
import DisplayArea from '../components/displayArea/displayArea'
import AdBig from '../components/productsHighlightComponents/ad/adBig'
import AdSmall from '../components/productsHighlightComponents/ad/adSmall'
import NewsHighlight from '../components/productsHighlightComponents/news/newsHighlight'
import NewsOld from '../components/productsHighlightComponents/news/newsOld'
import Footer from '../components/footer/footer'

import { MdKeyboardArrowRight } from "react-icons/md";

function Products(){
    return(
        <div>
            <Header/>
            <TitleMenu/>
            <DisplayArea/>
            <DisplayArea/>
            <div class="flex gap-[20px] px-[80px] py-[32px]">
                <AdBig class="flex-1"/>
                <div class="flex-1 flex flex-col gap-[20px]">
                    <AdSmall/>
                    <AdSmall/>
                </div>
            </div>
            <DisplayArea titleText="Хямдралтай бүтээгдэхүүн" linkText="Дэлгэрэнгүй"/>
            <div class="flex gap-[32px] px-[80px] py-[32px]">
                <NewsHighlight/>
                <div class="flex flex-col gap-[24px]">
                    <NewsOld/>
                    <NewsOld/>
                    <NewsOld/>
                </div>
            </div>
            
            <Footer/>
        </div>
    )
}

export default Products