'use client'
import useIsDesktop from '@/hook/use-is-desktop'

export default function ThumbnailLayout({ children, title }) {
  const isDesktop = useIsDesktop()

  return (
    <>
      <div
        className="aspect-[375/180] w-full bg-center bg-no-repeat bg-cover flex justify-center items-center lg:aspect-[1440/300]"
        style={{
          backgroundImage: isDesktop
            ? 'url(/images/thumbnail-01-d.jpg)'
            : 'url(/images/thumbnail-01-m.jpg)',
        }}
      >
        <p className="mobile-bold-number-1 bg-gradient-to-t from-[#274D40] to-[#87A392] text-transparent bg-clip-text lg:desktop-bold-number-3">
          {title}
        </p>
      </div>
      <div>{children}</div>
    </>
  )
}
