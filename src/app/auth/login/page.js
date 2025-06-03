import { LoginView } from '@/sections/auth'
import { GuestGuard } from '@/auth/guard'

export default function LoginPage() {
  return (
    <GuestGuard>
      <LoginView />
    </GuestGuard>
  )
}
