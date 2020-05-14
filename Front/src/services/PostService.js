import Api from '../services/Api'

export default{
    add (post) {
      console.log(post)
      return Api().post('/api/addpost', post)
    },
    uploadImage(fd){
      return Api().post('api/addpostimage',fd)
    }
}