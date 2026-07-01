import { useState } from 'react'

const TABS = [
  { label: '온도관리', href: '#temperature' },
  { label: '유통기한', href: '#expiry' },
  { label: '재고관리', href: '#inventory' },
  { label: '통계분석', href: '#inventory-stats' },
]

export default function ServiceTabs() {
  const [active, setActive] = useState(0)

  return (
    <nav
      aria-label="서비스 섹션 바로가기"
      className="border-b border-slate-100 bg-white px-6 py-6 sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-[1600px] justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-full bg-slate-100 p-1.5">
          {TABS.map((t, i) => (
            <a
              key={t.label}
              href={t.href}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2 text-[14px] font-semibold transition-all duration-300 ${
                active === i
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/30'
                  : 'text-slate-500 hover:text-sky-700'
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
