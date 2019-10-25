<template>
    <b-container fluid style="background-color:#f7f5f1;" id="contactus">
        <b-container>
            <b-row>
                <b-col md="8" cols="12">
                    <b-form class="contactusform" 
                            @submit.prevent="sendContactUsEmail"      
                    >
                        <b-row >
                            <h4>聯系我們</h4>
                        </b-row>
                        <div class="formcontent">
                            <b-row>
                                <b-col md="12">
                                    <b-form-group  label="姓名*" lable-for="name" >
                                        <b-form-input name="name"  v-model="name"  required  ></b-form-input>
                                    </b-form-group>   
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col md="6">
                                    <b-form-group  label="電郵*"  lable-for="email">
                                        <b-form-input  name="email"  required  type="email"  v-model="email" ></b-form-input>
                                    </b-form-group>  
                                </b-col> 
                                <b-col md="6">
                                    <b-form-group   label="電話*"   lable-for="phone" >
                                        <b-form-input name="phone"  required   type="tel"   v-model="phone" ></b-form-input> 
                                    </b-form-group>  
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <b-form-group  label="請留下你的信息"  lable-for="textarea" >
                                        <b-form-textarea   name="message"  style="border-radius:3px;" v-model="msg"  rows="3" ></b-form-textarea>   
                                    </b-form-group>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-button type="submit"  variant="primary"  class="formBtn"  :disabled="isDisabled">
                                    <span v-if="loading"><i class="fas fa-spinner fa-spin" style="color:black;"></i></span>
                                    <span v-else>提交</span>
                                </b-button>
                            </b-row>
                            <b-row v-if="errors.length">
                                <b-col sm="12">
                                    <div class="alert alert-danger">
                                        <b>Please correct the following error(s):</b>
                                        <ul>
                                            <li v-for="error in errors" :key="error.id">{{ error }}</li>
                                        </ul>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row v-if="message.length">
                                <b-col sm="12">
                                    <div class="alert alert-success">{{message}}</div>
                                </b-col>
                            </b-row>
                        </div>
                    </b-form>
                </b-col>
                <b-col md="4" cols="12" class="contactinfoform">
                    <b-form>
                        <h4>公司信息</h4>
                        <div class="formcontent">
                            <b-col v-if="business_info.hotline">
                                <h5>咨詢熱線</h5>
                                <p>{{business_info.hotline}}</p>
                            </b-col>

                            <b-col v-if="business_info.emergency_contact">
                                <h5>緊急電話</h5>
                                <p>{{business_info.emergency_contact}}</p>
                            </b-col>

                            <b-col v-if="business_info.email">
                                <h5>電郵地址</h5>
                                <p>{{business_info.email}}</p>
                            </b-col>

                            <b-col v-if="business_info.address_1">
                                <h5>店鋪地址</h5>
                                <p>
                                    <span v-if="business_info.address_1">{{business_info.address_1}}</span>
                                    <span v-if="business_info.address_2">, {{business_info.address_2}}</span>
                                    <span v-if="business_info.suburb">, {{business_info.suburb}}</span>
                                    <span v-if="business_info.state">, {{business_info.state}}</span>
                                    <span v-if="business_info.country">, {{business_info.country}}</span>
                                </p>
                            </b-col>

                            <b-col v-if="business_info.trading_hours">
                                <h5>工作時間</h5>
                                <b-row class="contentStyle">
                                    <b-col>
                                        <span v-html="business_info.trading_hours"></span>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </div>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>

<script>
import axios from 'axios'
const apiUrl = process.env.API_URL || 'http://localhost:80'
export default {
    layout: 'formpagelayout',
    head: {
		title: 'About US PAGE',
		meta: [
		{ hid: 'description', name: 'description', content: '联系我们' }
			],
	},
    data(){
        return{
            business_info: {},
            name: '',
            email: '',
            phone: '',
            msg: '',
            message: '',
            errors: [],
            isDisabled: false,
            loading: false,
        }
    },

     async asyncData({redirect}) {
         try {
            let {data} = await axios.get(`${apiUrl}/api/settings/business-info`);
            console.log('test', data);
            return {business_info: data}
         } catch (error) {
             console.log(error);
         }
      
    },

     async mounted() {
        await this.$recaptcha.init()
    },
    methods: {
        sendContactUsEmail(){
            const data_object = this;
            if(this.name && this.phone && this.email){
                this.loading = true;
                this.isDisabled = true; 
                this.errors=[];
            }  
            this.message  = "";
            const token = this.$recaptcha.execute('login');
            axios.post("api/sendemail/contactus", {
                name: this.name,
                email: this.email,
                phone: this.phone,
                msg: this.msg,
               
            }).then(res =>{      
                if(res.data.message == "success"){
                    this.loading = false;
                    this.isDisabled = false;
                    this.message = "Thanks for contacting us";
                    this.name="";
                    this.phone ="";
                    this.email="";
                    this.msg = "";
                }else{
                    this.isDisabled = false;
                    this.loading = false;
                    this.errors.push(res.data.response);
                }  
            }).catch(function (error){
                data_object.isDisabled = false;
                data_object.errors.push(error); 
                data_object.loading = false;
            })           
        }
    },
}
</script>

<style>
#contactus{
    height:130rem;
}
#contactus .contactusform, #contactus .contactinfoform{
 
    background-color:#fff;
    margin:3rem 0;
}

#contactus .contactusform h4, .contactinfoform h4{
    color:#103a5b;
    font-size:20px;
    letter-spacing: 2px;
    padding:2rem;
    font-weight:bold;  
}

@media(min-width:1080px){
        #contactus{
            height: 100vh;
        }
        
    }

  /* #contactus legend,  */
  .contactinfoform p, 
  .contentStyle{
        font-size:13px !important;
        color:#3c3c3c;
        font-family: 'FangPingRegular';
    }

    #contactus .formcontent{
        padding:1rem;
        border-top: 2px solid #f7f5f1;
    }

    #contactus .contactusform input{
        height:40px;
        color:#e0e0e0;
    
    }

    #contactus .contactusform .formBtn{
        margin-top:1rem;
        margin-left:1rem;
        padding:0.5rem 3rem;
        background-color: #103a5b;
        margin-bottom:1rem;
    }

    #contactus .contactinfoform h5{
        font-size:14px;
    }

</style>