export function query(url,data,method="GET",headers){
   //开发环境
    // if(process.env.NODE_ENV==="development"){
    //     var baseUrl='/api'
    // }else{
    //     //生产环境
    //     var baseUrl="http://localhost:4000"
    // }
    var baseUrl="http://localhost:4000"
    return new Promise(function (resolve, reject) {
        const optaions={
            method,
            headers:Object.assign({
                'content-type': 'application/json'
            },headers)
        }
        //GET请求不能传递body请求体, 否则会错误
        if(method==='POST'){
            optaions.body=JSON.stringify(data)
        }
         fetch(baseUrl+url,optaions).then(response=>response.json()).then(res=>{
            if(res.code===200){
                resolve(res);
            }      
         })
    })
}