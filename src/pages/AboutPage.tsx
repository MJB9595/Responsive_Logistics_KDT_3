import { useEffect, useState, type ReactNode } from 'react'
import Reveal from '../components/Reveal'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import {
  Target,
  ShieldCheck,
  Zap,
  Users,
  Quote,
  Phone,
  Mail,
  Clock,
  MapPin,
  Train,
  Bus,
  Car,
  ArrowRight,
  Thermometer,
  Check,
} from '../components/icons'

/* ── 섹션 앵커 네비게이션 ─────────────────────────────────────── */
const SECTIONS = [
  { id: 'company', label: '기업 소개' },
  { id: 'values', label: '핵심가치' },
  { id: 'ceo', label: 'CEO 인사말' },
  { id: 'history', label: '우리의 역사' },
  { id: 'location', label: '오시는 길' },
] as const

const SECTION_IDS = SECTIONS.map((s) => s.id)

function useScrollSpy() {
  const [active, setActive] = useState<string>(SECTION_IDS[0])
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 200
      let current = SECTION_IDS[0]
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= y) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return active
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 170, behavior: 'smooth' })
}

function SubNav() {
  const active = useScrollSpy()
  return (
    <nav
      className="sticky top-[80px] z-40 overflow-x-auto px-4 pb-4 pt-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      aria-label="회사 소개 섹션 이동"
    >
      <div className="mx-auto flex w-max gap-1 rounded-full border border-slate-200/80 bg-white/95 p-1.5 shadow-[0_10px_30px_-14px_rgba(15,23,42,0.28)] backdrop-blur-sm">
        {SECTIONS.map((s) => {
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToId(s.id)}
              aria-current={isActive ? 'true' : undefined}
              className={`group relative shrink-0 rounded-full px-5 py-2.5 text-[14px] font-bold transition-all duration-300 sm:px-6 ${
                isActive
                  ? 'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-sm shadow-sky-500/25'
                  : 'text-slate-500 hover:text-sky-600'
              }`}
            >
              {/* sub1·sub2 dot-pop: active always, others on hover */}
              <span
                className={`pointer-events-none absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_0_5px_rgba(14,165,233,0.16)] transition-all duration-300 ${
                  isActive
                    ? 'scale-100 opacity-100'
                    : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                }`}
              />
              {s.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

/* ── 공통: 섹션 라벨 헤더 ─────────────────────────────────────── */
function SectionHeader({
  label,
  title,
  desc,
  descClassName,
}: {
  label: string
  title: string
  desc?: string
  descClassName?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal>
        <span className="inline-block rounded-full bg-sky-50 px-4 py-1.5 text-[13px] font-bold tracking-wide text-sky-600">
          {label}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="mt-4 text-[28px] font-extrabold text-sky-900 sm:text-[36px]">{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={150}>
          <p className={descClassName ?? 'mt-4 text-[16px] text-slate-500 sm:text-[18px]'}>{desc}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ── Hero 배너 ─────────────────────────────────────────────── */
function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-sky-950">
      <img
        src="/images/hero2.png"
        alt="신선 물류 터미널 전경"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/85 via-sky-950/70 to-sky-950/90" />
      <div className="relative mx-auto max-w-[1600px] px-6 py-24 text-center sm:px-8 lg:px-10 lg:py-28">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-5 py-1.5 text-[13px] font-bold tracking-[0.18em] text-sky-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            ABOUT US
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-shadow-hero mt-5 text-[40px] font-extrabold text-white sm:text-[52px]">회사 소개</h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mx-auto mt-4 max-w-xl text-[16px] text-sky-100/90 sm:text-[18px]">
            유통기한, 보관 온도, 실시간 재고까지 하나의 플랫폼으로 스마트하게 관리합니다.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ── 기업 소개 + 통계 바 ───────────────────────────────────── */
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
      <div className={`text-[30px] font-extrabold tabular-nums sm:text-[34px] ${color}`}>
        {display}
        <span>{suffix}</span>
      </div>
      <div className="mt-1.5 text-[13px] text-sky-300/80">{label}</div>
    </div>
  )
}

function CompanySection() {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <section id="company" className="scroll-mt-[150px] bg-white px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader label="COMPANY" title="기업 소개" />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-2">
          {/* left: copy */}
          <div>
            <Reveal>
              <h3 className="text-[26px] font-extrabold leading-snug text-sky-900 sm:text-[30px]">
                신선함은 <span className="text-sky-500">온도</span>에서,
                <br />
                신뢰는 <span className="text-sky-500">데이터</span>에서
                <br />
                시작된다고 믿습니다.
              </h3>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 text-[15px] leading-[1.8] text-slate-500">
                Fresh Chain WMS는 냉장·냉동 신선 상품을 다루는 물류 현장을 위해 태어난 창고 관리
                시스템입니다. 온도 관리, 유통기한 추적, 실시간 재고까지 — 흩어져 있던 데이터를 하나의
                플랫폼으로 모읍니다.
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 text-[15px] leading-[1.8] text-slate-500">
                담당자가 창고를 직접 돌며 온도를 확인하고, 유통기한을 수기로 적고, 재고를 엑셀로
                관리하던 방식. 우리는 그 모든 과정을 데이터로 자동화합니다.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <button
                type="button"
                onClick={() => scrollToId('values')}
                className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-sky-600"
              >
                우리가 만드는 핵심 가치 보기
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </Reveal>
          </div>

          {/* right: image + floating badges */}
          <Reveal variant="zoom" className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl shadow-sky-900/15">
              <img src="/images/hero3.png" alt="냉장·냉동 물류 창고" className="h-[340px] w-full object-cover" />
            </div>
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-xl bg-sky-950/85 px-3.5 py-2.5 text-white shadow-lg backdrop-blur-sm">
              <Thermometer className="h-4 w-4 text-sky-400" />
              <span className="text-[15px] font-bold tabular-nums">-2.0°C</span>
              <span className="text-[11px] text-sky-300/80">실시간 유지 중</span>
            </div>
            <div className="absolute -bottom-4 right-5 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-green-100 text-green-600">
                <Check className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <b className="block text-[16px] font-extrabold text-sky-600">99.9%</b>
                <span className="text-[11px] text-slate-400">온도 유지율</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* stats bar */}
        <div
          ref={ref}
          className="mt-16 grid grid-cols-2 gap-y-8 rounded-3xl bg-gradient-to-br from-sky-900 to-sky-950 px-6 py-10 sm:grid-cols-4 sm:px-10"
        >
          <Stat active={inView} value={12530} suffix="+" label="매일 관리하는 상품" color="text-white" />
          <Stat active={inView} value={99.9} decimals={1} suffix="%" label="현재 온도 유지율" color="text-sky-400" />
          <Stat active={inView} value={0} suffix="건" label="금일 온도 이탈" color="text-green-400" />
          <Stat active={inView} value={50} suffix="+" label="함께하는 고객사" color="text-amber-400" />
        </div>
      </div>
    </section>
  )
}

/* ── 핵심 가치 ─────────────────────────────────────────────── */
interface Value {
  icon: ReactNode
  title: string
  desc: string
  tag: string
  grad: string
  border: string
  tagCls: string
  shadow: string
}
const VALUES: Value[] = [
  {
    icon: <Target className="h-7 w-7" />,
    title: '고객 중심',
    desc: '고객이 물류 현장에서 직접 경험한 문제를 기술로 해결합니다',
    tag: 'Customer First',
    grad: 'from-sky-400 to-sky-600',
    border: 'border-sky-200',
    tagCls: 'bg-sky-100 text-sky-700',
    shadow: 'shadow-sky-500/30',
  },
  {
    icon: <ShieldCheck className="h-7 w-7" />,
    title: '신뢰성',
    desc: '99.9% 온도 유지율과 무중단 서비스로 신뢰할 수 있는 시스템을 제공합니다',
    tag: 'Reliability',
    grad: 'from-emerald-400 to-emerald-600',
    border: 'border-emerald-200',
    tagCls: 'bg-emerald-100 text-emerald-700',
    shadow: 'shadow-emerald-500/30',
  },
  {
    icon: <Zap className="h-7 w-7" />,
    title: '혁신',
    desc: '기술의 발전에 맞춰 지속적으로 시스템을 고도화하고 새로운 가치를 창출합니다',
    tag: 'Innovation',
    grad: 'from-amber-400 to-orange-500',
    border: 'border-amber-200',
    tagCls: 'bg-amber-100 text-amber-700',
    shadow: 'shadow-amber-500/30',
  },
  {
    icon: <Users className="h-7 w-7" />,
    title: '동반 성장',
    desc: '고객사와 함께 성장하는 파트너십을 통해 상호 발전하는 생태계를 만듭니다',
    tag: 'Partnership',
    grad: 'from-violet-400 to-violet-600',
    border: 'border-violet-200',
    tagCls: 'bg-violet-100 text-violet-700',
    shadow: 'shadow-violet-500/30',
  },
]

function ValuesSection() {
  return (
    <section id="values" className="scroll-mt-[150px] bg-slate-50 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader
          label="CORE VALUES"
          title="우리가 추구하는 핵심 가치"
          desc="기술로 현장의 문제를 푸는 네 가지 원칙"
          descClassName="mt-5 text-[18px] font-bold text-sky-600 sm:text-[22px]"
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 100}
              variant="zoom"
              className={`group flex flex-col items-center rounded-2xl border-2 ${v.border} bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-900/10`}
            >
              <span
                className={`grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${v.grad} text-white shadow-lg ${v.shadow} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
              >
                {v.icon}
              </span>
              <h3 className="mt-6 text-[19px] font-bold text-sky-900">{v.title}</h3>
              <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-slate-500">{v.desc}</p>
              <span className={`mt-5 inline-flex rounded-full px-3 py-1 text-[12px] font-bold ${v.tagCls}`}>
                {v.tag}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CEO 인사말 ────────────────────────────────────────────── */
function CeoSection() {
  return (
    <section id="ceo" className="scroll-mt-[150px] bg-white px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader label="CEO MESSAGE" title="대표이사 인사말" />

        <div className="mt-14 grid gap-10 lg:grid-cols-[360px_1fr]">
          {/* CEO card */}
          <Reveal variant="zoom">
            <div className="relative flex h-full min-h-[440px] flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-sky-800 to-sky-950 shadow-2xl shadow-sky-900/20">
              <img
                src="/images/ceo.png"
                alt="김신선 대표이사"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-sky-950 via-sky-950/70 to-transparent" />
              <div className="relative p-7">
                <b className="block text-[22px] font-extrabold text-white">김신선 대표이사</b>
                <span className="mt-1 block text-[13px] font-medium text-sky-200">
                  Fresh Chain WMS CEO &amp; Founder
                </span>
              </div>
            </div>
          </Reveal>

          {/* message */}
          <div>
            <Reveal>
              <div className="flex items-start gap-3 rounded-2xl bg-sky-50 px-6 py-5">
                <Quote className="mt-0.5 h-6 w-6 shrink-0 text-sky-400" />
                <p className="text-[17px] font-bold leading-relaxed text-sky-900">
                  신선 물류의 미래는 데이터와 기술이 만드는 정밀한 온도 관리에 있습니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 border-l-4 border-sky-500 pl-4 text-[16px] font-bold text-slate-800">
                안녕하십니까, Fresh Chain WMS 대표이사 김신선입니다.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 text-[15px] leading-[1.85] text-slate-500">
                물류 현장에서 오랜 시간 일하며 저는 하나의 명확한 문제를 발견했습니다. 신선 식품을 다루는
                물류 담당자들이 온도 이탈 여부를 확인하기 위해 창고를 직접 순회하고, 유통기한을 수기로
                기록하며, 재고 현황을 수십 개의 엑셀 시트로 관리한다는 사실이었습니다.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 text-[15px] leading-[1.85] text-slate-500">
                저희는 이 문제를 해결하기 위해 Fresh Chain WMS를 만들었습니다. 앞으로도 현장의 목소리에
                귀 기울이며 더 스마트하고 안전한 신선 물류 환경을 만들어가겠습니다.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex items-center justify-end border-t border-slate-100 pt-5">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-sky-500 to-sky-700 text-[18px] font-bold text-white shadow-lg shadow-sky-500/30">
                  印
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 우리의 역사 ───────────────────────────────────────────── */
interface Milestone {
  year: string
  badge: string
  title: string
  desc: string
  badgeCls: string
}
const HISTORY: Milestone[] = [
  {
    year: '2021',
    badge: '창업',
    title: '창고 현장에서 출발',
    desc: '냉장·냉동 창고 담당자의 수기 관리 한계를 발견하고, 온도·유통기한 데이터를 구조화하기 시작했습니다.',
    badgeCls: 'bg-slate-100 text-slate-600',
  },
  {
    year: '2022',
    badge: '출시',
    title: 'Fresh Chain WMS 1.0',
    desc: '실시간 온도 모니터링과 FEFO 출고 관리를 핵심으로 한 첫 버전을 출시했습니다.',
    badgeCls: 'bg-sky-100 text-sky-700',
  },
  {
    year: '2024',
    badge: '전환',
    title: 'MSA 전환 · 50개사 도입',
    desc: '마이크로서비스 아키텍처로 전환해 대용량 트래픽을 안정적으로 처리하고, 50개 고객사를 확보했습니다.',
    badgeCls: 'bg-violet-100 text-violet-700',
  },
  {
    year: '2026',
    badge: '현재',
    title: '매일 12,530+ 상품 관리',
    desc: '전국 냉장·냉동 상품 12,530여 종을 실시간 온도·유통기한으로 관리하고 있습니다.',
    badgeCls: 'bg-green-100 text-green-700',
  },
]

function HistorySection() {
  return (
    <section id="history" className="scroll-mt-[150px] bg-slate-50 px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[minmax(0,360px)_1fr]">
        <div>
          <Reveal>
            <span className="inline-block rounded-full bg-sky-50 px-4 py-1.5 text-[13px] font-bold tracking-wide text-sky-600">
              HISTORY
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-3 text-[28px] font-extrabold leading-snug text-sky-900 sm:text-[34px]">
              현장의 문제에서
              <br />
              플랫폼이 되기까지
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-4 text-[16px] text-slate-500">
              신선 물류의 미래를 데이터와 기술이 만드는 정밀한 온도 관리에서 찾아온 여정입니다.
            </p>
          </Reveal>
        </div>

        <ol className="relative ml-1 border-l-2 border-slate-200">
          {HISTORY.map((m, i) => (
            <li key={m.year} className="relative pb-10 pl-8 last:pb-0">
              <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-slate-50 bg-sky-500" />
              <Reveal delay={i * 90}>
                <div className="flex items-center gap-3">
                  <span className="text-[22px] font-extrabold text-sky-900">{m.year}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-bold ${m.badgeCls}`}>{m.badge}</span>
                </div>
                <h4 className="mt-1.5 text-[17px] font-bold text-slate-800">{m.title}</h4>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">{m.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ── 오시는 길 & 문의 ─────────────────────────────────────── */
const CONTACT = [
  { icon: <Phone className="h-5 w-5" />, label: '전화', value: '02-1234-5678', sub: '평일 09:00 ~ 18:00' },
  { icon: <Mail className="h-5 w-5" />, label: '이메일', value: 'hello@freshchain.io', sub: '24시간 접수' },
  { icon: <Clock className="h-5 w-5" />, label: '운영시간', value: '월~금 09:00 ~ 18:00', sub: '주말·공휴일 휴무' },
]
const TRANSIT = [
  { icon: <Train className="h-4 w-4" />, tag: '2호선', tagCls: 'bg-green-100 text-green-700', title: '강남역', sub: '1번 출구 도보 5분' },
  { icon: <Bus className="h-4 w-4" />, tag: '146', tagCls: 'bg-blue-100 text-blue-700', title: '간선버스', sub: '강남역 정류장 하차' },
  { icon: <Car className="h-4 w-4" />, tag: '주차', tagCls: 'bg-slate-100 text-slate-600', title: '지하 주차장', sub: '방문객 2시간 무료' },
]

function MapCard() {
  return (
    <div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <rect width="600" height="400" fill="#eef2f7" />
        <rect x="40" y="40" width="150" height="110" rx="6" fill="#e2e8f0" />
        <rect x="410" y="60" width="150" height="90" rx="6" fill="#e2e8f0" />
        <rect x="60" y="250" width="130" height="110" rx="6" fill="#e2e8f0" />
        <rect x="420" y="260" width="140" height="100" rx="6" fill="#dcfce7" />
        <g stroke="#ffffff" strokeWidth="18" strokeLinecap="round">
          <line x1="0" y1="200" x2="600" y2="200" />
          <line x1="300" y1="0" x2="300" y2="400" />
        </g>
        <g stroke="#ffffff" strokeWidth="9" strokeLinecap="round">
          <line x1="0" y1="90" x2="600" y2="90" />
          <line x1="0" y1="310" x2="600" y2="310" />
          <line x1="130" y1="0" x2="130" y2="400" />
          <line x1="470" y1="0" x2="470" y2="400" />
        </g>
      </svg>

      {/* pin */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="mb-1 whitespace-nowrap rounded-full bg-sky-600 px-3 py-1 text-[12px] font-bold text-white shadow-lg">
          Fresh Chain WMS
        </span>
        <span className="relative grid h-10 w-10 place-items-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/50" />
          <MapPin className="relative h-9 w-9 text-sky-600" />
        </span>
      </div>

      {/* address bar */}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
        <span className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
          <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
          서울 강남구 테헤란로 427 Fresh Chain타워 15층
        </span>
        <a
          href="https://map.naver.com/p/search/강남역"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 rounded-lg bg-sky-600 px-3.5 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-sky-700"
        >
          지도 보기
        </a>
      </div>
    </div>
  )
}

function LocationSection() {
  return (
    <section id="location" className="scroll-mt-[150px] bg-white px-6 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeader label="CONTACT & LOCATION" title="찾아오시는 길 & 문의" />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_400px]">
          <Reveal variant="zoom">
            <MapCard />
          </Reveal>

          <div className="flex flex-col gap-6">
            {/* 연락처 */}
            <Reveal className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-[16px] font-bold text-sky-900">연락처 정보</h3>
              <ul className="mt-5 space-y-4">
                {CONTACT.map((c) => (
                  <li key={c.label} className="flex items-start gap-3.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600">
                      {c.icon}
                    </span>
                    <div className="leading-tight">
                      <span className="text-[12px] text-slate-400">{c.label}</span>
                      <b className="block text-[15px] font-bold text-slate-800">{c.value}</b>
                      <span className="text-[12px] text-slate-400">{c.sub}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* 교통 안내 */}
            <Reveal delay={100} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="text-[16px] font-bold text-sky-900">교통 안내</h3>
              <ul className="mt-5 space-y-3">
                {TRANSIT.map((t) => (
                  <li key={t.title} className="flex items-center gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-bold ${t.tagCls}`}>
                      {t.icon}
                      {t.tag}
                    </span>
                    <div className="leading-tight">
                      <b className="block text-[14px] font-semibold text-slate-800">{t.title}</b>
                      <span className="text-[12px] text-slate-400">{t.sub}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── 페이지 ────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <SubNav />
      <CompanySection />
      <ValuesSection />
      <CeoSection />
      <HistorySection />
      <LocationSection />
    </>
  )
}
