import request from '../utils/request.js'

const AD = '/api/Index/ad'
const CHANNEL = '/api/Index/channel'
const PLATE = '/api/Game/get_plate'
const GAME = '/api/Game/get_game_list'
const GAMELOG = '/api/Game/get_game_log'
// 轮播图
function getAd (params) {
	return request(AD, 'POST', params).then(res => res)
}
// 渠道
function getChannel (params) {
    return request(CHANNEL, 'POST', params).then(res => res)
}

// 游戏平台列表
function getGamePlateList (params) {
    return request(PLATE, 'POST', params).then(res => res)
}

// 游戏列表
function getGameList (params) {
    return request(GAME, 'POST', params).then(res => res)
}

// 用户下注记录
function getUserBetList (params) {
    return request(GAMELOG, 'POST', params).then(res => res)
}


export default {
    getAd,
    getChannel,
    getGamePlateList,
    getGameList,
    getUserBetList
}

