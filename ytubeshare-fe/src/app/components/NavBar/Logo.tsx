import { Col, Row } from 'antd';
import * as React from 'react';
import styled from 'styled-components/macro';
import './style.scss'

export function Logo() {
  return (
    <Row style={{height: '100%', paddingLeft: 10}} align={'middle'}>
      <Col>
        <Title>Remitano</Title>
      </Col>
      <Col xs={0}>
        <Description>Youtube Sharing Website</Description>
      </Col>
    </Row>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.25rem;
  color: ${p => p.theme.text};
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: ${p => p.theme.textSecondary};
  font-weight: normal;
`;
