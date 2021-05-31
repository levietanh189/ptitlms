<template>
  <Menu></Menu>
  <div class="main-panel">
    <Header></Header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="header">
              <h4 class="title">THêm Lớp</h4>
              <p class="category"></p>
            </div>
            <div class="content table-responsive" v-if="!submitted">
              <form @submit.prevent="handelAdd" enctype="multipart/form-data">
                <table class="table table-hover table-striped ">
                  <tr>
                    <td class="tdcss">Tên Lớp</td>
                    <td><input type="text" name="title"  required v-model="clazz.name"  class="form-control" placeholder="Mời nhập tiêu đề"></td>
                  </tr>
                  <tr>
                    <td class="tdcss">Mô tả</td>
                    <textarea  name="content"  required v-model="clazz.description"  class="form-control" placeholder="Mời nhập nội dung"></textarea>
                  </tr>
                  <tr>
                    <td class="tdcss"></td>
                    <td>
                      <input type="submit" name="btnCreateSup" value="Lưu" class="form-control btn btn-success">
                    </td>
                  </tr>

                </table>
              </form>


            </div>
            <div v-else>
              <h4>Thêm mới thành công</h4>
              <button class="btn btn-success form-control" @click="newAdd">Thêm mới</button>
              <router-link class="btn btn-success form-control" style="color: white;background-color: green;" :to="{name:'ClassList'}">Quay lại danh sách</router-link>
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
  name: "ClassAdd",
  components:{
    Footer,
    Header,
    Menu
  },
  data(){
    return{
      clazz: {
        name:null,
        description:null,
        clazzId:null

      },
      selectedFile : null,
      submitted: false,
      userId:localStorage.userId
    }
  },methods:{

    handelAdd(){
      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }
      var data={
        'name':this.clazz.name,
        'description':this.clazz.description
      }

      axios.post('http://35.240.198.195:8080/api/management/clazz',data,{headers:headers}).
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