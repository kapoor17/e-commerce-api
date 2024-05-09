import * as z from 'zod';
import errorMessages from '../../messages/error.messages';

export const Address = z.object({
  id: z.string().uuid({ message: errorMessages.invalid('UUID') }),
  street: z
    .string()
    .min(5, { message: errorMessages.min('Street', 5) })
    .max(50, { message: errorMessages.max('Street', 50) }),
  city: z
    .string()
    .min(5, { message: errorMessages.min('City', 5) })
    .max(50, { message: errorMessages.max('City', 50) }),
  state: z.string().length(2, { message: errorMessages.length('State', 2) }),
  country: z.string().length(2, { message: errorMessages.length('Country', 2) })
});

export type Address = z.infer<typeof Address>;
