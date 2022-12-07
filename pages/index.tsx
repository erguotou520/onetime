import { useCallback, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import CopyBtn from '../components/CopyBtn'
import { IconLoading } from '../components/icons'

export default function Home() {
  const [tab, setTab] = useState('msg')
  const [msg, setMsg] = useState('')
  const [file, setFile] = useState<File>()
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = useCallback(async () => {
    if (tab === 'msg') {
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
    } else {
      if (!file) {
        return alert('Please choose your file to share')
      }
      setLoading(true)
      const fd = new FormData()
      fd.append('file', file)
      const ret = await fetch('/api/upload', {
        method: 'post',
        body: fd,
      }).then((res) => res.json())
      const url = `${window.location.origin}/file/${ret.key}`
      setUrl(url)
      setLoading(false)
    }
  }, [file, msg, tab])

  return (
    <div className="center">
      <h1>One-time share</h1>
      <div className="flex-2center">
        <label>
          <input
            name="tab"
            value="msg"
            checked={tab === 'msg'}
            type="radio"
            onChange={(e) => setTab(e.target.checked ? 'msg' : 'file')}
          />
          <span>Message</span>
        </label>
        <label className="ml-2">
          <input
            name="tab"
            value="file"
            checked={tab === 'file'}
            type="radio"
            onChange={(e) => setTab(e.target.checked ? 'file' : 'msg')}
          />
          <span>File</span>
        </label>
      </div>
      <div className="flex-2center mt-2 w-content">
        {tab === 'msg' ? (
          <input
            className="flex-1 input"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="The message you want to share"
          />
        ) : (
          <input className="flex-1 input" type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        )}
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
            {/* {url && <canvas id="qrcode" className="h-32 mt-2 w-32 center" />} */}
            <div className="bg-white mt-2 p-2 center" style={{
              display: 'inline-block'
            }}>
              <QRCodeSVG value={url} width={128} height={128} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
