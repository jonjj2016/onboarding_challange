import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  isCentered?: boolean;
}

const sizeMap = { small: 20, medium: 40, large: 60 } as const;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Loading({ size = 'medium', isCentered = false }: LoadingProps) {
  const spinner = <CircularProgress size={sizeMap[size]} />;
  if (isCentered) {
    return <Wrapper style={{ minHeight: '100vh' }}>{spinner}</Wrapper>;
  }
  return spinner;
}
