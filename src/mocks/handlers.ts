import { http, HttpResponse, delay } from 'msw'
import { boardDb } from './db'
import type { BoardFilter, NewInquiry, PostCategory } from '../types/board'

// 고객센터 게시판 REST API (목). 실제 서버 도입 시 동일한 계약으로 교체 가능.
//   GET  /api/posts?board=&category=&q=&page=&pageSize=
//   GET  /api/posts/:id
//   POST /api/posts            (1:1 문의 작성)

export const handlers = [
  http.get('/api/posts', async ({ request }) => {
    await delay(300) // 로딩 상태 데모용 지연
    const url = new URL(request.url)
    const board = (url.searchParams.get('board') ?? 'all') as BoardFilter
    const category = (url.searchParams.get('category') as PostCategory | null) ?? undefined
    const q = url.searchParams.get('q') ?? undefined
    const page = Number(url.searchParams.get('page') ?? '1')
    const pageSize = Number(url.searchParams.get('pageSize') ?? '10')

    const result = boardDb.list({ board, category, q, page, pageSize })
    return HttpResponse.json(result)
  }),

  http.get('/api/posts/:id', async ({ params }) => {
    await delay(250)
    const post = boardDb.get(Number(params.id))
    if (!post) {
      return HttpResponse.json({ message: '게시글을 찾을 수 없습니다.' }, { status: 404 })
    }
    return HttpResponse.json(post)
  }),

  http.post('/api/posts', async ({ request }) => {
    await delay(500)
    const body = (await request.json()) as NewInquiry
    if (!body?.title?.trim() || !body?.content?.trim()) {
      return HttpResponse.json({ message: '제목과 내용을 입력해 주세요.' }, { status: 400 })
    }
    const post = boardDb.createInquiry(body)
    return HttpResponse.json(post, { status: 201 })
  }),
]
