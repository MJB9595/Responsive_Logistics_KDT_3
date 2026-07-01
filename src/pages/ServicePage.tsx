import ServiceHero from '../components/service/ServiceHero'
import ServiceTabs from '../components/service/ServiceTabs'
import TemperatureSection from '../components/service/TemperatureSection'
import ExpirySection from '../components/service/ExpirySection'
import InventorySection from '../components/service/InventorySection'
import ServiceCta from '../components/service/ServiceCta'

/** 서비스 소개 페이지 — 온도관리 · 유통기한 · 재고관리를 순서대로 소개하고 CTA로 마무리. */
export default function ServicePage() {
  return (
    <>
      <ServiceHero />
      <ServiceTabs />
      <TemperatureSection />
      <ExpirySection />
      <InventorySection />
      <ServiceCta />
    </>
  )
}
