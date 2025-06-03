import { PATHS } from '@/routes/page'

export default function NoteFoundView() {
  return (
    <div className="bg-background flex flex-col justify-center min-h-[calc(100dvh-272px)] lg:min-h-[calc(100dvh-616px)]">
      <div className="px-4 py-6 space-y-6 lg:space-y-6 lg:py-24 lg:px-10">
        <p className="text-primary-800 mobile-bold-h1 text-center lg:desktop-bold-h1">404 Error</p>

        <p className="text-primary-800 mobile-light-h3 text-center lg:desktop-light-h4">
          您嘗試造訪的頁面不存在或已被移動。
          <br />
          嘗試返回我們的主頁。
        </p>

        <a
          href={PATHS.Home.path}
          className="w-full c-btn-basic bg-primary-800 mx-auto max-w-[343px] text-white mobile-regular-h3 btn-hover lg:max-w-[410px] lg:desktop-regular-h5"
        >
          返回主頁
        </a>
      </div>
    </div>
  )
}
