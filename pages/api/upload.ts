// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { storage } from './_deta'
import multiparty from 'multiparty'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req)
  const form = new multiparty.Form()
  const files = await new Promise((resolve) => {
    form.parse(req, (err, fields, files) => {
      console.log(err, fields, files)
      resolve(files)
    })
  })
  const randomName = `${+new Date()}_${Math.random().toString(36).substring(2)}`
  console.log(randomName)
  try {
    // const ret = await storage.put(randomName, files[0])
    res.status(200).json({ url: '' })
  } catch (error) {
    res.status(500)
  }
}
