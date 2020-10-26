import React, { Component } from 'react'
import { Carousel, Card, Row, Col, List,Avatar} from 'antd';
import { query } from "../utils"
import "../assite/css/recomend.scss"
import { RightCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card
export default class recomend extends Component {
    constructor() {
        super();
        this.state = {
            //轮播图
            banners: [],
            //歌单获取
            personalized: [],
            newMisic: [],
        }
    }
    //获取轮播图
    getBanner() {
        query('/banner').then(res => {
            if (res.code === 200) {
                this.setState({ banners: res.banners })
            }
        })
    }
    //歌单推荐
    getMusic() {
        query("/personalized?limit=9").then(res => {
            if (res.code === 200) {
                this.setState({ personalized: res.result })
            }
        })
    }
    // 新歌推荐
    getMusicNew() {
        query("/personalized/newsong").then(res => {
            console.log(res.result)
            if (res.code === 200) {
                this.setState({ newMisic: res.result })
            }
        })
    }
    componentWillMount() {
        this.getBanner()
        this.getMusic()
        this.getMusicNew()
    }
    render() {
        const { banners, personalized,newMisic } = this.state
        const {push}= this.props.history
        return (
            <div className="recommend-container">
                <Carousel autoplay>
                    {
                        banners.map(item => (
                            <div key={item.targetId}>
                                <img src={item.imageUrl} alt={item.typeTitle} title={item.typeTitle} />
                            </div>
                        ))
                    }
                </Carousel>,
                <div className="section">
                    <h3>歌单推荐</h3>
                    <Row gutter={10}>
                        {
                            personalized.map(item => (
                                <Col key={item.id} span={8} onClick={()=>push("/songlist/"+item.id)}>
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src={item.picUrl} />}
                                    >
                                        <Meta title={item.name} description={item.copywriter.substr(0, 4)} />
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
                <div className="section">
                    <h3>新歌推荐</h3>
                    <List
                        itemLayout="horizontal"
                        dataSource={newMisic}
                        renderItem={item => (
                            <List.Item
                            actions={[<RightCircleOutlined onClick={()=>push("/musiclist/"+item.id)} style={{fontSize:'26px'}}/>]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picUrl} />}
                                    title={<Link to={"/musiclist/"+item.id}>{item.name}</Link>}
                                    description={item.song.alias[0]}
                                />
                            </List.Item>
                        )}
                    />,
                </div>

            </div>
        )
    }
}
