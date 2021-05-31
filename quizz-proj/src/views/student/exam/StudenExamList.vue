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
                <h4 class="title">Bài kiểm tra môn</h4>

              </div>
              <div class="content table-responsive">
                <table class="table table-hover table-striped">
                  <thead>

                  <th width="5%">ID</th>
                  <th width="40%">Tên bài</th>
                  <th width="20%">Số câu</th>
                  <th width="20%">Thời gian</th>
                  <th>Chức năng</th>
                  </thead>

                  <tbody>
                  <p style="display: none">{{count=1}}</p>
                  <tr v-for="n in exam" :key="n.id">
                    <td>{{count++}}</td>
                    <td>{{n.name}}</td>
                    <td>{{n.quantity}}</td>
                    <td>{{format(n.timeLimit)}}</td>

                    <td>
                      <router-link :to="{name:'StudentDoExam',params:{id:n.id}}" class="btn btn-danger">Làm bài</router-link>
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
  name: "ExamList",components:{
    Menu,Footer,Header
  },data(){
    return{
      exam:[],
      countSTT:0,
      currentNews:null,
      currentIndex:-1,
      message:'',
      token:localStorage.token,
      userId:localStorage.userId,
      clazzId:this.$route.params.id}
  },methods:{
     format(time) {
      // Hours, minutes and seconds
      var hrs = ~~(time / 3600);
      var mins = ~~((time % 3600) / 60);
      var secs = ~~time % 60;

      // Output like "1:01" or "4:03:59" or "123:03:59"
      var ret = "";
      if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    },
    getExam(){
      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }

      axios.get('http://35.240.198.195:8080/api/management/exam?idClazz='+this.clazzId,{headers:headers}).
      then((resp)=>{
        this.exam=resp.data.data;
        console.log(resp.data.data)
      }).catch((error) => console.log( error.response ) );


    },
    refreshList() {
      this.getExam();
      this.currentNews = null;
      this.currentIndex = -1;
    },
    deleteClass(id,name){
      var data = {
        id:id

      };
      if (confirm("Bạn có muốn xóa lớp có tên = "+name)) {
        axios.delete('http://35.240.198.195:8080/api/management/clazz/' + id, data).then((resp) => {
          this.exam = resp.data;
          this.refreshList();
          this.message = "Xóa thành công lớp " + name;
          console.log(resp.data)
        })
      }
    }
  },mounted() {
    if (localStorage.token && localStorage.role == 0){
      this.clazzId = this.$route.params.id;
      this.getExam();
    }else {
      this.$router.push('/login');
    }
  }

}
</script>

<style scoped>

</style>