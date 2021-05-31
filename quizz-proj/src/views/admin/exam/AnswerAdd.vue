<template>
  <Menu></Menu>
  <div class="main-panel">
    <Header></Header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="header">
              <h4 class="title">{{quesName}}</h4>
              <p class="category"></p>
            </div>
            <div class="content table-responsive" v-if="!submitted">
              <form v-if="isData==false" @submit.prevent="handelAdd" enctype="multipart/form-data">
                <table class="table table-hover table-striped ">
                  <tr>
                    <td class="tdcss">Đáp án 1</td>
                    <td><input type="text" name="title"  required v-model="question.answer1"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Đáp án 2</td>
                    <td><input type="text" name="title"  required v-model="question.answer2"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Đáp án 3</td>
                    <td><input type="text" name="title"  required v-model="question.answer3"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Đáp án 4</td>
                    <td><input type="text" name="title"  required v-model="question.answer4"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Đáp án đúng</td>
                    <td> <select class="form-control" id="role" v-model="question.correctAnswer">
                      <option value="1">Đáp án 1</option>
                      <option value="2">Đáp án 2</option>
                      <option value="3">Đáp án 3</option>
                      <option value="4">Đáp án 4</option>

                    </select></td>
                  </tr>

                  <tr>

                    <td class="tdcss"></td>
                    <td>
                      <input type="submit" name="btnCreateSup" value="Lưu" class="form-control btn btn-success">
                      <a class="btn btn-success form-control" style="color: white;background-color: green;" @click="$router.go(-1)">Quay lại danh sách</a>

                    </td>
                  </tr>

                </table>
              </form>
              <form v-else @submit.prevent="handelUpdate" enctype="multipart/form-data">
                <table class="table table-hover table-striped ">
                  <tr>
                    <td class="tdcss">Đáp án 1</td>
                    <td><input type="text" name="title"  required v-model="question.answer1"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Đáp án 2</td>
                    <td><input type="text" name="title"  required v-model="question.answer2"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Đáp án 3</td>
                    <td><input type="text" name="title"  required v-model="question.answer3"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Đáp án 4</td>
                    <td><input type="text" name="title"  required v-model="question.answer4"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Đáp án đúng</td>
                    <td> <select class="form-control"  v-model="question.correctAnswer">
                      <option value="1">Đáp án 1</option>
                      <option value="2">Đáp án 2</option>
                      <option value="3">Đáp án 3</option>
                      <option value="4">Đáp án 4</option>

                    </select></td>
                  </tr>

                  <tr>

                    <td class="tdcss"></td>
                    <td>
<!--                      <input type="submit" name="btnCreateSup" value="Upadate" class="form-control btn btn-success">-->
                      <a class="btn btn-success form-control" style="color: white;background-color: green;" @click="$router.go(-1)">Quay lại danh sách</a>

                    </td>
                  </tr>

                </table>
              </form>

            </div>
            <div v-else>
              <h4>Thêm mới thành công</h4>
              <button class="btn btn-success form-control" @click="newAdd">Thêm mới</button>
              <a class="btn btn-success form-control" style="color: white;background-color: green;" @click="$router.go(-1)">Quay lại danh sách</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from "axios";
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "ExamAdd",
  components:{
    Footer,
    Header,
    Menu
  },
  data(){
    return{
      question: {
        answer1:null,
        answer2:null,
        answer3:null,
        answer4:null,
        correctAnswer:null,
        idQuestion:this.$route.params.id,


      },
      quesName:null,
      isData:false,
      submitted: false,
      userId:localStorage.userId
    }
  },methods:{
    getAnswer(){
      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token
      }
      axios.get('http://35.240.198.195:8080/api/management/exam/question/'+this.question.idQuestion,{headers:headers}).
      then((resp)=>{
        if (resp.data.data.answers!=''){
          this.isData=true;
        }else {
          this.isData=false;
        }
        this.quesName=resp.data.data.name;
        this.question.answer1=resp.data.data.answers[0].name;
        this.question.answer2=resp.data.data.answers[1].name;
        this.question.answer3=resp.data.data.answers[2].name;
        this.question.answer4=resp.data.data.answers[3].name;

        if (resp.data.data.answers[1].isTrue==1){
            this.question.correctAnswer=2;
          }
        if (resp.data.data.answers[0].isTrue==1){
          this.question.correctAnswer=1;
        }
        if (resp.data.data.answers[2].isTrue==1){
          this.question.correctAnswer=3;
        }
        if (resp.data.data.answers[3].isTrue==1){
          this.question.correctAnswer=4;
        }

      }).catch((error) => console.log( error.response ) );
    },
    handelAdd(){
      console.log(this  .question);

      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }
      var data={
        'answer1':this.question.answer1,
        'answer2':this.question.answer2,
        'answer3':this.question.answer3,
        'answer4':this.question.answer4,
        'correctAnswer':this.question.correctAnswer,
        'idQuestion':this.question.idQuestion

      }


      console.log(data);
      axios.post('http://35.240.198.195:8080/api/management/exam/submit',data,{headers:headers}).
      then((resp)=>{
        console.log(resp)
        this.submitted = true;
      })
    },
    handleUpdate(){
      console.log(this  .question);

      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }
      var data={
        'answer1':this.question.answer1,
        'answer2':this.question.answer2,
        'answer3':this.question.answer3,
        'answer4':this.question.answer4,
        'correctAnswer':this.question.correctAnswer,
        'idQuestion':this.question.idQuestion

      }


      console.log(data);
      axios.post('http://35.240.198.195:8080/api/management/exam/submit',data,{headers:headers}).
      then((resp)=>{
        console.log(resp)
        this.submitted = true;
      })
    },newAdd() {
      this.submitted = false;
      this.tutorial = {};
    }
  },mounted() {
    if (localStorage.token && localStorage.role == 1){
      this.getAnswer()
    }else {
      this.$router.push('/login');
    }
  }

}
</script>

<style scoped>
.tdcss{
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  height: 80px;
}
.table tr{
  border: 0.5px solid grey;
}
.btn-success{
  background-color: #6dc030;
  color: white;

}
</style>