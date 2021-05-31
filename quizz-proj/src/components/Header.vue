<template>
  <nav class="navbar navbar-default navbar-fixed">
    <div class="container-fluid">
      <div class="navbar-header">

        <a class="navbar-brand" href="#">Quizz proj</a>
      </div>
      <div class="collapse navbar-collapse">

        <ul class="nav navbar-nav navbar-right">
          <li><img width="50" height="66" v-bind:src="image"  sizes="(max-width: 142px) 100vw, 142px" /></li>
          <li>
            <a href="">
              {{name}}
            </a>
          </li>

          <li>
            <a @click="clearStorage">
              <button>Đăng xuất</button>
            </a>
          </li>
          <li class="separator hidden-lg"></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header"
  ,data(){
    return{
      name: localStorage.name,
      image: localStorage.image
    }

  }
  ,methods:{
    clearStorage(){
      localStorage.clear();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>