
// initial state
// shape: [{ id, quantity }]
const state = {
    comments: []
}

// getters
const getters = {
    comments: state => state.comments
}

// actions
const actions = {
    async getComments({ state, commit, rootState }, search) {
        try {
            commit('settings/SET_LOADING', true, { root: true })
            let res = await rootState.api.client.apis.Comments.get_all({
                search_term: search || undefined
            });
            commit('SET_COMMENTS', req.body)
            commit('settings/SET_LOADING', false, { root: true })
        } catch (err) {
            commit('settings/SET_LOADING', false, {
                root: true
            })
            commit('settings/SET_ERROR', err, {
                root: true
            })
        }
    },
    postComment({ state, commit, rootState }, cmt) {
        commit('settings/SET_LOADING', true, { root: true })
        rootState.api.client.apis.Comments.post({
            comment: cmt
        })
            .then(req => {
                commit('settings/SET_LOADING', false, { root: true })
            })
            .catch(err => {
                commit('settings/SET_LOADING', false, {
                    root: true
                })
                commit('settings/SET_ERROR', err, {
                    root: true
                })
            })
    }
}

// mutations
const mutations = {
    SET_MEDIA(state, media) {
        state.media = media
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
