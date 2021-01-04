<template>
  <b-container style="margin-top: 20px" fluid class="bv-example-row">
      <div v-if="this.$store.getters.getLoadingStatus" class="spinner">
        <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
      </div>
      <div v-if="!this.$store.getters.getLoadingStatus">
        <h4>Results for the Search Term: {{this.$store.getters.getSearchTerm}}</h4>
        <b-card header="Groupelems:"
        header-bg-variant="primary"
        header-text-variant="white">
            <div v-for="(searchItem, index) in foundApis" :key="index">
              <div v-if="searchItem.method==null">
                <span style="float:left;"><b>{{searchItem.groupElem.elem}}</b></span>
                
                <b-button target="_blank"  v-bind:href="searchItem.swaggerLink" variant="outline-primary"  style="float:right;">
                  <span  style="float: right;">
                    <b-img src="/img/swagger.png"></b-img>&nbsp;Swagger
                    <span>{{searchItem.version}}</span>
                  </span>
                </b-button>
                <span style="float: right; padding:0px 50px;">  {{searchItem.apiEndpoint.ip}}:{{searchItem.apiEndpoint.port}}|{{searchItem.apiEndpoint.full_Name}}</span>
                <br/>
                <hr/>
              </div>
            </div>
        </b-card>
        <b-card header="Methods:"
        header-bg-variant="primary"
        header-text-variant="white">
            <div v-for="(searchItem, index) in foundApis" :key="index">
              <div v-if="searchItem.method!=null&&searchItem.parameter==null">
                <span style="float:left;">{{searchItem.groupElem.elem}}</span>
                <span><b>{{searchItem.method.methodName}}</b></span>
                <b-button target="_blank"  v-bind:href="searchItem.swaggerLink" variant="outline-primary"  style="float:right;">
                  <span  style="float: right;">
                    <b-img src="/img/swagger.png"></b-img>&nbsp;Swagger
                    <span>{{searchItem.version}}</span>
                  </span>
                </b-button>
                <span style="float: right; padding:0px 50px;">  {{searchItem.apiEndpoint.ip}}:{{searchItem.apiEndpoint.port}}|{{searchItem.apiEndpoint.full_Name}}</span>
                <br/>
                <hr/>
              </div>
            </div>
        </b-card>
        <b-card header="Parameters:"
        header-bg-variant="primary"
        header-text-variant="white">
            <div v-for="(searchItem, index) in foundApis" :key="index">
              <div v-if="searchItem.method!=null&&searchItem.parameter!=null">
                <span style="float:left;">{{searchItem.groupElem.elem}}</span>
                <span>{{searchItem.method.methodName}} | </span>
                <span><b>{{searchItem.parameter.parameterName}}</b></span>
                <b-button target="_blank"  v-bind:href="searchItem.swaggerLink" variant="outline-primary"  style="float:right;">
                  <span  style="float: right;">
                    <b-img src="/img/swagger.png"></b-img>&nbsp;Swagger
                    <span>{{searchItem.version}}</span>
                  </span>
                </b-button>
                <span style="float: right; padding:0px 50px;">  {{searchItem.apiEndpoint.ip}}:{{searchItem.apiEndpoint.port}}|{{searchItem.apiEndpoint.full_Name}}</span>
                <br/>
                <hr/>
              </div>
            </div>
        </b-card>
      </div>
  </b-container>
</template>


<script>
export default {
  computed: {
    foundApis(){
        return this.$store.getters.getFoundApis;
    },
  }
}
</script>
<style>
.spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 50%;
  right: 50%; /* or: left: 50%; */
}
</style>
