export enum SortBy {
  OldestPosts = 'SORT_BY.OLDEST_POSTS',
  NewestPosts = 'SORT_BY.NEWEST_POSTS',
  MostLikes = 'SORT_BY.MOST_LIKES',
  MostDislikes = 'SORT_BY.MOST_DISLIKES',
  MostComments = 'SORT_BY.MOST_COMMENTS',
}

export const SortByRequest: Record<
  SortBy,
  {
    orderByField: string;
    orderByDirection: 'desc' | 'asc';
  }
> = {
  [SortBy.OldestPosts]: { orderByField: 'createdAt', orderByDirection: 'desc' },
  [SortBy.NewestPosts]: { orderByField: 'createdAt', orderByDirection: 'asc' },
  [SortBy.MostLikes]: { orderByField: 'likesCount', orderByDirection: 'desc' },
  [SortBy.MostDislikes]: {
    orderByField: 'dislikesCount',
    orderByDirection: 'desc',
  },
  [SortBy.MostComments]: {
    orderByField: 'commentsCount',
    orderByDirection: 'desc',
  },
};
