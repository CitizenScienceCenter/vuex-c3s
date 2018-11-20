import makeRequest from './utils';
import rison from "rison-node";
// initial state
// shape: [{ id, quantity }]
const state = {
    comments: [],
    comment: null
};

// getters
const getters = {};

// actions
const actions = {
    /**
     * Retrieve all comments matching the provided query object
     * @param state
     * @param commit
     * @param rootState
     * @param search
     * @returns {Promise<void>}
     */
    async getComments({state, commit, rootState}, search) {
        search = rison.encode(search);
        return makeRequest(commit, rootState.c3s.client.apis.Comments.get_all, {search_term: search || undefined}, 'c3s/comments/SET_COMMENTS');
    },
    async getCommentsForID({state, commit, rootState}, [id, commitMsg]) {
        const cmtQuery = {
            "select": {
                "fields": [
                    "*"
                ],
                "orderBy": {
                    "created_at": "desc"
                },
                "tables": [
                    "comments"
                ]
            },
            "where": {
                "source_id": {
                    "op": "e",
                    "val": id
                }
            }
        };
        const search = rison.encode(cmtQuery);
        return makeRequest(commit, rootState.c3s.client.apis.Comments.get_comments, {search_term: search || undefined}, commitMsg);
    },
    /**
     * Create a comment
     * @param state
     * @param commit
     * @param rootState
     * @param cmt
     */
    createComment({state, commit, rootState}, cmt) {
        return makeRequest(commit, rootState.c3s.client.apis.Comments.create_comment, {comment: cmt}, 'c3s/comments/ADD_COMMENT');
    }
};

// mutations
const mutations = {
    SET_COMMENTS(state, comments) {
        state.comments = comments;
    },
    ADD_COMMENT(state, comment) {
        state.comments.push(comment)
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
