<template>
    <div>
    <b-card
        header="Primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center">
        <h6 slot="header" class="mb-0">{{this.$props.servername + "|" + this.$props.port + "|"+this.$props.subdomain}}</h6>
              <b-card-text >
                <div>
                  <div class="text-center">
                    <div v-if="!isNew">
                      <b-img src="/img/api.png" style="height: 60px"></b-img>
                    </div>
                    <div v-else>
                      <b-img src="/img/new icon.png" style="height: 60px"></b-img>
                    </div>
                  </div>
                  <p class="text-center">{{this.$props.full_Name}}</p>
                  <p class="text-center">{{this.$props.description}}</p>
                  <b-img src="/img/edit-solid.png" style="height: 30px" v-b-toggle.sidebar-no-header @click="showSidebar()"></b-img>
                </div>
              </b-card-text>

              <div slot="footer">
                <div>
                  Business Logik
                  <label class="switch">
                  <input type="checkbox" onclick="return false;" :checked="this.$props.classification=='DS'?true : false">
                  <span class="slider round"></span>
                  </label>
                  Data Service
                </div>
                <b-dropdown id="dropdown-1" text="Version" class="m-md-2">
                    <b-dropdown-item v-for="version in versions" :key="version.version" @click="setSwaggerLink(version.swaggerLink)">{{version.version}} ( {{version.found}} )
                    </b-dropdown-item>
                </b-dropdown>
                

                <b-button target="_blank" @click="latestVersion()" v-bind:href="swaggerLink" variant="outline-primary">
                  <span  style="float: right;">
                    <b-img src="/img/swagger.png"></b-img>&nbsp;Swagger
                  </span>
                </b-button>
                <br/>
                  found: {{this.getCreatedDate}}
              </div>
    </b-card>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment'

export default {
    created(){
        this.loadApiVersions();
        this.setLatestSwaggerLink(); 
    },
   data:()=>{
       return{
           versions: 'cache',
           swaggerLink: 'cache',
       }
   },
   computed: {
     isNew(){
       var cache = new Date(this.$props.found)*1;
       var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
       if(cache>=yesterday){
         console.log("here")
         return true;
       }else{
         return false;
       }
     },
     getCreatedDate(){
        return moment(this.$props.found).format("DD.MM.YYYY HH:mm");
     }
   },
   props: {
       id: Number,
       servername: String,
       port: Number,
       subdomain: String,
       full_Name: String,
       description: String,
       classification: String,
       found: String,
   },
   methods: {
    loadApiVersions(){
      axios
        .get('http://logicxvie01:10021/api/ApiEndpoints/'+this.$props.id+'/Versions')
        .then(response => (this.versions = response.data))
        .catch((error) => console.log( error.response.request._response ));
    },
    setSwaggerLink(swaggerLink){
        this.swaggerLink = swaggerLink;
    },
    setLatestSwaggerLink(){
        var highest = 0;
        for(var temp of this.versions){
            if(temp.id > highest){
                highest = temp.id;
                this.swaggerLink = temp.swaggerLink;
            }
        }
    },
    latestVersion(){
        if(this.swaggerLink == 'cache'){

            this.setLatestSwaggerLink();
        }
    },
    showSidebar(){
      this.$store.commit('setDisplayedApi',this.$props.id);
      this.$store.commit('setShowSideBar',true);
      this.$store.dispatch('loadApiOfSidebar');
    }
   } 
}
</script>
<style>
@media (min-width: 34em) {
  .card-columns {
    -webkit-column-count: 2;
    -moz-column-count: 2;
    column-count: 2;
  }
}
@media (min-width: 48em) {
  .card-columns {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
  }
}
@media (min-width: 62em) {
  .card-columns {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;
  }
}
@media (min-width: 75em) {
  .card-columns {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;
  }
}
.home-container {
  height: 100%;
  overflow: auto;
  width: 100%;
}
.search-result {
  margin-top: 5px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>