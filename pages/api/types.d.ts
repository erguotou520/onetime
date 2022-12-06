export type MessageItem = {
  createdAt: string
} & ({
  message: string,
  type: 'msg'
} | {
  fileName: string,
  type: 'file'
  contentType?: string
})