import * as z from 'zod';
import errorMessages from '../../messages/error.messages';

export const Cart = z.object({
  id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  customer_id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  created_at: z.date({ message: errorMessages.invalid('Date') }),
  updated_at: z.date({ message: errorMessages.invalid('Date') })
});

export type Cart = z.infer<typeof Cart>;
