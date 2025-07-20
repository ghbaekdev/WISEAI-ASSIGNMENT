import z from 'zod';

export const MAX_LENGTH = 280;
export const MAX_IMAGES = 4;

export const postFormSchema = z.object({
  content: z
    .string()
    .min(1, { message: '내용을 입력하세요.' })
    .max(MAX_LENGTH, { message: '280자 이내로 입력하세요.' }),
  images: z.array(z.unknown()).optional(),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
