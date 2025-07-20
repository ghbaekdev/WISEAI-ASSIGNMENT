'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  MAX_IMAGES,
  postFormSchema,
  PostFormValues,
} from '../lib/postFormSchema';
import { Post } from '@/entities/posts/types';
import { currentUser } from '@/shared/config/mockUser';
import { useQueryClient } from '@tanstack/react-query';
import { InfiniteQueryData } from '@/shared/interface';
import { useRouter } from 'next/navigation';
import useToast from '@/shared/model/useToast';

export const usePostForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const { successToast, errorToast } = useToast();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
    defaultValues: { content: '', images: [] },
    mode: 'onChange',
  });

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArr = Array.from(files).slice(0, MAX_IMAGES - images.length);
    const newPreviews = fileArr.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...fileArr]);
    setPreviews((prev) => [...prev, ...newPreviews]);
    form.setValue('images', [...images, ...fileArr]);
  };

  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
    form.setValue(
      'images',
      images.filter((_, i) => i !== idx)
    );
  };

  const handleAddImageClick = () => {
    if (images.length >= MAX_IMAGES) return;
    fileInputRef.current?.click();
  };

  const onSubmit = async (values: PostFormValues) => {
    const newPost: Post = {
      id: Date.now(),
      author: {
        name: currentUser.name,
        username: currentUser.username,
        profileImage: currentUser.profileImage,
        verified: currentUser.verified,
      },
      content: values.content,
      images: (values.images || []).map((file) =>
        file instanceof File ? URL.createObjectURL(file) : ''
      ),
      createdAt: new Date().toISOString(),
      likes: 0,
      retweets: 0,
      comments: 0,
      isLiked: false,
      isRetweeted: false,
    };

    try {
      await queryClient.setQueryData(
        ['posts', { page: 1, limit: 10 }],
        (oldData: InfiniteQueryData<Post>) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: [[newPost, ...oldData.pages[0]], ...oldData.pages.slice(1)],
          };
        }
      );

      successToast('포스트가 작성되었습니다.');

      router.back();
    } catch (error) {
      console.error(error);
      errorToast('포스트 작성에 실패했습니다.');
    }
  };

  return {
    form,
    images,
    previews,
    handleFiles,
    handleRemoveImage,
    handleAddImageClick,
    onSubmit,
    fileInputRef,
  };
};
