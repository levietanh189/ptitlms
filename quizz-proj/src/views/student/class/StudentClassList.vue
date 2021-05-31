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
                <h4 class="title">Danh sách Lớp đã tham gia</h4>

              </div>
              <div class="content table-responsive">
                <table class="table table-hover table-striped">
                  <thead>

                  <th width="5%">ID</th>
                  <th width="30%">Tên lớp</th>
                  <th width="30%">Mô tả</th>
                  <th width="15%">Trạng thái</th>
<!--                  <th width="20%">Chức năng</th>-->
                  </thead>

                  <tbody>
                  <p style="display: none">{{count=1}}</p>
                  <tr>

                    <td colspan="6"> <router-link class="btn btn-success form-control" style="color: white;background-color: green;" :to="{name:'StudentJoinClass'}">Vào một lớp</router-link></td>
                  </tr>
                  <tr v-for="n in clazz" :key="n.id">
                    <td>{{count++}}</td>
                    <td v-if="n.status==0">{{n.name}}</td>
                    <td v-else><router-link :to="{name:'StudenExamList',params:{id:n.id}}">{{n.name}}</router-link></td>
                    <td>{{n.code}}</td>
                    <td v-if="n.status==1"><span class="label label-success">Active</span></td>
                    <td v-else><span class="label label-danger">Disable</span></td>
<!--                    <td v-if="n.status==1">-->
<!--                      <a class='btn btn-danger' @click="deleteClass(n.id,n.name)">Xóa</a>-->
<!--                    </td>-->
                    <td v-else></td>

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
  name: "StudentClassList",components:{
    Menu,Footer,Header
  },data(){
    return{
      clazz:[],
      countSTT:0,
      currentNews:null,
      currentIndex:-1,
      message:'',
      token:localStorage.token,
      userId:localStorage.userId
    }
  },methods:{
    getClass(){
      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }
      // console.log(this.token)
      axios.get('http://35.240.198.195:8080/api/test/exam/clazz',{headers:headers}).
      then((resp)=>{
        this.clazz=resp.data.data;
        console.log(resp.data.data)
      }).catch((error) => console.log( error.response ) );


    },
    refreshList() {
      this.getClass();
      this.currentNews = null;
      this.currentIndex = -1;
    }

  },mounted() {
    if (localStorage.token && localStorage.role == 0){
      this.getClass();
    }else {
      this.$router.push('/login');
    }
  }

}
</script>

<style scoped>

</style>