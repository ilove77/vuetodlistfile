<!--  -->
<template>
  <div>
    <div>{{123}}</div>
    
    <!-- @update:aa = "add" -->
    <!-- <Test :aa.sync  = "num" @click.native="ss" ></Test>
    <div>{{num}}</div>-->

    <!-- <Test v-bind.sync="frontend"></Test> -->

    <!-- <input type="checkbox"  checked> -->
    <!-- <input type="text" @input="sm('1',$even)"> -->

    <!-- <Test v-model="iptvalue"></Test> -->
    <button @click="xx= true">組件1</button>
    <button @click="xx=false">組件2</button>
    <button @click="$router.push('/Testsd')">789</button>
    <button @click="$router.back()">dsadsadsd</button>
    <v-text-field solo label="456"></v-text-field>
    <button @click="aa++">sadasdad</button>
    <!-- <div v-for="i in aa">{{i}}</div> -->

    <!-- <button @click="ggg='d-none'">不見</button>
    <button @click="ggg='d-flex'">顯示</button>-->
    <!-- <Test v-if = "xx" :class="ggg">
      <template v-slot:aaa >
          <label for="">45665445</label>
        
        <v-text-field></v-text-field>
        <input type="text" >
        <input type="checkbox" name="" id="" >
      </template>
     
    </Test>
    <Test v-else >
        <template v-slot:bbb>
            
        
        <label for="">456</label>
          <v-text-field></v-text-field>
        <input type="text"  >
        <input type="checkbox" name="" id="">
        </template>
    </Test>-->
    <div class="d-flex yellow justify-center">
      <button>456</button>
      <button>789</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Test from './test'
import Test2 from './test2'
export default {
  data() {
    return {
      //  ss : this.$route.query.acc
      aaa: 'kk',
      xx: true,
      ggg: '',
      aa: 0 //   gg:false,
      //   num: 0,
      //   frontend: {
      //     lang: 'javascript',
      //     framework: 'vue',
      //     editor: 'vscode'
      //   },
      //   iptvalue:0
    }
  },
  components: {
    Test,
    Test2
  },
  //生命周期 - 創建完成（訪問當前this實例）
  created() {
    //   alert("welcome")
    //   setTimeout(() => {
    //       this.$router.push('/Home')
    //   },1000)
  },
  //生命周期 - 掛載完成（訪問DOM元素）
  mounted() {},
  methods: {
    ss() {
      console.log(1)
    },
    //   add(val){
    //       this.num = val
    //   }
    // sm(ss,e){
    //     console.log(e.target.value)
    // }
    gg() {
      console.log(1)
    }
  }
}
</script>
<style scoped>
/* @import 'style.css'; 引入css類 */
div {
  font-size: 60px;
}
</style>