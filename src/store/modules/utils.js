async function makeRequest (commit, method, query, data, commitMsg) {
  try {
    commit('c3s/settings/SET_LOADING', true, { root: true })
    const response = await method(query, { requestBody: data })
    if (commitMsg !== undefined) {
      commit(commitMsg, response.body, { root: true })
    }

    commit('c3s/settings/SET_LOADING', false, { root: true })
    return response
  } catch (err) {
    commit('c3s/settings/SET_ERROR', 'Could not complete request', { root: true })
    commit('c3s/settings/SET_LOADING', false, { root: true })
    return err
  }
}

export default makeRequest
