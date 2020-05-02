/*
export function someAction (context) {
}
*/
import axios from 'axios'

export async function retrieveToken(context, credentials){
        return new Promise((resolve, reject)=>{
        axios
        .get("http://localhost:8080/api/getuserlogin/" + credentials.username)
        .then(response=>{
                const token=response.data.access_token;
                localStorage.setItem('access_token', token)
                context.commit('retrieveToken', token)
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
                localStorage.removeItem('access_token')
                context.commit('destroyToken')
        }
}