<template>
   
    <b-container fluid id="navBar">
        <b-container style="position:relative">
            <b-navbar toggleable="md">
                <b-navbar-toggle target="nav-text-collapse" class=""></b-navbar-toggle>
                <b-navbar-brand href="/">
                    <img src="/images/logo.png" alt="logo">
                </b-navbar-brand>

                <b-collapse id="nav-text-collapse" is-nav >
                    <b-navbar-nav class="mx-4" v-for="navlink in states" :key="navlink.id">
                        <nuxt-link :to="'/'+navlink.slug">{{navlink.state}}</nuxt-link>
                    </b-navbar-nav >
                         
                    <b-navbar-nav class="ml-auto" @click="showSearch = !showSearch">
                        <i class="fas fa-search" style="color:black"></i>
                    </b-navbar-nav>
                </b-collapse>
            </b-navbar>
            <b-row v-if="showSearch" >
                <b-col>
                    <SearchModal/>
                </b-col>
            </b-row>
        </b-container>
    
    </b-container>
</template>

<script>
import SearchModal from './SearchModal';
export default {
    components: {SearchModal},
    data(){
        return{
            showSearch: false,
            states: []
        }
    },
    created(){
        this.states = this.$store.getters.statesList;
    }
}
</script>

<style scoped>
    #navBar{
        height:auto;
        padding:0;
        margin-right:0;
        background-color: white !important;
    }

    .navbar-nav a{
      color:#103a5b;
    }

   
    
    @media (max-width: 575px){
      .ml-auto{
        margin-left:1.5rem !important;
        margin-top:0.5rem;
      }
    }

    @media (min-width: 576px){
      .ml-auto{
        margin:-1.5rem;
      }
    }
     
</style>
