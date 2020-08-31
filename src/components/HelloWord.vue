<!--  -->
<template>
   <div>
       <slot :usertext = "user">{{user.firstname}}</slot>
       <button @click= "gg">456</button>
   </div>
   
</template>

<script>
import axios from 'axios'
   export default {
      data() {
         return {
             user:{
                 firstname:123,
             }
         }
      },
//生命周期 - 創建完成（訪問當前this實例）
      created() {
      
      },
//生命周期 - 掛載完成（訪問DOM元素）
      mounted() {

      },
      methods: {
          gg:function (){
             console.log(this.$store.state.login.flag)
             console.log(this.$store.commit('login/welcome',{
                 temp1:2,
             }))
              
          }
      },
   }
</script>
<style scoped>
/* @import 'style.css'; 引入css類 */

</style>