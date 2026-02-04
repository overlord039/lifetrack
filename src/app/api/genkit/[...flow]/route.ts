'use server';

import { ai } from '@/ai/genkit';
import { nextHandler } from '@genkit-ai/next';
import '@/ai/flows/generate-financial-insights';

export const POST = nextHandler(ai);
