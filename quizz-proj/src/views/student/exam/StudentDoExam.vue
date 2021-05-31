<template>
  <Menu></Menu>
  <div class="main-panel">

    <Header></Header>
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="header">
                <h4 class="title">{{examName}}</h4>
                <div><span id="display" style="color:#FF0000;font-size:15px"></span></div>
                <div><span id="submitted" style="color:#FF0000;font-size:15px"></span></div>



              </div>
              <div class="content table-responsive table-full-width">
                <p style="display: none">{{count=1}}</p>
                <form @submit.prevent="handleSubmit" >
                  <ul class="list-group" v-for="(n,index) in exam" :key="n.id">
                    <li class="list-group-item">{{n.name}}</li>
                    <li class="list-group-item">
                      <div class="form-check" v-for="g in n.answerDtos" :key="g.id">
                        <input type="radio" class="form-check-input" v-bind:value="g.id" v-bind:name="n.id" v-model="answer[index]">
                        <label class="form-check-label" >{{g.name}}</label>
                      </div>

                    </li>

                  </ul>
                  <ul>
<!--                    <li>{{answer}}</li>-->
                  </ul>
                  <ul class="list-group">
                    <li class="list-group-item">
                      <input type="submit" name="btnSubmit" id="MCQuestion" value="Nộp Bài" style="background-color: green;color: white;" class="form-control btn-submit btn btn-success">
                    </li>
                  </ul>
                </form>
                <div>
                  <h4>{{message}}</h4>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios'
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export default {
  name: "StudenDoExam",components:{
    Menu,Footer,Header
  },data(){
    return{
      exam:[],
      answer:[],
      currentNews:null,
      currentIndex:-1,
      message:'',
      examName:null,
      resultId:null,
      timeLimit:null,
      token:localStorage.token,
      userId:localStorage.userId,
      examId:this.$route.params.id,
      quantity:null,
      correct:null

    }
  },methods:{
    handleSubmit(){

      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }
      var data={
        'resultId':this.resultId,
        'idAnswer':this.answer
      }
      console.log(this.resultId)

      console.log(data);
      axios.post('http://35.240.198.195:8080/api/test/exam/submit/abc',data,{headers:headers}).
      then((resp)=>{

        this.message = 'Kêt qủa bạn đã làm: '+resp.data.data.quantityCorrect+' / '+resp.data.data.quantity;
      })
    },
    pushAnswer(id){
        this.answer.push(id);
    },
    getExam(){
      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }

      axios.get('http://35.240.198.195:8080/api/test/exam/'+this.examId,{headers:headers}).
      then((resp)=>{
        this.exam=resp.data.data.questionDtoList;
        this.examName=resp.data.data.name;
        this.resultId=resp.data.data.idResult;
        this.timeLimit=resp.data.data.timeLimit;
        localStorage.timeLimit = resp.data.data.timeLimit;
        console.log(resp.data.data)
      }).catch((error) => console.log( error.response ) );


    },



    refreshList() {
      this.getExam();
      this.currentNews = null;
      this.currentIndex = -1;
    },

  },mounted() {
    if (localStorage.token && localStorage.role == 0){
      this.clazzId = this.$route.params.id;

      this.getExam();

      var div = document.getElementById('display');

      function TimeDown(duration, display) {

        var timer = duration, minutes, seconds;

        var interVal=  setInterval(function () {
          minutes = parseInt(timer / 60, 10);
          seconds = parseInt(timer % 60, 10);

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          display.innerHTML ="<b>" + minutes + "m : " + seconds + "s" + "</b>";
          if (timer > 0) {
            --timer;
          }else{
            clearInterval(interVal)
            SubmitFunction();
          }

        },1000);

      }
      var submitted = document.getElementById('submitted');

      function SubmitFunction(){
        submitted.innerHTML="Hết giờ!";
        document.getElementById('MCQuestion').click();
      }
      TimeDown(60,div);
    }else {
      this.$router.push('/login');
    }
  }

}
</script>

<style scoped>
.list-group-item{
  font-size: 20px;
}
/*.radio{*/
/*  font-size: 20px;*/
/*}*/
.form-check-input{
  margin-right: 20px;
}
</style>