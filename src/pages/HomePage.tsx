import Hero from '../components/Hero'
import About from '../components/About'
import Service from '../components/Service'
import Monitoring from '../components/Monitoring'
import CTA from '../components/CTA'

/** 홈 — 변경 이전의 전체 랜딩(Hero·About·Service·Monitoring·CTA)을 한 페이지에 표시. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Service />
      <Monitoring />
      <CTA />
    </>
  )
}
