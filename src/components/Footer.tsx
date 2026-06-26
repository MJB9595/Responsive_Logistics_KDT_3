import Reveal from './Reveal'
import { Snowflake, Github, ExternalLink, BookOpen } from './icons'

const COLUMNS = [
  { title: '회사소개', links: ['회사소개', '윤리경영', 'CEO인사말', '연혁', 'CI소개', '오시는 길'] },
  { title: '서비스', links: ['재고관리', '입고관리', '출고관리', '유통기한관리', '온도관리'] },
  { title: '기술아키텍처', links: ['시스템 구조', '트래픽 처리', '상태관리', '성능 최적화'] },
  { title: '기술 스택', links: ['React', 'TypeScript', 'TanStack Query', 'MSW', 'Zustand'] },
  { title: '고객센터', links: ['공지사항', 'FAQ', '문의하기'] },
]

const SOCIALS = [
  { icon: <Github className="h-5 w-5" />, label: 'GitHub' },
  { icon: <ExternalLink className="h-5 w-5" />, label: '외부 링크' },
  { icon: <BookOpen className="h-5 w-5" />, label: '문서' },
]

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-50 px-6 pb-10 pt-[72px] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* top */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          {/* brand */}
          <Reveal className="max-w-sm">
            <a href="#top" className="group flex items-center gap-3.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-lg shadow-sky-500/30 transition-transform duration-500 group-hover:rotate-[18deg]">
                <Snowflake className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-none">
                <strong className="text-[19px] font-extrabold text-slate-900">ColdChain</strong>
                <small className="text-[13px] font-bold tracking-[0.18em] text-slate-900">WMS</small>
              </span>
            </a>
            <p className="mt-6 text-[15px] leading-relaxed text-slate-600">
              유통기한과 보존 온도를 실시간으로 관리하는 스마트 냉장·냉동 물류 시스템
            </p>
            <div className="mt-6 flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:text-sky-600 hover:shadow-md"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </Reveal>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 lg:flex lg:gap-x-[72px]">
            {COLUMNS.map((col, i) => (
              <Reveal key={col.title} delay={i * 70}>
                <h4 className="text-[16px] font-semibold text-slate-900">{col.title}</h4>
                <ul className="mt-5 space-y-[18px]">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group inline-flex items-center text-[15px] text-slate-600 transition-colors duration-200 hover:text-sky-600"
                      >
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">{link}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        {/* divider */}
        <div className="my-10 h-px w-full bg-slate-200" />

        {/* bottom */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900">
              <Snowflake className="h-4 w-4 text-sky-500" /> ColdChain WMS
            </span>
            <span className="text-[14px] text-slate-700">© 2026 ColdChain Logistics Platform. All Rights Reserved.</span>
          </div>
          <div className="flex gap-6">
            {['이용약관', '개인정보처리방침', 'Github'].map((l) => (
              <a key={l} href="#" className="text-[14px] text-slate-700 transition-colors hover:text-sky-600">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
