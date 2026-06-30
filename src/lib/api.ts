import type {
  NewInquiry,
  Post,
  PostListParams,
  PostListResponse,
} from '../types/board'

// 고객센터 게시판 API 클라이언트. MSW가 가로채는 /api 엔드포인트를 호출한다.
// 실제 서버 도입 시 이 파일만 baseURL/인증 헤더 추가로 교체하면 된다.

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null
    throw new Error(body?.message ?? `요청에 실패했습니다 (${res.status})`)
  }
  return res.json() as Promise<T>
}

export function fetchPosts(params: PostListParams): Promise<PostListResponse> {
  const sp = new URLSearchParams()
  if (params.board && params.board !== 'all') sp.set('board', params.board)
  if (params.category) sp.set('category', params.category)
  if (params.q) sp.set('q', params.q)
  sp.set('page', String(params.page ?? 1))
  sp.set('pageSize', String(params.pageSize ?? 10))
  return request<PostListResponse>(`/api/posts?${sp.toString()}`)
}

export function fetchPost(id: number): Promise<Post> {
  return request<Post>(`/api/posts/${id}`)
}

export function createInquiry(input: NewInquiry): Promise<Post> {
  return request<Post>('/api/posts', {
    method: 'POST',
    body: JSON.stringify(input),
  })
}
