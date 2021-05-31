<template>
  <div class="container">
    <div class="col-md-2"></div>
    <div class="main-panel1 col-md-8">
      <nav class="navbar navbar-default navbar-fixed">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Đăng nhập</a>
          </div>
          <div class="collapse navbar-collapse">

            <ul class="nav navbar-nav navbar-right">
              <li>
                <a href="">
                  <p>Tài khoản</p>
                </a>
              </li>

              <li>
                <a href="">
                  <p>Đăng xuất</p>
                </a>
              </li>
              <li class="separator hidden-lg"></li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="header" style="text-align: center;color: #FFFFFF;">
                  <h2 class="title">Admin</h2>
                  <p class="category">Xác thực tài khoản</p>
                </div>

                <div class="content table-responsive table-full-width">
                  <form @submit.prevent="handleSubmit">
                    <table class="table table-hover table-bordered table-responsive">
                      <tr>
                        <td class="tdcss">Mã xác thực</td>
                        <td>
                          <input type="number" name="code" id="code"  v-model="code" class="form-control" placeholder="Mời bạn nhập mã xác thực" maxlength="6">

                          <label id="lbMail" style="color: #ff0000;" class="lbMsg"></label>


                        </td>
                      </tr>

                      <tr>
                        <td colspan="2">
                          <input type="submit" name="btnLogin" value="Xác thực" style="background-color: green;color: white;" class="form-control btn-submit btn btn-success">
                        </td>

                      </tr>
                    </table>
                  </form>
                  <div>
                    <router-link to="/login"><button style="background-color: green;color: white;" class="form-control btn-submit btn btn-success">Quay lại đăng nhập</button></router-link>
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
                  Quản lý khách hàng
                </a>
              </li>

            </ul>
          </nav>
          <p class="copyright pull-right">
            Made by Lê Việt Anh
          </p>
        </div>
      </footer>

    </div>
    <div class="col-md-2"></div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: "Confirm.vue",
  data(){
    return{
      code:'',
      status:false,
      message:'',
      idUser:this.$route.params.id
    }
  },methods:{
    handleSubmit(){
      var data = {
        idUser:this.idUser,
        code: this.code
      };
      console.log(data);
      axios.post('http://35.240.198.195:8080/api/author/v1/confirm-code',data).
      then((resp)=>{
        if (resp.data.code==0){
          localStorage.token = resp.data.data.token
          localStorage.name = resp.data.data.name
          localStorage.image = resp.data.data.urlImage
          localStorage.role = resp.data.data.role
          localStorage.userId = resp.data.data.userId

          console.log(resp.data.data.token)
          this.message="Đăng nhập thành công"
          if (resp.data.data.role==1){
            this.$router.push('/class');
          }else{
            this.$router.push('/studentclass');
          }

        }
      }).catch((err)=>{
        console.log(err.response.data.message)
        this.message=err.response.data.message
      })
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