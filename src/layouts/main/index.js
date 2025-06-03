import Footer from './footer'
import Header from './header'

export default function MainLayout({ children }) {
  return (
    <main className="bg-background relative z-0">
      {/* Header */}
      <Header />

      {/* Content */}
      <div>{children}</div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
