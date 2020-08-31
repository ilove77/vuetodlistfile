<!--  -->
<template>
   <div id = "app" >
     <v-app>
       <router-view></router-view>
       <Thing ></Thing>
     </v-app>
    
   </div>
</template>

<script>
import Thing from './components/Thing'
   export default {
      data() {
         return {
           
         }
      },
      components:{
        Thing
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

</style>