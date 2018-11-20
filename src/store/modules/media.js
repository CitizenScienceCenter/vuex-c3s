import makeRequest from './utils';
import rison from "rison-node";
// initial state
// shape: [{ id, quantity }]
const state = {
	media: []
};

// getters
const getters = {
};

// actions
const actions = {
	getMedia({state, commit, rootState}, search) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {search_term: search || undefined }, 'c3s/media/SET_MEDIA');
	},
	deleteMedium({state, commit, dispatch, rootState}, id) {
        return makeRequest(commit, rootState.c3s.client.apis.Media.delete_medium, {id: id}, undefined);
	},
	upload({state, commit, rootState}, medium) {
        return makeRequest(commit, rootState.c3s.client.apis.Media.upload, medium, undefined);
	}
};

// mutations
const mutations = {
	SET_MEDIA(state, media) {
		state.media = media;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
