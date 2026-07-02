import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import BlankPage from './pages/BlankPage'
import SupportPage from './pages/SupportPage'
import SupportNewPage from './pages/SupportNewPage'
import SupportDetailPage from './pages/SupportDetailPage'
import NotFoundPage from './pages/NotFoundPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      // 팀원이 채워넣을 빈 라우트 (홈에서 전체 디자인 참고 가능)
      { path: '/about', element: <AboutPage /> },
      { path: '/service', element: <BlankPage /> },
      { path: '/architecture', element: <BlankPage /> },
      { path: '/monitoring', element: <BlankPage /> },
      { path: '/support', element: <SupportPage /> },
      { path: '/support/new', element: <SupportNewPage /> },
      { path: '/support/:id', element: <SupportDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
