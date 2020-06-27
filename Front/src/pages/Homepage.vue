<template>
  <q-page>
    <div id="content">
      <h1>Search for people</h1>
      <div id="searching">
        <q-input
          label="Search"
          class="search"
          v-model="search"
          filled
          debounce="300"
          type="search"
          @input="onFilter"
        >
          <template v-slot:prepend>
            <q-icon color="primary" name="search" />
          </template>
        </q-input>
         <q-select
          v-model="option"
          :options="options"
          label="Options"
          class="select"
          @input="onToggleOption"
        >
          <template v-slot:prepend>
            <q-icon name="category" class="cursor-pointer" style="margin-left:5px;" />
          </template>
        </q-select>
      </div>

      <div v-for="user in filtered" :key="user.id" id="list-content">
        <q-card
          style="background-color:rgba(255,255,255,0.7);"
          class="card-request row"
          @click="redirectToProfile(user)"
        >
          <q-card-section class="col">
            <q-img
              class="avatar"
              :src="'\\statics\\users\\picture-'+user.id+'-1.jpg'"
              style="width:150px; height:150px"
            />
          </q-card-section>
          <q-card-section class="col-6">
            <div class="text-h6">{{user.firstName}} {{user.lastName}}</div>
            <div class="text-subtitle1">Series: {{user.seria}}</div>
            <div class="text-subtitle1">Group: {{user.group}}</div>
            <div class="text-subtitle1">Specialisation: {{user.specialisation}}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data: function() {
    return {
      filtered: [],
      option: 'General',
      search: '',
      filteredUsers:[],
       options: [
        'Group',
        'Series',
        'Promotion',
        'Specialisation',
      ],
      users:[],
    }
  },
  methods: {
    redirectToProfile(user){
      //this.$store.dispatch('selectRequest', user)
      this.$router.push({
        name: 'profile',
        params: { id: user.id }
      })
    },
    onToggleOption() {
      if (this.option.match('Group')) {
        this.filtered = this.users.filter(item =>
          item.group === this.$store.getters["appUtils/getUserDetails"].group &&
          item.promotion === this.$store.getters["appUtils/getUserDetails"].promotion
        )
        this.filteredUsers = this.filtered
      } else if (this.option.match('Series')) {
        this.filtered = this.users.filter(item =>
          item.seria.match( this.$store.getters["appUtils/getUserDetails"].seria) &&
          item.promotion === this.$store.getters["appUtils/getUserDetails"].promotion
        )
        this.filteredUsers = this.filtered
      } else if (this.option.match('Specialisation')) {
        this.filtered = this.users.filter(item =>
          item.specialisation === this.$store.getters["appUtils/getUserDetails"].specialisation &&
          item.promotion === this.$store.getters["appUtils/getUserDetails"].promotion
        )
        this.filteredUsers = this.filtered
      } else {
        this.filtered = this.users.filter(item =>
          item.promotion === this.$store.getters["appUtils/getUserDetails"].promotion
        )
        this.filteredUsers = this.filtered
      }
    },
    onFilter() {
      if (this.search !== ''){
        this.filtered=this.filteredUsers
          .filter(item =>
            `${item.firstName} ${item.lastName}`
              .toLowerCase()
              .includes(this.search.toLowerCase())
          )
          .sort((a, b) => {
            if (a.firstName.localeCompare(b.firstName) === 0) {
              return a.lastName.localeCompare(b.lastName)
            } else return a.firstName.localeCompare(b.firstName)
          })
      }else this.filtered = this.filteredUsers
    },
  },
  created: function() {
    this.$store
      .dispatch("appUtils/retrieveAllUsers")
      .then(res => {
        this.users = this.$store.getters["appUtils/getAllUsers"]
        this.filtered=this.users.filter(item =>
          item.promotion === this.$store.getters["appUtils/getUserDetails"].promotion
        )
        this.filteredUsers=this.filtered
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
.text-h6 {
  font-size: calc(20px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-subtitle1 {
  font-size: calc(10px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
}
.text-subtitle2 {
  font-size: calc(13px + (20 - 14) * ((100vw - 300px) / (1600 - 300)));
}

#list-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  align-items: center;
}
h1 {
  position: relative;
  font-size: calc(
    14px + (26 - 14) * ((100vw - 300px) / (1600 - 300))
  ) !important;
  line-height: calc(3.5em + (1.5 - 1.2) * ((100vw - 300px) / (1600 - 300)));
  text-align: center;
  letter-spacing: 0.5em;
  width: fit-content;
  color: #ffffff;
  font-family: 'Raleway',sans-serif; 
  font-size: 62px; font-weight: 800; 
  line-height: 72px; 
  margin: 0 0 24px; 
  text-align: center; 
  text-transform: uppercase;
}
.q-page {
  justify-content: center;
  display: flex;
  margin: 0 auto;
  direction: column;
  width: 100%;
  height: 100%;
}

@media (min-width: 800px) {
  .q-card {
    width: 50%;
    padding: 2%;
    border-radius: 10px;
    margin-bottom: 2%;
  }
  .select {
    width: 40%;
    margin-bottom: 1%;
    background-color: rgba(250, 250, 250, 0.5);
    border-radius: 5px;
  }

  .search {
    width: 60%;
    margin-bottom: 1%;
    background-color: rgba(250, 250, 250, 0.5);
    border-radius: 5px;
    margin-right: 2%;
  }
  #searching {
    display: flex;
    flex-direction: row;
    width: 60%;
    justify-content: center;
    margin-bottom: 2%;
  }
  .avatar {
    border-radius: 50%;
    position: relative;
  }
}
</style>
