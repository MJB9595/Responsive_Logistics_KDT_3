import { Link } from 'react-router-dom'
import { Snowflake } from '../components/icons'

export default function NotFoundPage() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-slate-50 px-6 py-20">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-sky-700 text-white shadow-lg shadow-sky-500/30">
          <Snowflake className="h-8 w-8" />
        </span>
        <p className="mt-8 text-[64px] font-extrabold leading-none text-sky-900">404</p>
        <h1 className="mt-3 text-[22px] font-bold text-slate-800">페이지를 찾을 수 없습니다</h1>
        <p className="mt-2 text-[15px] text-slate-500">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 px-7 py-3 text-[15px] font-semibold text-white shadow-md shadow-sky-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  )
}
