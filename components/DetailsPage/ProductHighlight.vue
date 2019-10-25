<template>
    <b-container id="productHighlight">
        <b-row>
            <b-col sm="12">
                <h4>線路特色</h4>
            </b-col>
        </b-row>
 
        <b-row style="border-top: 2px solid #F7F5F1">
				<div class="card-carousel-wrapper">
					<div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
					<div class="card-carousel">
						<div class="card-carousel--overflow-container">
							<div
								class="card-carousel-cards"
								:style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
							>
							<div class="card-carousel--card hilightlistStyle" 
                                v-for="(img, index) in spotsData" :key="index" sm="6" lg="4" xl="3">
									<img :src="img.image"  style="height: 141px;"/>
									<p>{{ img.name }}</p>

								</div>
							</div>
						</div>
					</div>
					<div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
				</div>	
		</b-row>

    </b-container>
</template>

<script>
export default {
    props:[ 'spotsData'],
    data() {
		return {
			currentOffset: 0,
			windowSize: 2,
			paginationFactor: 275,
		};
    },
    
    created() {
		if(process.client){
			window.addEventListener('resize', this.handleResize)
			this.handleResize();
		}
      },
      
  	destroyed() {
		if(process.client){
			window.removeEventListener('resize', this.handleResize)
		}
  	},
    computed: {
		atEndOfList() {        
			return (
				this.currentOffset <= this.paginationFactor * -1 * (this.spotsData.length - this.windowSize)
			);
		},
		atHeadOfList() {
			return this.currentOffset === 0;
		}
	},
	methods: {
		moveCarousel(direction) {
			if (direction === 1 && !this.atEndOfList) {
				this.currentOffset -= this.paginationFactor;
			} else if (direction === -1 && !this.atHeadOfList) {
				this.currentOffset += this.paginationFactor;
			}
        },
        
        handleResize() {
			let width = window.innerWidth;
			if( width >=1200){
				this.windowSize = 4;
			}
			if( width>=992 && width<1200){
				this.windowSize = 3;
			}
			if( width>=768 && width<992){
				this.windowSize = 2;
			}
			if( width < 768){
				this.windowSize = 1;
			}
		},
	}

}
</script>

<style scoped>
   #productHighlight {
	background-color: white;
	padding: 1.5rem;
}
#productHighlight .hilightlistStyle {
	color: #7f7f7f;
	font-size: 14px;
	padding-top: 2rem;
}
#productHighlight h4 {
	font-size: 20px;
	letter-spacing: 3px;
	color: #103a5b;
	padding-bottom: 1rem;
}
#productHighlight .hilightlistStyle {
	text-align: center;
}

.card-carousel-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20px auto;
}
.card-carousel {
	display: flex;
	justify-content: center;
	width: 1080px;
  
}
@media (min-width:992px) and (max-width: 1200px){
    .card-carousel{
        width:805px;
        margin:10px;
    }
}

@media (min-width:768px) and (max-width: 992px){
    .card-carousel{
        width:530px;
        margin:10px;
    }
}

@media (max-width:768px){
    .card-carousel{
        width:255px;
        margin:20px;
    }
}
.card-carousel--overflow-container {
	overflow: hidden;
}
.card-carousel--nav__left,
.card-carousel--nav__right {
	display: inline-block;
	width: 15px;
	height: 15px;
	box-sizing: border-box;
	border-top: 3px solid #103a5b;
	border-right: 3px solid #103a5b;
	cursor: pointer;
	transition: transform 150ms linear;
}
.card-carousel--nav__left[disabled],
.card-carousel--nav__right[disabled] {
	opacity: 0.2;
	border-color: black;
}
.card-carousel--nav__left {
	transform: rotate(-135deg);
}
.card-carousel--nav__left:active {
	transform: rotate(-135deg) scale(0.9);
}
.card-carousel--nav__right {
	transform: rotate(45deg);
}
.card-carousel--nav__right:active {
	transform: rotate(45deg) scale(0.9);
}
.card-carousel-cards {
	display: flex;
	transition: transform 150ms ease-out;
	transform: translatex(0px);
}
.card-carousel-cards .card-carousel--card {
	margin: 0 10px;
	cursor: pointer;
	z-index: 3;
	margin-bottom: 2px;
}
.card-carousel-cards .card-carousel--card:first-child {
	margin-left: 0;
}
.card-carousel-cards .card-carousel--card:last-child {
	margin-right: 0;
}
.card-carousel-cards .card-carousel--card img {
	vertical-align: bottom;
	transition: opacity 150ms linear;
	user-select: none;
}
.card-carousel-cards .card-carousel--card img:hover {
	opacity: 0.5;
}
.card-carousel-cards .card-carousel--card--footer {
	border-top: 0;
	padding: 7px 15px;
}
.card-carousel-cards .card-carousel--card--footer p {
	padding: 3px 0;
	margin: 0;
	margin-bottom: 2px;
	font-size: 19px;
	font-weight: 500;
	color: #2c3e50;
	user-select: none;
}
</style>
