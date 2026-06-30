import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { usePost } from '../hooks/usePosts'
import { BOARD_LABELS, CATEGORY_STYLES } from '../types/board'
import { ChevronLeft, Eye, Clock, Check, HelpCircle } from '../components/icons'

export default function SupportDetailPage() {
  const { id } = useParams()
  const postId = Number(id)
  const { data: post, isLoading, isError } = usePost(postId)

  return (
    <section className="min-h-[60vh] bg-slate-50 px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[900px]">
        <Link
          to="/support"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-slate-500 transition-colors hover:text-sky-600"
        >
          <ChevronLeft className="h-4 w-4" />
          목록으로
        </Link>

        {isLoading ? (
          <div className="mt-6 animate-pulse rounded-2xl border border-slate-200 bg-white p-8">
            <div className="h-5 w-24 rounded bg-slate-100" />
            <div className="mt-5 h-7 w-3/4 rounded bg-slate-100" />
            <div className="mt-8 space-y-3">
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-5/6 rounded bg-slate-100" />
              <div className="h-4 w-2/3 rounded bg-slate-100" />
            </div>
          </div>
        ) : isError || !post ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-16 text-center">
            <p className="text-[15px] text-slate-500">게시글을 찾을 수 없습니다.</p>
            <Link
              to="/support"
              className="mt-5 inline-block rounded-xl bg-sky-600 px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-sky-700"
            >
              목록으로 돌아가기
            </Link>
          </div>
        ) : (
          <Reveal className="mt-6">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {/* header */}
              <div className="border-b border-slate-100 px-8 py-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-md px-2.5 py-1 text-[12px] font-semibold ${CATEGORY_STYLES[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-500">
                    {BOARD_LABELS[post.board]}
                  </span>
                  {post.isNew && (
                    <span className="rounded bg-green-500 px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span>
                  )}
                </div>
                <h1 className="mt-4 text-[24px] font-extrabold leading-snug text-slate-900 sm:text-[28px]">
                  {post.title}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-400">
                  <span className="font-medium text-slate-600">{post.author}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.createdAt.replace(/-/g, '.')}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Eye className="h-3.5 w-3.5" />
                    {post.views.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* body */}
              <div className="px-8 py-9">
                <p className="whitespace-pre-line text-[16px] leading-[1.85] text-slate-700">{post.content}</p>
              </div>

              {/* 1:1 문의 답변 영역 */}
              {post.board === 'inquiry' && (
                <div className="border-t border-slate-100 bg-slate-50/60 px-8 py-7">
                  {post.answered && post.answer ? (
                    <div className="flex gap-4">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-100 text-sky-600">
                        <Check className="h-5 w-5" />
                      </span>
                      <div>
                        <b className="text-[14px] font-bold text-sky-700">답변 완료</b>
                        <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-slate-700">
                          {post.answer}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-slate-500">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-600">
                        <HelpCircle className="h-5 w-5" />
                      </span>
                      <div>
                        <b className="text-[14px] font-bold text-amber-600">답변 대기중</b>
                        <p className="mt-0.5 text-[14px]">담당자가 확인 후 빠르게 답변드리겠습니다.</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </article>

            <div className="mt-8 text-center">
              <Link
                to="/support"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-7 py-3 text-[14px] font-semibold text-slate-600 transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-600"
              >
                <ChevronLeft className="h-4 w-4" />
                목록으로
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
