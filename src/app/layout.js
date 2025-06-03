import './globals.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import { AuthProvider } from '@/auth/context/auth-provider'
import { CONFIG } from '@/config-global'
import { Toaster } from 'react-hot-toast'
import { DepositBadgeView } from '@/components/deposit-badge'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MobileMenuView from '@/components/mobile-menu/mobile-menu-view'
import { LoadingBackdrop, WalletPaymentBackdrop } from '@/components/backdrop'

export const metadata = {
  title: CONFIG.appName,
  description: CONFIG.appDescription,
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body className="relative" suppressHydrationWarning={true}>
        <LoadingBackdrop />

        <WalletPaymentBackdrop />

        <Toaster
          toastOptions={{
            duration: 5000,
            position: 'top-right',
          }}
        />

        <AuthProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            {children}
          </GoogleOAuthProvider>

          <MobileMenuView />

          <DepositBadgeView />
        </AuthProvider>
      </body>
    </html>
  )
}
