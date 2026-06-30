import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatWidget from './ChatWidget'
import ScrollToTop from './ScrollToTop'
import { ChevronUp } from './icons'

/** 전역 셸: 고정 헤더 + 페이지(Outlet) + 푸터 + 플로팅 위젯(맨위로/채팅/진행바) */
export default function Layout() {
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      setProgress(Math.min(scrolled * 100, 100))
      setShowTop(h.scrollTop > 700)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollToTop />

      {/* scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-1">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Navbar />

      <main className="pt-[88px]">
        <Outlet />
      </main>

      <Footer />

      {/* back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="맨 위로"
        className={`group fixed bottom-7 right-7 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-b from-sky-400 to-sky-500 text-white shadow-[0_6px_20px_rgba(56,189,248,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(56,189,248,0.65)] ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ChevronUp className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>

      <ChatWidget liftUp={showTop} />
    </>
  )
}
