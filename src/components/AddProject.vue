<!--  -->
<template>
  <!-- pstr是父祖件傳過來的值 子組件修改會有問題 -->
  <div v-if="pstr">
    <div class="gg" @click="dnone"></div>
    <div class="fixedd">
      <div v-if="flag == false">
        <v-text-field solo v-model.trim="temp"></v-text-field>
        <v-btn solo @click.stop="addprojectname">123</v-btn>
      </div>
      <div v-else>
        <v-card height = "700px"
        >
          <v-text-field solo v-model.trim="sonvalue"></v-text-field>
          <v-btn solo @click.stop="editprojectname">123</v-btn>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProject',
  props: {
    pstr: {
      type: Boolean,
      default: false
      //  required:true
    },
    flag: {
      type: Boolean
    },
    values: {
      type: String
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      temp: '',
      sonvalue: ''
    }
  },

  //生命周期 - 創建完成（訪問當前this實例）
  created() {},
  //生命周期 - 掛載完成（訪問DOM元素）
  mounted() {},
  methods: {
    //   這個沒有添加名稱典籍是窗外
    dnone() {
      this.$emit('noaddproject')
    },
    // 增加新的project名稱
    addprojectname() {
      this.$emit('noaddproject')
      this.$emit('addprojectname', this.temp)
    },
    // 更改project名稱
    editprojectname() {
      console.log(this.index)
      console.log(this.sonvalue)
      //
      this.$emit('noaddproject')
      this.$emit('editprojectname', this.sonvalue, this.index)
    }
  },
  watch: {
    //   val是props values的值
    // values每次由父祖件傳給來的監控更改v-model的值 因為父祖件傳來的值不允許修改
    values(val) {
      this.sonvalue = val
    }
  }
}
</script>
<style scoped>
/* @import 'style.css'; 引入css類 */

.gg {
  background: darkblue;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 5;
  opacity: 0.1;
  /* border-radius: 10px; */
}
.fixedd {
  width: 50%;
  height: 50%;
  background: black;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  /* z-index設成5是因為v-drawer是4才可以在它上面
         */
  z-index: 6;
  border-radius: 6px;
  overflow: hidden;
}
</style>