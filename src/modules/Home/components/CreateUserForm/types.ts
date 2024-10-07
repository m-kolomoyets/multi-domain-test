import { z } from 'zod';
import { createUserSchema } from './schemas';

export type CreateUserSchema = z.infer<typeof createUserSchema>;
