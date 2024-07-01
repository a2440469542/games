import request from '../utils/request.js'
import config from "@/config";

// 登陆
const LOGIN = '/api/Login/user_login'
const REGISTER = '/api/Login/register'
const LOGOUT = '/api/Login/logout'
const BOX = '/api/User/get_box'
const GET_USER_INFO = '/api/User/user_info'
const TEAM_DATA = '/api/User/get_team_total'
const CHARGE_LIST = '/api/User/team'
const GAME_URL = '/api/GameLogin/get_game_url'
const REACHARGE_LIST = '/api/Pay/get_recharge_list'
const CHARGE = '/api/Pay/pay'
const CHARGE_ORDER = '/api/Order/get_recharge'
const CHARGE_RECORD = '/api/Order/get_recharge'
const USER_BANK = '/api/Cash/get_bank'
const BIND_BANK = '/api/Cash/bind_bank'
const CASH = '/api/Cash/cash'
const CASH_RECORD = '/api/Cash/log'
const GETREWARD = '/api/User/receive_box'
const CONFIG = '/api/Index/config'
// 登陆
function login (params) {
	return request(LOGIN, 'POST', params).then(res => res)
}

// 注册
function register (params) {
	return request(REGISTER, 'POST', params).then(res => res)
}

// 退出
function logout (params) {
	return request(LOGOUT, 'POST', params).then(res => res)
}

// 获取用户信息
function getUserInfo (params) {
	return request(GET_USER_INFO, 'GET', params).then(res => res)
}

// 当前用户团队统计数据
function getTeamData (params) {
	return request(TEAM_DATA, 'POST', params).then(res => res)
}

// 获取当前用户的团队投注，充值列表
function getChargeList (params) {
	return request(CHARGE_LIST, 'POST', params).then(res => res)
}

// 宝箱列表
function getBox (params) {
	return request(BOX, 'POST', params).then(res => res)
}

// 领取宝箱
function getReward (params) {
	return request(GETREWARD, 'POST', params).then(res => res)
}

// 获取游戏启动链接
function getGameUrl (params) {
	return request(GAME_URL, 'POST', params).then(res => res)
}

// 充值价格表
function getRechargeList (params) {
	return request(REACHARGE_LIST, 'POST', params).then(res => res)
}

// 充值接口
function recharge (params) {
	return request(CHARGE, 'POST', params).then(res => res)
}

// 用户充值订单列表
function chargeOrderList (params) {
	return request(CHARGE_ORDER, 'POST', params).then(res => res)
}

// 用户充值记录
function chargeRecord (params) {
	return request(CHARGE_RECORD, 'POST', params).then(res => res)
}

// 用户银行卡
function userBank (params) {
	return request(USER_BANK, 'POST', params).then(res => res)
}

// 绑定银行卡
function bindBank (params) {
	return request(BIND_BANK, 'POST', params).then(res => res)
}

// 提现
function cash (params) {
	return request(CASH, 'POST', params).then(res => res)
}

// 提现记录
function cashRecord (params) {
	return request(CASH_RECORD, 'POST', params).then(res => res)
}

// 配置
function getConfig (params) {
	return request(CONFIG, 'POST', params).then(res => res)
}

export default {
	login,
	register,
	logout,
	getUserInfo,
	getTeamData,
	getChargeList,
	getBox,
	getReward,
	getGameUrl,
	getRechargeList,
	recharge,
	chargeOrderList,
	chargeRecord,
	userBank,
	bindBank,
	cash,
	cashRecord,
	getConfig
}
