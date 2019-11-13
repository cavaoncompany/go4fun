<template>
    <b-container id="productIntro" :introData = 'introData'>
        <b-row>
            <b-col cols="12">
                <h4>產品概要</h4>
            </b-col>
        </b-row>
        <b-row>
            <b-col>服务语言： <span class="content">{{introData.tour_language || 'N/A'}}</span></b-col>
            <b-col>接送服务： <span class="content">{{introData.pick_up_service || 'N/A'}}</span></b-col>
            <b-col>餐食安排： <span class="content">{{introData.meals || 'N/A'}}</span></b-col>
            <b-col>出發日期: <span class="content">{{introData.departure_dates || 'N/A'}}</span></b-col> <!-- Departure Dates -->
        </b-row>
        
        <b-row>
            <b-col>游玩时长： <span class="content">{{introData.duration || 'N/A'}}日</span></b-col>
            <b-col>退改政策： <span class="content">{{introData.policy || 'N/A'}}</span></b-col>
            <b-col>行程凭证： <span class="content">{{introData.travel_document || 'N/A'}}</span></b-col>
            <b-col>集合點: <span class="content">{{introData.pickup_points || 'N/A'}}</span></b-col> <!-- Pickup Point -->
        </b-row>
    </b-container>
</template>

<script>
export default {
    props:['introData']
}
</script>

<style scoped>
    #productIntro{
        background-color:white;
        padding: 1.5rem;
        font-family: 'FangPingMedium';
        margin: 4rem auto;
    }

    #productIntro  .col{
        border: 1px solid #F7F5F1;
        color:#3C3C3C;
        font-size:14px;
        padding-top:1rem;
        padding-bottom:1rem;
    }

    #productIntro h4{
        color: #103a5b;
        font-size:20px;
        letter-spacing: 3px;
        padding-bottom: 1rem;
    }

    #productIntro .content{
        color:#3c3c3c;
        font-family: 'FangPingRegular';
    }
</style>
