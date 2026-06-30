import { ChevronLeft, ChevronRight } from './icons'

interface Props {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

/** 윈도우형 페이지네이션: 1 ... 3 4 [5] 6 7 ... 12 형태로 양끝과 현재 주변만 노출 */
function buildPages(page: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '…')[] = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(total - 1, page + 1)
  if (start > 2) pages.push('…')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('…')
  pages.push(total)
  return pages
}

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null
  const pages = buildPages(page, totalPages)

  const btn =
    'grid h-10 min-w-10 place-items-center rounded-lg px-3 text-[14px] font-medium transition-colors'
  // 이전/다음: 아이콘+텍스트가 가로로 나란히 (grid는 두 자식을 세로로 쌓아 깨짐)
  const navBtn =
    'inline-flex h-10 items-center justify-center gap-1 whitespace-nowrap rounded-lg px-3.5 text-[14px] font-medium transition-colors border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600'

  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5" aria-label="페이지 이동">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={navBtn}
      >
        <ChevronLeft className="h-4 w-4" />
        이전
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="grid h-10 w-10 place-items-center text-[14px] text-slate-400">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`${btn} ${
              p === page
                ? 'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/30'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-sky-600'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={navBtn}
      >
        다음
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}
