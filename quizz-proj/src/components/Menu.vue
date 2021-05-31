<template>
  <div class="sidebar" data-color="purple" data-image="assets/img/sidebar-5.jpg">

    <div class="sidebar-wrapper">
      <div class="logo">
        <div class="simple-text">
          Trắc Nghiệm
        </div>
      </div>

      <ul class="nav" v-if="role==1">
        <li>

            <p>Dành cho giáo viên</p>

        </li>
        <li>
          <router-link to="/class">
            <i class="pe-7s-note2"></i>
            <p>Lớp học</p>
          </router-link>
        </li>

      </ul>
      <ul class="nav" v-else>
        <li>

          <p>Dành cho sinh viên</p>

        </li>
        <li>
          <router-link to="/studentclass">
            <i class="pe-7s-note2"></i>
            <p>Danh sách lớp</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu.vue",
  data(){
    return{
      role:null
    }
  },
  methods:{
    getData(){
      this.role=localStorage.role
    }
  },mounted() {
    this.getData();
  }
}
</script>

<style scoped>

</style>