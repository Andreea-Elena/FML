/*
export function someMutation (state) {
}
*/

export function retrieveToken(state, token) {
    state.token = token
}
export function destroyToken(state){
    state.token=null
}