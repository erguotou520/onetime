// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MessageItem } from './types'
import { messageDB } from './_deta'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  try {
    const msg: MessageItem = {
      type: 'msg',
      message: body.msg,
      createdAt: (new Date()).toISOString()
    }
    const ret = await messageDB.put(msg)
    res.status(200).json({ key: ret?.key })
  } catch (error) {
    res.status(500)
  }
}
