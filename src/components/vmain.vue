<!--  -->
<template>
   <div>
      
       <slot :name = "project"></slot> 
   </div>
</template>

<script>
   export default {
       name:'vmain',
      data() {
         return {
             ss:12,
           
         }
      },
//生命周期 - 創建完成（訪問當前this實例）
      created() {
        console.log( this.$route.path)
         console.log(this.$route.query.project)
         // alert('456')
         // this.$router.go()
         //  let project = {project:this.$route.query.project}
      },
//生命周期 - 掛載完成（訪問DOM元素）
      mounted() {

      },
      computed: {
         project() {
            return this.$route.query.project
         }
      },
   }
</script>
<style scoped>
/* @import 'style.css'; 引入css類 */

</style>