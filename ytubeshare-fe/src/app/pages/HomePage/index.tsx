import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { UserOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Layout, Menu, Modal, Row, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { onRelogin, onRequestLogin, userLogout } from 'store/UserDataReducer';
import { UserData } from 'types/UserData';
import './style.scss';
const { Header, Content, Footer, Sider } = Layout;
export function HomePage() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [loginButtonText, setLoginButtonText] = React.useState('Login')

  //Initial 
  React.useEffect(() => {
    console.log("Dispatch Relogin")
    dispatch(onRelogin({}))
  }, [])
  
  const appState: any = useSelector(state => state)

  const handleCancel = () => {
    setOpen(false);
  };

  const onLoginRegisterBtnClicked = (username, password) => {
    console.log(username, password)
    setUsername(username)
    setPassword(password)
    setOpen(true)
  }
  const onShareBtnClicked = () => {

  }
  const onLogoutBtnClicked = () => {
    dispatch(userLogout({}))
  }

  const requestLogin = () => {
    console.log("Start request login")
    setLoginButtonText("Attempt to login...")
    setLoading(true);
    
    dispatch(onRequestLogin({
      username: username,
      password: password
    }))
  }

  const isSuccessLogin = appState?.userData?.isSuccessLogin;
  const isFailedLogin = appState?.userData?.isFailedLogin;

  if(isSuccessLogin) {
    console.log("Current user data", appState)
    setTimeout(() => {
      setLoginButtonText("Success Redirect to Home...")
    }, 1500);
    setTimeout(() => {
      setLoading(false);
      setOpen(false)
    }, 3000);
  }
  if(isFailedLogin) {
    console.log("Current user data", appState)
    setTimeout(() => {
      setLoginButtonText("Wrong Email/Password Please Retry")
    }, 1500);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  return (
    <>
      <div className="root-container">
        <Helmet>
          <title>Youtube Share</title>
          <meta
            name="YShareApp"
            content="Sharing Your Favorite Youtube"
          />
        </Helmet>
        <NavBar
            onLoginRegisterBtnClicked={onLoginRegisterBtnClicked}
            onLogoutBtnClicked={onLogoutBtnClicked}
            onShareBtnClicked={onShareBtnClicked}
          />

        <Layout className="below-content">
          <Content className="main-content">
            <Row className="main-background" justify="center">
              <div className="max-width-holder">

              </div>
            </Row>
          </Content>
        </Layout>
      </div>

      <Modal
        open={open}
        title="Welcome to Youtube Share"
        onCancel={handleCancel}
        footer={null}
      >
        <Row style={{ paddingTop: 10 }} gutter={[10, 10]} justify={'center'} align={'middle'}>
          <Col span={16}>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" prefix={<UserOutlined />} />
          </Col>
          <Col span={16}>
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </Col>
          <Col span={15}>
            <Button 
              icon={isSuccessLogin ? <CheckOutlined /> : null }
              loading={loading}
              style={{ width: '100%' }} 
              onClick={() => requestLogin()} type="primary">
                {loginButtonText}
            </Button>
          </Col>
          <Col span={16}>
              <Typography.Link>
                {"Please click this link if you don't have account >"}
              </Typography.Link>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
