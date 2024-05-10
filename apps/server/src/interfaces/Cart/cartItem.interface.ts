import * as z from 'zod';
import errorMessages from '../../messages/error.messages';

export const CartItem = z.object({
  id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  quantity: z
    .number()
    .min(0, { message: errorMessages.min('Quantity', 0) })
    .max(5, { message: errorMessages.max('Quantity', 5) }),
  cart_id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  product_id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  created_at: z.date({ message: errorMessages.invalid('Date') }),
  updated_at: z.date({ message: errorMessages.invalid('Date') })
});

export type CartItem = z.infer<typeof CartItem>;
