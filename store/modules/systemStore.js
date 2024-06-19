const chartStore = {
  state: {
    isLogin: false, // 是否登陆
    userInfo: {}, // 用户信息
    gamePath: '', //游戏地址
    rechargeFlag: null
  },
  getters: {
    isLogin: state => {
      return uni.getStorageSync('isLogin') || state.isLogin
    },
    userInfo: state => {
      return uni.getStorageSync('userInfo') || state.userInfo
    },
    gamePath: state => {
      return state.gamePath
    },
    rechargeFlag: state => {
      return state.rechargeFlag
    }
  },
  mutations: {
    SET_IS_LOGIN: (state, value) => {
      uni.setStorageSync('isLogin', value)
      state.isLogin = value
    },
    SET_USERINFO: (state, value) => {
      uni.setStorageSync('userInfo', value)
      state.userInfo = value
    },
    SET_GAMEPATH: (state, value) => {
      state.gamePath = value
    },
    SET_RECHARGEFLAG: (state, value) => {
      state.rechargeFlag = value
    }
  },
  actions: {
    setIsLogin: ({commit}, obj) => commit('SET_IS_LOGIN', obj),
    setUserinfo: ({commit}, obj) => commit('SET_USERINFO', obj),
    setGamePath: ({commit}, obj) => commit('SET_GAMEPATH', obj),
    setRechargeFlag: ({commit}, obj) => commit('SET_RECHARGEFLAG', obj)
  }
};

export default chartStore
