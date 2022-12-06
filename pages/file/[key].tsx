import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import CopyBtn from '../../components/CopyBtn'
import { IconLoading } from '../../components/icons'
import { messageDB } from '../api/_deta'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const msg = await messageDB.get(context.params!.key as string)
  if (msg?.type === 'file') {
    return {
      props: {
        type: msg.type,
        fileName: msg.fileName,
      },
    }
  }
  return { props: {} }
}

export default function Download({ type, fileName }: { type?: 'file'; fileName?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<number>()

  const download = async () => {
    setLoading(true)
    const resp = await fetch(`/api/download/?key=${router.query.key}`)
    if (resp.status === 200){
      const fileName = resp.headers.get('Content-Disposition')?.split('filename=')?.pop()
      const url = URL.createObjectURL(await resp.blob())
      const link = document.createElement('a')
      link.href = url
      link.download = fileName ?? 'download'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } else {
      setError(resp.status)
    }
    setLoading(false)
  }

  return (
    <div className="w-content center">
      <h1>One-time share</h1>
      <div className="notice">Note: The file can only download once!</div>

      {!type ? (
        <pre>404</pre>
      ) : error ? (
        <pre>{error}</pre>
      ) : (
        <>
          <div className="left f-default">Shared file bellow↓</div>
          <div className="flex-2center mt-2">
            <input className="flex-1 input" readOnly value={fileName!.split('/').pop()} />
            <button className="flex-2center btn" disabled={loading} onClick={download}>
              {loading && <IconLoading className='mr-1' />}Download
            </button>
          </div>
        </>
      )}
    </div>
  )
}
