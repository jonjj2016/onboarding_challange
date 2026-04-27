import React from 'react';
import styled from '@emotion/styled';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Card, IconButton, Typography } from '@mui/material';

interface ProductItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}
// Custom styled components using Emotion
const StyledCard = styled(Card)`
  max-width: 345px;
  border-radius: 16px;
  overflow: hidden;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 120px;
  background-color: #f9f9f9;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const RemoveButton = styled(IconButton)`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px;
  &:hover {
    background: #fff;
    color: #d32f2f;
  }
`;

interface ProductCardProps {
  product: ProductItem;
  onRemove?: (id: string) => void;
  // Drag-and-drop props
  dragOverlay?: boolean;
}

const Content = styled(Box)`
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PriceTag = styled(Typography)`
  font-weight: 700;
  color: #2e7d32; // Success green
  font-size: 1.25rem;
`;

export const ProductCard = ({ product, onRemove, dragOverlay }: ProductCardProps) => {
  const { name, price, imageUrl, id } = product;

  return (
    <StyledCard elevation={dragOverlay ? 8 : 0}>
      {onRemove && (
        <RemoveButton
          size="small"
          onClick={(e) => {
            e.stopPropagation(); // Prevent drag start when clicking remove
            onRemove(id);
          }}
        >
          <CloseIcon fontSize="small" />
        </RemoveButton>
      )}

      <ImageWrapper>
        <img src={imageUrl} alt={name} />
      </ImageWrapper>

      <Content>
        <Typography variant="body2" fontWeight={600} noWrap>
          {name}
        </Typography>
        <PriceTag>${price.toFixed(2)}</PriceTag>
      </Content>
    </StyledCard>
  );
};
