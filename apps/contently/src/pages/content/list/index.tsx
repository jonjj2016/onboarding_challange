import { Link } from 'react-router-dom';

import { Box, Button, Divider, Pagination, Skeleton, Typography } from '@contently/toolkit';
import { routes } from 'data/routes';
import { ContentCard, ContentFilters, PAGE_SIZE, useContentList } from 'modules/content-list';

const CardSkeleton = () => <Skeleton variant="rounded" height={88} />;

const ContentListPage = () => {
  const {
    contents,
    total,
    isLoading,
    page,
    search,
    status,
    authorId,
    sort,
    setSearch,
    setStatus,
    setAuthorId,
    setSort,
    setPage,
  } = useContentList();

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <Box display="flex" gap={3}>
      <Box width={240} flexShrink={0}>
        <ContentFilters
          search={search}
          status={status}
          authorId={authorId}
          sort={sort}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onAuthorChange={setAuthorId}
          onSortChange={setSort}
        />
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box flex={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight={700}>
            Content
            {!isLoading && (
              <Typography component="span" variant="body2" color="text.secondary" ml={1}>
                ({total} items)
              </Typography>
            )}
          </Typography>
          <Button variant="primary" component={Link} to={routes.contentNew}>
            New content
          </Button>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
          ) : contents.length === 0 ? (
            <Box py={8} textAlign="center">
              <Typography color="text.secondary">
                No content found. Try adjusting your filters.
              </Typography>
            </Box>
          ) : (
            contents.map((content) => <ContentCard key={content.id} content={content} />)
          )}
        </Box>

        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, val) => setPage(val)}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default ContentListPage;
