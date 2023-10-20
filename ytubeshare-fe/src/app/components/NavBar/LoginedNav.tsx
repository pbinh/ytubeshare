import * as React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Typography } from 'antd';


export const LoginedNav = ({email, onShareBtnClicked, onLogoutBtnClicked}) => {
  const style = { width: 68}

  return (
    <Row gutter={9} align={'middle'} justify={'center'}>
      <Col span={12}>
        <p style={{color: 'white'}}>{email}</p>
      </Col>
      <Col span={6}>
        <Button size='small' onClick={() => onShareBtnClicked()} style={{...style, fontWeight: 800}} type="primary">Share</Button>
      </Col>
      <Col span={6}>
        <Button size='small' onClick={() => onLogoutBtnClicked()} style={style} type="primary">Logout</Button>
      </Col>
    </Row>
  );
}

