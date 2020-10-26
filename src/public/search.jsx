import React, { Component } from 'react'
import { query } from "../utils"
import "../assite/css/search.scss"
import { Input, Row, Col, List,Button, message} from 'antd';
import { SearchOutlined,RightCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
export default class search extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            keyword:'',
            //搜索结果
            songs:[]
        }
    }
    getSearchList() {
        query("/search/hot").then(res => {
            if (res.code === 200) {
                this.setState({ list: res.result.hots })
            }
        })
    }
    componentDidMount() {
        this.getSearchList()
    }
    componentDidUpdate(){

    }
    // 搜索输入框的change事件处理函数
    keyUpdata(event){
        const keyword=event.target.value;
        this.setState({keyword})
    }
    // 搜索输入框keyup事件的处理函数
    enter(event){
        if(event.keyCode===13){
            this.search()
        }
    }
    // 点击搜索热词, 更新keywords
    setKeywordes(keyword){
        this.setState({keyword},()=>{
            // 第一种: 执行一次搜索
            this.search()
        })
    }
    async search(){
        if(this.state.keyword.trim()===''){
            return message.warning('请输入搜索关键词')
        }
        const res=await query('/search?keywords='+this.state.keyword)
        if(res.code===200){
            this.setState({
                songs:res.result.songs
            })
        }
    }
    render() {
        const {list}=this.state
        return (
            <div className="search-container">
                <Input 
                size="large" 
                placeholder="请输入搜索关键字" 
                prefix={<SearchOutlined />} 
                onKeyUp={this.enter.bind(this)}
                onChange={(event)=>this.keyUpdata(event)}
                />
                
                <>
                    <Row gutter={8}>
                    {
                        list.map((item,index)=>(
                            <Col key={index}>
                                <Button 
                                onClick={()=>this.setKeywordes(item.first)}
                                >{item.first}</Button>
                            </Col>
                        ))
                        
                    }
                    </Row>
                </>
                
                {/* 搜索结果显示区域 */}
                <List
                    dataSource={this.state.songs}
                    renderItem={item => (
                        <List.Item
                        actions={[<RightCircleOutlined onClick={()=>this.props.history.push("/musiclist/"+item.id)} style={{ fontSize: '26px' }}/>]}
                        >
                            <Link to={"/musiclist/"+item.id}>{item.name.substr(0,30)+'...'}</Link>
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}
