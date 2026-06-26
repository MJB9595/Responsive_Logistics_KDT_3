import type { CSSProperties, ReactNode } from 'react'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import {
  ArrowUpRight,
  Thermometer,
  Activity,
  Package,
  TriangleAlert,
  Layers,
  Clock,
  Bell,
  BarChart,
} from './icons'

interface Feature {
  title: string
  desc: string
  icon: ReactNode
  tint: string
}

const FEATURES: Feature[] = [
  { title: '입고 관리', desc: '입고 검수부터 위치 배정 자동화', icon: <Package className="h-5 w-5" />, tint: 'bg-sky-50 text-sky-600' },
  { title: '출고 관리', desc: '주문 연동 및 출고 지시 실시간 처리', icon: <ArrowUpRight className="h-5 w-5" />, tint: 'bg-emerald-50 text-emerald-600' },
  { title: '재고 관리', desc: '로케이션별 재고 현황 한눈에 파악', icon: <Layers className="h-5 w-5" />, tint: 'bg-blue-50 text-blue-600' },
  { title: '유통기한 관리', desc: 'FEFO 방식 선입선출 자동 관리', icon: <Clock className="h-5 w-5" />, tint: 'bg-violet-50 text-violet-600' },
  { title: '온도 이탈 알림', desc: '이상 감지 즉시 담당자에게 알림 발송', icon: <Bell className="h-5 w-5" />, tint: 'bg-amber-50 text-amber-600' },
  { title: '통계 분석', desc: '입출고 이력과 운영 지표 시각화', icon: <BarChart className="h-5 w-5" />, tint: 'bg-rose-50 text-rose-600' },
]

function WarehouseWidget() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const temp = useCountUp(18, { active: inView })
  const qty = useCountUp(6210, { active: inView })

  return (
    <div ref={ref} className="animate-float rounded-3xl bg-white p-6 shadow-2xl shadow-sky-900/15">
      <div className="rounded-2xl bg-gradient-to-br from-[#020d1a] via-[#03294a] to-[#0c4a6e] p-7">
        {/* top bar */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            정상 운영 중
          </span>
          <span className="text-[13px] font-medium text-sky-300">냉동창고 B동</span>
        </div>

        {/* temp display */}
        <div className="mt-5 rounded-xl bg-[#0c2d44] p-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[12px] text-sky-300/80">현재 온도</span>
              <div className="mt-1 font-extrabold leading-none text-sky-400">
                <span className="text-[48px] tabular-nums">-{temp}</span>
                <span className="text-[20px] font-semibold">°C</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/15 px-2.5 py-1 text-[12px] font-semibold text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                정상 범위
              </span>
              <span className="text-[12px] text-slate-400">설정: -20 ~ -15°C</span>
            </div>
          </div>

          {/* gauge */}
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className={`grow-bar h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300 ${inView ? 'is-visible' : ''}`}
              style={{ '--bar-w': '58%' } as CSSProperties}
            />
          </div>

          {/* mini stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { ic: <Thermometer className="h-4 w-4" />, v: '-18°C', l: '냉동 보관', vc: 'text-sky-400', lc: 'text-sky-300/80' },
              { ic: <Activity className="h-4 w-4" />, v: '정상', l: '온도 상태', vc: 'text-green-400', lc: 'text-green-300/80' },
              { ic: <Package className="h-4 w-4" />, v: qty, l: '보관 수량', vc: 'text-white', lc: 'text-sky-300/80' },
            ].map((s) => (
              <div key={s.l} className="rounded-lg bg-white/5 p-3 text-center">
                <span className={`mx-auto mb-1 flex justify-center ${s.vc}`}>{s.ic}</span>
                <b className={`block text-[15px] font-bold tabular-nums ${s.vc}`}>{s.v}</b>
                <span className={`text-[11px] ${s.lc}`}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* alert banner */}
        <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3">
          <TriangleAlert className="h-4 w-4 shrink-0 animate-pulse text-amber-400" />
          <span className="text-[13px] font-medium text-amber-300">
            유통기한 임박 상품 <b className="font-bold">3건</b> — 즉시 확인이 필요합니다
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Service() {
  return (
    <section id="service" className="bg-slate-50 px-6 py-20 sm:px-8 lg:px-10 lg:py-[80px]">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-[minmax(0,520px)_1fr] lg:gap-24">
        {/* Left: widget */}
        <Reveal variant="zoom">
          <WarehouseWidget />
        </Reveal>

        {/* Right: content */}
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-[14px] font-semibold text-sky-700">
              서비스 소개
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-[32px] font-extrabold leading-tight text-sky-900 sm:text-[42px]">
              물류 운영을 더 쉽고 정확하게
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-4 text-[18px] text-slate-500">
              신선 물류의 전 과정을 하나의 플랫폼에서 통합 관리합니다.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <a
              href="#cta"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl border-[1.5px] border-blue-600 bg-white px-9 py-3.5 text-[16px] font-semibold text-blue-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/25"
            >
              도입 문의하기
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Reveal>

          {/* Features */}
          <div className="mt-10">
            <Reveal>
              <h3 className="text-[26px] font-extrabold text-sky-900">핵심 서비스 기능</h3>
              <p className="mt-1.5 text-[15px] text-slate-500">
                입고부터 출고까지, 냉장·냉동 물류의 모든 과정을 체계적으로 관리합니다.
              </p>
            </Reveal>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {FEATURES.map((f, i) => (
                <Reveal
                  key={f.title}
                  delay={i * 80}
                  className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-900/5"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${f.tint} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {f.icon}
                  </span>
                  <div>
                    <b className="block text-[14px] font-bold text-sky-900">{f.title}</b>
                    <span className="mt-0.5 block text-[12px] leading-snug text-slate-500">{f.desc}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
