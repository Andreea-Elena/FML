/*
export function someAction (context) {
}
*/
import axios from "axios";
import state from "./state";

export async function retrieveToken(context, credentials) {
  return new Promise((resolve, reject) => {
     axios
      .get("http://localhost:8080/api/getuserlogin/" + credentials.username)
      .then(response => {
        const tokenId = {
          idUserAuth: response.data.id,
          token: response.data.access_token,
          username: response.data.username
        };
        if (credentials.password === response.data.password) {
          localStorage.setItem("access_tokem", tokenId.token);
          localStorage.setItem("username", tokenId.username);
          localStorage.setItem("idUserAuth", tokenId.idUserAuth);
          context.commit("retrieveToken", tokenId);
          resolve(response);
        } else {
          reject({ message: "Password isn't correct" });
        }
        console.log(response)
        if(response===null){
          reject({ message: "Username isn't correct" });
        }
      })
      .catch(error => {
        console.log(error);
        reject({ message: "Username doesn't exist" });
      });
  });
}
export function destroyToken(context) {
        if (context.getters.loggedIn) {
          localStorage.removeItem("access_tokem");
          localStorage.removeItem("username");
          localStorage.removeItem("idUserAuth");
          context.commit("destroyToken");
        }
      }

export async function retrieveProfileImage(context, idUser) {
        return new Promise((resolve, reject) => {
          axios
            .get("http://localhost:8080/api/getimageprofile/" + idUser)
            .then(response => {
                context.commit("retrieveProfileImage", response.data.photo);
                resolve(response.photo);
            })
            .catch(error => {
              console.log(error);
              reject({ message: "Username doesn't exist" });
            });
        });
      }

export function destroyProfileImage(context) {
  if (context.getters.loggedIn) {
    context.commit("destroyProfileImage");
  }
}

export async function retrieveUserDetails(context) {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:8080/api//getdetails/authUser/" + state.username)
      .then(response => {
        const user = {
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phone,
          facebook: response.data.facebook,
          profile: response.data.profile,
          seria: response.data.seria,
          group: response.data.group,
          promotion: response.data.promotion,
          specialisation: response.data.specialisation,
          job: response.data.job,
          company: response.data.company
        };
        context.commit("retrieveUserDetails", user);
        resolve(response);
      })
      .catch(error => {
        console.log(error);
        reject({ message: "User details doesn't exist" });
      });
  });
}

export function destroyUserDetails(context) {
  if (context.getters.loggedIn) {
    context.commit("destroyUserDetails");
  }
}


export function retrieveAllUsers(context){
  return new Promise((resolve, reject)=>{
    axios
      .get("http://localhost:8080/api/getAllUsers")
      .then(response=>{
        const data=response.data
        context.commit("setAllUsers",data)
        resolve(response)
      })
      .catch(error =>{
        console.log(error)
        reject(error)
      })
  })
}

export function retrieveAllPosts(context){
  return new Promise((resolve, reject)=>{
    axios
      .get("http://localhost:8080/api/getposts")
      .then(response=>{
        const data=response.data
        context.commit("setAllPosts",data)
        resolve(response)
      })
      .catch(error =>{
        console.log(error)
        reject(error)
      })
  })
}

export function retrieveAllMeetings(context){
  return new Promise((resolve, reject)=>{
    axios
      .get("http://localhost:8080/api/getAllMeetings")
      .then(response=>{
        const data=response.data
        context.commit("setAllMeetings",data)
        resolve(response)
      })
      .catch(error =>{
        console.log(error)
        reject(error)
      })
  })
}

export function addMeeting(context, data) {
  const params = new FormData()
  params.append('date', data.date)
  params.append('promotion', data.promotion)
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:8080/api/addmeeting', params)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function addMeetingImage(context, data) {
  const params = new FormData()
  params.append('image', data.photo)
  params.append('idMeeting', data.idMeeting)
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:8080/api/addmeetingimage', params)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function retrieveMeetingImages(context,id){
  return new Promise((resolve, reject)=>{
    axios
      .get("http://localhost:8080/api/getmeetingimages/"+id)
      .then(response=>{
        const data=response.data
        context.commit("setAllMeetingImages",data)
        resolve(response)
      })
      .catch(error =>{
        console.log(error)
        reject(error)
      })
  })
}

export function retrievePostComments(context,id){
  return new Promise((resolve, reject)=>{
    axios
      .get("http://localhost:8080/api/comment/gelall/"+id)
      .then(response=>{
        const data=response.data
        context.commit("setAllPostComments",data)
        resolve(response)
      })
      .catch(error =>{
        console.log(error)
        reject(error)
      })
  })
}

export function addPostComment(context, data) {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:8080/api/addcomment', data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function sendEmail(context, data) {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:8080/api/user/forgot/'+data)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export async function retrieveUserDetails2(context,email) {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:8080/api//getdetails/authUserEmail/" + email)
      .then(response => {
        const user = response.data
        console.log(user)
        resolve(user);
      })
      .catch(error => {
        console.log(error);
        reject({ message: "User details doesn't exist" });
      });
  });
}

export function retrieveAllUserImages(context){
  return new Promise((resolve, reject)=>{
    axios
      .get("http://localhost:8080/api//getimagesprofile")
      .then(response=>{
        const data=response.data
        context.commit("setAllUserImages",data)
        resolve(response)
      })
      .catch(error =>{
        console.log(error)
        reject(error)
      })
  })
}

export function retrieveAllPostImages(context){
  return new Promise((resolve, reject)=>{
    axios
      .get("http://localhost:8080/api//getimagespost")
      .then(response=>{
        const data=response.data
        context.commit("setAllPostImages",data)
        resolve(response)
      })
      .catch(error =>{
        console.log(error)
        reject(error)
      })
  })
}

export function deleteMeetingImage(context, id) {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:8080/api//meetingimage/delete/'+id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deleteMeeting(context, id) {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:8080/api//meeting/delete/'+id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function deletePost(context, id) {
  return new Promise((resolve, reject) => {
    axios
      .post('http://localhost:8080/api//post/delete/'+id)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function updatePost(context, post) {
  return new Promise((resolve, reject) => {
    axios
      .put('http://localhost:8080/api//post/update/'+post.id,post)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}