<template>
    <b-container fluid id="footer">
        <b-container>
            <div class="d-flex justify-content-between">
                <section class="footerLogo">
                    <img src="/images/footerlogo.png"  alt="footer logo"/>
                </section>
                <section >
                    <b-nav class="links" style="font-size:14px">
                        <b-nav-item active to="/aboutus">關於我們</b-nav-item>
                        <b-nav-item to="/contactus">聯繫我們</b-nav-item>
                        <b-nav-item class="getridofline" >隱私政策</b-nav-item>
                    </b-nav>
                </section>
                <section>
                    <div class="social">
                        <a v-if="social.facebook" :href="social.facebook" target="_blank"><i class="fab">&#xf39e;</i></a>
                        <a v-if="social.instagram" :href="social.instagram" target="_blank"><i class="fab">&#xf16d;</i></a>
                        <a v-if="social.linkedin" :href="social.linkedin" target="_blank"><i class="fab">&#xf0e1;</i></a>
                        <a v-if="social.twitter" :href="social.twitter" target="_blank"><i class="fab">&#xf099;</i></a>
                        <i v-if="social.wechat_qr_image" class="fab fa-weixin" @click="showModal = true"></i>
                    </div>

                    <div v-if="showModal && social.wechat_qr_image">
                        <transition name="modal">
                            <div class="modal-mask" @click="showModal = false">
                                <div id="modal_wechat" class="modal-wrapper">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-body">
                                                <img :src="social.wechat_qr_image" alt="wechat qr"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                    </div>
                   
                </section>
            </div>
            <div class="text-center mt-3">
                  <p>Copyright 2019 @ Go4Fun Travel Services</p>
            </div>
        </b-container>
    </b-container>

</template>

<script>
import axios from 'axios'
const apiUrl = process.env.API_URL || 'http://localhost:80'
export default {
    data(){
        return {
            social: {},
            showORCode: false,
            showModal: false,
        }
    }, 
    
    async mounted() {
        let {data} = await axios.get(`${apiUrl}/api/settings/social`);
        console.log(data)
        this.social = data;
        
        // TEMP
        if(typeof this.social.wechat_qr_image == 'undefined'){
            this.social.wechat_qr_image = "/images/wechat-qr.png";
        }
        // TEMP

        return {social: data};
    },
}
</script>

<style scoped>
#footer{
    background-color: #103A5B;
    padding:25px;
    color:white;

}

.footerLogo{
    padding-right: 0.5rem;
}

.links{
    margin-right: 45px;
}
.links a{
    color: white;
    border-right:1px solid white;
    line-height: 5px;
    margin-top:10px;
}

.links li{
    margin:auto;
}
.getridofline a{
    border-right:none !important;
}

i.fab {
    font-size:1em;
    border-radius: 50%;
    background-color:white;
    color: #103A5B;
    line-height: 2em;
    width: 2em;
    height: 2em;
    text-align: center;
    display: inline-block;
    transition:0.5s;
    margin:5px;
}

.nav-link{
    padding:0.5rem 0.5rem !important;
}

@media (max-width: 500px) {
  .links a{
    border: none;
  }
  .links{   
    margin-right: 0;
    }
}

@media (min-width:930px){
    .social{
        position:relative;
    }
    .qrcode{
        position: absolute;
        left: 90px;
        top: -25px;
    }
}

@media (max-width:930px){
     .social{
        position:relative;
    }
    .qrcode{
        position: absolute;
        z-index: 15;
        bottom:30px;
        left:0
        
    }
}


/* @media (max-width: 575px) {
  #footer {
    display: none;
  }
} */

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

#modal_wechat.modal-wrapper .modal-dialog{
    text-align: center;
}

#modal_wechat.modal-wrapper .modal-content{
    display: inline-flex;
    width: auto;
}

</style>
