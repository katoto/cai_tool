// 业务工具库
// base 基础工具函数
// import store from "@/store/index.js";
import {
    isObject
} from "../base/index";
import {
    network
} from './network'

/**
 * getResList 获取资源列表
 * @param {String} positions 资源id
 * @returns {Boolean} reslist 
 * 
 */
function getResList(positions = 'home_page_banner') {
    return network('/api', {
        name: 'resource.list',
        data: {
            positions,
            deviceId: ''
        }
    }, {
        limitSys: ["deviceType", "token", "longitude", "latitude"]
    }).then((res) => {
        if (res && res.data && isObject(res.data)) {
            let _keysArr = Object.keys(res.data)
            if (_keysArr && _keysArr.length > 0) {
                return res.data[_keysArr[0]]
            }
            return []
        }
        return []
    })
}


module.exports = {
    getResList
};