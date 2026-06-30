import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Pagination from '../components/Pagination'
import { usePosts } from '../hooks/usePosts'
import { BOARD_LABELS, CATEGORY_STYLES } from '../types/board'
import type { BoardFilter, Post, PostCategory } from '../types/board'
import { Search, Pencil, SlidersHorizontal, ChevronDown, Megaphone, HelpCircle, Headphones } from '../components/icons'

const TABS: BoardFilter[] = ['all', 'notice', 'faq', 'inquiry']
const CATEGORIES: PostCategory[] = ['공지', '업데이트', '점검', 'FAQ', '문의']
const PAGE_SIZE = 10

/* ── Hero: 검색 중심 헤더 ─────────────────────────────────────── */
function SupportHero({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-500 via-sky-600 to-sky-800 px-6 py-24 sm:px-8 lg:px-10 lg:py-28">
      {/* ambient floating glyphs */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true">
        <Headphones className="absolute left-[8%] top-[28%] h-20 w-20 -rotate-12 text-white/15" />
        <HelpCircle className="absolute right-[10%] top-[24%] h-24 w-24 text-white/10" />
        <Megaphone className="absolute right-[24%] bottom-[18%] h-16 w-16 rotate-6 text-white/10" />
        <span className="absolute left-[30%] top-[18%] h-3 w-3 animate-float rounded-full bg-white/20" />
        <span className="absolute right-[34%] top-[60%] h-2 w-2 animate-float-slow rounded-full bg-white/25" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.18em] text-green-300">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            CUSTOMER CENTER
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="text-shadow-hero mt-4 text-[34px] font-extrabold text-white sm:text-[46px]">
            무엇을 도와드릴까요?
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-4 text-[16px] text-sky-100/90 sm:text-[18px]">
            FAQ, 공지사항, 문의하기까지 — 필요한 모든 지원을 한 곳에서 받으세요.
          </p>
        </Reveal>

        <Reveal delay={260} className="mt-9 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              onSearch(value)
            }}
            className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-sky-950/30"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center text-slate-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="검색어를 입력하세요 (예: 온도 이탈, 유통기한 설정...)"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-slate-700 outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 px-7 py-3 text-[15px] font-bold text-white transition-all duration-300 hover:brightness-110"
            >
              검색
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

/* ── 테이블 한 행 ─────────────────────────────────────────────── */
function PostRow({ post }: { post: Post }) {
  return (
    <Link
      to={`/support/${post.id}`}
      className={`group grid grid-cols-[64px_88px_1fr_110px_84px] items-center px-5 py-4 transition-colors hover:bg-sky-50/70 ${
        post.pinned ? 'bg-sky-50/50' : ''
      }`}
    >
      {/* 번호 */}
      <span className="text-center text-[14px] font-medium text-slate-400">
        {post.pinned ? <span className="font-bold text-sky-600">공지</span> : post.id}
      </span>
      {/* 분류 */}
      <span className="flex justify-center">
        <span className={`rounded-md px-2.5 py-1 text-[12px] font-semibold ${CATEGORY_STYLES[post.category]}`}>
          {post.category}
        </span>
      </span>
      {/* 제목 */}
      <span className="flex min-w-0 items-center gap-2 pr-4">
        {post.isNew && (
          <span className="shrink-0 rounded bg-green-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
            NEW
          </span>
        )}
        <span className="truncate text-[15px] font-semibold text-slate-800 transition-colors group-hover:text-sky-700">
          {post.title}
        </span>
      </span>
      {/* 작성일 */}
      <span className="text-right text-[13px] tabular-nums text-slate-400">{post.createdAt.replace(/-/g, '.')}</span>
      {/* 조회수 */}
      <span className="text-right text-[13px] tabular-nums text-slate-400">{post.views.toLocaleString()}</span>
    </Link>
  )
}

/* ── 페이지 본체 ─────────────────────────────────────────────── */
export default function SupportPage() {
  const navigate = useNavigate()
  const [board, setBoard] = useState<BoardFilter>('all')
  const [category, setCategory] = useState<PostCategory | undefined>(undefined)
  const [q, setQ] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)

  const params = useMemo(
    () => ({ board, category, q, page, pageSize: PAGE_SIZE }),
    [board, category, q, page],
  )
  const { data, isLoading, isError, error, isPlaceholderData } = usePosts(params)

  const resetTo = (next: Partial<{ board: BoardFilter; category?: PostCategory; q: string }>) => {
    if (next.board !== undefined) setBoard(next.board)
    if ('category' in next) setCategory(next.category)
    if (next.q !== undefined) setQ(next.q)
    setPage(1)
  }

  return (
    <>
      <SupportHero
        onSearch={(value) => {
          setSearchInput(value)
          resetTo({ q: value })
        }}
      />

      <section className="bg-slate-50 px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1280px]">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* tabs */}
            <div className="flex flex-wrap gap-2">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => resetTo({ board: t })}
                  className={`rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all duration-300 ${
                    board === t
                      ? 'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-md shadow-sky-500/30'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-sky-600 hover:ring-sky-300'
                  }`}
                >
                  {BOARD_LABELS[t]}
                </button>
              ))}
            </div>

            {/* filter + search + write */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* category dropdown */}
              <div className="relative">
                <select
                  value={category ?? ''}
                  onChange={(e) => resetTo({ category: (e.target.value || undefined) as PostCategory | undefined })}
                  className="h-11 appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-[14px] font-medium text-slate-600 outline-none transition-colors hover:border-sky-300 focus:border-sky-400"
                >
                  <option value="">분류</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>

              {/* keyword search */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  resetTo({ q: searchInput })
                }}
                className="relative"
              >
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="제목 또는 내용 검색"
                  className="h-11 w-[220px] max-w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-[14px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 hover:border-sky-300 focus:border-sky-400"
                />
              </form>

              {/* write button */}
              <Link
                to="/support/new"
                className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 px-5 text-[14px] font-semibold text-white shadow-md shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
              >
                <Pencil className="h-4 w-4" />
                문의 작성
              </Link>
            </div>
          </div>

          {/* Active filter summary */}
          {(q || category) && (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-[13px] text-slate-500">
              {q && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                  검색어: <b className="font-semibold text-slate-700">{q}</b>
                  <button type="button" onClick={() => { setSearchInput(''); resetTo({ q: '' }) }} className="text-slate-400 hover:text-slate-600">✕</button>
                </span>
              )}
              {category && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                  분류: <b className="font-semibold text-slate-700">{category}</b>
                  <button type="button" onClick={() => resetTo({ category: undefined })} className="text-slate-400 hover:text-slate-600">✕</button>
                </span>
              )}
            </div>
          )}

          {/* Table */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* header */}
            <div className="grid grid-cols-[64px_88px_1fr_110px_84px] items-center border-b border-slate-200 bg-slate-50/80 px-5 py-3.5 text-[13px] font-semibold text-slate-500">
              <span className="text-center">번호</span>
              <span className="text-center">분류</span>
              <span>제목</span>
              <span className="text-right">작성일</span>
              <span className="text-right">조회수</span>
            </div>

            {/* body */}
            <div className={`divide-y divide-slate-100 transition-opacity ${isPlaceholderData ? 'opacity-50' : ''}`}>
              {isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-[64px_88px_1fr_110px_84px] items-center px-5 py-4">
                    <div className="mx-auto h-3 w-6 rounded bg-slate-100" />
                    <div className="mx-auto h-5 w-12 rounded bg-slate-100" />
                    <div className="h-3.5 w-2/3 rounded bg-slate-100" />
                    <div className="ml-auto h-3 w-16 rounded bg-slate-100" />
                    <div className="ml-auto h-3 w-10 rounded bg-slate-100" />
                  </div>
                ))
              ) : isError ? (
                <div className="px-5 py-16 text-center text-[14px] text-rose-500">
                  목록을 불러오지 못했습니다. {(error as Error)?.message}
                </div>
              ) : data && data.items.length > 0 ? (
                data.items.map((post) => <PostRow key={post.id} post={post} />)
              ) : (
                <div className="px-5 py-16 text-center text-[14px] text-slate-400">
                  조건에 맞는 게시글이 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="mt-10">
              <Pagination page={data.page} totalPages={data.totalPages} onChange={setPage} />
            </div>
          )}

          {/* 1:1 문의 안내 */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-sky-50/60 px-8 py-7 sm:flex-row">
            <div>
              <b className="text-[16px] font-bold text-sky-900">원하는 답변을 찾지 못하셨나요?</b>
              <p className="mt-1 text-[14px] text-slate-500">1:1 문의를 남겨주시면 담당자가 빠르게 답변드립니다.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/support/new')}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3 text-[14px] font-semibold text-sky-600 ring-1 ring-sky-200 transition-all hover:-translate-y-0.5 hover:bg-sky-600 hover:text-white hover:ring-sky-600"
            >
              <Pencil className="h-4 w-4" />
              1:1 문의하기
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
