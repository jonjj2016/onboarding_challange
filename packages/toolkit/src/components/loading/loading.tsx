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
  min-height: 100vh;
`;

export const Loading = ({ size = 'medium', isCentered = false }: LoadingProps) => {
  const spinner = <CircularProgress size={sizeMap[size]} />;
  return isCentered ? <Wrapper data-testid="loading-centered">{spinner}</Wrapper> : spinner;
};
