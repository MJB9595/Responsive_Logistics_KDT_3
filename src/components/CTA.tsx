import Reveal from './Reveal'
import { Snowflake, ArrowRight, Phone, ShieldCheck, CreditCard, Clock } from './icons'

const TRUST = [
  { icon: <ShieldCheck className="h-4 w-4" />, label: 'SSL 보안 연결' },
  { icon: <CreditCard className="h-4 w-4" />, label: '카드 등록 불필요' },
  { icon: <Clock className="h-4 w-4" />, label: '30일 무료 체험' },
]

export default function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-[#002e5b] to-[#001128] bg-[length:200%_200%] animate-gradient-pan"
    >
      {/* floating ambient dots */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute left-[12%] top-[20%] h-1.5 w-1.5 animate-float rounded-full bg-sky-400/40" />
        <span className="absolute left-[40%] top-[70%] h-1 w-1 animate-float-slow rounded-full bg-sky-300/40" />
        <span className="absolute right-[30%] top-[28%] h-2 w-2 animate-float-slow rounded-full bg-cyan-400/30" />
        <span className="absolute right-[14%] top-[60%] h-1.5 w-1.5 animate-float rounded-full bg-sky-400/30" />
      </div>

      <div className="relative mx-auto grid max-w-[1600px] items-center gap-8 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-0">
        {/* illustration */}
        <Reveal variant="zoom" className="order-2 lg:order-1">
          <img
            src="/images/cta.png"
            alt="클라우드 기반 신선 물류 관리 시스템 일러스트레이션"
            className="mx-auto w-full max-w-xl animate-float-slow drop-shadow-2xl lg:max-w-none"
          />
        </Reveal>

        {/* content */}
        <div className="order-1 py-6 lg:order-2 lg:py-24">
          <Reveal>
            <span className="grid h-[72px] w-[72px] place-items-center rounded-[20px] bg-sky-400 text-white shadow-2xl shadow-sky-400/40 animate-pulse-ring">
              <Snowflake className="h-9 w-9" />
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-6 text-[40px] font-extrabold leading-tight text-white sm:text-[52px] lg:text-[60px]">
              지금 바로 시작하세요
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-4 text-[18px] text-sky-100/90">
              30일 무료 체험으로 신선 물류 관리를 혁신하세요.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 px-11 py-5 text-[18px] font-bold text-white shadow-2xl shadow-sky-900/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sky-500/40 hover:brightness-110"
              >
                무료로 시작하기
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
              <a
                href="#footer"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/60 px-11 py-5 text-[18px] font-semibold text-sky-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-400/10"
              >
                <Phone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                도입 상담 문의
              </a>
            </div>
          </Reveal>

          {/* trust row */}
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-6">
              {TRUST.map((t) => (
                <span key={t.label} className="inline-flex items-center gap-2 text-[14px] text-sky-200/80">
                  <span className="text-sky-400">{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
