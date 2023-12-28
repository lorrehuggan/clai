import { z } from 'zod';

export interface TipTapNode {
  type: string;
  attrs?: Record<string, any>;
  content?: TipTapNode[];
  marks?: TipTapMark[];
  text?: string;
}

export interface TipTapMark {
  type: string;
  attrs?: Record<string, any>;
}

export const tipTapMarkSchema = z.object({
  type: z.string(),
  attrs: z.record(z.any()).optional(),
});

export const tipTapNodeSchema: z.ZodSchema<TipTapNode> = z.lazy(() =>
  z.object({
    type: z.string(),
    attrs: z.record(z.any()).optional(),
    content: z.array(tipTapNodeSchema).optional(),
    marks: z.array(tipTapMarkSchema).optional(),
    text: z.string().optional(),
  })
);
