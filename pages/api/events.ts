// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { CreateEventSchema } from '@/services/schemas/createEvent';
import { ZodError } from 'zod';

export const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'POST') {

      let validSchema = CreateEventSchema.safeParse(req.body)
      if (!validSchema.success) {
        console.log("==> Failed to create", validSchema.error.flatten());

        return res.status(500).send({
          error: 'Invalid payload', ...validSchema?.error.flatten()
        })
      }

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
    if (err instanceof ZodError) {
      return res.status(400).json({ err });
    }
    return res.status(500).json({ err });
  }

}
