import * as z from 'zod';
import errorMessages from '../../messages/error.messages';

export const Order = z.object({
  id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  status: z
    .literal('created')
    .or(
      z
        .literal('payed')
        .or(
          z
            .literal('confirmed')
            .or(
              z
                .literal('dispatched')
                .or(
                  z
                    .literal('shipped')
                    .or(
                      z
                        .literal('received')
                        .or(z.literal('returned').or(z.literal('refunded')))
                    )
                )
            )
        )
    ),
  payment_method: z.literal(5, { message: errorMessages.min('Status', 5) }),
  total_amount: z
    .number()
    .min(0, { message: errorMessages.min('Total Amount', 0) }),
  customer_id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  created_at: z.date({ message: errorMessages.invalid('Date') }),
  updated_at: z.date({ message: errorMessages.invalid('Date') })
});

export type Order = z.infer<typeof Order>;
