import { useRef, type ReactNode, type CSSProperties, type MouseEvent } from 'react'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import {
  ArrowRight,
  Package,
  Thermometer,
  Snowflake,
  TriangleAlert,
  ArrowUp,
  ArrowDown,
  ChevronRight,
} from './icons'

function Kpi({
  icon,
  iconColor,
  badge,
  badgeClass,
  value,
  decimals = 0,
  label,
  valueClass,
  active,
}: {
  icon: ReactNode
  iconColor: string
  badge: string
  badgeClass: string
  value: number
  decimals?: number
  label: string
  valueClass: string
  active: boolean
}) {
  const display = useCountUp(value, { active, decimals })
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className={`grid h-8 w-8 place-items-center rounded-lg ${iconColor}`}>{icon}</span>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badgeClass}`}>{badge}</span>
      </div>
      <b className={`mt-3 block text-[26px] font-extrabold tabular-nums ${valueClass}`}>{display}</b>
      <span className="text-[11px] font-medium text-sky-700/80">{label}</span>
    </div>
  )
}

const BARS = [
  { label: '0~5°C', value: '4,230', pct: '33.8%', w: '33.8%', grad: 'from-cyan-500 to-cyan-300' },
  { label: '-5~0°C', value: '1,840', pct: '14.7%', w: '14.7%', grad: 'from-blue-500 to-blue-400' },
  { label: '-18°C↓', value: '6,210', pct: '49.6%', w: '49.6%', grad: 'from-sky-500 to-sky-400' },
]

const ALERTS = [
  { name: '냉동 참치', lot: 'LOT#2847', d: 'D-1', tag: '긴급', dColor: 'text-red-600', tagClass: 'bg-red-100 text-red-600' },
  { name: '냉장 우유', lot: 'LOT#3142', d: 'D-2', tag: '경고', dColor: 'text-amber-600', tagClass: 'bg-amber-100 text-amber-600' },
  { name: '냉장 연어', lot: 'LOT#2991', d: 'D-3', tag: '', dColor: 'text-yellow-600', tagClass: '' },
]

function Dashboard() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const tiltRef = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent) => {
    const el = tiltRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(1200px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`
  }
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)'
  }

  const inStock = useCountUp(2840, { active: inView })
  const outStock = useCountUp(2650, { active: inView })

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="[perspective:1200px]">
      <div
        ref={tiltRef}
        className="rounded-2xl border border-slate-200/70 bg-[#f9fafb] p-6 shadow-2xl shadow-sky-900/10 transition-transform duration-300 ease-out will-change-transform"
      >
        {/* title */}
        <div className="flex items-center gap-3">
          <h3 className="text-[24px] font-bold text-slate-900">물류 정보</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[12px] font-bold text-green-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            LIVE
          </span>
        </div>
        <p className="mt-1 text-[13px] text-slate-500">실시간 운송 및 창고 물류 현황을 모니터링합니다</p>

        {/* KPIs */}
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi
            active={inView}
            icon={<Package className="h-4 w-4" />}
            iconColor="bg-blue-50 text-blue-600"
            badge="정상"
            badgeClass="bg-green-100 text-green-600"
            value={12530}
            label="전체 관리 상품"
            valueClass="text-slate-900"
          />
          <Kpi
            active={inView}
            icon={<Thermometer className="h-4 w-4" />}
            iconColor="bg-cyan-50 text-cyan-600"
            badge="냉장"
            badgeClass="bg-blue-100 text-blue-700"
            value={4230}
            label="냉장 보관 상품"
            valueClass="text-sky-600"
          />
          <Kpi
            active={inView}
            icon={<Snowflake className="h-4 w-4" />}
            iconColor="bg-sky-50 text-sky-600"
            badge="냉동"
            badgeClass="bg-sky-100 text-sky-700"
            value={6210}
            label="냉동 보관 상품"
            valueClass="text-sky-700"
          />
          <Kpi
            active={inView}
            icon={<TriangleAlert className="h-4 w-4" />}
            iconColor="bg-red-50 text-red-600"
            badge="긴급"
            badgeClass="bg-red-100 text-red-600"
            value={54}
            label="위험 상품"
            valueClass="text-red-600"
          />
        </div>

        {/* preview row */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* temp bars */}
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[14px] font-bold text-slate-900">온도 구간별 현황</h4>
              <span className="text-[10px] font-semibold text-sky-600">총 12,530개</span>
            </div>
            <div className="mt-4 space-y-3">
              {BARS.map((b, i) => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="w-12 shrink-0 text-[10px] font-medium text-sky-700">{b.label}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`grow-bar h-full rounded-full bg-gradient-to-r ${b.grad} ${inView ? 'is-visible' : ''}`}
                      style={{ '--bar-w': b.w, '--reveal-delay': `${i * 150 + 200}ms` } as CSSProperties}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right text-[10px] font-semibold text-slate-900">
                    {b.value} <em className="not-italic font-normal text-sky-600">{b.pct}</em>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* stock */}
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[14px] font-bold text-slate-900">재고 현황</h4>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-600">이번 달</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-sky-50 p-3">
                <span className="flex items-center gap-1 text-[10px] font-medium text-sky-700">
                  <ArrowUp className="h-3 w-3" /> 입고
                </span>
                <b className="mt-1 block text-[22px] font-bold tabular-nums text-sky-600">
                  {inStock}
                  <em className="ml-0.5 text-[10px] font-normal not-italic">개</em>
                </b>
              </div>
              <div className="rounded-lg bg-green-50 p-3">
                <span className="flex items-center gap-1 text-[10px] font-medium text-green-600">
                  <ArrowDown className="h-3 w-3" /> 출고
                </span>
                <b className="mt-1 block text-[22px] font-bold tabular-nums text-green-600">
                  {outStock}
                  <em className="ml-0.5 text-[10px] font-normal not-italic">개</em>
                </b>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-500">재고 소진율</span>
                <span className="font-semibold text-slate-900">93.3%</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`grow-bar h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 ${inView ? 'is-visible' : ''}`}
                  style={{ '--bar-w': '93.3%', '--reveal-delay': '350ms' } as CSSProperties}
                />
              </div>
            </div>
          </div>

          {/* expiry alerts */}
          <div className="rounded-xl border border-slate-100 bg-white p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-[14px] font-bold text-slate-900">유통기한 임박 알림</h4>
              <span className="text-[11px] font-bold text-amber-600">127건</span>
            </div>
            <ul className="mt-3 space-y-2">
              {ALERTS.map((a) => (
                <li key={a.lot} className="flex items-center justify-between rounded-lg bg-slate-50 px-2.5 py-2">
                  <div className="leading-tight">
                    <b className="block text-[11px] font-medium text-slate-900">{a.name}</b>
                    <span className="text-[10px] text-slate-400">{a.lot}</span>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <b className={`text-[11px] font-bold ${a.dColor}`}>{a.d}</b>
                    {a.tag && <em className={`rounded px-1.5 py-0.5 text-[9px] font-semibold not-italic ${a.tagClass}`}>{a.tag}</em>}
                  </span>
                </li>
              ))}
            </ul>
            <a href="#" className="mt-3 flex items-center justify-center gap-1 text-[10px] font-medium text-amber-600 hover:text-amber-700">
              전체 127건 알림 보기 <ChevronRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Monitoring() {
  return (
    <section id="monitoring" className="bg-white px-6 py-24 sm:px-8 lg:px-10 lg:py-[90px]">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-16">
        {/* text */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-600/40 px-4 py-1.5 text-[13px] font-semibold text-sky-600">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
              </span>
              실시간 모니터링
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 text-[32px] font-extrabold leading-snug text-slate-900 sm:text-[44px]">
              한눈에 파악하는 신선 물류 창고 현황
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-[18px] text-sky-600">
              12,530개 상품의 온도, 유통기한, 재고를 실시간으로 확인하세요.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-xl bg-sky-600 px-8 py-3 text-[15px] font-semibold text-white shadow-lg shadow-sky-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-600/35"
              >
                대시보드 전체 보기
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#about"
                className="rounded-xl border border-sky-600 bg-white px-8 py-3 text-[15px] font-medium text-sky-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-50"
              >
                더 알아보기
              </a>
            </div>
          </Reveal>
        </div>

        {/* dashboard */}
        <Reveal variant="zoom">
          <Dashboard />
        </Reveal>
      </div>
    </section>
  )
}
