import * as z from 'zod';
import errorMessages from '../../messages/error.messages'

export const Brand = z.object({
    id: z.string().uuid({message: errorMessages.invalid('UUID')}),
    name: z.string().min(5, {message: errorMessages.min('Name', 5)}).max(50, {message: errorMessages.max('Name', 50)}),
    description: z.string().min(20, {message: errorMessages.min('Description', 20)}),
    created_at: z.date({message: errorMessages.invalid('Date')}),
    updated_at: z.date({message: errorMessages.invalid('Date')})
})

export type Brand = z.infer<typeof Brand>