<template>
    <div class="container-fluid" id="populartour">
        <div class="col-md-12" style="text-align:center; margin:70px 0">
            <h4>特別推薦</h4>
            <h5>POPULAR TOUR</h5>
        </div>
        <div class="container">
            <div class="row">
                <div v-for="tour in cardList" :key="tour.id" class="paddingStyle col-md-3 col-xs-6 col-sm-4 col-6" style="margin-bottom:20px;"> 
                    <PopularTourCard :tour="tour" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PopularTourCard from './PopularTourCard'
export default {
    components:{
		PopularTourCard
    },
    
     computed: {
       cardList(){
           return this.$store.getters['productSummary/popularList']
       } 
    },  

}
</script>

<style>
#populartour h4{
    font-size:18px;
    color:#103A5B;
    letter-spacing: 2px;
   
}
#populartour h5{
    font-size:14px;
    color:#103A5B;
    font-family: 'Playfair Display', serif;
    letter-spacing: 3px;
    line-height: 3px;
}

@media (min-width: 990px) and (max-width: 1200px){
    .col-md-3{
        flex: 0 0 33.3333%;
        max-width: 33.3333%;  
    }
}

@media (min-width: 768px) and (max-width: 990px){
    .col-md-3{
        flex: 0 0 50%;
        max-width: 50%;  
    }
}

@media (max-width: 768px){
    .paddingStyle{
      padding-left:0px !important;
      padding-right: 0px !important;
    }
}
</style>
