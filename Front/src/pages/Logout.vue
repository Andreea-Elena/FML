<template>
  <q-page class="flex flex-center">
  </q-page>
</template>

<script>
export default {
  created(){
    this.$store.dispatch('appUtils/destroyUserDetails')
    this.$store.dispatch('appUtils/destroyToken')
    .then(response=>{
      this.$router.push({name:'home'})
    })
  }
}
</script>
