import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { createInquiry, fetchPost, fetchPosts } from '../lib/api'
import type { NewInquiry, PostListParams } from '../types/board'

export const postKeys = {
  all: ['posts'] as const,
  list: (params: PostListParams) => [...postKeys.all, 'list', params] as const,
  detail: (id: number) => [...postKeys.all, 'detail', id] as const,
}

export function usePosts(params: PostListParams) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => fetchPosts(params),
    placeholderData: keepPreviousData, // 페이지/탭 전환 시 깜빡임 방지
  })
}

export function usePost(id: number) {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => fetchPost(id),
    enabled: Number.isFinite(id) && id > 0,
  })
}

export function useCreateInquiry() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: NewInquiry) => createInquiry(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}
