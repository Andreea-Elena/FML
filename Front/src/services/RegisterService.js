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
  }
}
