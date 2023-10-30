import { z } from 'zod';

export const CreateEventSchema = z.object({
	title: z.string().min(3).max(15),
	date: z.string().datetime()
});

