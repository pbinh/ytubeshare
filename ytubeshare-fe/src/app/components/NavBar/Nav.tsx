import * as React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space } from 'antd';


export const Nav = ({ onLoginRegisterBtnClicked }) => {
  const style = { width: '100%', height: '100%' }
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <Row style={style} gutter={9}>
      <Col xs={0} sm={16} md={18} lg={18}>
        <div className='flex-center-end'>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" prefix={<UserOutlined />} />
          <Input.Password style={{marginLeft: 10}} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        </div>
      </Col>
      <Col xs={24} sm={8} md={6} lg={6} className='flex-center-end'>
        <Button onClick={() => onLoginRegisterBtnClicked(username, password)} type="primary">Login / Register</Button>
      </Col>
    </Row>
  );
}

