import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apis: [],
    groupElems: [],
    selectedProject: 0,
    isLoading: true,
    displayedApi: 0,    //==> which API is displayed in the sidebar right
    showSideBar: false,
    apiOfSidebar: null,
    editedDesc: " ",
    editedClassification: "",
    foundApis: [],     //==> the APIs which are found, when searching in the search field
    searchTerm: ""
  },
  mutations: {
    setApis (state, apis) {
      state.apis = null;
      state.apis = apis;
    },
    setGroupElems (state, groupElems){
      state.groupElems = groupElems;
    },
    setId(state, id){
      state.id = id;
    },
    setSelectedProject (state, selectedProject){
      state.selectedProject = selectedProject;
    },
    setLoadingStatus (state, loadingStatus){
      state.isLoading = loadingStatus;
    },
    setDisplayedApi(state, displayedApi){
      state.displayedApi = displayedApi;
    },
    setShowSideBar(state, showSideBar){
      state.showSideBar = showSideBar;
    },
    setApiOfSidebar(state, apifOfSidebar){
      state.apiOfSidebar = apifOfSidebar;
    },
    setFoundApis (state, foundApis){
      state.foundApis = foundApis;
    },
    setEditedDesc (state, editedDesc){
      state.editedDesc = editedDesc;
    },
    setSearchTerm (state, searchTerm){
      state.searchTerm = searchTerm;
    },
    setEditedClassification (state, editedClassification){
      state.editedClassification = editedClassification;
    }
  },

  getters: {
    getApis: state=>{
      return state.apis;
    },
    getGroupElems: state=>{
      return state.groupElems;
    },
    getId: state =>{
      return state.id;
    },
    getSelectedProject: state=>{
      return state.selectedProject;
    },
    getLoadingStatus: state =>{
      return state.isLoading;
    },
    getDisplayedApi: state=>{
      return state.displayedApi;
    },
    getShowSideBar: state=>{
      return state.showSideBar;
    },
    getApiOfSidebar: state=>{
      return state.apiOfSidebar;
    },
    getFoundApis: state=>{
      return state.foundApis;
    },
    getEditDesc: state=>{
      return state.editedDesc;
    },
    getSearchTerm: state=>{
      return state.searchTerm;
    },
    getEditedClassification: state=>{
      return state.editedClassification;
    }
  },

  actions: {
    async loadAllApis() {
      //load all API-Endpoints:
      axios.get(`http://logicxvie01:10021/api/apiEndpoints`)
      .then(response => {
        // JSON responses are automatically parsed.
        var temp = (response.data)
        this.commit('setApis', temp)
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    async loadGroupElems(){
      //load all GroupElems of the latest APIEndpoint-Verions
      axios.get(`http://logicxvie01:10021/api/GroupElems/NewestGroupElems`)
      .then(response => {
        // JSON responses are automatically parsed.
        var temp = (response.data)
        this.commit('setGroupElems',temp);
      })
      .catch(e => {
        this.errors.push(e)
      })
    },
    async loadFilteredApis(){
      if(this.state.selectedProject==0){
        this.dispatch('loadAllApis');
        return;
      }
      //load all API-Endpoints:
      axios.get('http://logicxvie01:10021/api/GroupElems/'+this.state.selectedProject+'/FilterEndpoints')
      .then(response => {
        // JSON responses are automatically parsed.
        var temp = (response.data)
        this.commit('setApis', temp);
      })
      .catch((error) => console.log( error.response.request._response ) );
    },
    async loadApiOfSidebar(){
      console.log(this.state.apis.length);
      for(var i=0;i<this.state.apis.length;i++){
        if(this.state.apis[i].id == this.state.displayedApi){
          this.state.apiOfSidebar = this.state.apis[i];
        }
      }
    },
    async updateCurApi(){
      if(this.state.editedDesc==""){
        this.state.editedDesc="-";
      }
      //update the API
      console.log(this.state.editedDesc);
      const res = await axios.put('http://logicxvie01:10021/api/ApiEndpoints/edit/'+this.state.apiOfSidebar.id+'/'+this.state.editedDesc+'/'+this.state.editedClassification);
      console.log(res.data.json);
    },
    async searchApis (){
      //load all API-Endpoints:
      axios.get('http://logicxvie01:10021/api/ApiEndpointVersions/'+this.state.searchTerm+'/search')
      .then(response => {
        // JSON responses are automatically parsed.
        var temp = (response.data)
        this.commit('setFoundApis', temp)
      })
      .catch(e => {
        this.errors.push(e)
      })
      this.commit('setLoadingStatus',false);
    }
  },
  modules: {
  }
})
