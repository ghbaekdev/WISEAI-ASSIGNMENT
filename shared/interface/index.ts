export interface ListRequest {
  page: number;
  limit: number;
}

export type InfiniteQueryData<T> = {
  pages: T[][];
  pageParams: unknown[];
};
