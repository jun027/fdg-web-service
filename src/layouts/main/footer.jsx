import { CONFIG } from '@/config-global'
import { FOOTER_LIST } from '@/constants/footer-list-config'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-dark-800 p-4 lg:pt-12 lg:pb-6 lg:px-10">
      <div className="max-w-650 mx-auto space-y-9 lg:max-w-[1120px] lg:space-y-14">
        <div className="flex flex-col-reverse gap-y-9 lg:flex-row lg:gap-x-[103px] lg:gap-y-0 lg:items-center">
          <div className="flex gap-y-[6px] flex-col">
            <p className="lg:desktop-regular-h3 text-white">{CONFIG.appName}</p>
            <p className="lg:desktop-regular-h6 text-dark-400">{`地址：${CONFIG.address}`}</p>
            <p className="lg:desktop-regular-h6 text-dark-400">
              電話：<Link href={`tel:${CONFIG.phone}`}>{CONFIG.phone}</Link>
            </p>
            <Link
              href={CONFIG.socialMedia.facebookUrl}
              target="_blank"
              className="inline-block btn-hover"
            >
              <Image
                src="/images/buttons/btn-fb-01.png"
                alt="facebook"
                width={64}
                height={64}
                className="aspect-square w-8"
              />
            </Link>
          </div>

          <div className="lg:flex-1 flex flex-row flex-wrap justify-start items-start gap-x-12 gap-y-6 sm:gap-x-16 sm:justify-start">
            {FOOTER_LIST.map((item) => {
              return (
                <div key={item.id} className="space-y-3">
                  <h5 className="text-white mobile-medium-h3">{item.title}</h5>
                  <ul className="space-y-3">
                    {item.child.map((childItem) => {
                      return (
                        <li key={`${item.id}-${childItem.id}`}>
                          <Link
                            className="inline-block mobile-regular-h4 text-dark-400 btn-underline-hover"
                            href={childItem.path}
                          >
                            {childItem.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
        <p className="mobile-regular-h5 text-white text-center lg:desktop-regular-p">
          Copyright © 2024 Tapio.All rights reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
