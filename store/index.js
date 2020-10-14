
export const state = () => ({
    bNav: false,
    bLoading: false
});

export const mutations = {
    SET_UPADTE_NAV(state, bNav) {
        state.bNav = bNav
    },
    SET_UPDATE_BLOADING(state, bLoading) {
        state.bLoading = bLoading
    }
}

export const actions = {
    nuxtServerInit(store, context) {
        //初始化得到 store
        // console.log("nuxtServerInit", store, context)
    }
}

export const gettes = {
    getNav(state) {
        return state.bNav ? "打开" : "关闭"
    },
    getLoading(state) {
        return state.bLoading
    }
}