import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { useCreateInquiry } from '../hooks/usePosts'
import { ChevronLeft, Pencil, Check } from '../components/icons'

export default function SupportNewPage() {
  const navigate = useNavigate()
  const { mutate, isPending, isError, error } = useCreateInquiry()

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [touched, setTouched] = useState(false)

  const titleInvalid = touched && !title.trim()
  const contentInvalid = touched && !content.trim()

  const submit = (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!title.trim() || !content.trim()) return
    mutate(
      { author: author.trim() || '익명', title: title.trim(), content: content.trim() },
      { onSuccess: (post) => navigate(`/support/${post.id}`) },
    )
  }

  const field =
    'w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-400'

  return (
    <section className="min-h-[60vh] bg-slate-50 px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[760px]">
        <Link
          to="/support"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-slate-500 transition-colors hover:text-sky-600"
        >
          <ChevronLeft className="h-4 w-4" />
          목록으로
        </Link>

        <Reveal className="mt-6">
          {/* header */}
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-lg shadow-sky-500/30">
              <Pencil className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-[26px] font-extrabold text-slate-900">1:1 문의 작성</h1>
              <p className="mt-0.5 text-[14px] text-slate-500">궁금한 점을 남겨주시면 담당자가 빠르게 답변드립니다.</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            {/* 작성자 */}
            <div>
              <label htmlFor="author" className="mb-2 block text-[14px] font-semibold text-slate-700">
                작성자 <span className="font-normal text-slate-400">(선택)</span>
              </label>
              <input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="이름 또는 닉네임 (미입력 시 '익명')"
                className={`${field} border-slate-200`}
              />
            </div>

            {/* 제목 */}
            <div>
              <label htmlFor="title" className="mb-2 block text-[14px] font-semibold text-slate-700">
                제목 <span className="text-rose-500">*</span>
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="문의 제목을 입력하세요"
                className={`${field} ${titleInvalid ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200'}`}
              />
              {titleInvalid && <p className="mt-1.5 text-[13px] text-rose-500">제목을 입력해 주세요.</p>}
            </div>

            {/* 내용 */}
            <div>
              <label htmlFor="content" className="mb-2 block text-[14px] font-semibold text-slate-700">
                내용 <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="문의 내용을 자세히 작성해 주세요."
                className={`${field} resize-y ${contentInvalid ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200'}`}
              />
              {contentInvalid && <p className="mt-1.5 text-[13px] text-rose-500">내용을 입력해 주세요.</p>}
            </div>

            {isError && (
              <p className="rounded-lg bg-rose-50 px-4 py-3 text-[14px] text-rose-600">
                등록에 실패했습니다. {(error as Error)?.message}
              </p>
            )}

            {/* actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/support"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-[14px] font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                취소
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 px-7 py-3 text-[14px] font-bold text-white shadow-md shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isPending ? (
                  '등록 중...'
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    문의 등록
                  </>
                )}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
