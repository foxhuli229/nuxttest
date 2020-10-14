
const baserUrl = "http://121.36.73.246:9004"

let prefix = "";
if (process.server) {
    //服务端不用走本地代理
    prefix = process.env.NODE_ENV === "production" ? baserUrl : baserUrl + '';
}

if (process.client) {
    //客户端需走 本地代理
    prefix = process.env.NODE_ENV === "production" ? baserUrl : ''
}
export default {
    prefix
}