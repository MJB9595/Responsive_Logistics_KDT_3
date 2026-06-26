import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { Building, Snowflake, Package, Zap, ArrowRight } from './icons'

interface Card {
  num: string
  label: string
  title: string
  desc: string
  icon: ReactNode
  cardBg: string
  numColor: string
  iconBg: string
  iconColor: string
  linkColor: string
  accent: string
}

const CARDS: Card[] = [
  {
    num: '01',
    label: 'COMPANY',
    title: '신선 물류 전문 플랫폼',
    desc: '유통기한과 보관 온도가 중요한 상품을 실시간으로 추적하고 관리합니다. 재고 현황부터 입출고 이력까지 한눈에 확인하세요.',
    icon: <Building className="h-7 w-7" />,
    cardBg: 'bg-white',
    numColor: 'text-sky-500',
    iconBg: 'bg-blue-50',
    iconColor: 'text-sky-600',
    linkColor: 'text-sky-500',
    accent: 'from-sky-400 to-sky-600',
  },
  {
    num: '02',
    label: 'COLD CHAIN',
    title: '콜드체인 온도 관리',
    desc: '상품별 적정 보관 온도를 설정하고 온도 이탈 발생 시 즉시 알림을 제공합니다. 위험 수준 도달 전 선제적 대응이 가능합니다.',
    icon: <Snowflake className="h-7 w-7" />,
    cardBg: 'bg-sky-50',
    numColor: 'text-sky-700',
    iconBg: 'bg-blue-100',
    iconColor: 'text-sky-600',
    linkColor: 'text-sky-700',
    accent: 'from-sky-500 to-blue-600',
  },
  {
    num: '03',
    label: 'INVENTORY',
    title: '실시간 재고 추적',
    desc: '입고부터 출고까지 모든 상품의 이동 경로와 현재 재고 상태를 실시간으로 관리합니다. 유통기한별 우선 출고 자동화를 지원합니다.',
    icon: <Package className="h-7 w-7" />,
    cardBg: 'bg-white',
    numColor: 'text-emerald-500',
    iconBg: 'bg-green-50',
    iconColor: 'text-emerald-500',
    linkColor: 'text-emerald-500',
    accent: 'from-emerald-400 to-emerald-600',
  },
  {
    num: '04',
    label: 'PERFORMANCE',
    title: '대용량 트래픽 대응',
    desc: 'MSW와 비동기 상태 관리를 통해 서버 장애 상황을 시뮬레이션하고 안정적인 사용자 경험을 제공합니다.',
    icon: <Zap className="h-7 w-7" />,
    cardBg: 'bg-sky-50',
    numColor: 'text-violet-600',
    iconBg: 'bg-fuchsia-50',
    iconColor: 'text-violet-600',
    linkColor: 'text-violet-600',
    accent: 'from-violet-500 to-fuchsia-500',
  },
]

export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-24 sm:px-8 lg:px-10 lg:py-[100px]">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <span className="inline-block rounded-full bg-sky-50 px-5 py-1.5 text-[14px] font-semibold text-sky-700">
              ColdChain WMS 소개
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-4 text-[30px] font-extrabold leading-tight text-sky-900 sm:text-[40px]">
              신선 물류의 모든 것을 한 곳에서
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 text-[16px] text-slate-500 sm:text-[18px]">
              유통기한, 보관 온도, 실시간 재고까지 스마트하게 관리하세요.
            </p>
          </Reveal>
        </div>

        {/* Cards — joined grid with hairline dividers */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal
              key={c.num}
              delay={i * 110}
              variant="zoom"
              className={`group relative ${c.cardBg} p-10 transition-colors duration-500 hover:bg-white`}
            >
              {/* top accent bar */}
              <span
                className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r ${c.accent} transition-transform duration-500 group-hover:scale-x-100`}
              />
              {/* number + label */}
              <div className="flex items-center gap-2.5">
                <span className={`text-[14px] font-extrabold ${c.numColor}`}>{c.num}</span>
                <span className="h-px w-5 bg-slate-300" />
                <span className="text-[13px] font-bold tracking-wider text-slate-400">{c.label}</span>
              </div>
              {/* icon */}
              <div
                className={`mt-7 grid h-[53px] w-[53px] place-items-center rounded-2xl ${c.iconBg} ${c.iconColor} transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:rotate-6`}
              >
                {c.icon}
              </div>
              {/* title + desc */}
              <h3 className="mt-7 text-[21px] font-bold text-sky-900">{c.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.65] text-slate-500">{c.desc}</p>
              {/* link */}
              <a
                href="#service"
                className={`mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold ${c.linkColor}`}
              >
                자세히 보기
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
