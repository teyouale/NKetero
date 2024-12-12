import { z } from 'zod';

export const roleSchema = z.enum(['Client', 'Business', 'VirtualAssistant']);
