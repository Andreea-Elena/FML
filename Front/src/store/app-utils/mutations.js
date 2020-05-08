/*
export function someMutation (state) {
}
*/

export function retrieveToken(state, tokenId) {
    state.token = tokenId.token
    state.username=tokenId.username
}
export function destroyToken(state){
    state.token = null
    state.username=null
}

export function retrieveUserDetails(state, user) {
    state.id=user.id,
    state.firstName = user.firstName
    state.lastName = user.lastName
    state.email = user.email
    state.phone = user.phone
    state.facebook = user.facebook
    state.profile = user.profile
    state.picture = user.picture
    state.registeredAt = user.registeredAt
    state.lastLogin = user.lastLogin
}

export function destroyUserDetails(state){
    state.id=null;
    state.firstName = null
    state.lastName = null
    state.email = null
    state.phone = null
    state.facebook = null
    state.profile = null
    state.picture = null
    state.registeredAt = null
    state.lastLogin = null
}
