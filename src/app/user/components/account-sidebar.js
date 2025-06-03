import { memo } from 'react'

import AccountSidebarDesktop from './account-sidebar-desktop'
import AccountSidebarMobile from './account-sidebar-mobile'

function AccountSidebar() {
  return (
    <aside>
      <div className="lg:hidden">
        <AccountSidebarMobile />
      </div>
      <div className="hidden lg:block ">
        <AccountSidebarDesktop />
      </div>
    </aside>
  )
}

export default memo(AccountSidebar)
