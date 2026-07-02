import type { ReactNode } from 'react'
import Reveal from '../Reveal'
import { Package, Clock, ArrowUpRight, TrendingUp, ArrowRight } from '../icons'

interface Row {
  name: string
  lot: string
  meta: string
  d: string
  tag: string
  rowClass: string
  dColor: string
  tagClass: string
  barColor: string
}

const ROWS: Row[] = [
  {
    name: '냉동 참치',
    lot: 'LOT#2847',
    meta: '입고 04.12 · 유통기한 06.20',
    d: 'D-1',
    tag: '긴급',
    rowClass: 'bg-red-50/70',
    dColor: 'text-red-600',
    tagClass: 'bg-red-100 text-red-600',
    barColor: 'bg-red-400',
  },
  {
    name: '냉장 우유',
    lot: 'LOT#3142',
    meta: '입고 05.02 · 유통기한 06.21',
    d: 'D-2',
    tag: '주의',
    rowClass: 'bg-amber-50/70',
    dColor: 'text-amber-600',
    tagClass: 'bg-amber-100 text-amber-600',
    barColor: 'bg-amber-400',
  },
  {
    name: '냉장 연어',
    lot: 'LOT#2991',
    meta: '입고 06.01 · 유통기한 06.28',
    d: 'D-9',
    tag: '여유',
    rowClass: 'bg-emerald-50/70',
    dColor: 'text-emerald-600',
    tagClass: 'bg-emerald-100 text-emerald-600',
    barColor: 'bg-emerald-400',
  },
]

interface Card {
  num: string
  title: string
  desc: string
  icon: ReactNode
  bar: string
}

const CARDS: Card[] = [
  {
    num: '01',
    title: 'LOT 단위 관리',
    desc: '입고 LOT별로 유통기한을 개별 추적합니다.',
    icon: <Package className="h-5 w-5" />,
    bar: 'bg-emerald-400',
  },
  {
    num: '02',
    title: 'D-day 자동 계산',
    desc: '잔여 유통기한을 실시간으로 자동 계산합니다.',
    icon: <Clock className="h-5 w-5" />,
    bar: 'bg-amber-400',
  },
  {
    num: '03',
    title: 'FEFO 우선 출고',
    desc: '유통기한이 임박한 상품을 우선 출고합니다.',
    icon: <ArrowUpRight className="h-5 w-5" />,
    bar: 'bg-sky-400',
  },
  {
    num: '04',
    title: '이력 완전 추적',
    desc: '입고부터 출고까지 전 과정을 이력 관리합니다.',
    icon: <TrendingUp className="h-5 w-5" />,
    bar: 'bg-violet-400',
  },
]

export default function ExpirySection() {
  return (
    <section id="expiry" className="bg-sky-50/70 px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,480px)_1fr] lg:gap-20">
          {/* text */}
          <div>
            <Reveal>
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-[13px] font-bold text-emerald-700">
                유통기한 관리
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="mt-5 text-[28px] font-extrabold leading-[1.35] text-sky-900 sm:text-[36px]">
                유통기한 D-day 자동 추적으로
                <br />
                폐기 손실을 제로화합니다
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[16px] leading-relaxed text-slate-500 sm:text-[17px]">
                FEFO(선입선출) 방식으로 유통기한이 임박한 상품을 우선 출고하고, 임박 알림으로
                폐기 손실을 사전에 차단합니다.
              </p>
            </Reveal>
            <Reveal delay={230}>
              <a
                href="#expiry"
                className="group mt-7 inline-flex items-center gap-2 rounded-xl border-[1.5px] border-emerald-600 px-7 py-3 text-[15px] font-semibold text-emerald-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-600/25"
              >
                유통기한 관리 자세히 보기
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          {/* widget */}
          <Reveal variant="zoom">
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-sky-900/10">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#0c3a5e] to-[#0a2a44] px-6 py-4">
                <h3 className="text-[15px] font-bold text-white">유통기한 관리 현황</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-sky-100">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-300" />
                  </span>
                  실시간
                </span>
              </div>
              <div className="divide-y divide-white bg-white">
                {ROWS.map((r) => (
                  <div key={r.lot} className={`flex items-center gap-3 px-6 py-4 ${r.rowClass}`}>
                    <span className={`h-9 w-1 shrink-0 rounded-full ${r.barColor}`} />
                    <div className="min-w-0 flex-1">
                      <b className="block text-[14px] font-bold text-slate-900">
                        {r.name} <span className="font-normal text-slate-400">({r.lot})</span>
                      </b>
                      <span className="text-[12px] text-slate-500">{r.meta}</span>
                    </div>
                    <span className="flex shrink-0 items-center gap-2">
                      <b className={`text-[15px] font-extrabold ${r.dColor}`}>{r.d}</b>
                      <em className={`rounded px-2 py-0.5 text-[11px] font-semibold not-italic ${r.tagClass}`}>
                        {r.tag}
                      </em>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* icon strip */}
        <div className="mt-14">
          <Reveal>
            <div className="flex items-center justify-between rounded-t-2xl bg-sky-900 px-7 py-3.5">
              <span className="text-[13px] font-semibold text-sky-100">품목별 관리 기준</span>
              <span className="text-[13px] font-semibold text-emerald-300">폐기 위험율 4.2%</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-b-2xl border border-t-0 border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-4">
            {CARDS.map((c, i) => (
              <Reveal key={c.num} delay={i * 90} className="bg-white p-7">
                <div className="flex items-center justify-between">
                  <span className="text-[26px] font-extrabold text-slate-100">{c.num}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-50 text-sky-600">
                    {c.icon}
                  </span>
                </div>
                <h4 className="mt-4 text-[16px] font-bold text-sky-900">{c.title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">{c.desc}</p>
                <span className={`mt-4 block h-1 w-10 rounded-full ${c.bar}`} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
