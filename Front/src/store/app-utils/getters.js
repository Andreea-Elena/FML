/*
export function someGetter (state) {
}
*/
export function loggedIn(state){
    return state.token !== null
}

export function getUsername(state){
    return state.username
}

export function getIdUserAuth(state){
    return state.idUserAuth
}

export function getProfileImage(state){
    return state.profileImage
}


export function getUserDetails(state){
    const user={
        id: state.id,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phone: state.phone,
        facebook: state.facebook,
        profile: state.profile,
        seria: state.seria,
        group: state.group,
        promotion: state.promotion,
        specialisation: state.specialisation,
        job: state.job,
        company: state.company,
    }
    return user
}

export function getAllUsers(state){
    return state.allUsers
}

export function getAllPosts(state){
    return state.allPosts
}

export function getAllMeetings(state){
    return state.allMeetings
}

export function getAllMeetingImages(state){
    return state.allMeetingImages
}

export function getAllPostComments(state){
    return state.allPostComments
}

export function getAllUserImages(state){
    return state.allUserImages
}


