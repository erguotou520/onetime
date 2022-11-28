import { useCallback, useState } from 'react'
import CopyBtn from '../components/CopyBtn'
import { IconLoading } from '../components/icons'

export default function Home() {
  const [msg, setMsg] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    if (!msg) {
      return alert('Please input the message to share')
    }
    setLoading(true)
    const ret = await fetch('/api/generate', {
      method: 'post',
      body: JSON.stringify({ msg }),
    }).then((res) => res.json())
    setUrl(`${window.location.origin}/view/${ret.key}`)
    setLoading(false)
  }, [msg])

  return (
    <div className="center">
      <h1>One-time share</h1>
      <div className="flex-2center w-content">
        <input
          className="flex-1 input"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="The message you want to share"
        />
        <button disabled={loading} className="btn" onClick={onSubmit}>
          Generate share url
        </button>
      </div>
      <div className="mt-12 w-content">
        {loading ? (
          <IconLoading width="3em" height="3em" />
        ) : url ? (
          <>
            <div className="left f-default">Copy the following url to share↓</div>
            <div className="flex-2center mt-2">
              <input value={url} className="flex-1 input" readOnly />
              <CopyBtn content={url} className="ml-2" width="1.5em" height="1.5em" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
