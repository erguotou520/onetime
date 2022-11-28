// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { messageDB } from './_deta'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key } = req.query
  if (key) {
    try {
      const ret = await messageDB.get(key as string)
      if (ret) {
        await messageDB.delete(key as string)
        res.status(200).json({ message: ret.message })
      } else {
        res.status(404).end()
      }
    } catch (error) {
      res.status(500).end()
    }
  } else {
    res.status(400).end()
  }
}
