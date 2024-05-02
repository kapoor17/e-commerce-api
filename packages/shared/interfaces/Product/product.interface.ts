import * as z from 'zod';
import errorMessages from '../../messages/error.messages'

export const Product = z.object({
    id: z.string().uuid({message: errorMessages.invalid('UUID')}),
    name: z.string().min(5, {message: errorMessages.min('Name', 0)}).max(50, {message: errorMessages.max('Name', 50)}),
    description: z.string().min(20, {message: errorMessages.min('Description', 20)}),
    price: z.number().min(0, {message: errorMessages.min('Price', 0)}),
    old_price: z.string().min(0, {message: errorMessages.min('Price', 0)}),
    brand_id: z.string().uuid({message: errorMessages.invalid('UUID')}),
    rating: z.number().min(0, {message: errorMessages.min('Rating', 0)}).max(5, {message: errorMessages.max('Rating', 5)}),
    category: z.string().min(3, {message: errorMessages.min('Category', 3)}).max(100, {message: errorMessages.max('Category', 100)}),
    stock_level: z.number().min(0, {message: errorMessages.min('Stock Level', 0)}),
    image_url: z.string().url({message: errorMessages.invalid('URL')}),
    created_at: z.date({message: errorMessages.invalid('Date')}),
    updated_at: z.date({message: errorMessages.invalid('Date')})
})

export type Product = z.infer<typeof Product>