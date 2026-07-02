import type { ReactNode } from 'react'
import Reveal from '../Reveal'
import { MapPin, Activity, Clock, ArrowRight } from '../icons'

interface Item {
  num: string
  title: string
  desc: string
  linkLabel: string
  icon: ReactNode
  iconBg: string
  iconColor: string
}

const ITEMS: Item[] = [
  {
    num: '01',
    title: '구역별 온도 설정',
    desc: '냉장·냉동 구역별 최적 온도 범위를 설정하고 실시간으로 관리합니다.',
    linkLabel: '설정 바로가기',
    icon: <MapPin className="h-5 w-5" />,
    iconBg: 'bg-blue-50',
    iconColor: 'text-sky-600',
  },
  {
    num: '02',
    title: '이상 패턴 자동 감지',
    desc: '온도 변화 패턴을 분석해 이상 징후를 사전에 감지하고 알려드립니다.',
    linkLabel: '감지 로그 보기',
    icon: <Activity className="h-5 w-5" />,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    num: '03',
    title: '온도 이력 자동 기록',
    desc: '구간별 온도 변화 이력을 자동으로 기록하고 언제든 조회할 수 있습니다.',
    linkLabel: '이력 조회하기',
    icon: <Clock className="h-5 w-5" />,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

export default function TemperatureSection() {
  return (
    <section id="temperature" className="bg-white px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-20">
        {/* text */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[13px] font-bold text-sky-600">
              <span className="h-px w-6 bg-sky-500" />
              SERVICE 01
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-4 text-[28px] font-extrabold leading-[1.35] text-sky-900 sm:text-[36px]">
              실시간 온도 모니터링으로
              <br />
              냉장·냉동 품질을 보장합니다
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[16px] leading-relaxed text-slate-500 sm:text-[17px]">
              온도 이탈 발생 즉시 담당자에게 알림을 전송하고, 구역별 온도 이력을 자동으로
              기록합니다.
            </p>
          </Reveal>
          <Reveal delay={230}>
            <a
              href="#temperature"
              className="group mt-7 inline-flex items-center gap-2 rounded-xl border-[1.5px] border-sky-600 px-7 py-3 text-[15px] font-semibold text-sky-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:text-white hover:shadow-lg hover:shadow-sky-600/25"
            >
              온도 관리 자세히 보기
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>

        {/* numbered list */}
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.num}
              delay={i * 90}
              className={`group flex items-start gap-5 px-7 py-7 transition-colors duration-300 hover:bg-slate-50 sm:px-9 ${
                i !== 0 ? 'border-t border-slate-200' : ''
              }`}
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${item.iconBg} ${item.iconColor} transition-transform duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-[18px] font-bold text-sky-900">{item.title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500 sm:text-[15px]">
                  {item.desc}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-sky-600">
                  {item.linkLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
              <span className="hidden shrink-0 text-[34px] font-extrabold text-slate-100 sm:block">
                {item.num}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
