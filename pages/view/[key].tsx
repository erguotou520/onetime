import { useRouter } from 'next/router'
import { useState } from 'react'
import CopyBtn from '../../components/CopyBtn'
import { IconLoading } from '../../components/icons'

export default function View() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onShow = async () => {
    setLoading(true)
    const resp = await fetch(`/api/view?key=${router.query.key}`)
    if (resp.ok) {
      const json = await resp.json()
      setMessage(json.message)
    } else {
      setError(resp.status.toString())
    }
    setLoading(false)
  }

  return (
    <div className="w-content center">
      <h1>One-time share</h1>
      <div className="notice">Note: The message can only show once!</div>

      {loading ? (
        <IconLoading width="3em" height="3em" />
      ) : error ? (
        <pre>{error}</pre>
      ) : message ? (
        <>
          <div className="left f-default">Shared message bellow↓</div>
          <div className="flex-2center mt-2">
            <input className="flex-1 input" readOnly value={message} />
            <CopyBtn content={message} className="ml-2" width="1.5em" height="1.5em" />
          </div>
        </>
      ) : (
        <button className="btn show" onClick={onShow}>
          Show me!
        </button>
      )}
    </div>
  )
}
