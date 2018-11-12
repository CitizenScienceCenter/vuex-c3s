
async function makeRequest(method, data, commmitMsg) {
	try {
		commit('settings/SET_LOADING', true, {root: true});
		let response = await method(data);
		if (commit !== undefined) {
			commit(commitMsg, response.body);
		}
		commit('settings/SET_LOADING', false, {root: true});
		return response.body;
	} catch (err) {
		console.error(err);
		commit('settings/SET_ERROR', 'Could not get Tasks', {root: true});
		commit('settings/SET_LOADING', false, {root: true});
		return false;
	}
}

export default makeRequest;
