import styled from '@emotion/styled';

interface FlexProps {
  justifyContent?: 'flex-start' | 'flex-end';
}
export const Flex = styled.div<FlexProps>`
  display: flex;
  justify-content: ${props => props.justifyContent};
`;
