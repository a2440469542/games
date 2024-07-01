const Store = {
  state: {
    isLogin: false, // 是否登陆
    userInfo: {}, // 用户信息
    gamePath: '', //游戏地址
    rechargeFlag: null,
    config: {},
    payPath: '',
    channelInfo: {}
  },
  getters: {
    isLogin: state => {
      return state.isLogin
    },
    userInfo: state => {
      return state.userInfo
    },
    gamePath: state => {
      return state.gamePath
    },
    rechargeFlag: state => {
      return state.rechargeFlag
    },
    config: state => {
      return state.config
    },
    payPath: state => {
      return state.payPath
    },
    channelInfo: state => {
      return state.channelInfo
    }
  },
  mutations: {
    SET_IS_LOGIN: (state, value) => {
      // uni.setStorageSync('isLogin', value)
      state.isLogin = value
    },
    SET_USERINFO: (state, value) => {
      // uni.setStorageSync('userInfo', value)
      state.userInfo = value
    },
    SET_GAMEPATH: (state, value) => {
      state.gamePath = value
    },
    SET_RECHARGEFLAG: (state, value) => {
      state.rechargeFlag = value
    },
    SET_CONFIG: (state, value) => {
      // uni.setStorageSync('config', value)
      state.config = value
    },
    SET_PAYPATH: (state, value) => {
      state.payPath = value
    },
    SET_CHANNELINFO: (state, value) => {
      state.channelInfo = value
    }
  },
  actions: {
    setIsLogin: ({commit}, obj) => commit('SET_IS_LOGIN', obj),
    setUserinfo: ({commit}, obj) => commit('SET_USERINFO', obj),
    setGamePath: ({commit}, obj) => commit('SET_GAMEPATH', obj),
    setRechargeFlag: ({commit}, obj) => commit('SET_RECHARGEFLAG', obj),
    setConfig: ({commit}, obj) => commit('SET_CONFIG', obj),
    setPayPath: ({commit}, obj) => commit('SET_PAYPATH', obj),
    setChannelInfo: ({commit}, obj) => commit('SET_CHANNELINFO', obj)
  }
};

export default Store
