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

export function getIdUserDet(state){
    return state.id
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
        picture: state.picture,
        registeredAt: state.registeredAt,
        lastLogin: state.lastLogin,
    }
    return user
}


