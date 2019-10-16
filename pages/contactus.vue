<template>
    <b-container fluid style="background-color:#f7f5f1;" id="contactus">
        <b-container>
            <b-row>
                <b-col md="8" cols="12">
                    <b-form class="contactusform" 
                            @submit.prevent="sendContactUsEmail"      
                    >
                        <div v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="error in errors" :key="error.id">{{ error }}</li>
                            </ul>
                        </div>
                        <b-row >
                            <h4>聯系我們</h4>
                        </b-row>
                        <b-row v-if="message.length">
                            <h5  class="pl-4">{{message}}</h5>
                        </b-row>
                        <div class="formcontent">
                            <b-row>
                                <b-col md="6">
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
                                        <b-form-input name="phone"  required   type="number"   v-model="phone" ></b-form-input> 
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
                        </div>
                    </b-form>
                </b-col>
                <b-col md="4" cols="12" class="contactinfoform">
                    <b-form>
                        <h4>公司信息</h4>
                        <div class="formcontent">
                            <b-col>
                                <h5>咨詢熱線</h5>
                                <p>{{basicInfos.hotline}}</p>
                            </b-col>
                            <b-col>
                                <h5>緊急電話</h5>
                                <p>{{basicInfos.emergence_contact}}</p>
                            </b-col>
                            <b-col>
                                <h5>電郵地址</h5>
                                <p>{{basicInfos.email}}</p>
                            </b-col>
                            <b-col>
                                <h5>店鋪地址</h5>
                                <p>{{basicInfos.address}}</p>
                            </b-col>
                            <b-col>
                                <h5>工作時間</h5>
                                <b-row class="contentStyle">
                                    <b-col>
                                        <span v-html="basicInfos.trading_hours"></span>
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
            basicInfos: {},
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
            let {data} = await axios.get(`${apiUrl}/api/basicInfos`);
            return {basicInfos: data}
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
              this.isDisabled = true; 
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

  #contactus legend, .contactinfoform p, .contentStyle{
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
        margin-top:2rem;
        margin-left:1rem;
        padding:0.5rem 3rem;
        background-color: #103a5b;
        margin-bottom:4rem;
    }

    #contactus .contactinfoform h5{
        font-size:14px;
    }

</style>