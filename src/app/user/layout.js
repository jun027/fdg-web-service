import MainLayout from '@/layouts/main'
import ThumbnailLayout from '@/layouts/thumbnail'
import AccountSidebar from './components/account-sidebar'
import { BreadcrumbsContainer } from '@/components/breadcrumbs'
import { BankAccountView } from '@/components/bank-account'
import { AuthGuard } from '@/auth/guard'

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <MainLayout>
        <ThumbnailLayout title="會員專區">
          <div className="py-6 px-4 max-w-650 mx-auto lg:space-y-6 lg:max-w-1520 lg:py-[60px] lg:px-10">
            <BreadcrumbsContainer />
            <div className="flex flex-col gap-y-6 lg:flex-row lg:gap-y-0 lg:gap-x-24">
              <div className="flex flex-col-reverse gap-y-2 lg:flex-col lg:gap-y-9">
                <div className="lg:pl-6">
                  <BankAccountView />
                </div>
                <AccountSidebar />
              </div>
              <div className="lg:flex-1 lg:w-1">{children}</div>
            </div>
          </div>
        </ThumbnailLayout>
      </MainLayout>
    </AuthGuard>
  )
}
