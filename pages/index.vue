<template>
	<div id="homepagestyle">
		
		<Carousel :carousel="carouselData"/>
		<SpecialDeals />
		<PopularTours />
		<Globe />
		<AboutUS :aboutusData="aboutusData"/>
		<Footer />
	    <!-- <BackToTop /> -->
	</div>
</template>


<script>
import Carousel from '../components/Homepage/Carousel.vue'
import SpecialDeals from '../components/Homepage/SpecialDeals'
import PopularTours from '../components/Homepage/PopularTours'
import Globe from '../components/Homepage/Globe'
import AboutUS from '../components/Homepage/AboutUS'
import BackToTop from '../components/Public/BackToTop'

import axios from 'axios'
const apiUrl = process.env.API_URL 

export default {
	head: {
		title: 'Go4fun home page 🚀',
		meta: [
		{ hid: 'description', name: 'description', content: 'go4fun 旅游 悉尼 澳大利亚' }
			],
	},

	data(){
		return{
			cardList: '',
			aboutusData: {},
			carouselData: {}
		}
	},
	
	async asyncData({error}) {
		try {
			let {data} = await axios.get(`${apiUrl}/api/aboutus`);
			let carouselData = await axios.get(`${apiUrl}/api/getHeroBannerProducts`);
	
			let carousel = carouselData.data.map((item)=>{
			return {	
				 		id: item.id,
			 			title: item.title,
						sales_price: item.product.sales_price,
						hero_banner_image: `${apiUrl}/storage/${item.hero_banner_image}`,
						product_code: item.product.product_code,
						product_slug:item.product.slug,	
						state_slug: item.product.state.slug,

						// New	
						product: {
							name: item.product.product_name,
							duration: item.product.duration,
							sales_price: item.product.sales_price,	
						}	
			}
		})			
			data.aboutusImg = `${apiUrl}/storage/${data.aboutusImg}`
			return {aboutusData: data, carouselData: carousel}  			
		} catch {
			error({message: "we can't find the resource for you"})
            return {status: 400}
		}
	
    },
	
	async fetch({store, error}) {
		//get special deals data
		store.commit('productSummary/emptyList');
		try {
			const {data} = await axios.get(`${apiUrl}/api/specialdeals`)
        	data.forEach(item => { 
            store.commit('productSummary/add', {
                id: item.product.id,
				product_name: item.product.product_name,
				sales_price: item.product.sales_price,
				price: item.product.price,
				duration: item.product.duration,
				card_image: `${apiUrl}/storage/${item.product.card_image}`,
				product_code: item.product.product_code,
				state_id: item.product.state_id,
				state_slug:item.product.state.slug,
				product_slug: item.product.slug
            })
		})
		} catch {
			error({message: "we can't find the resource for you"})
            return {status: 400}
		}
      
		
		//get popular tours data
		store.commit('productSummary/emptyPopularToursList');
		try {
			const popular_data = await axios.get(`${apiUrl}/api/populartours`)
        	popular_data.data.forEach(item => { 
		
				store.commit('productSummary/addPopularTours', {
					id: item.product.id,
					product_name: item.product.product_name,
					sales_price: item.product.sales_price,
					price: item.product.price,
					duration: item.product.duration,
					card_image: `${apiUrl}/storage/${item.product.card_image}`,
					product_code: item.product.product_code,
					state_id: item.product.state_id,
					state_slug:item.product.state.slug,
					product_slug: item.product.slug
					
				})
		})
		} catch {
			error({message: "we can't find the resource for you"})
            return {status: 400}
		}
       
	},

	components:{
		Carousel,  SpecialDeals, PopularTours, Globe, AboutUS, BackToTop
	},


	  
};
</script>

<style scoped>
#homepagestyle{
	font-family: 'FangPingMedium';
}


.btn-to-top {
  width: 60px;
  height: 60px;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 22px;
  line-height: 22px;
}

</style>
