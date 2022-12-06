// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { messageDB, storage } from './_deta'
import { MessageItem } from './types';
import { Readable } from 'stream';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { key } = req.query
  if (key) {
    try {
      const ret = (await messageDB.get(key as string)) as MessageItem
      if (ret && ret.type === 'file') {
        const blob = await storage.get(ret.fileName)

        if (!blob) {
          return res.status(404).end()
        }
        
        res.setHeader('Content-Type', ret.contentType ?? 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename=${ret.fileName.split('/').pop()}`);
        const stream = blob.stream() as unknown as Readable   
        stream.once('end', async () => {
          await messageDB.delete(key as string)
        })
        stream.pipe(res)
      } else {
        res.status(404).end()
      }
    } catch (error) {
      res.status(500).end({ error })
    }
  } else {
    res.status(400).end()
  }
}
