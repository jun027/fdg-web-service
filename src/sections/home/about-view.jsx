import Image from 'next/image'

function AboutView() {
  return (
    <div id="about-us" className="bg-background pt-12 sm:pb-12 px-4 lg:px-10 lg:pt-9 lg:pb-[60px]">
      <div className="max-w-650 mx-auto lg:max-w-[1116px]">
        <div className="relative">
          {/* LT */}
          <Image
            alt="conner"
            src="/images/deco/conner-01.png"
            width={241}
            height={243}
            className="aspect-square w-[58px] absolute top-0 left-0 lg:w-[116px]"
          />

          {/* RT */}
          <Image
            alt="conner"
            src="/images/deco/conner-01.png"
            width={241}
            height={243}
            className="aspect-square w-[58px] absolute top-0 right-0 -scale-x-100 lg:w-[116px]"
          />

          {/* LB */}
          <Image
            alt="conner"
            src="/images/deco/conner-01.png"
            width={241}
            height={243}
            className="aspect-square w-[58px] absolute bottom-0 left-0 -scale-y-100 lg:w-[116px]"
          />

          {/* RB */}
          <Image
            alt="conner"
            src="/images/deco/conner-01.png"
            width={241}
            height={243}
            className="aspect-square w-[58px] absolute bottom-0 right-0 -scale-y-100 -scale-x-100 lg:w-[116px]"
          />

          <div className="space-y-3 px-5 pb-10 lg:px-[116px] lg:pt-9 lg:pb-32 lg:space-y-10">
            <h2 className="mobile-bold-h1 text-primary-700 text-center lg:desktop-bold-h2">
              關於我們
            </h2>
            <p className="mobile-regular-h4 text-dark-700 lg:desktop-regular-h5">
              「恆春郡福德宮——459年古剎，福佑一方」 <br />
              <br />
              恆春郡福德宮，擁有
              459年悠久歷史，是當地居民心中的信仰中心，也是屏東地區的重要文化遺產之一。自創建以來，福德宮始終秉持「福佑鄉里、護佑一方」的精神，見證了無數世代的繁榮興衰，成為地方民眾祈福納祥的重要場所。
              <br />
              <br />
              作為一座跨越四個多世紀的廟宇，福德宮不僅保留了古樸的建築風貌，還融合了道教信仰的深厚底蘊，傳承並弘揚了台灣傳統文化的精髓。每年吸引大量信眾和遊客前來參拜，無論是在慶典活動還是日常祭祀中，福德宮都充滿了熱鬧和虔誠的氛圍。
              <br />
              <br />
              我們誠摯邀請您前來恆春郡福德宮，親身感受這座古老廟宇的神聖與美麗，並在福德宮的庇佑下，為自己和家人祈求平安順遂、吉祥如意。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutView
