import React from 'react';
import styled, { createGlobalStyle, css, keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const globalRules = Array.from({ length: 300 }, (_, i) => `
  .g-${i} {
    margin: ${i % 8}px;
    padding: ${(i * 2) % 10}px;
    border-radius: ${i % 6}px;
    color: hsl(${(i * 13) % 360}, 70%, 45%);
    background: linear-gradient(
      120deg,
      hsl(${(i * 7) % 360}, 70%, 95%),
      hsl(${(i * 9) % 360}, 70%, 88%)
    );
  }
`).join('\n');

const GlobalStyle = createGlobalStyle`
  body { font-family: Arial, sans-serif; }
  ${globalRules}
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
  margin: 2px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;

  ${(props) => props.$active && css`
    border-color: #0b6;
    box-shadow: 0 0 0 1px #0b6;
  `}
`;

const Dot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: ${(props) => props.color};
  animation: ${spin} 1.8s linear infinite;
`;

const Row = ({ index }) => (
  <Card className={`g-${index % 300}`} $active={index % 2 === 0}>
    <span>{`row-${index}`}</span>
    <Dot color={`hsl(${(index * 17) % 360}, 75%, 45%)`} />
  </Card>
);

export const HeavyStyledTree = ({ count = 120 }) => (
  <div data-testid="heavy-root">
    <GlobalStyle />
    {Array.from({ length: count }, (_, i) => <Row key={i} index={i} />)}
  </div>
);
