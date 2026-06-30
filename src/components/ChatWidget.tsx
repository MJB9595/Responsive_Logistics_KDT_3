import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, Snowflake } from './icons'

interface Msg {
  id: number
  from: 'bot' | 'user'
  text: string
}

const GREETING = '안녕하세요! Fresh Chain WMS입니다 ❄️\n무엇을 도와드릴까요?'
const QUICK = ['도입 문의하기', '가격이 궁금해요', '데모 신청']
const BOT_REPLY =
  '문의 감사합니다! 🙌 전담 매니저가 곧 연결됩니다.\n빠른 상담을 원하시면 상단의 "도입 문의하기"를 이용해 주세요.'

/**
 * Floating chat widget. The button is stacked above the scroll-to-top button
 * (it slides up to make room when `liftUp` becomes true). Clicking toggles a
 * compact chat popup with quick replies and a canned auto-reply.
 */
export default function ChatWidget({ liftUp }: { liftUp: boolean }) {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: 'bot', text: GREETING }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing, open])

  const send = (raw: string) => {
    const text = raw.trim()
    if (!text) return
    setMsgs((m) => [...m, { id: nextId.current++, from: 'user', text }])
    setInput('')
    setTyping(true)
    window.setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: nextId.current++, from: 'bot', text: BOT_REPLY }])
    }, 900)
  }

  const showQuick = msgs.length === 1 && !typing

  return (
    <>
      {/* popup panel */}
      <div
        role="dialog"
        aria-label="채팅 상담"
        aria-hidden={!open}
        className={`fixed right-7 z-50 w-[330px] max-w-[calc(100vw-2rem)] origin-bottom-right overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-sky-900/20 transition-all duration-300 ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-3 scale-95 opacity-0'
        }`}
        style={{ bottom: liftUp ? 152 : 88 }}
      >
        {/* header */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-sky-500 to-sky-700 p-4 text-white">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white/20">
            <Snowflake className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <b className="block text-[15px] font-bold">Fresh Chain WMS 상담</b>
            <span className="flex items-center gap-1.5 text-[12px] text-sky-100">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
              </span>
              보통 1분 내 응답
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="채팅 닫기"
            className="ml-auto grid h-8 w-8 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* messages */}
        <div className="flex h-72 flex-col gap-2.5 overflow-y-auto bg-slate-50 p-4">
          {msgs.map((m) => (
            <div key={m.id} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <p
                className={`max-w-[80%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  m.from === 'user'
                    ? 'rounded-br-sm bg-sky-500 text-white'
                    : 'rounded-bl-sm bg-white text-slate-700 shadow-sm'
                }`}
              >
                {m.text}
              </p>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <p className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-sm">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
              </p>
            </div>
          )}

          {showQuick && (
            <div className="mt-1 flex flex-wrap gap-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="rounded-full border border-sky-200 bg-white px-3 py-1.5 text-[12px] font-medium text-sky-600 transition-colors hover:bg-sky-50"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* input */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 border-t border-slate-100 bg-white p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="min-w-0 flex-1 rounded-full bg-slate-100 px-4 py-2.5 text-[13px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-sky-300"
          />
          <button
            type="submit"
            aria-label="전송"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sky-500 text-white transition-colors hover:bg-sky-600"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* chat button (stacked above the scroll-to-top button) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? '채팅 닫기' : '채팅 상담 열기'}
        className="group fixed right-7 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-b from-sky-400 to-sky-500 text-white shadow-[0_6px_20px_rgba(56,189,248,0.5)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(56,189,248,0.65)]"
        style={{ bottom: liftUp ? 92 : 28 }}
      >
        <span className="transition-transform duration-300 group-hover:scale-110">
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </span>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-400" />
        )}
      </button>
    </>
  )
}
