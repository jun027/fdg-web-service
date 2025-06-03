import HeaderMobile from './components/header-mobile'
import HeaderDesktop from './components/header-desktop'

function Header() {
  return (
    <header className="w-full">
      <HeaderMobile />
      <HeaderDesktop />
    </header>
  )
}

export default Header
