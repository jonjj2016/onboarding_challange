import * as yup from 'yup';

import type { ContentEditFormValues } from './content-edit.types';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export const contentEditSchema: yup.ObjectSchema<ContentEditFormValues> = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(1, 'Title is required')
    .max(120, 'Title must be at most 120 characters'),

  slug: yup
    .string()
    .required('Slug is required')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens'),

  body: yup
    .string()
    .required('Body is required')
    .test('min-length', 'Body must be at least 50 characters', (val) => {
      if (!val) return false;
      return stripHtml(val).length >= 50;
    }),

  authorId: yup.string().required('Author is required'),
});
