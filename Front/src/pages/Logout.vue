<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('appUtils/destroyUserDetails')
    this.$store.dispatch('appUtils/destroyToken')
    this.$store.dispatch('appUtils/destroyProfileImage')
    .then(response=>{
      this.$router.push({name:'home'})
    })
  }
}
</script>
