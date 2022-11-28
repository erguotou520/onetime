import { SVGProps, useState } from 'react'
import { IconCopy } from '../icons'
import copy from 'copy-to-clipboard'

type CopyBtnProps = {
  content: string
} & SVGProps<SVGSVGElement>

const CopyBtn = ({ content, className, ...rest }: CopyBtnProps) => {
  const [show, setShow] = useState(false)
  const onClick = () => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 1500)
    copy(content, { message: 'Copied!' })
  }

  return (
    <div className={`copy-btn ${className ?? ''}`} onClick={onClick} title="Copy!">
      <IconCopy {...rest} />
      {show && <div className="copy-tip">Copied!</div>}
    </div>
  )
}

export default CopyBtn
