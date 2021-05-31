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
                <h4 class="title">Quản lý câu hỏi</h4>

              </div>
              <div class="content table-responsive">
                <table class="table table-hover table-striped">
                  <thead>

                  <th width="20%">ID</th>
                  <th width="80%">Nội dung</th>
                  <th>Chức năng</th>
                  </thead>

                  <tbody>
                  <p style="display: none">{{count=1}}</p>
                  <tr v-for="n in question" :key="n.id">
                    <td>Câu {{count++}}</td>
                    <td><router-link :to="{name:'AnswerAdd',params:{id:n.id}}">{{n.name}}</router-link></td>



                    <td>
                      <a class='btn btn-danger' >Xóa</a>
                    </td>

                  </tr>
                  </tbody>


                </table>
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
  name: "ExamDetail",components:{
    Menu,Footer,Header
  },data(){
    return{
      question:[],
      examName:null,
      countSTT:0,
      currentNews:null,
      currentIndex:-1,
      message:'',
      token:localStorage.token,
      userId:localStorage.userId,
      idExam:this.$route.params.id
    }
  },methods:{
    getQuestion(){
      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }
      var data={
        'idClazz':this.clazzId
      }
      axios.put('http://35.240.198.195:8080/api/management/exam/detail/'+this.idExam,{headers:headers}).
      then((resp)=>{
        this.question=resp.data.data.questions;
        this.examName=resp.data.data.name;
        console.log(this.question)
      }).catch((error) => console.log( error.response ) );

    },
    refreshList() {
      this.getQuestion();
      this.currentNews = null;
      this.currentIndex = -1;
    }
  },mounted() {
    if (localStorage.token && localStorage.role == 1){
      this.clazzId = this.$route.params.id;
      this.getQuestion();
    }else {
      this.$router.push('/login');
    }
  }

}
</script>

<style scoped>

</style>