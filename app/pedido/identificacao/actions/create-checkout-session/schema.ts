import {z} from 'zod'

export const createCheckoutSessionSchema = z.string()

export type TcreateCheckoutSessionSchema = z.infer<typeof createCheckoutSessionSchema>