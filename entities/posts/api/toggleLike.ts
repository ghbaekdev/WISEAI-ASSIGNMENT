export const toggleLike = async (postId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // 로컬 상태 업데이트
  return { success: true };
};
