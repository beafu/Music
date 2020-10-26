import Recomend from "../public/recomend"
import Hot from "../public/hot"
import Search from "../public/search"
import SongList from "../public/songList"
import McsicList from "../public/musicLits"
const routes=[
    {
        path:"/",
        to:"/recomend",
        exact:true
    },
    {
        path:"/recomend",
        component:Recomend, 
        exact:false  
    },{
        path:"/hot",
        component:Hot,
        exact:false
    },{
        path:"/search",
        component:Search,
        exact:false
    },{
        path:"/songlist/:id",
        component:SongList,
        exact:false
    },
    {
        path:"/musiclist/:id",
        component:McsicList,
        exact:false
    }
]
export default routes;