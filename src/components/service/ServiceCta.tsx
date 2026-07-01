import { Link } from 'react-router-dom'
import Reveal from '../Reveal'
import { Headphones, ArrowRight, Phone, ShieldCheck, Zap, Users } from '../icons'

const TRUST = [
  { icon: <ShieldCheck className="h-4 w-4" />, label: '카드 등록 불필요' },
  { icon: <Zap className="h-4 w-4" />, label: '설치 없이 바로 이용' },
  { icon: <Users className="h-4 w-4" />, label: '전담 매니저 지원' },
]

export default function ServiceCta() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-gradient-to-br from-[#002e5b] to-[#001128] bg-[length:200%_200%] animate-gradient-pan"
    >
      {/* floating ambient dots */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute left-[12%] top-[22%] h-1.5 w-1.5 animate-float rounded-full bg-sky-400/40" />
        <span className="absolute left-[42%] top-[70%] h-1 w-1 animate-float-slow rounded-full bg-sky-300/40" />
        <span className="absolute right-[18%] top-[26%] h-2 w-2 animate-float-slow rounded-full bg-cyan-400/30" />
        <span className="absolute right-[10%] top-[62%] h-1.5 w-1.5 animate-float rounded-full bg-sky-400/30" />
      </div>

      <div className="relative mx-auto max-w-2xl px-6 py-20 text-center sm:px-8 sm:py-24 lg:px-10">
        <Reveal>
          <span className="mx-auto grid h-[72px] w-[72px] place-items-center rounded-[20px] bg-sky-400 text-white shadow-2xl shadow-sky-400/40 animate-pulse-ring">
            <Headphones className="h-9 w-9" />
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-6 text-[36px] font-extrabold leading-tight text-white sm:text-[48px]">
            지금 바로 시작하세요
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-4 text-[16px] text-sky-100/90 sm:text-[18px]">
            도입 문의부터 무료 체험까지, 전담 매니저가 함께합니다.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/support/new"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 px-9 py-4 text-[16px] font-bold text-white shadow-2xl shadow-sky-900/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sky-500/40 hover:brightness-110 sm:w-auto"
            >
              무료 체험 신청
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/support"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/60 px-9 py-4 text-[16px] font-semibold text-sky-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-400/10 sm:w-auto"
            >
              <Phone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
              상담 문의하기
            </Link>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {TRUST.map((t) => (
              <span key={t.label} className="inline-flex items-center gap-2 text-[13px] text-sky-200/80">
                <span className="text-sky-400">{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
