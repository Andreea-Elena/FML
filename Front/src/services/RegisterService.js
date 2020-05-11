import Api from '../services/Api'

export default{
  register (credentials) {
    return Api().post('/api/adduser', credentials)
  },
  addUserDet (credentials){
    return Api().post('/api/adddetails', credentials)
  },
  deleteUserAuth (id){
    return Api().post('api/user/delete/'+id)
  },
  editUserDet (id, user){
    return Api().put('api/user/update/'+id,user)
  },
  uploadImage(fd){
    return Api().post('api/addimage',fd)
  },
  changePassword (id, password1){
    return Api().put('api/user/password/'+id,{
      password: password1
    })
  },
  validatePass(id, password){
    return Api().get('api/user/validate/'+id+'/'+password)
  }
}
