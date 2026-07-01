"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const TAB_GAP = 16; // 헤더와 탭바 사이 간격(px)

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

  useLayoutEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;

    const updateHeaderHeight = () => {
      setHeaderHeight(header.getBoundingClientRect().height);
    };
    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    setTabHeight(placeholder.offsetHeight);

    const handleScroll = () => {
      const rect = placeholder.getBoundingClientRect();
      setIsFixed(rect.top <= headerHeight + TAB_GAP);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    window.addEventListener("load", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("load", handleScroll);
    };
  }, [headerHeight]);

  return (
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
        style={isFixed ? { top: headerHeight + TAB_GAP } : undefined}
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
