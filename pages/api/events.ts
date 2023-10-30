// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {

      const { title, date } = req.body
      const result = await prisma.event.create({
        data: {
          title: title,
          date: date,
        },
      })
      res.json({ data: result })
    }
    if (req.method === 'GET') {
      const result = await prisma.event.findMany({
        orderBy: {
          id: 'desc',
        }
      })
      res.json({ data: result })
    }
  } catch (err: any) {
    return res.status(500).json({ err });
  }

}
