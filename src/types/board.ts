// 고객센터 게시판 도메인 모델
// board = 탭(공지사항 / FAQ / 1:1 문의), category = 목록의 "분류" 배지

export type BoardType = 'notice' | 'faq' | 'inquiry'
export type BoardFilter = 'all' | BoardType
export type PostCategory = '공지' | '업데이트' | '점검' | 'FAQ' | '문의'

export interface Post {
  id: number
  board: BoardType
  category: PostCategory
  title: string
  content: string
  author: string
  pinned: boolean
  views: number
  /** ISO date (YYYY-MM-DD) */
  createdAt: string
  /** 1:1 문의 전용 */
  answered?: boolean
  answer?: string | null
  /** 서버에서 계산해 내려주는 표시용 플래그 (최신 N일 이내) */
  isNew?: boolean
}

export interface PostListParams {
  board?: BoardFilter
  category?: PostCategory
  q?: string
  page?: number
  pageSize?: number
}

export interface PostListResponse {
  items: Post[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/** 1:1 문의 작성 payload */
export interface NewInquiry {
  title: string
  content: string
  author: string
}

export const BOARD_LABELS: Record<BoardFilter, string> = {
  all: '전체',
  notice: '공지사항',
  faq: 'FAQ',
  inquiry: '1:1 문의',
}

export const CATEGORY_STYLES: Record<PostCategory, string> = {
  공지: 'bg-emerald-50 text-emerald-600',
  업데이트: 'bg-sky-50 text-sky-600',
  점검: 'bg-amber-50 text-amber-600',
  FAQ: 'bg-violet-50 text-violet-600',
  문의: 'bg-slate-100 text-slate-600',
}
