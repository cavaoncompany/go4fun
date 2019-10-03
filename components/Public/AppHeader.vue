<template>

  <b-container fluid id="header">
    <b-container class="contactStyle">
    <b-row align-h="between">
      <b-col cols="6" sm="10" >
        <span>致電 {{basicInfos.hotline}} </span><span class="addborder"> 電郵 {{basicInfos.email}}</span>
      </b-col>
      <b-col cols="2" ><nuxt-link to="/contactus"><p class="addborder">聯系我們</p></nuxt-link></b-col>
    </b-row>
    </b-container>
  </b-container>

</template>

<script>
import { BContainer, BNavbar } from "bootstrap-vue";

export default {
    data(){
        return{
            basicInfos: ""
        }
    },

    mounted(){
        this.basicInfos = this.$store.getters.basicInfos
        
    }

};
</script>

<style  scoped>
#header {
  background-color: #103a5b;
  height: 31px;
  color: white;
}

.contactStyle{
  font-size:12px;
 
  line-height: 31px;
}
.contactStyle span{
 border-left: 1px solid white; 
  padding:10px 15px; 
}
.addborder{
    border-right:1px solid white;
    border-left: 1px solid white;
    text-align: center;
    color:white;
   
}

@media  (max-width: 768px) {
  #header {
    display: none;
  }
}

.navbar-text{
  font-size:16px;
  color:#103A5B;
  letter-spacing: 2px;
 
}


</style>
