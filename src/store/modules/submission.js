import makeRequest from './utils';
// initial state
// shape: [{ id, quantity }]
const state = {
	media: undefined,
	submission: {},
	submissions: []
};

// getters
const getters = {};

// actions
const actions = {
	/**
	 * Retrieve submissions matching the query object
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param search
	 * @returns {Promise<*|boolean|void>}
	 */
	async getSubmissions({ state, commit, rootState }, search) {
		return makeRequest(commit, rootState.c3s.client.apis.Submissions.get_submissions, {search_term: search || undefined }, 'c3s/submission/SET_SUBMISSIONS');
	},
	/**
	 * Create a submission
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param dispatch
	 * @returns {Promise<*|boolean|void>}
	 */
	async createSubmission({state, commit, rootState, dispatch}) {
		// TODO handle uploading at same time
		return makeRequest(commit, rootState.c3s.client.apis.Submissions.create_submission, {submission: state.submission}, 'c3s/submission/SET_SUBMISSION');
	},
	/**
	 * Update a submission based on the ID
	 * @param state
	 * @param commit
	 * @param rootState
	 * @param submission
	 * @returns {Promise<*|boolean|void>}
	 */
	async updateSubmission({state, commit, rootState}, submission) {
		return makeRequest(commit, rootState.c3s.client.apis.Submissions.update_submission, {
			id: submission.id,
			submission: submission
		}, 'submission/c3s/SET_SUBMISSION');
	}
};

// mutations
const mutations = {
	SET_MEDIA(state, media) {
		state.media = media;
	},
	SET_SUBMISSION(state, sub) {
		state.submission = sub;
	},
	SET_SUBMISSION_RESPONSE(state, r, i) {
		state.submission.content.responses[i] = r;
	},
	SET_SUBMISSION_RESPONSES(state, r) {
		state.submission.content.responses = r;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
