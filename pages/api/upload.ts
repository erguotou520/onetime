// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { messageDB, storage } from './_deta'
import formidable from 'formidable'
import { MessageItem } from './types';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  const file = await new Promise<formidable.File | null>((resolve) => {
    form.parse(req, async function (err, fields, files) {
      if (!err) {
        const _files = Object.values(files)[0]
        if (Array.isArray(_files)) {
          resolve(_files[0])
        } else {
          resolve(_files)
        }
      }
      return null
    })
  })
  if (!file) {
    return res.status(400).send({ err: 'No file selected' })
  }
  const randomName = `${+new Date()}_${Math.random().toString(36).substring(2)}`
  
  try {
    const contentType = file.mimetype || undefined
    const fileName = await storage.put(`${randomName}/${file.originalFilename}`, { path: file.filepath, contentType })
    const msg: MessageItem = {
      type: 'file',
      fileName,
      contentType,
      createdAt: (new Date()).toISOString()
    }
    const ret = await messageDB.put(msg)
    res.status(200).json({ key: ret?.key })
  } catch (error) {
    res.status(500).end()
  }
}
