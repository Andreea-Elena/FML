/*
export function someAction (context) {
}
*/
import axios from 'axios'
import state from './state';

export async function retrieveToken(context, credentials){
        return new Promise((resolve, reject)=>{
        axios
        .get("http://localhost:8080/api/getuserlogin/" + credentials.username)
        .then(response=>{
                console.log(response.data)
                const tokenId={
                        token: response.data.access_token,
                        username: response.data.username
                }
               localStorage.setItem('access_tokem', tokenId.token)
               localStorage.setItem('username', tokenId.username)
                context.commit('retrieveToken', tokenId)
                if(credentials.password!==response.data.password){
                reject({message:"Password isn't correct"})}
                resolve(response)
        }).catch(error=>{
                console.log(error)
                reject({message:"Username doesn't exist"})
        })
})
}

export function destroyToken(context){
        if(context.getters.loggedIn){
               localStorage.removeItem('access_tokem')
               localStorage.removeItem('username')
                context.commit('destroyToken')
        }
}

export async function retrieveUserDetails(context){
        return new Promise((resolve, reject)=>{
        axios
        .get("http://localhost:8080/api//getdetails/authUser/" + state.username)
        .then(response=>{
                const user={
                        firstName: response.data.FirstName,
                        lastName:response.data.LastName,
                        email: response.data.email,
                        phone: response.data.phone,
                        facebook: response.data.facebook,
                        profile: response.data.profile,
                        photo: response.data.photo,
                        registeredAt: response.data.registeredAt,
                        lastLogin: response.data.lastLogin
                }
                context.commit('retrieveUserDetails', user)
                resolve(response)
        }).catch(error=>{
                console.log(error)
                reject({message:"User details doesn't exist"})
        })
})
}

export function destroyUserDetails(context){
        if(context.getters.loggedIn){
                context.commit('destroyUserDetails')
        }
}