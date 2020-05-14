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
