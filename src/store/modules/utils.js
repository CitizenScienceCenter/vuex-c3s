export async function makeRequest (commit, method, query, data, commitMsg) {
  try {
    commit('c3s/settings/SET_LOADING', true, { root: true })
    let body = undefined;
    if (data !== undefined) {
      body = { requestBody: data};
    }
    const response = await method(query, body)
    console.dir(response)
    if (commitMsg !== undefined) {
      console.log(response.body)
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

export function getNested(obj, path){
  for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
      obj = obj[path[i]];
  };
  return obj;
};

