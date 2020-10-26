import React, { Component } from 'react'
import "../assite/css/index.scss"

import { PageHeader,Affix } from "antd"

import { BrowserRouter as Router, NavLink} from "react-router-dom"
//路由配置
import routes from "../router/routes"
import RouterView from "../router/RouterView"

export default class index extends Component {
    render() {
        return (
            <Router>
                <Affix>
                <div>
                    <div className="header">
                        <PageHeader
                            className="site-page-header"
                            title="优音乐"
                        />
                        <a href="#" className="btn-download">下载App</a>
                    </div>
                    {/* 路由导航链接 */}
                    <div className="navbar">
                        <NavLink to='/recomend'>推荐</NavLink>
                        <NavLink to='/hot'>热歌</NavLink>
                        <NavLink to='/search'>搜索</NavLink>
                    </div>
                </div>
                    </Affix>
                    {/* 路由规则，出口 */}
                    <RouterView routes={routes} />

            </Router>
        )
    }
}
