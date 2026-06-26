# ColdChain WMS · 스마트 신선 물류 시스템 (랜딩 페이지)

Figma "편집테스트용" 레이아웃을 **React + TypeScript + Tailwind CSS v4**로 구현한 홈페이지입니다.
원본 디자인은 그대로 유지하면서, 스크롤·호버·실시간 데이터 느낌의 **애니메이션 기믹**을 더해 생동감과 사용자 행동 유도를 강화했습니다.

## 실행

```bash
npm install
npm run dev      # 개발 서버 (Vite)
npm run build    # 타입체크 + 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 구조

```
src/
├─ App.tsx                # 페이지 조립 + 스크롤 진행바 + 맨 위로 버튼
├─ index.css             # Tailwind v4 import, 디자인 토큰, 커스텀 keyframes
├─ hooks/
│  ├─ useInView.ts       # IntersectionObserver 기반 스크롤 등장 트리거
│  └─ useCountUp.ts      # 숫자 카운트업 애니메이션 (rAF, easeOutExpo)
└─ components/
   ├─ icons.tsx          # lucide 스타일 인라인 SVG 아이콘 (무의존)
   ├─ Reveal.tsx         # 스크롤 시 페이드/슬라이드 등장 래퍼
   ├─ Navbar.tsx         # 스크롤 반응형 내비게이션
   ├─ Hero.tsx           # 3-슬라이드 캐러셀 (Ken Burns + 카운트업)
   ├─ About.tsx          # 회사소개 4카드
   ├─ Service.tsx        # 서비스 소개 + 냉동창고 온도 위젯
   ├─ Monitoring.tsx     # 실시간 대시보드 (포인터 틸트 + 그래프 성장)
   ├─ CTA.tsx            # 도입 유도 섹션
   └─ Footer.tsx         # 푸터
```

## 추가한 애니메이션 / 인터랙션

- **글로벌**: 상단 스크롤 진행 게이지, 우하단 "맨 위로" 페이드 버튼, `prefers-reduced-motion` 존중
- **Navbar**: 스크롤 시 높이 축소 + 반투명 블러 + 그림자, 링크 언더라인 그로우, 로고 회전, 모바일 햄버거 메뉴
- **Hero**: 배경 3장 크로스페이드 캐러셀 + Ken Burns 줌, 텍스트 순차 등장(stagger), 통계 카운트업, 뱃지 펄스, 슬라이드 인디케이터(클릭/호버 일시정지), 스크롤 큐
- **About**: 카드 순차 등장, 호버 시 상단 액센트 바·아이콘 팝·화살표 슬라이드
- **Service**: 온도 위젯 플로팅 + 온도/수량 카운트업 + 게이지 성장, 라이브 점 펄스, 기능 카드 호버 리프트
- **Monitoring**: 대시보드 포인터 틸트(3D), KPI 카운트업, 막대 그래프 스크롤 시 성장, LIVE 점 펄스
- **CTA**: 일러스트 플로팅, 눈송이 아이콘 글로우 펄스 링, 배경 그라데이션 팬, 신뢰 뱃지 순차 등장

## 디자인 토큰

Figma 원본이 Tailwind 기본 `sky` / `slate` 팔레트를 그대로 사용하고 있어 기본 유틸리티로 매칭했고,
폰트는 한글 가독성을 위해 **Pretendard**(+ Inter 폴백)를 사용했습니다.

> 참고: 원본 Figma 기준으로 상단 로고는 "Fresh Chain", 푸터 로고는 "ColdChain"으로 표기가 서로 다릅니다.
> 디자인을 수정하지 말라는 요청에 따라 원본 그대로 두었습니다. 통일이 필요하면 알려주세요.
