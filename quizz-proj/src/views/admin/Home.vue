<template>

</template>

<script>
export default {
name: "Home",mounted() {
    if (localStorage.token && localStorage.role == 1){
      this.$router.push('/class');
    }
    else if (localStorage.token && localStorage.role == 0){
      this.$router.push('/quizz');
    }
    else {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

</style>