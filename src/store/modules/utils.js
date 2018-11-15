async function makeRequest(commit, method, data, commitMsg) {
	try {
		commit('c3s/settings/SET_LOADING', true, {root: true});
		let response = await method(data);
		if (commitMsg !== undefined) {
			commit(commitMsg, response.body, {root: true});
		}
		commit('c3s/settings/SET_LOADING', false, {root: true});
		return response.body;
	} catch (err) {
		console.error(err);
		commit('c3s/settings/SET_ERROR', 'Could not get Tasks', {root: true});
		commit('c3s/settings/SET_LOADING', false, {root: true});
		return false;
	}
}

export default makeRequest;
