"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const TAB_GAP = 16; // 헤더와 탭바 사이 간격(px)

export interface TabItem {
  id: string; // The ID of the section to scroll to (without the #)
  label: string;
}

interface PageTabsProps {
  tabs: TabItem[];
}

export default function PageTabs({ tabs }: PageTabsProps) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [tabHeight, setTabHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || "");

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - TAB_GAP - 20;
      window.scrollTo({ top, behavior: "smooth" });
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

      // Active tab detection
      const scrollY = window.scrollY + headerHeight + TAB_GAP + 100;
      let current = tabs[0]?.id || "";
      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (el && el.offsetTop <= scrollY) {
          current = tab.id;
        }
      }
      setActiveTab(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    window.addEventListener("load", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("load", handleScroll);
    };
  }, [headerHeight, tabs]);

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
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                aria-current={isActive ? "true" : undefined}
                className={`group relative rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                    : "text-slate-500 hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/25"
                }`}
              >
                <span
                  className={`pointer-events-none absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_0_8px_rgba(14,165,233,0.18)] transition-all duration-300 ${
                    isActive
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  }`}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
