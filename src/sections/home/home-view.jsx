'use client'

import React, { useState, useEffect } from 'react'
import CoverView from './cover-view'
import AboutView from './about-view'
import ActivityView from './activity-view'
import DonateView from './donate-view'
import RelatedIndustries from './related-industries'
import Popup from './popup'
import Banner from './banner'

function HomeView() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    setIsPopupOpen(true)
  }, [])

  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <div>
      <Banner />
      <CoverView />
      <AboutView />
      <ActivityView />
      <DonateView />
      <RelatedIndustries />
      <Popup
        isOpen={isPopupOpen} // 彈窗是否顯示
        onClose={handleClosePopup} // X
      />
    </div>
  )
}

export default HomeView
