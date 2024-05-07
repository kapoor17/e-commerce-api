import * as z from 'zod';
import errorMessages from '../../messages/error.messages';

export const OrderItem = z.object({
  id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  quantity: z
    .string()
    .min(1, { message: errorMessages.min('Quantity', 1) })
    .max(5, { message: errorMessages.min('Quantity', 5) }),
  total_amount: z.string(),
  order_id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  product_id: z.string().uuid({ message: errorMessages.invalid('UUID') })
});

export type OrderItem = z.infer<typeof OrderItem>;
