import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Service from './components/Service'
import Monitoring from './components/Monitoring'
import CTA from './components/CTA'
import Footer from './components/Footer'
import { ArrowUp } from './components/icons'

export default function App() {
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
      {/* scroll progress bar */}
      <div className="fixed inset-x-0 top-0 z-[60] h-1">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-cyan-400 transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Navbar />

      <main className="pt-[88px]">
        <Hero />
        <About />
        <Service />
        <Monitoring />
        <CTA />
      </main>

      <Footer />

      {/* back to top */}
      <a
        href="#top"
        aria-label="맨 위로"
        className={`fixed bottom-7 right-7 z-50 grid h-12 w-12 place-items-center rounded-full bg-sky-600 text-white shadow-xl shadow-sky-600/35 transition-all duration-300 hover:-translate-y-1 hover:bg-sky-700 ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </a>
    </>
  )
}
