import { useEffect, useState } from 'react'
import { Snowflake, Menu } from './icons'

const LINKS = [
  { label: '회사소개', href: '#about' },
  { label: '서비스', href: '#service' },
  { label: '기술아키텍처', href: '#cta' },
  { label: '모니터링', href: '#monitoring' },
  { label: '고객센터', href: '#footer' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_-12px_rgba(2,8,23,0.18)] border-b border-slate-200/70'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-all duration-500 sm:px-8 lg:px-10 ${
          scrolled ? 'h-[68px]' : 'h-[88px]'
        }`}
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-3.5" aria-label="Fresh Chain WMS 홈">
          <span className="grid h-12 w-12 place-items-center rounded-[13px] bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-lg shadow-sky-500/30 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[18deg]">
            <Snowflake className="h-6 w-6" />
          </span>
          <span className="flex flex-col leading-none">
            <strong className="text-[20px] font-extrabold tracking-tight text-sky-900">Fresh Chain</strong>
            <small className="text-[13px] font-bold tracking-[0.18em] text-sky-500">WMS</small>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-11 lg:flex" aria-label="주요 메뉴">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative text-[16px] font-medium text-slate-700 transition-colors duration-300 hover:text-sky-600"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-sky-500 to-sky-700 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="#service"
            className="hidden rounded-[10px] border border-slate-200 px-6 py-2.5 text-[15px] font-medium text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 sm:block"
          >
            데모 보기
          </a>
          <a
            href="#cta"
            className="rounded-[10px] bg-gradient-to-br from-sky-500 to-sky-700 px-7 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/40 hover:brightness-110"
          >
            로그인
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="메뉴 열기"
            className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4" aria-label="모바일 메뉴">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-[15px] font-medium text-slate-700 transition-colors hover:bg-sky-50 hover:text-sky-700"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
