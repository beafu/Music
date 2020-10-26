import React, { Component } from 'react'
import { List,Spin,Avatar,Card} from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import { query } from "../utils"
import { Link } from 'react-router-dom';
const { Meta } = Card
export default class songList extends Component {
    constructor(props) {
        super()
        this.state = {
            playlist: {},
            id:props.match.params.id
        }
    }
    getHot() {
        query("/playlist/detail?id="+this.state.id).then(res => {
            if (res.code === 200) {
                setTimeout(() => {
                    this.setState({ playlist: res.playlist })
                }, 1000)
            }
        })
    }
    componentWillMount() {
        this.getHot()
    }
    render() {
        const ListToken = this.state.playlist.tracks
        const StyleImg = {
            width: "100%",
            height: "210px",
            backgroundImage: "url('" + this.state.playlist.coverImgUrl + "')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
        return (
            <div className="hot-container">
                {
                    ListToken && ListToken.length > 0 ? (
                        <>
                            <div style={StyleImg}></div>
                            <List
                                bordered
                                dataSource={ListToken}
                                renderItem={item => (
                                    <List.Item
                                        actions={[<RightCircleOutlined onClick={()=>this.props.history.push("/musiclist/"+item.id)} style={{ fontSize: '26px' }}/>]}
                                    >
                                    <List.Item.Meta
                                    avatar={<Avatar src={item.al.picUrl} />}
                                    title={<Link to={"/musiclist/"+item.id}>{item.name}</Link>}
                                />
                                    </List.Item>
                                )}
                            />
                        </>
                    ):<div style={{textAlign:'center'}}><Spin size="large" /></div>
                }
            </div>
        )
    }
}
