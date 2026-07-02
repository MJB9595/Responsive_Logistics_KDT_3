import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { Snowflake, Github, ExternalLink, BookOpen } from './icons'

interface FooterLink {
  label: string
  to?: string // 라우트 이동 (없으면 placeholder)
}

interface Column {
  title: string
  links: FooterLink[]
}

const COLUMNS: Column[] = [
  {
    title: '회사소개',
    links: [
      { label: '회사소개', to: '/about' },
      { label: '윤리경영' },
      { label: 'CEO인사말' },
      { label: '연혁' },
    ],
  },
  {
    title: '서비스',
    links: [
      { label: '온도 관리', to: '/service' },
      { label: '유통기한 관리', to: '/service' },
      { label: '재고 관리', to: '/service' },
      { label: '실시간 모니터링', to: '/monitoring' },
    ],
  },
  {
    title: '고객센터',
    links: [
      { label: '공지사항', to: '/support' },
      { label: 'FAQ', to: '/support' },
      { label: '문의하기', to: '/support/new' },
    ],
  },
  {
    title: '법적 고지',
    links: [{ label: '이용약관' }, { label: '개인정보처리방침' }, { label: 'Github' }],
  },
]

const SOCIALS = [
  { icon: <Github className="h-5 w-5" />, label: 'GitHub' },
  { icon: <ExternalLink className="h-5 w-5" />, label: '외부 링크' },
  { icon: <BookOpen className="h-5 w-5" />, label: '문서' },
]

const linkClass =
  'group inline-flex items-center text-[15px] text-slate-600 transition-colors duration-200 hover:text-sky-600'
const labelClass = 'inline-block transition-transform duration-200 group-hover:translate-x-1'

function ColumnLink({ link }: { link: FooterLink }) {
  if (link.to) {
    return (
      <Link to={link.to} className={linkClass}>
        <span className={labelClass}>{link.label}</span>
      </Link>
    )
  }
  return (
    <a href="#" className={linkClass}>
      <span className={labelClass}>{link.label}</span>
    </a>
  )
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-50 px-6 pb-10 pt-[72px] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1600px]">
        {/* top */}
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          {/* brand */}
          <Reveal className="max-w-sm">
            <Link to="/" className="group flex items-center gap-3.5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-sm shadow-sky-900/10 transition-transform duration-500 group-hover:rotate-[18deg]">
                <Snowflake className="h-6 w-6" />
              </span>
              <span className="flex flex-col leading-none">
                <strong className="text-[19px] font-extrabold text-slate-900">Fresh Chain</strong>
                <small className="text-[13px] font-bold tracking-[0.18em] text-slate-900">WMS</small>
              </span>
            </Link>
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
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 lg:flex lg:gap-x-[72px]">
            {COLUMNS.map((col, i) => (
              <Reveal key={col.title} delay={i * 70}>
                <h4 className="text-[16px] font-semibold text-slate-900">{col.title}</h4>
                <ul className="mt-5 space-y-[18px]">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <ColumnLink link={link} />
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
              <Snowflake className="h-4 w-4 text-sky-500" /> Fresh Chain WMS
            </span>
            <span className="text-[14px] text-slate-700">© 2026 Fresh Chain Logistics Platform. All Rights Reserved.</span>
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
