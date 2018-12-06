/**
 * @module c3s/media
 */

import makeRequest from './utils';
import rison from "rison-node";
/**
 * 
 */
const state = {
	media: []
};

/**
 * @namespace getters
 */
const getters = {};

/**
 * @namespace actions
 */
const actions = {
	/**
	 * Get media matching search
	 * @param {Provided} param0 
	 * @param {Array} Terms Array with Object of search query, messaage to commit to store (or undefined) and the limit to retrieve
	 */
	getMedia({
		state,
		commit,
		rootState
	}, [search, commitMsg, limit]) {
		search = rison.encode(search);
		return makeRequest(commit, rootState.c3s.client.apis.Media.get_media, {
			search_term: search || undefined,
			limit: limit || 100
		}, commitMsg);
	},
	/**
	 * Delete media with ID
	 * @param {Provided} param0 
	 * @param {String}} id 
	 */
	deleteMedium({
		state,
		commit,
		dispatch,
		rootState
	}, id) {
		return makeRequest(commit, rootState.c3s.client.apis.Media.delete_medium, {
			id: id
		}, undefined);
	},
	/**
	 * Upload a file
	 * @param {Provided} param0 
	 * @param {FormData} medium 
	 */
	upload({
		state,
		commit,
		rootState
	}, medium) {
		return makeRequest(commit, rootState.c3s.client.apis.Media.upload, medium, undefined);
	}
};

/**
 * @namespace mutations
 */
const mutations = {
	/**
	 * Store array of media in store. File objects ARE NOT STORED and must be requested from their path
	 * @param {Provided} state 
	 * @param {Array} media 
	 */
	SET_MEDIA(state, media) {
		state.media = media;
	}
};

/**
 * @name c3s/media
 */
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};