<template>
  <menu></menu>
  <div class="container">
    <div class="col-md-2"></div>
    <div class="main-panel1 col-md-8">
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="header" style="text-align: center;color: #FFFFFF;">
<!--                  <h2 class="title"></h2>-->
                  <p class="category">Tham gia lớp học</p>
                </div>

                <div class="content table-responsive table-full-width">
                  <form @submit.prevent="handleSubmit">
                    <table class="table table-hover table-bordered table-responsive">
                      <tr>
                        <td class="tdcss">Mã lớp</td>
                        <td>
                          <input type="text" name="code" id="code"  v-model="code" class="form-control" placeholder="Mời bạn nhập mã lớp học">

                          <label id="lbMail" style="color: #ff0000;" class="lbMsg"></label>


                        </td>
                      </tr>

                      <tr>
                        <td colspan="2">
                          <input type="submit" name="btnLogin" value="Vào lớp" style="background-color: green;color: white;" class="form-control btn-submit btn btn-success">
                        </td>

                      </tr>
                    </table>
                  </form>
                  <div>
                    <router-link to="/studentclass"><button style="background-color: green;color: white;" class="form-control btn-submit btn btn-success">Quay lại danh sách</button></router-link>
                  </div>






                </div>
                <div id="warn">
                  <label id='lbMessage' style='color: red;' class='lbMessage'>{{message}}
                  </label>

                </div>







              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="container-fluid">
          <nav class="pull-left">
            <ul>
              <li>
                <a href="#">

                </a>
              </li>

            </ul>
          </nav>
        </div>
      </footer>

    </div>
    <div class="col-md-2"></div>
  </div>
</template>

<script>

import axios from 'axios'
import Menu from "@/components/Menu";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "StudentJoinClass",
  data(){
    return{
      code:'',
      status:false,
      message:'',
      userId:localStorage.userId
    }
  },components:{
    Menu,Header,Footer
  }
  ,methods:{

    handleSubmit(){

      var headers={
        'Access-Control-Allow-Origin':'*',
        'Authorization':this.token,
        'user_id':this.userId
      }
      var data={
        'code':this.code
      }
      axios.get('http://35.240.198.195:8080/api/test/exam/clazz/join?code='+this.code,{headers:headers}).
      then((resp)=>{
        if (resp.data.code==0){
            this.message="Vào lớp thành công"
            this.$router.push('/studentclass');
        }
      }).catch((err)=>{
        console.log(err.response.data.message)
        this.message=err.response.data.message
      })
    }
  },mounted() {
    if (localStorage.token && localStorage.role == 0){

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
#lbMessage{
  margin-left: 15px;
  font-size: 16px;
}
.main-panel{
  margin: auto;
}

</style>