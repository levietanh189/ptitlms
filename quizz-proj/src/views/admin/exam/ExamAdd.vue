<template>
  <Menu></Menu>
  <div class="main-panel">
    <Header></Header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="header">
              <h4 class="title">THêm bài kiểm tra</h4>
              <p class="category"></p>
            </div>
            <div class="content table-responsive" v-if="!submitted">
              <form @submit.prevent="handelAdd" enctype="multipart/form-data">
                <table class="table table-hover table-striped ">
                  <tr>
                    <td class="tdcss">Tên bài</td>
                    <td><input type="text" name="title"  required v-model="exam.name"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Số lượng câu hỏi</td>
                    <textarea  name="content"  required v-model="exam.quantity"  class="form-control" placeholder="Mời nhập nội dung"></textarea>

                  </tr>
                  <tr>
                    <td class="tdcss">Thời gian</td>
                    <textarea  name="content"  required v-model="exam.timeLimit"  class="form-control" placeholder="Mời nhập nội dung"></textarea>
                  </tr>
                  <tr>
                    <td class="tdcss">Nhập câu hỏi</td>

                  </tr>
                  <p style="display: none">{{count=1}}</p>

                  <tr v-for="n in parseInt(exam.quantity)" :key="n">
                    <td class="tdcss">Câu {{count++}}</td>
                    <td><input type="text" name="title"  required v-model="exam.question[n-1]"  class="form-control" placeholder="Nhập câu hỏi"></td>
                  </tr>




                  <tr>

                    <td class="tdcss"></td>
                    <td>
                      <input type="submit" name="btnCreateSup" value="Lưu" class="form-control btn btn-success">
                      <router-link class="btn btn-success form-control" style="color: white;background-color: green;" :to="{name:'ExamList'}">Quay lại danh sách</router-link>

                    </td>
                  </tr>

                </table>
              </form>


            </div>
            <div v-else>
              <h4>Thêm mới thành công</h4>
              <button class="btn btn-success form-control" @click="newAdd">Thêm mới</button>
              <router-link class="btn btn-success form-control" style="color: white;background-color: green;" :to="{name:'ExamList'}">Quay lại danh sách</router-link>
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
      exam: {
        name:null,
        quantity:null,
        timeLimit:null,
        question:[],
        clazzId:this.$route.params.id

      },
      selectedFile : null,
      submitted: false,
      userId:localStorage.userId
    }
  },methods:{

    handelAdd(){
      console.log(this.exam.question);

      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }
      var data={
        'classId':this.exam.clazzId,
        'name':this.exam.name,
        'quantity':this.exam.quantity,
        'timeLimit':this.exam.timeLimit,
        'question':this.exam.question
      }


      console.log(data);
      axios.post('http://35.240.198.195:8080/api/management/exam/question',data,{headers:headers}).
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