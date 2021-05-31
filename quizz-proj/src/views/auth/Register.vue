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
            <a class="navbar-brand" href="#">Đăng kí</a>
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
                  <p class="category">Đăng kí người dùng</p>
                </div>

                <div class="content table-responsive table-full-width">
                  <form @submit.prevent="handleSubmit">
                    <table class="table table-hover table-bordered table-responsive">
                      <tr>
                        <td class="tdcss">Email Hoặc SĐT</td>
                        <td>
                          <input type="text" name="adminEmail" required id="emailOrPhoneNumber" v-model="emailOrPhoneNumber" class="form-control" placeholder="Mời bạn nhập email hoặc số điện thoại">



                        </td>
                      </tr>

                      <tr>
                        <td class="tdcss">Tên</td>
                        <td>
                          <input type="text" name="adminName" required id="name" class="form-control" v-model="name" placeholder="Mời bạn nhập tên">
                        </td>
                      </tr>
                      <tr>
                        <td class="tdcss">Tài khoản</td>
                        <td>
                          <input type="text" name="adminName" required id="userName" class="form-control" v-model="userName" placeholder="Mời bạn nhập tài khoản">
                        </td>
                      </tr>
                      <tr>
                        <td class="tdcss">Chức vụ</td>
                        <td>
                          <select class="form-control" id="role" v-model="role">
                            <option value="0">Sinh viên</option>
                            <option value="1">Giáo viên</option>


                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td class="tdcss">Ảnh cá nhân</td>
                        <td>
                          <input type="file" name="fileImg" id="fileImg"  required @change="Images_onFileChanged"  class="form-control">
                        </td>
                      </tr>

                      <tr>
                        <td class="tdcss">Mật khẩu</td>
                        <td>
                          <input type="password" name="password" required id="password" class="form-control" v-model="password" placeholder="Mời bạn nhập mật khẩu">
                        </td>
                      </tr>

                      <tr>
                        <td class="tdcss">Nhập lại mật khẩu</td>
                        <td>
                          <input type="password" name="passwordConfirm" required id="passwordConfirm" class="form-control" v-model="passwordConfirm" placeholder="Mời bạn nhập mật khẩu">
                          <label for="passwordConfirm">{{checkError}}</label>
                        </td>
                      </tr>

                      <tr>
                        <td colspan="2">
                          <input type="submit" name="btnLogin" value="Đăng Ký" style="background-color: green;color: white;" class="form-control btn-submit btn btn-success">
                        </td>

                      </tr>
                    </table>
                  </form>
                  <div>
                    <router-link to="/login"><button style="background-color: green;color: white;" class="form-control btn-submit btn btn-success">Đã có tài khoản.Quay lại đăng nhập</button></router-link>
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

        </div>
      </footer>

    </div>
    <div class="col-md-2"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Register.vue",
  data(){
    return{

      emailOrPhoneNumber:'',
      selectedFile:null,
      name:'',
      password:'',
      passwordConfirm:'',
      role:'',
      checkError:'',
      userName:'',


      status:false,
      message:'',
      timestamp:''
    }
  },methods:{
    Images_onFileChanged (event) {
      this.selectedFile = event.target.files[0];
    }
    ,
    checkSamePasswords: function() {
      return this.password == this.passwordConfirm;
    },
    async handleSubmit() {
      var checkSame = this.checkSamePasswords();
      if (!checkSame) {
        this.checkError='Mật khẩu không không trùng khớp'
      } else {
          const mypostparameters= new FormData()
          mypostparameters.append('emailOrPhoneNumber', this.emailOrPhoneNumber);
          mypostparameters.append('name',this.name)
          mypostparameters.append('password',this.password)
          mypostparameters.append('role',this.role)
          mypostparameters.append('userName',this.userName)
          mypostparameters.append('image',this.selectedFile)

        await axios.post('http://35.240.198.195:8080/api/author/v1/register', mypostparameters).then((resp) => {
          if (resp.status == 200) {
             this.message = "Đăng nhập thành công"
            this.$router.push({name: 'Confirm', params: { id: resp.data.data.idUser }});
          } else {
            this.message = resp.data.data.message
          }
        }).catch((err)=>{
          console.log(err.response.data.message)
          this.message=err.response.data.message
        })
      }
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