import { PATHS } from '@/routes/page'
import Link from 'next/link'

function UnLoginStatus() {
  return (
    <div className="h-full flex flex-row items-center gap-x-3">
      <Link
        href={PATHS.Auth.child.Login.path}
        target="_self"
        className="h-full flex items-center text-white desktop-regular-h6 px-4 c-header-button"
      >
        會員登入
      </Link>
      <span className="inline-block w-[1px] bg-white h-6" />
      <Link
        href={PATHS.Auth.child.SignUp.path}
        target="_self"
        className="h-full flex items-center text-white desktop-regular-h6 px-4 c-header-button"
      >
        註冊
      </Link>
    </div>
  )
}

export default UnLoginStatus
