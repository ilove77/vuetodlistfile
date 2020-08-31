<!--  -->
<template>
   <div>
     <Test>
         <template v-slot:aaa >
          <label for="">45665445</label>
        
        <v-text-field></v-text-field>
        <input type="text" >
        <input type="checkbox" name="" id="" >
      </template>
     </Test>
   </div>
</template>

<script>
import Test from './test'
   export default {
      data() {
         return {

         }
      },
      components:{
          Test
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