import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { Box, Card, CardActionArea, Chip, Typography } from '@contently/toolkit';
import type { ContentListItem } from './content-list.types';
import { STATUS_CONFIG } from './content-list.types';

interface ContentCardProps {
  content: ContentListItem;
}

const StyledCard = styled(Card)`
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
  }
`;

const formatDate = (iso: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
};

const ContentCard = ({ content }: ContentCardProps) => {
  const navigate = useNavigate();
  const statusConfig = STATUS_CONFIG[content.status as keyof typeof STATUS_CONFIG];
  return (
    <StyledCard variant="outlined">
      <CardActionArea onClick={() => navigate(`/content/edit/${content.id}`)} sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Typography variant="h6" fontWeight={600} fontSize="1rem" flex={1} mr={2}>
            {content.title}
          </Typography>
          <Chip
            label={statusConfig?.label ?? 'Unknown'}
            color={statusConfig?.color ?? 'default'}
            size="small"
          />
        </Box>

        <Box display="flex" gap={3} flexWrap="wrap">
          <Typography variant="body2" color="text.secondary">
            {content.author.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Updated {formatDate(content.updatedAt)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {content.products.length} product{content.products.length !== 1 ? 's' : ''}
          </Typography>
          <Link onClick={(e) => e.stopPropagation()} to={`/content/new?duplicate=${content.id}`}>
            Duplicate
          </Link>
        </Box>
      </CardActionArea>
    </StyledCard>
  );
};
export default ContentCard;
