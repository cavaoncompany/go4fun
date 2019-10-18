<template>
     <b-container fluid>
        <b-container style="padding-top:3rem;">
            <b-row>
                <b-col sm="6" class="leftSection">
                    <h4>{{productData.product_name}}</h4>
                    <p style="padding-top:15px;">{{productData.product_description}} | 產品編號 : {{productData.product_code}}</p>
                </b-col>
                <b-col sm="2">
                </b-col>
                <b-col sm="4">
                    <div class="rightSection">
                        <h4>{{productData.sales_price}}<span style="font-size:14px; font-family:'FangPing'">/人起</span></h4>
                        <!-- <p>優惠：原價${{productData.price}}/成人</p>   -->
                        <p>{{productData.price_description}}</p>    
                    </div>
                </b-col>
            </b-row>

            <b-row>
               
                <b-col>
                <b-form class="inquiryform" @submit.prevent="sendInquiryEmail" >
                    <b-col cols="12" class="formtitlestyle">
                        <h4>咨詢報價</h4>
                    </b-col> 

                    <div class="formcontent"> 
                    <b-row >
                        <b-form-group label="姓*" lable-for="surname" class="col-md-4">
                            <b-form-input id="surname" required type="text" v-model="surname"></b-form-input>
                        </b-form-group> 
                       
                        <b-form-group label="名*" lable-for="firstname" class="col-md-4">
                            <b-form-input id="firstname" required type="text" v-model="firstname"></b-form-input>
                        </b-form-group>  

                        <b-form-group label="電郵*" lable-for="email" class="col-md-4">
                            <b-form-input id="email" required type="email" v-model="email"></b-form-input>
                        </b-form-group>     
                    </b-row>

                     <b-row >
                        <b-form-group label="電話*" lable-for="phone" class="col-md-4">
                            <b-form-input id="phone" required type="tel" v-model="phone"></b-form-input>
                        </b-form-group> 
                       
                        <b-form-group label="出發日期*" lable-for="startDate" class="col-md-4">
                            <b-form-input id="startDate" required type="date" v-model="startDate"></b-form-input>
                        </b-form-group>  

                        <b-form-group label="出發城市*" lable-for="startCity" class="col-md-4">
                            <b-form-input id="startCity" required type="text" v-model="startCity"></b-form-input>
                        </b-form-group> 
                    </b-row>

                    <b-row >
                        <b-form-group label="旅客人數*" lable-for="visitorNo" class="col-md-4">
                            <b-form-input id="visitorNo" required type="number" v-model="visitorNo" min="1"></b-form-input>
                        </b-form-group> 
                       
                        <b-form-group label="性別" lable-for="sex" class="col-md-4">
                            <!-- <b-form-input id="sex"  type="text" v-model="sex"></b-form-input> -->
                            <b-form-select id="sex" v-model="sex" :options="sex_options"></b-form-select>
                        </b-form-group>  

                        <b-form-group label="出生日期" lable-for="birth" class="col-md-4">
                            <b-form-input id="birth"  type="date" v-model="birth"></b-form-input>
                        </b-form-group> 
                    </b-row>

                    <b-row>
                        <b-col>
                              <b-form-group 
                                    label="備註"
                                    lable-for="textarea"
                                >
                                     <b-form-textarea
                                        id="textarea"
                                        rows="4"       
                                        v-model="remark"></b-form-textarea>
                                </b-form-group>
                        </b-col>
                    </b-row>

                    <b-row>
                        <b-button type="submit" variant="primary" class="formBtn" :disabled="isDisabled">
                            <span v-if="loading"><i class="fas fa-spinner fa-spin" style="color:black;"></i></span>
                            <span v-else>提交</span>
                        </b-button>
                    </b-row>

                    <b-row class="mt-3" v-if="message_sent">
                        <b-col sm="12">
                            <div class="alert alert-success">{{message}}</div>
                        </b-col>
                    </b-row>
                    
                    <b-row class="mt-3" v-if="errors.length">
                        <b-col sm="12">
                            <div class="alert alert-danger">
                                <b>{{message}}</b>
                                <ul>
                                    <li v-for="error in errors" :key="error.id">{{ error }}</li>
                                </ul>
                            </div>
                        </b-col>
                    </b-row>
                    
                    </div>
                </b-form>
                </b-col>
            </b-row>
        </b-container>

    </b-container>
</template>

<script>
import axios from 'axios'
export default {
    
    props:['productData'],
    data(){
        return{
            surname:'',
            firstname: '',
            email:'',
            phone:'',
            startDate: '',
            startCity: '',
            visitorNo: '',
            sex: '',
            birth:'',
            remark:'',
            isDisabled: false,
            message: "",
            message_sent: false,
            errors:[],
            loading: false,
            sex_options: [
                { value: 'Male', text: "Male" },
                { value: 'Female', text: "Female" },
            ],

        }
    },

    async mounted() {
        await this.$recaptcha.init()
    },

    methods:{
        sendInquiryEmail(){
            const data_object = this;
            if(this.surname && this.firstname && this.email && this.phone &&this.startDate && this.startCity && this.visitorNo){
              this.isDisabled = true; 
            }  
            this.message  = "";
            this.message_sent = false;
            this.errors = [];
            this.loading = true;
            const token = this.$recaptcha.execute('login');

            axios.post("/api/sendemail/inquiryform", {
                surname:this.surname,
                firstname: this.firstname,
                email: this.email,
                phone: this.phone,
                startDate: this.startDate,
                startCity: this.startCity,
                visitorNo: this.visitorNo,
                sex: this.sex,
                birth:  this.birth,
                remark: this.remark,
               
            }).then(res =>{  
                if(res.data.message == "success"){
                    this.isDisabled = false;
                    this.message = "Thanks for contacting us!";
                    this.message_sent = true;
                    this.loading = false;
                    this.reset_form();
                }else{
                    console.log(res.data)
                    this.message = "Please correct the following error(s):";
                    this.isDisabled = false;
                    this.errors.push(res.data.response);
                    this.loading = false;
                }  
            }).catch(function (error){
                data_object.message = "An error was encountered:";
                data_object.isDisabled = false;
                data_object.errors.push(error); 
                data_object.loading = false;
            })           
        },
        reset_form(){
            this.surname = '';
            this.firstname = '';
            this.email = '';
            this.phone = '';
            this.startDate = '';
            this.startCity = '';
            this.visitorNo = '';
            this.sex = '';
            this.birth = '';
            this.remark = '';
        }
    }
}
</script>

<style scoped>

.leftSection h4{
    font-size:32px;
    color:#103a5b;
}

.leftSection p{
    color: #666;
    font-size: 14px;
}

.rightSection h4{
    font-size:36px;
    font-weight:bolder;
    padding-bottom: 10px;
}

.rightSection p{
    font-size: 14px;
    color: #7f7f7f;
}

.inquiryform{
 
    background-color:#fff;
    margin:3rem 0;
}

.inquiryform h4{
    color:#103a5b;
    font-size:20px;
    letter-spacing: 2px;
    font-weight: bold;
}

.inquiryform .col-form-label{
    font-size:13px !important;
    color:#3c3c3c !important;
}

.inquiryform .formtitlestyle{
    padding-left:0px; 
    padding-bottom:15px;
    border-bottom: 2px solid #f7f5f1;
    padding:2rem;
}

.inquiryform .formcontent{
    padding:2rem;
}

.inquiryform .formBtn{
    margin-top:2rem;
    margin-left:1rem;
    padding:0.5rem 3rem;
    background-color: #103a5b;
}
</style>
