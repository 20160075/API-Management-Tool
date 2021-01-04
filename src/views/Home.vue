<template>
  <div class="home">
<b-container style="margin-top: 20px" fluid class="bv-example-row">
  <b-row>
    <b-col xl="2" lg="3" sm="3">
        <b-list-group>
          <b-list-group-item button
            class="rounded-0"
            @click="selectProject(0)"
            href="#"
            :active="selectedProject==0?true:false"
            style="text-align: left"
          >All</b-list-group-item>
          <b-list-group-item button
            @click="selectProject(groupElem.id)"
            v-for="groupElem in groupElemData"
            :key="groupElem.id"
            href="#"
            :active="selectedProject==groupElem.id?true:false"
            style="text-align: left"
          >{{groupElem.elem}}
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col xl="10" lg="9" sm="9" style="padding-left:0px">
      <div class="home-container">
          <div class="card-deck">
            <label v-for="(api, index) in apiData" :key="index">
              <div id = "card">
                  <app-card :id="api.id" :servername="api.servername" :port="api.port" :subdomain="api.subdomain" :full_Name="api.full_Name" :description="api.description" :classification="api.classification" :found="api.found"/>
              </div>
            </label>
          </div>
        </div>
        <div v-if="showSidebar">
          <b-sidebar id="sidebar-no-header" aria-labelledby="sidebar-no-header-title" shadow>
            <template>
              <div class="px-3 py-2">
                <h4 id="sidebar-no-header-title">Edit API-Endpoint</h4>
                <p></p>
                <nav class="mb-3">
                  <b-nav vertical>
                    <p>API-Endpoint: {{apiOfSideBar.full_Name}}</p>
                    <p>Description: </p>
                    <div>
                      <b-form-textarea
                        id="textarea"
                        v-model="desc"
                        rows="3"
                        max-rows="6"
                      ></b-form-textarea>
                    </div>
                    <br/>
                    <p>Classification: </p>
                    <div>
                        Business Logik
                        <label class="switch">
                          <input v-model="classification" type="checkbox" :checked="classification">
                        <span class="slider round"></span>
                        </label>
                        Data Service
                    </div>
                    <br/>
                  </b-nav>
                </nav>
                <b-button variant="primary" block @click="saveData()">Save Data</b-button>
                <b-button variant="primary" block @click="closeSideBar()">Close Sidebar</b-button>
              </div>
            </template>
          </b-sidebar>
        </div>
      </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

export default {
  created(){
    this.$store.dispatch('loadGroupElems');
    this.$store.dispatch('loadAllApis');
  },
  data: () => ({
    desc: "Description",
    classification: false
  }),
  computed: {
    groupElemData() {
      return this.$store.getters.getGroupElems;
    },
    IsLoading(){
      return this.$store.getters.getLoadingStatus;
    },
    apiData(){
      //console.log(this.$store.getters.getApis)
      return this.$store.getters.getApis;  
    },
    selectedProject(){
      return this.$store.getters.getSelectedProject;
    },
    showSidebar(){
      return this.$store.getters.getShowSideBar;
    },
    apiOfSideBar(){
      this.setValues();
      return this.$store.getters.getApiOfSidebar;
    },
  },
  methods: {
    selectProject(elem){
      this.$store.commit('setSelectedProject',elem);
      this.$store.dispatch('loadFilteredApis');
    },
    closeSideBar(){
      this.$store.commit('setShowSideBar',false);
      this.$router.go(this.$router.currentRoute)
    },
    saveData(){
      if(this.classification==true){
        this.$store.commit('setEditedClassification','DS');
      }else{
        this.$store.commit('setEditedClassification','BL');
      }
      this.$store.commit('setEditedDesc',this.desc);
      this.$store.dispatch('updateCurApi');
      //this.closeSideBar();
    },
    setValues(){
      this.desc = this.$store.getters.getApiOfSidebar.description;
      var classification = this.$store.getters.getApiOfSidebar.classification;
      this.classification = false;
      if(classification=='DS'){
        this.classification = true;
      }
    }
  },
}
</script>

