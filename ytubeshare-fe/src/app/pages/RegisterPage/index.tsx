import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import { UserOutlined, CheckOutlined, YoutubeOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Input, Layout, Row, notification } from 'antd';
import { RegisterNavBar } from 'app/components/RegisterNavBar';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss'
import { useNavigate } from 'react-router-dom';
import { ServiceProvider } from 'services/DataService';
import { onLoginSuccess, onRelogin, onRequestLogin } from 'store/UserDataReducer';

const { Header, Content, Footer, Sider } = Layout;
export function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const whiteTextColor = { color: 'white' }
  const [loading, setLoading] = React.useState(false)
  const openNotification = (title, message, type) => {
    api.open({
      message: title,
      description: message,
      placement: 'bottom',
      type: type
    })
  }
  const appState: any = useSelector(state => state)

  const [api, contextHolder] = notification.useNotification();
  //Initial 
  React.useEffect(() => {
    if (ServiceProvider.LocalStorageService.loadUserData()) {
      navigate("/", { replace: true })
    }
  }, [])

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  //Notes: 
  // Because the flow in register page is very simple so the calling API directly
  // not go through redux & saga is more efficient and save time
  const onFinish = (values: any) => {
    console.log(values);
    setLoading(true)
    const email = values.email
    const password = values.password
    ServiceProvider
      .AuthenService
      .register(email, password)
      .then(resp => {
        openNotification(
          "Jay! you've registered to our system",
          "You will be logined & redirected to home page",
          "success"
        )

        setTimeout(() => {
          dispatch(onRequestLogin({
            username: email,
            password: password
          }))
        }, 1500)

        setTimeout(() => {
          navigate("/", { replace: true })
        }, 3000)
      })
      .catch(e => {
        setLoading(false)
        openNotification(
          "Sorry! having problem on registration",
          "Maybe, Your email is existing",
          "error"
        )
      })
  };

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
        <RegisterNavBar />
        <Layout className="below-content">
          <Content className="main-content">
            <Row className="main-background" justify="center">
              <Row className="max-width-holder">
                <Col lg={8} md={8} sm={20} xs={24} >
                  <Card className='user-data-container' title={'Thank you for Registration'}>
                    <Form
                      {...layout}
                      name="nest-messages"
                      onFinish={onFinish}
                      validateMessages={validateMessages}
                    >
                      <Row style={{ paddingTop: 10 }} gutter={[10, 0]} justify={'center'} align={'middle'}>
                        <Col span={18}>
                          <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]}>
                            <Input placeholder='abcde@domain.xyz' />
                          </Form.Item>
                        </Col>
                        <Col span={18}>
                          <Form.Item label="Password" name="password" rules={[{ required: true, min: 6, message: 'Password must be minimum 6 characters.', }]}>
                            <Input.Password placeholder='Your Password' />
                          </Form.Item>
                        </Col>
                        <Col span={18}>
                          <Form.Item
                            label="Retype Password"
                            name="password2"
                            dependencies={['password']}
                            rules={[
                              {
                                required: true,
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                              }),
                            ]}
                          >
                            <Input.Password placeholder='Re-type Your Password' />
                          </Form.Item>
                        </Col>

                        <Divider />
                        <Col span={16}>
                          <Form.Item >
                            <Button loading={loading} style={{ width: '100%' }} type="primary" htmlType="submit">
                              Register
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                </Col>
              </Row>
            </Row>
          </Content>
        </Layout>
      </div>

      {contextHolder}
    </>
  );
}
