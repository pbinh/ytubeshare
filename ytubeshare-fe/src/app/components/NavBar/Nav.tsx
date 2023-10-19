import * as React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space } from 'antd';


export const Nav = ({onLoginRegisterBtnClicked}) => {
  const style = { width: '100%'}
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <Row gutter={9}>
      <Col span={7}>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" prefix={<UserOutlined />} />
      </Col>
      <Col span={7}>
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      </Col>
      <Col span={10}>
        <Button onClick={() => onLoginRegisterBtnClicked(username, password)} style={style} type="primary">Login / Register</Button>
      </Col>
    </Row>
  );
}

