<template>
<div>
    <b-container fluid id="countryNavBarComp" >
        <b-container class="countrynavbar">
            <b-row>
                <b-col cols="auto" class="mr-auto p-3 countryname ">
                    <h5>{{countrycities.state.state}}</h5>
                </b-col>
              
                <b-col cols="auto" >
                    <b-nav class="justify-content-end">
                        <b-nav-item class="p-3" active>共{{productNum}}個商品</b-nav-item>
                        <b-nav-item class="p-3" @click="$emit('priceByOrder')" :style="{opacity:opacityValue}">價格
                            <i :class="arrowPriceDirection"></i>
                        </b-nav-item>
                        <b-nav-item class="p-3" @click="$emit('daysByOrder')" :style="{opacity:opacityValue1}">天數
                            <i :class="arrowDaysDirection"></i>
                        </b-nav-item>
                        <b-nav-item  @click="switchFilter()" class="filterBackground p-3">籂選
                            <i :class="filtericon"></i>
                        </b-nav-item>
                    </b-nav>
                </b-col>
            </b-row>  
        </b-container>
    </b-container>
    <b-container v-if="filter == true" fluid style="background-color:white" class="cityNav">
        <b-container>
            <b-row >
                <b-col sm="12" class="mt-4 mb-1" style="color:#4f4f4f; font-size:14px">
                    请选择要去的地方
                </b-col>
            </b-row>
            <b-row>
              
                 <b-col v-for="city in countrycities.cities" :key="city.id" 
                            class="justify-content-between"
                            lg="2" cols="6" md="4" 
                            @click="clickFunc(city.id)" >
                        <div :class="['tab-button', { active: currentTab === city.id }]" > 
                           {{city.name}}
                        </div>

                 </b-col>
               
             
            </b-row>
        </b-container>
    </b-container>
</div>
</template>

<script>
export default {
    props: ['countrycities', 'productNum', 'arrowPriceDirection', 'arrowDaysDirection', 'opacityValue', 'opacityValue1', 'isActive'],

    data(){
        return{
            filter: false,
            sortprice: true,
            filtericon: 'fas fa-sliders-h',
            open: false,
            currentTab: 'showall'
        }
    },

    methods:{
        switchFilter(){
            this.filter = !this.filter;
            this.open = !this.open;
            if(this.open){
                this.filtericon = "fas fa-times setColour"
            }else{
                this.filtericon = "fas fa-sliders-h"
            }
        },
        clickFunc(cityId){
            this.currentTab = cityId;
            this.$emit('filterProductByCity', cityId);
        }  
    },

    mounted(){
    }
   
}
</script>

<style scoped>
    #countryNavBarComp{
        background-color: #103a5b;
        padding:0;
        /* margin-bottom: 2rem; */
        color:white;
    }

    #countryNavBarComp li a{
        color:white;
    }
    .cityNav{
        margin-bottom: 40px;
    }
    .cityNav .nav-item{
        margin:auto; 
    }

    .cityNav .tab-button{
        margin-top: 20px;
        border:none;
        border-radius: 0; 
        background-color:  rgba(194,165,121,0.1);
        color:#897b72;
        padding: 0.5rem;
        text-align: center;
        cursor: pointer;
    }
    
    .cityNav .tab-button.active{
        background-color:#C2A579;
        color:#897b72;
    }

    .cityNav .nav-link{
        color:white;
    }
    
    .countrynavbar h5{
        padding-top: 0.5rem;

    }
    .filterBackground{
        background-color:  rgba(27,117,187,0.3);
        
    }
  
    @media (max-width: 589px){
        .countrynavbar  .countryname{
            margin:auto;
        }
        .countrynavbar .nav-link{
            padding: 0.5rem 0.4rem;
        }
        .justify-content-end{
            justify-content: flex-start !important;
        }
    }
</style>
