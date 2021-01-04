<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/">API Management</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item active">
            <router-link to="/search" class="nav-link">Search</router-link>
          </li> 
        </ul>
        <div style="margin-left: 10px;">
          <b-img src="/img/htlperg.png" style="height: 55px"></b-img>
          <b-img src="/img/logicx1.png" style="height: 35px"></b-img>
        </div>
        <div class="form-inline my-4 my-lg-0">
          <input
            id="searchText"
            class="form-control mr-sm-4"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchText"
            @keyup.enter="searchApis"
          >
          <button
            type="button"
            class="btn btn-outline-success my-2 my-sm-0"
            @click="searchApis()"
          >Search</button>
        </div>
      </div>
    <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
    <content>
      <router-view/>
    </content>
  </div>
</template>

<script>
export default {
  data: () =>({
    searchText: ""
  }),
  methods:{
    searchApis(){
      if(this.searchText != ""){
        this.$store.commit('setSearchTerm',this.searchText);
        this.$store.dispatch('searchApis');
        if(window.location.hash!="#/search"){
          this.$router.push("search");
        }
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
