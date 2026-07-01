import { useEffect, useState } from 'react'
import { useCountUp } from '../../hooks/useCountUp'

/**
 * 히어로 배경 이미지 자리.
 * public/images 폴더에 이미지를 추가한 뒤 아래 경로를 채워 넣으면 바로 적용됩니다.
 * 예) const HERO_BG = '/images/service-hero.jpg'
 * 비워두면(빈 문자열) 임시 그라데이션 배경이 대신 표시됩니다.
 */
const HERO_BG = ''

const ENTER = 'animate-rise'

function Stat({
  value,
  decimals = 0,
  suffix = '',
  label,
  color,
  active,
}: {
  value: number
  decimals?: number
  suffix?: string
  label: string
  color: string
  active: boolean
}) {
  const display = useCountUp(value, { active, decimals })
  return (
    <div className="text-center">
      <div className={`text-[26px] font-extrabold tabular-nums ${color} sm:text-[30px]`}>
        {display}
        <span>{suffix}</span>
      </div>
      <div className="mt-1 text-[13px] text-sky-300/90">{label}</div>
    </div>
  )
}

export default function ServiceHero() {
  const [counting, setCounting] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setCounting(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="service-top"
      className="relative flex min-h-[480px] items-center justify-center overflow-hidden bg-sky-950 sm:min-h-[560px]"
    >
      {/* Background — 사용자가 직접 이미지를 넣을 수 있는 자리 */}
      <div className="absolute inset-0">
        {HERO_BG ? (
          <img
            src={HERO_BG}
            alt="냉장·냉동 물류 창고 배경"
            className="h-full w-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-[#031428] via-[#0a2c4d] to-[#031428]" />
        )}
        {/* Legibility overlays — 어떤 이미지를 넣어도 텍스트가 잘 보이도록 유지 */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/80 via-sky-950/55 to-sky-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,8,23,0.55)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:py-24">
        <span
          className={`${ENTER} inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-1.5 text-[13px] font-medium text-sky-300 backdrop-blur-sm`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
          </span>
          SERVICE
        </span>

        <h1 className="text-shadow-hero mt-6 text-[30px] font-normal leading-[1.28] text-white sm:text-[42px] lg:text-[48px]">
          <span className={`${ENTER} block`} style={{ animationDelay: '100ms' }}>
            냉장·냉동 물류에 최적화된
          </span>
          <span className={`${ENTER} block`} style={{ animationDelay: '200ms' }}>
            <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 bg-clip-text font-extrabold text-transparent">
              스마트 WMS
            </span>{' '}
            <span className="font-medium">서비스</span>
          </span>
        </h1>

        <p
          className={`${ENTER} mt-6 max-w-xl text-[15px] leading-relaxed text-sky-200/90 sm:text-[17px]`}
          style={{ animationDelay: '320ms' }}
        >
          온도부터 유통기한, 재고까지 — 신선 물류의 전 과정을 하나의 플랫폼에서 관리하세요.
        </p>

        <div
          className={`${ENTER} mt-11 grid grid-cols-3 gap-x-8 gap-y-6 sm:gap-x-14`}
          style={{ animationDelay: '460ms' }}
        >
          <Stat value={99.9} decimals={1} suffix="%" label="온도 유지율" color="text-sky-400" active={counting} />
          <Stat value={12530} suffix="+" label="관리 상품 수" color="text-white" active={counting} />
          <Stat value={50} suffix="+" label="도입 고객사" color="text-green-500" active={counting} />
        </div>
      </div>
    </section>
  )
}
