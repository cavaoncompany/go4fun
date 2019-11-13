<template>
   <div>
        <DetailsCarousel :carouselData="carouselData"/>
        <DetailsNavSection  :navBarData="navBarData"/>
        <div class="backgroundstyle">
            <ProductIntro :introData="introData"/>
            <span v-if="$device.isMobile">
                <ProductHighlightMobile :spotsData="spotsData"/>
            </span>
            <span v-else>
                <ProductHighlight :spotsData="spotsData"/>
            </span>
            <FeeDesc :productFeeDesc="productFeeDesc"/>
            <productDaysPlan :daysplan="productDaysPlan" />
            <ProductNeedsToKnow :needsToKnow="needsToKnow" />
            <span  v-if="recommendProducts.length">
                <YouMightInterested :recommendProducts="recommendProducts"/>
            </span>
        </div> 
   </div>
</template>

<script>
import DetailsCarousel from '../../../components/DetailsPage/DetailsCarousel';
import DetailsNavSection from '../../../components/DetailsPage/DetailsNavSection';
import ProductIntro from '../../../components/DetailsPage/ProductIntro';
import ProductHighlight from '../../../components/DetailsPage/ProductHighlight';
import FeeDesc from '../../../components/DetailsPage/FeeDesc';
import productDaysPlan from '../../../components/DetailsPage/ProductDaysPlan';
import ProductNeedsToKnow from '../../../components/DetailsPage/ProductNeedsToKnow';
import YouMightInterested from '../../../components/DetailsPage/YouMightInterested';
import ProductHighlightMobile from '../../../components/DetailsPage/ProductHighlightMobile';
import axios from 'axios'
const apiUrl = process.env.API_URL
export default {
    components: { DetailsCarousel, DetailsNavSection, ProductIntro, ProductHighlight, FeeDesc, productDaysPlan, ProductNeedsToKnow, YouMightInterested, ProductHighlightMobile},
    data(){
        return{  
            navBarData: {},
            productDetails: {},
            introData: {},
            spotsData: [],
            productFeeDesc: {},
            productDaysPlan:{},
            needsToKnow:{},
            recommendProducts:[],
            carouselData: []
        } 
    },

  
    async asyncData({params, redirect, error}){
    
        try {
                let code = params.code;
               
                const {data} = await axios.get(`${apiUrl}/api/${code}/withDetails`);
                data.spots.map((item)=>{          
                    item.image= `${apiUrl}/storage/${item.image}`
                    return item;
                })
                data.recommends.map((item)=>{
                    item.card_image= `${apiUrl}/storage/${item.card_image}`
                })
                data.banner_image = JSON.parse(data.banner_image);
                const banner_image = data.banner_image.map((item)=>{
                    item = `${apiUrl}/storage/${item}`
                    return item;
                })
                data.banner_image = banner_image;
                return {productDetails: data};   
        } catch {
            error({message: "we can't find the resource for you"})
            return {status: 400}
        }
       
 
    },
   
    created(){
        this.carouselData = this.productDetails.banner_image
        this.navBarData = {
            id : this.productDetails.id,
            product_name : this.productDetails.product_name,
            sales_price : this.productDetails.sales_price,
            price : this.productDetails.price,
            product_code : this.productDetails.product_code,
            state : this.productDetails.state,   
            product_description: this.productDetails.product_description,
            price_description:this.productDetails.price_description
        }
       
        this.introData = {
            tour_language: this.productDetails.tour_language,
            pick_up_service: this.productDetails.pick_up_service,
            meals: this.productDetails.meals,
            policy: this.productDetails.policy,
            travel_document: this.productDetails.travel_document,
            duration : this.productDetails.duration,
            departure_dates: this.productDetails.departure_dates, //Departure Dates
            pickup_points: this.productDetails.pickup_points, //Pickup Point

        }
        this.spotsData = this.productDetails.spots;

        this.productFeeDesc = {
            inclusion: this.productDetails.inclusion,
            exclusion: this.productDetails.exclusion
        }
        this.productDaysPlan = JSON.parse(this.productDetails.ltinerary)
      
        this.needsToKnow = this.productDetails.terms_conditions
                 
        this.recommendProducts= this.productDetails.recommends
    },
}
</script>

<style scoped>
    .backgroundstyle{
        background-color:#f7f5f1;
        padding-top: 0.1rem;
        padding-bottom:0.1rem;
    }
</style>
