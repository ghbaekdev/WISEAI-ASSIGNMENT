import { X } from 'lucide-react';
import FallbackImage from '@/shared/ui/FallbackImage';
import { Button } from '@/shared/ui/shadcn/button';
import { Form, FormField } from '@/shared/ui/shadcn/form';

import { MAX_IMAGES, MAX_LENGTH } from '../lib/postFormSchema';
import { usePostForm } from '../model/usePostForm';

export const PostForm = () => {
  const {
    form,
    images,
    previews,
    handleFiles,
    handleRemoveImage,
    handleAddImageClick,
    onSubmit,
    fileInputRef,
  } = usePostForm();

  const content = form.watch('content');
  const isOver = content.length > MAX_LENGTH;
  const isDisabled = !content || isOver;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Textarea */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <div>
              <textarea
                {...field}
                rows={5}
                maxLength={MAX_LENGTH}
                placeholder="무슨 일이 일어나고 있나요?"
                className="w-full p-4 bg-transparent border border-gray-300 rounded-lg outline-none resize-none text-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
              />
              <div className="flex justify-end mt-1">
                <span
                  className={`text-sm ${
                    isOver ? 'text-red-500 font-bold' : 'text-gray-400'
                  }`}
                >
                  {content.length}/{MAX_LENGTH}
                </span>
              </div>
            </div>
          )}
        />

        {/* 이미지 첨부 */}
        <div>
          <div className="flex items-center gap-2">
            {/* + 버튼 */}
            <button
              type="button"
              onClick={handleAddImageClick}
              disabled={images.length >= MAX_IMAGES}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 border border-gray-300 text-blue-500 text-2xl disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              +
            </button>
            {/* 썸네일 리스트 */}
            <div className="flex gap-2 overflow-x-auto">
              {previews.map((src, idx) => (
                <div
                  key={idx}
                  className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-300 bg-gray-100"
                >
                  <FallbackImage
                    src={src}
                    alt="preview"
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-0.5 text-gray-500 hover:bg-red-100 hover:text-red-600 shadow"
                    aria-label="이미지 삭제"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            {/* 파일 input (숨김) */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                handleFiles(e.target.files);
                e.target.value = '';
              }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            최대 {MAX_IMAGES}장까지 첨부할 수 있습니다.
          </div>
        </div>

        {/* 제출 버튼 */}
        <Button
          type="submit"
          disabled={isDisabled}
          className="w-full py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          게시하기
        </Button>
      </form>
    </Form>
  );
};
