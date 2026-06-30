import type { NewInquiry, Post, PostListParams, PostListResponse } from '../types/board'
import { SEED_POSTS } from './seed'

// localStorage 기반 영속 저장소. 1:1 문의 작성 글이 새로고침 후에도 유지된다.
// (골조 데모용 — 실제 운영은 서버 DB로 대체)

const STORAGE_KEY = 'freshchain.board.v1'
const NEW_DAYS = 14 // 데이터셋 최신일 기준 N일 이내면 'NEW'

function load(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Post[]
  } catch {
    // 파싱 실패 시 시드로 복구
  }
  save(SEED_POSTS)
  return [...SEED_POSTS]
}

function save(posts: Post[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch {
    // 저장 실패는 무시 (데모)
  }
}

/** 데이터셋에서 가장 최신 createdAt 을 기준점으로 잡아 NEW 여부 계산 */
function newestTime(posts: Post[]): number {
  return posts.reduce((max, p) => Math.max(max, new Date(p.createdAt).getTime()), 0)
}

function withFlags(post: Post, ref: number): Post {
  const age = ref - new Date(post.createdAt).getTime()
  return { ...post, isNew: age <= NEW_DAYS * 86_400_000 }
}

/** 정렬: 고정 글 우선 → 작성일 내림차순 */
function sortPosts(a: Post, b: Post): number {
  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
  return b.createdAt.localeCompare(a.createdAt)
}

export const boardDb = {
  list(params: PostListParams = {}): PostListResponse {
    const { board = 'all', category, q, page = 1, pageSize = 10 } = params
    const all = load()
    const ref = newestTime(all)
    const keyword = q?.trim().toLowerCase()

    const filtered = all
      .filter((p) => (board === 'all' ? true : p.board === board))
      .filter((p) => (category ? p.category === category : true))
      .filter((p) =>
        keyword ? p.title.toLowerCase().includes(keyword) || p.content.toLowerCase().includes(keyword) : true,
      )
      .sort(sortPosts)

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const safePage = Math.min(Math.max(1, page), totalPages)
    const start = (safePage - 1) * pageSize
    const items = filtered.slice(start, start + pageSize).map((p) => withFlags(p, ref))

    return { items, total, page: safePage, pageSize, totalPages }
  },

  get(id: number): Post | undefined {
    const all = load()
    const idx = all.findIndex((p) => p.id === id)
    if (idx === -1) return undefined
    // 조회수 증가
    all[idx] = { ...all[idx], views: all[idx].views + 1 }
    save(all)
    return withFlags(all[idx], newestTime(all))
  },

  createInquiry(input: NewInquiry): Post {
    const all = load()
    const nextId = all.reduce((max, p) => Math.max(max, p.id), 0) + 1
    const now = new Date()
    const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')}`
    const post: Post = {
      id: nextId,
      board: 'inquiry',
      category: '문의',
      title: input.title,
      content: input.content,
      author: input.author || '익명',
      pinned: false,
      views: 0,
      createdAt,
      answered: false,
      answer: null,
    }
    save([post, ...all])
    return withFlags(post, newestTime([post, ...all]))
  },

  /** 데모 초기화용 (개발 콘솔에서 호출 가능) */
  reset() {
    save([...SEED_POSTS])
  },
}
