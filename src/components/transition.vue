<!--  -->
<template>
   <div>
       
      <button @click="show = !show">Toggle render</button>
      <div class="sss">
      <transition name="slide-fade" mode="out-in">
        <p v-if="show" :key ="'gg'" >hello</p>
        
        
     
        <p v-if="!show" :key="'ss'" >fuck</p>
      
      
      </transition>
      </div>
   </div>
</template>

<script>
   export default {
      data() {
         return {
             show: true
         }
      },
//生命周期 - 創建完成（訪問當前this實例）
      created() {

      },
//生命周期 - 掛載完成（訪問DOM元素）
      mounted() {

      }
   }
</script>
<style scoped>
/* @import 'style.css'; 引入css類 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .1s ease
}
.slide-fade-enter
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(200px);
  /* opacity: 0; */
}
.slide-fade-leave-to{
    transform: translateX(-100px);
}
.sss{
    margin-left: 200px;
}
</style>