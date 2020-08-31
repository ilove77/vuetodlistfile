<!--  -->
<template>
  <div>
      
      <slot name="aaa"></slot>
      <slot name="bbb"></slot>
      <div>466</div>
      <button @click="$router.push('/Welcome')">459</button>
      <!-- <input type="text"> -->
    
    <!-- <button @click="gg">{{aa}}</button>
    <div>{{count}}</div>-->
<!-- 
    <p>前端语言：{{ lang }}</p>
    <p>前端框架：{{ framework }}</p>
    <p>前端编辑器：{{ editor }}</p>
    <button @click="gg">子组件内点击改变前端语言</button> -->
    <!-- <span @click="$emit('input', value+1)" style="border: 1px solid #000;">点击改变值的显示 {{ value }}</span> -->
      
        
        
        <!-- <slot name="kk">
            
        </slot> -->
    
  </div>
</template>

<script>
export default {
  props: {
    //    aa:{
    //        type:Number,
    //        default:0
    //    }



    // lang: String,
    // framework: String,
    // editor: String
    // value:{

    // }

  },
  data() {
    return {
    //   count: this.aa
    count:''
    }
  },
  //生命周期 - 創建完成（訪問當前this實例）
  created() {
      alert("test")
  },
  //生命周期 - 掛載完成（訪問DOM元素）
  mounted() {},
  methods: {
    //   gg() {
    //       this.$emit('update:lang','HTML')
    //   }
  }
}
</script>
<style scoped>
/* @import 'style.css'; 引入css類 */
</style>