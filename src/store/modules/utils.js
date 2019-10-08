async function makeRequest (commit, method, query, data, commitMsg) {
  try {
    commit('c3s/settings/SET_LOADING', true, { root: true })
    let body = undefined;
    if (data != undefined || data != null || data != {}) {
      body = { requestBody: data};
    }
    const response = await method(query, body)
    if (commitMsg !== undefined) {
      commit(commitMsg, response.obj.data, { root: true })
    }

    commit('c3s/settings/SET_LOADING', false, { root: true })
    return response.obj
  } catch (err) {
    commit('c3s/settings/SET_ERROR', 'Could not complete request', { root: true })
    commit('c3s/settings/SET_LOADING', false, { root: true })
    return err
  }
}

export default makeRequest
