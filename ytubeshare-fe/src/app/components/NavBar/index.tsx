import * as React from 'react';
import styled from 'styled-components/macro';
import { Logo } from './Logo';
import { StyleConstants } from 'styles/StyleConstants';
import { Nav } from './Nav';
import { PageWrapper } from '../PageWrapper';
import { useSelector } from 'react-redux';
import { LoginedNav } from './LoginedNav';
import { Col, Row } from 'antd';

export function NavBar({ onLoginRegisterBtnClicked, onShareBtnClicked, onLogoutBtnClicked }) {
  const isLogined = useSelector<any>(state => state?.userData?.auth_token)
  const email = useSelector<any>(state => state?.userData?.email)

  return (
    <Wrapper className='menu-container'>
      <Row className='menu-bar'>
        <Col xs={8} sm={8} md={12}>
          <Logo />
        </Col>
        <Col xs={16} sm={16} md={12}>
          {
            !isLogined
              ? <Nav onLoginRegisterBtnClicked={onLoginRegisterBtnClicked} />
              : <LoginedNav email={email} onLogoutBtnClicked={onLogoutBtnClicked} onShareBtnClicked={onShareBtnClicked} />
          }
        </Col>
      </Row>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  box-shadow: 0 1px 0 0 ${p => p.theme.borderLight};
  height: ${StyleConstants.NAV_BAR_HEIGHT};
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${p => p.theme.background};
  z-index: 2;

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${p =>
      p.theme.background.replace(
        /rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/,
        'rgba$1,0.75)',
      )};
  }

  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
