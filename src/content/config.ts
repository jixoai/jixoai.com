import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Jixo AI'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string().nullable(),
    url: z.string().url(),
    homepage: z.string().url().nullable(),
    stars: z.number().default(0),
    forks: z.number().default(0),
    language: z.string().nullable(),
    topics: z.array(z.string()).default([]),
    logo: z.string().optional(),
    archived: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const collections = { blog, docs, projects };
