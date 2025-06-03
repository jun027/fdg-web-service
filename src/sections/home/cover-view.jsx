'use client'

import CoverViewMobile from './cover-view-mobile'
import CoverViewDesktop from './cover-view-desktop'

function CoverView() {
  return (
    <>
      <div className="hidden lg:block">
        <CoverViewDesktop />
      </div>
      <div className="lg:hidden">
        <CoverViewMobile />
      </div>
    </>
  )
}

export default CoverView
