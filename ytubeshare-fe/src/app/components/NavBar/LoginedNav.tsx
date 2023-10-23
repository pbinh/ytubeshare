import * as React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Flex, Input, Row, Space, Typography } from 'antd';


export const LoginedNav = ({ email, onShareBtnClicked, onLogoutBtnClicked }) => {
  const style = { width: 68 }

  return (
    <Row style={{ height: '100%', paddingRight: 10 }} gutter={9} align={'middle'} justify={'end'}>
      <Col xs={0} sm={16} md={16} lg={18} xl={18} xxl={18}>
        <div className='flex-center-end'>
          <p className='one-line-ellipsis'>{email}</p>
        </div>
      </Col>
      <Col className='flex-center-end' xs={24} sm={8} md={8} lg={6} xl={6} xxl={6}>
        <Button size='small' onClick={() => onShareBtnClicked()} style={{ ...style, fontWeight: 800, marginRight: 6 }} type="primary">Share</Button>
        <Button size='small' onClick={() => onLogoutBtnClicked()} style={style} type="primary">Logout</Button>
      </Col>
    </Row>
  );
}

