import ServiceHero from '../components/service/ServiceHero'
import PageTabs from '../components/common/PageTabs'
import TemperatureSection from '../components/service/TemperatureSection'
import ExpirySection from '../components/service/ExpirySection'
import InventorySection from '../components/service/InventorySection'
import ServiceCta from '../components/service/ServiceCta'

const SERVICE_TABS = [
  { label: "온도관리", id: "temperature" },
  { label: "유통기한", id: "expiry" },
  { label: "재고관리", id: "inventory" },
  { label: "통계분석", id: "inventory-stats" },
];

/** 서비스 소개 페이지 — 온도관리 · 유통기한 · 재고관리를 순서대로 소개하고 CTA로 마무리. */
export default function ServicePage() {
  return (
    <>
      <ServiceHero />
      <PageTabs tabs={SERVICE_TABS} />
      <TemperatureSection />
      <ExpirySection />
      <InventorySection />
      <ServiceCta />
    </>
  )
}
