import React, { Component } from 'react'
import { query } from "../utils"
import "../assite/css/musiclist.scss"
import moment from "moment"
export default class musicLits extends Component {
    constructor(props) {
        super()
        this.state = {
            id: props.match.params.id,
            //播放状态
            play: false,
            deg: "-20deg",
            info: {},
            //歌词
            lyric: [],
            musicUrl: '',
        }
    }
    //切换播放状态
    toggle() {
        this.setState({
            play: !this.state.play,
            deg: this.state.play ? '-20deg' : 0
        }, () => {
            if (this.state.play) {
                this.audio.play()
            } else {
                this.audio.pause()
            }
        })
    }
    //获取音乐详情
    getMisicinfo() {
        query(`/song/detail?ids=${this.state.id}`).then(res => {
            if (res.code === 200) {
                this.setState({
                    info: res.songs[0].al
                })
            }
        })
    }
    //获取歌词
    getLyric() {
        query("/lyric?id=" + this.state.id).then(res => {
            if (res.code === 200) {
                this.setState({
                    lyric: this.lyricFmt(res.lrc.lyric)
                })
            }
        })

    }
    //歌曲歌词格式化
    lyricFmt(lyric) {
        const reg = /(\[.*\])(.*)/g;
        const lyricArr = [];
        const lyricObj = [];
        const lytime=[{value:"",time:""}]
        lyric.replace(reg, (a, b, c) => {
            // lyricArr.push(c, b);
            // lyricObj[b.substr(1, 5)] =c;
             lyricArr.push(c);
            lyricObj.push(b.substr(1, 5));
        });
        let obj = {}
        let arr = []
        lyricObj.map((item,index,i)=>{
            Object.assign(obj,{'value':lyricArr[index]},{'time':item})
            arr.push(obj)
            obj={}
        })
        console.log(arr)
        return arr;
    }
    //获取音乐播放地址
    getMusicUrl() {
        query("/song/url?id=" + this.state.id).then(res => {
            if (res.code === 200) {
                this.setState({ musicUrl: res.data[0].url })
            }
        })
    }
    componentWillMount() {
        this.getMisicinfo()
        this.getLyric()
        this.getMusicUrl()
    }
    componentWillUpdate(){
        console.log(this.state.lyric)
    }
    componentDidUpdate(props) {
        // 监听音频的播放
        this.audio.ontimeupdate = function () {
            var audio = document.getElementsByTagName("audio")[0]
            //歌曲播放时间
            var ct = audio.currentTime
            let interval = Math.floor(ct)
            let minute = (Math.floor(interval / 60)).toString().padStart(2, '0')
            let second = (interval % 60).toString().padStart(2, '0')
            var time=minute+":"+second
            console.log(time)
        }
    }
    render() {
        const control = {
            transform: 'rotate(' + this.state.deg + ')'
        }
        return (
            <div className="play-container">
                <div className="play-controls" style={control}></div>
                <div className="play-wrap">
                    <img src={this.state.info.picUrl} className={this.state.play ? 'sport' : ''} />
                    <div
                        className={['btn', this.state.play ? 'btn-pause' : 'btn-play'].join(' ')}
                        onClick={() => this.toggle()}
                    ></div>
                    <audio ref={(input) => this.audio = input} src={this.state.musicUrl} controls style={{ display: "none" }}></audio>
                </div>
                <div className="content">
                    <h3>{this.state.info.name}</h3>
                    {
                        this.state.lyric.map((item, index) => (
                            <p key={index}>{item.value}</p>
                        ))
                    }
                </div>
            </div>
        )
    }
}
