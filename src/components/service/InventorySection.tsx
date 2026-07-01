import type { CSSProperties, ReactNode } from 'react'
import Reveal from '../Reveal'
import { useInView } from '../../hooks/useInView'
import { useCountUp } from '../../hooks/useCountUp'
import { ArrowRight, MapPin, CheckCircle2, Users } from '../icons'

function Stat({
  value,
  decimals = 0,
  suffix = '',
  label,
  color,
  bar,
  active,
}: {
  value: number
  decimals?: number
  suffix?: string
  label: string
  color: string
  bar: string
  active: boolean
}) {
  const display = useCountUp(value, { active, decimals })
  return (
    <div>
      <b className={`text-[32px] font-extrabold tabular-nums ${color} sm:text-[38px]`}>
        {display}
        <span>{suffix}</span>
      </b>
      <div className="mt-2 text-[13px] font-medium text-slate-500">{label}</div>
      <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-slate-100">
        <div className={`grow-bar h-full rounded-full ${bar} ${active ? 'is-visible' : ''}`} style={{ '--bar-w': '100%' } as CSSProperties} />
      </div>
    </div>
  )
}

const ZONES = [
  { label: 'A구역', sub: '냉장', value: '10,616개', pct: '84.7%', w: '84.7%', grad: 'from-sky-600 to-sky-500', dot: 'bg-sky-600' },
  { label: 'B구역', sub: '냉동', value: '7,807개', pct: '62.3%', w: '62.3%', grad: 'from-sky-400 to-cyan-300', dot: 'bg-sky-400' },
  { label: 'C구역', sub: '상온', value: '5,651개', pct: '45.1%', w: '45.1%', grad: 'from-amber-400 to-amber-300', dot: 'bg-amber-400' },
]

interface MiniCard {
  num: string
  icon: ReactNode
  label: string
  value: string
  desc: string
  iconBg: string
  iconColor: string
}

const MINI_CARDS: MiniCard[] = [
  {
    num: '01',
    icon: <MapPin className="h-5 w-5" />,
    label: '로케이션 관리',
    value: '128개',
    desc: '전체 등록 로케이션 수',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    num: '02',
    icon: <CheckCircle2 className="h-5 w-5" />,
    label: '입출고 정확도',
    value: '99.2%',
    desc: '최근 30일 평균 정확도',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    num: '03',
    icon: <Users className="h-5 w-5" />,
    label: '재고 관리 인원',
    value: '24명',
    desc: '실시간 재고를 담당하는 인원',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
]

export default function InventorySection() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="inventory" className="bg-white px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-20">
          {/* text */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[13px] font-bold text-orange-600">
                <span className="h-px w-6 bg-orange-500" />
                재고 관리
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-4 text-[28px] font-extrabold leading-[1.35] text-sky-900 sm:text-[36px]">
                로케이션별 재고 현황을
                <br />
                한눈에 파악합니다
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[16px] leading-relaxed text-slate-500 sm:text-[17px]">
                구역·로케이션별 실시간 재고를 추적하고, 입출고 이력을 자동으로 기록합니다.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <a
                href="#inventory"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl border-[1.5px] border-orange-500 px-7 py-3 text-[15px] font-semibold text-orange-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
              >
                재고 관리 자세히 보기
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          {/* stat grid */}
          <div ref={ref} className="grid grid-cols-2 gap-x-10 gap-y-10">
            <Reveal variant="zoom">
              <Stat value={12530} label="전체 재고 상품" color="text-sky-900" bar="bg-sky-600" active={inView} />
            </Reveal>
            <Reveal variant="zoom" delay={80}>
              <Stat value={2840} label="금일 입고량" color="text-emerald-600" bar="bg-emerald-500" active={inView} />
            </Reveal>
            <Reveal variant="zoom" delay={160}>
              <Stat value={2650} label="금일 출고량" color="text-sky-600" bar="bg-sky-500" active={inView} />
            </Reveal>
            <Reveal variant="zoom" delay={240}>
              <Stat value={847} label="재고 부족 상품" color="text-orange-600" bar="bg-orange-500" active={inView} />
            </Reveal>
          </div>
        </div>

        {/* zone bars + mini cards */}
        <div id="inventory-stats" className="mt-16 grid gap-6 lg:grid-cols-[minmax(0,480px)_1fr]">
          <Reveal variant="zoom">
            <div className="h-full rounded-2xl border border-slate-200 p-7">
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-slate-900">구역별 재고 현황</h3>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-600">
                  실시간
                </span>
              </div>
              <div className="mt-6 space-y-5">
                {ZONES.map((z, i) => (
                  <div key={z.label}>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="flex items-center gap-2 font-semibold text-slate-700">
                        <span className={`h-2 w-2 rounded-full ${z.dot}`} />
                        {z.label} <em className="not-italic font-normal text-slate-400">{z.sub}</em>
                      </span>
                      <span className="font-semibold text-slate-900">
                        {z.value} <em className="not-italic text-sky-600">{z.pct}</em>
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`grow-bar h-full rounded-full bg-gradient-to-r ${z.grad} ${inView ? 'is-visible' : ''}`}
                        style={{ '--bar-w': z.w, '--reveal-delay': `${i * 140 + 120}ms` } as CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {MINI_CARDS.map((c, i) => (
              <Reveal
                key={c.num}
                delay={i * 100}
                className="group flex flex-col rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-900/5"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-lg ${c.iconBg} ${c.iconColor} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {c.icon}
                  </span>
                  <span className="text-[22px] font-extrabold text-slate-100">{c.num}</span>
                </div>
                <b className="mt-5 block text-[15px] font-bold text-slate-900">{c.label}</b>
                <span className="mt-1 text-[22px] font-extrabold text-sky-900">{c.value}</span>
                <span className="mt-1.5 text-[12px] leading-relaxed text-slate-500">{c.desc}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
