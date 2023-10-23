import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavBar } from 'app/components/NavBar';
import { UserOutlined, CheckOutlined, YoutubeOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Empty, Form, Input, Layout, Menu, Modal, Row, Space, Typography, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { onRelogin, onRequestLogin, userLogout } from 'store/UserDataReducer';
import './style.scss';
import { onAddVideo, onFetchVideos, onReceiveNewVideo } from 'store/VideoDataReducer';
import { VideoManager } from 'types/YoutubeVideo';
import VideoPlayer from '../../components/CustomYoutubePlayer';
import { createConsumer, Channel } from "@rails/actioncable";
import { useNavigate } from 'react-router-dom';
import { GeneralUtils } from 'utils/general-utils';
const { Header, Content, Footer, Sider } = Layout;
export function HomePage() {
  const dispatch = useDispatch();
  const whiteTextColor = { color: 'white' }

  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [loginButtonText, setLoginButtonText] = React.useState('Login')
  const [isStartToFetchData, setIsStartToFetchData] = React.useState(false)
  const [openShareModal, setOpenShareModel] = React.useState(false)
  const [youtubeUrl, setYoutubeUrl] = React.useState('')

  const videos: VideoManager = useSelector<any, VideoManager>(state => state.videos)

  const [api, contextHolder] = notification.useNotification();
  const [liveChannel, setLiveChannel] = React.useState<any>(null)

  //Initial 
  React.useEffect(() => {
    console.log("Dispatch Relogin")
    dispatch(onRelogin({}))
  }, [])

  //Ready to fetch data
  React.useEffect(() => {
    if (isStartToFetchData) {
      dispatch(onFetchVideos({}))

      const consumer = createConsumer("ws://35.240.222.156:3000/cable");
      console.log("Done handshake")
      const channel: Channel = consumer.subscriptions.create("NotificationsChannel", {
        connected() {
          console.log("Connected to MyChannel");
        },
        received(data: any) {
          console.log("Received message:", data.message);
          const json = data.message
          const newVideo = JSON.parse(json)
          dispatch(onReceiveNewVideo(newVideo))
          const currentUser = appState?.userData?.email
          const email = newVideo.email === currentUser ? "You just" : newVideo.email
          openNotification(
            email + " shared a video",
            newVideo.title
          )
        },
        disconnected() {
          console.log("Disconnected from MyChannel");
        },
      });

      setLiveChannel({
        consumer: consumer,
        channel: channel
      })

      return () => {
        consumer.subscriptions.remove(channel)
      };
    }
  }, [isStartToFetchData])

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
    setOpenShareModel(true)
  }
  const onLogoutBtnClicked = () => {
    dispatch(userLogout({}))

    //Clear live channel
    if (liveChannel) {
      liveChannel.consumer.subscriptions.remove(liveChannel.channel)
    }

    //Reset initial state
    setIsStartToFetchData(false)
    setLoginButtonText("Login")
  }

  const requestLogin = (values) => {
    console.log("Start request login")
    setLoginButtonText("Attempt to login...")
    setLoading(true);

    dispatch(onRequestLogin({
      username: values.email,
      password: values.password
    }))
  }

  const isSuccessLogin = appState?.userData?.isSuccessLogin;
  const isFailedLogin = appState?.userData?.isFailedLogin;

  if (isSuccessLogin) {
    if (!isStartToFetchData) {
      setIsStartToFetchData(true)
    }

    console.log("Current user data", appState)
    setTimeout(() => {
      setLoginButtonText("Success Redirect to Home...")
    }, 1500);
    setTimeout(() => {
      setLoading(false);
      setOpen(false)
    }, 3000);
  }
  if (isFailedLogin) {
    console.log("Current user data", appState)
    setTimeout(() => {
      setLoginButtonText("Wrong Email/Password Please Retry")
    }, 1500);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  const openNotification = (title, message) => {
    api.open({
      message: title,
      description: message,
      placement: 'topRight',
    })
  }

  const onRequestSharing = () => {
    //Validate YoutubeUrl:
    const id = GeneralUtils.extractYouTubeVideoId(youtubeUrl)

    if (id)
      dispatch(onAddVideo(youtubeUrl))
    else
      api.error({
        message: 'Oops Failed to get Youtube ID. Please check Youtube URL',
        placement: 'bottom',
      })
  }

  const navigate = useNavigate()
  const navigateToRegisterPage = () => {
    navigate("/register")
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <Layout style={{ height: '100%' }}>
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
      <div className="root-container">
        {/* <Space align='center'> */}
        <Content className='max-width-holder'>
          {
            isStartToFetchData
              ? <Row gutter={[1, 20]}>
                {
                  videos.videos.length == 0
                    ? <Empty
                      imageStyle={{ height: 100 }}
                      description={
                        <span style={{ color: 'white' }}>
                          System does not have any videos, Please share some ^^
                        </span>
                      }
                    >
                      <Button onClick={() => setOpenShareModel(true)} type="primary" style={{ fontWeight: 800 }}>Share Now</Button>
                    </Empty>
                    : videos.videos.map((video, key) => {
                      return <Col key={key} span={24}>
                        <Card >
                          <Row gutter={10} align={'middle'}>
                            <Col xxl={8} xl={8} lg={8} md={8} xs={24} sm={24}>
                              <VideoPlayer
                                videoId={GeneralUtils.extractYouTubeVideoId(video.url ?? '')}
                              />
                            </Col>
                            <Col xxl={16} xl={16} lg={12} md={12} xs={24} sm={24}>
                              <div style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                                <Typography.Title ellipsis={true} level={5}>{video.title}</Typography.Title>
                                <Typography.Text>Share by: {video.email}</Typography.Text>
                                <Typography.Paragraph style={{ minWidth: 300 }} ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>{video.description}</Typography.Paragraph>
                              </div>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    })
                }
              </Row>
              : <Space style={{ marginBottom: '10%' }} direction='vertical' align='center'>
                <Typography.Title style={whiteTextColor} >
                  Welcome to Youtube Sharing App
                </Typography.Title>
                <Typography.Link onClick={() => setOpen(true)} style={{ fontSize: 27 }}>
                  Please Login to Watch / Share Videos
                </Typography.Link>
              </Space>
          }
        </Content>
        {/* </Space> */}
      </div>

      <Modal
        open={open}
        title="Welcome to Youtube Share"
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={requestLogin}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <Row style={{ paddingTop: 10 }} gutter={[10, 10]} justify={'center'} align={'middle'}>
            <Col span={16}>
              <Form.Item name={['email']} label="Email" rules={[{ type: 'email' }]}>
                <Input placeholder="Email: abcde@domain.xyz" prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Password" name="password" rules={[{ required: true, min: 6, message: 'Password must be minimum 6 characters.', }]}>
                <Input.Password placeholder="Your Password" />
              </Form.Item>
            </Col>
            <Col span={15}>
              <Button
                htmlType="submit"
                icon={isSuccessLogin ? <CheckOutlined /> : null}
                loading={loading}
                style={{ width: '100%' }}
                type="primary">
                {loginButtonText}
              </Button>
            </Col>
            <Col span={16}>
              <Typography.Link onClick={() => navigateToRegisterPage()}>
                {"Please click this link if you don't have account >"}
              </Typography.Link>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        open={openShareModal}
        title="Sharing is happiness"
        onCancel={() => setOpenShareModel(false)}
        footer={null}
      >
        <Row style={{ paddingTop: 10 }} gutter={[10, 10]} justify={'center'} align={'middle'}>
          <Col span={20}>
            <Input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="URL - E.g: https://www.youtube.com/watch?v=o27bgPw8cpA&t=2096s " prefix={<YoutubeOutlined />} />
          </Col>
          <Col span={16}>
            <Button
              icon={isSuccessLogin ? <ShareAltOutlined /> : null}
              loading={loading}
              style={{ width: '100%' }}
              onClick={() => { onRequestSharing() }} type="primary">
              Share to everyone
            </Button>
          </Col>
        </Row>
      </Modal>

      {contextHolder}
    </Layout>
  );
}
