import React from 'react'
import Header from '../components/header'
import TitleScreen from '../components/dashboardComponents/titleScreen'
import EasyNavigation from '../components/dashboardComponents/easyNav/easyNavigation'
import DisplayArea from '../components/displayArea/displayArea'
import Advantage from '../components/dashboardComponents/advantage'
import Footer from '../components/footer/footer'
function Dashboard() {
  return (
    <div>
      <Header/>
      <TitleScreen/>
      <EasyNavigation/>
      <DisplayArea titleText="Эрэлттэй бүтээгдэхүүн" linkText="Дэлгэрэнгүй"/>
      <Advantage/>
      <Footer/>
    </div>
  )
}

export default Dashboard