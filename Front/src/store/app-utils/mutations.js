/*
export function someMutation (state) {
}
*/

export function retrieveToken(state, tokenId) {
    state.token = tokenId.token
    state.username=tokenId.username
    state.idUserAuth=tokenId.idUserAuth
}
export function destroyToken(state){
    state.token = null
    state.username=null
    state.idUserAuth=null
}

export function retrieveProfileImage(state, profileImage) {
    state.profileImage = profileImage
}

export function destroyProfileImage(state){
    state.profileImage = null
}

export function retrieveUserDetails(state, user) {
    state.id=user.id,
    state.firstName = user.firstName
    state.lastName = user.lastName
    state.email = user.email
    state.phone = user.phone
    state.facebook = user.facebook
    state.profile = user.profile
    state.seria=user.seria
    state.group=user.group
    state.promotion=user.promotion
    state.specialisation=user.specialisation
    state.job=user.job
    state.company=user.company
}

export function destroyUserDetails(state){
    state.id=null;
    state.firstName = null
    state.lastName = null
    state.email = null
    state.phone = null
    state.facebook = null
    state.profile = null
    state.seria=null
    state.group=null
    state.promotion=null
    state.specialisation=null
    state.job=null
    state.company=null
}

export function setAllUsers(state, data) {
    state.allUsers = data
  }

  export function setAllPosts(state, data) {
    state.allPosts = data
  }

  export function setAllMeetings(state, data) {
    state.allMeetings = data
  }

  export function setAllMeetingImages(state, data) {
    state.allMeetingImages = data
  }
