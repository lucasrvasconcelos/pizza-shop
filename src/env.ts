import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_API_DELAY: z.string().transform((value) => value === 'true'),
})

const BASE_URL = import.meta.env.VITE_API_URL
const DELAY = import.meta.env.VITE_DELAY_API

export const env = envSchema.parse({
  VITE_API_URL: BASE_URL,
  VITE_API_DELAY: DELAY,
})
