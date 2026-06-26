import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play } from './icons'
import { useCountUp } from '../hooks/useCountUp'

const SLIDES = [
  { src: '/images/hero1.png', alt: '바다 위를 항해하는 컨테이너 선박' },
  { src: '/images/hero2.png', alt: '물류 터미널의 트럭과 항공 운송' },
  { src: '/images/hero3.png', alt: '대형 냉장·냉동 물류 창고 내부' },
]

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
      <div className={`text-[28px] font-extrabold tabular-nums ${color}`}>
        {display}
        <span>{suffix}</span>
      </div>
      <div className="mt-1 text-[13px] text-sky-300/90">{label}</div>
    </div>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [counting, setCounting] = useState(false)
  const paused = useRef(false)

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) setCurrent((c) => (c + 1) % SLIDES.length)
    }, 5500)
    const t = setTimeout(() => setCounting(true), 500)
    return () => {
      clearInterval(id)
      clearTimeout(t)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative flex min-h-[760px] items-center justify-center overflow-hidden bg-sky-950 lg:h-[960px]"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {/* Background carousel */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={s.src}
              alt={s.alt}
              className={`h-full w-full object-cover ${i === current ? 'animate-ken-burns' : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
        {/* Legibility overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-950/80 via-sky-950/55 to-sky-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,8,23,0.55)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        {/* Badge */}
        <span
          className={`${ENTER} inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-1.5 text-[13px] font-medium text-sky-300 backdrop-blur-sm`}
          style={{ animationDelay: '0ms' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-400" />
          </span>
          신선 물류 특화 WMS 플랫폼
        </span>

        {/* Headline */}
        <h1 className="text-shadow-hero mt-6 text-[34px] font-normal leading-[1.22] text-white sm:text-[46px] lg:text-[58px]">
          <span className={`${ENTER} block`} style={{ animationDelay: '120ms' }}>
            유통기한과 보존 온도를
          </span>
          <span className={`${ENTER} block`} style={{ animationDelay: '220ms' }}>
            실시간으로 관리하는
          </span>
          <span className={`${ENTER} block`} style={{ animationDelay: '320ms' }}>
            <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-cyan-300 bg-clip-text font-extrabold text-transparent">
              스마트 신선
            </span>{' '}
            <span className="font-medium">물류 시스템</span>
          </span>
        </h1>

        {/* Sub copy */}
        <p
          className={`${ENTER} mt-6 max-w-xl text-[15px] leading-relaxed text-sky-200/90 sm:text-[17px]`}
          style={{ animationDelay: '440ms' }}
        >
          유통기한, 보관 온도, 실시간 재고까지 하나의 플랫폼에서 통합 관리하세요.
        </p>

        {/* CTA */}
        <div
          className={`${ENTER} mt-9 flex flex-col items-center gap-4 sm:flex-row`}
          style={{ animationDelay: '560ms' }}
        >
          <a
            href="#service"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 px-7 py-3.5 text-[16px] font-bold text-white shadow-xl shadow-sky-900/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-sky-500/40 hover:brightness-110"
          >
            서비스 둘러보기
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#monitoring"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-3.5 text-[16px] font-semibold text-sky-100 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-white/10"
          >
            <Play className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            데모 영상 보기
          </a>
        </div>

        {/* Stats */}
        <div
          className={`${ENTER} mt-12 grid grid-cols-2 gap-x-12 gap-y-8 sm:flex sm:gap-12`}
          style={{ animationDelay: '700ms' }}
        >
          <Stat value={12530} suffix="+" label="관리 상품 수" color="text-white" active={counting} />
          <Stat value={99.9} decimals={1} suffix="%" label="온도 유지율" color="text-sky-400" active={counting} />
          <Stat value={0} suffix="건" label="금일 온도 이탈" color="text-green-500" active={counting} />
          <div className="text-center">
            <div className="text-[28px] font-extrabold text-amber-500">24/7</div>
            <div className="mt-1 text-[13px] text-sky-300/90">실시간 모니터링</div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`${i + 1}번 슬라이드`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-9 bg-sky-400' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="아래로 스크롤"
        className="absolute bottom-9 right-8 z-10 hidden flex-col items-center gap-2 text-sky-200/70 transition-colors hover:text-sky-200 lg:flex"
      >
        <span className="text-[11px] tracking-[0.2em]">SCROLL</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-sky-200/40 pt-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-sky-300" />
        </span>
      </a>
    </section>
  )
}
