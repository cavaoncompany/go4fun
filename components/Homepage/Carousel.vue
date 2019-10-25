<template>
  <b-carousel
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000;
    background-color: #f7f5f1;"
    fade
    indicators
    img-height="400"
  >
    <div
      class="carousel-inner"
      style="max-width: 1440px;
    margin-left:auto;
    margin-right: auto;"
    >
      <section v-for="card in carousel" :key="card.id">
        <nuxt-link
          :to="'/'+ card.product_slug + '/'+ card.product_code"
          style="text-decoration:none"
        >
          <div class="carousel-item active imagebox" :style="{ backgroundImage: 'url(' + card.hero_banner_image + ')'}">

            <div class="imagebox-desc">
                <div class="desc-display">
                  <div class="desc-duration" v-if="typeof card.product.duration == 'number' && card.product.duration > 0">
                    <p class="d-flex">
                      <span class="desc-duration-days">{{card.product.duration}}天</span>
                      <span class="desc-duration-nights" v-if="card.product.duration - 1 > 0">{{card.product.duration -1}}夜</span>
                    </p>
                  </div>
                  <h5>{{card.product.name}}</h5>
                  <h4 class="mt-4">${{numberWithCommas(card.sales_price)}}</h4>
                </div>
             
            </div>
          </div>
        </nuxt-link>
      </section>
    </div>
  </b-carousel>
</template>

<script>
export default {
  props: ["carousel"],
  mounted() {
  },
  methods: {
    numberWithCommas(x) {
      x = Math.floor(x);
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
};
</script>

<style scoped>
/* .carousel-inner{
    background-color: #f7f5f1;
    max-width: 1440px;
    margin-left:auto;
    margin-right: auto;
} */
.imagebox {
  position: relative;
  background-repeat: no-repeat;
  height: 400px;
  background-size: cover;
}
.imagebox .imagebox-desc {
  background-image: linear-gradient(
    180deg,
    rgba(51, 122, 1178, 0.2),
    rgba(16, 58, 91, 1)
  );
  /* max-width:455px; */
  width: 30%;
  height: 100%;
  color: white;
  font-size: 1.2em;
  left: 0px;
  /* padding: 0px 40px; */
  position: absolute;
  transition: 0.5s padding;
  top: 0;
}

.imagebox-desc .desc-display{
    position: absolute;
    right: 50px;
    bottom: 100px;
    /* padding: 0 12px; */
    width: 60%;

}
@media (max-width: 1000px) {
  .imagebox {
    background-position: right -250px center;
  }
  .imagebox .imagebox-desc {
    width: 35%;
  }
}
@media (max-width: 768px) {
  .imagebox .imagebox-desc {
    width: 40%;
  }
}
@media (max-width: 576px) {
  .imagebox .imagebox-desc {
    width: 73%;
  }
}
.imagebox-desc p {
  font-size: 16px;
}
.imagebox-desc h5 {
  font-size: 20px;
}
.imagebox-desc h4 {
  font-size: 24px;
}
</style>
