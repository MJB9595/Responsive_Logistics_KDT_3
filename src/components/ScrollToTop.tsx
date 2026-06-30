import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** 라우트 전환 시 페이지 최상단으로 스크롤. (해시 이동은 그대로 둠) */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
