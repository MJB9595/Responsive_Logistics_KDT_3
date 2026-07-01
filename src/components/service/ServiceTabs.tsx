"use client";

import { useEffect, useRef, useState } from "react";

const TABS = [
  { label: "온도관리", href: "#temperature" },
  { label: "유통기한", href: "#expiry" },
  { label: "재고관리", href: "#inventory" },
  { label: "통계분석", href: "#inventory-stats" },
];

export default function ServiceTabs() {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [tabHeight, setTabHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    // 헤더 높이를 구해서 fixed일 때 그 바로 아래에 붙게 함
    const header = document.querySelector("header");
    if (header) {
      setHeaderHeight(header.getBoundingClientRect().height);
    }

    // 탭바가 원래 위치한 문서 기준 Y좌표를 저장
    const originalTop =
      placeholder.getBoundingClientRect().top + window.scrollY;
    setTabHeight(placeholder.offsetHeight);

    const handleScroll = () => {
      setIsFixed(window.scrollY > originalTop);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // isFixed일 때 탭바가 빠지면서 아래 콘텐츠가 튀어오르지 않도록 자리 확보
    <div
      ref={placeholderRef}
      className="my-8"
      style={isFixed ? { height: tabHeight } : undefined}
    >
      <div
        className={
          isFixed
            ? "fixed left-1/2 z-50 w-fit -translate-x-1/2"
            : "relative mx-auto w-fit"
        }
        style={isFixed ? { top: headerHeight } : undefined}
      >
        <div className="absolute -inset-2 -z-10 rounded-full bg-white/30 blur-xl" />

        <div className="flex rounded-full border border-white/50 bg-white p-1.5 shadow-lg">
          {TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => scrollToSection(tab.href)}
              className="group relative rounded-full px-7 py-3 text-sm font-bold text-slate-500 transition-all duration-300 hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/25 focus-visible:bg-sky-500 focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
            >
              <span className="pointer-events-none absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 scale-0 rounded-full bg-sky-400 opacity-0 shadow-[0_0_0_8px_rgba(14,165,233,0.18)] transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
