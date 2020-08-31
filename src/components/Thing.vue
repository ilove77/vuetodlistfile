<!--  -->
<template>
  <div>
    <ValidationObserver ref="additems" v-slot="{invalid}">
      <div @click="onclick" :class="ss" class="body"></div>
      <div :class="ss" class="gg flex-column">
        <div class="header">
          <!-- <div>{{edit}}</div> -->
          <v-container>
            <!-- <div>{{edit}}</div> -->
            <v-row align="center" align-content="center" class="mt-sm-3">
              <v-col class="d-flex" cols="12" sm="8">
                <ValidationProvider style="width:100%" rules="required">
                  <v-text-field color="white" solo flat outlined dark v-model.trim="itemsname" :disabled ="$store.state.thing.inputoredit"></v-text-field>
                  <!-- <span>{{ errors[0] }}</span> -->
                </ValidationProvider>
              </v-col>

              <v-col cols="12" sm="4">
                <!-- items 要是陣列 -->
                <ValidationProvider style="width:100%" rules="required">
                  <v-select
                    v-model="selectvalue"
                    label="專案"
                    solo
                    :items="$store.state.thing.items"
                    @change="alterselectvalue(selectvalue)"
                    :disabled ="$store.state.thing.inputoredit"
                  ></v-select>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <div class="main green lighten-5 d-flex flex-wrap align-center justify-space-between">
          <v-row class ="">
            <!-- input選框 要搭配v-col -->
            <v-col cols="8">
              <div class="d-flex my-4">
                <label for class="mx-4 text-no-wrap" style="line-height:50px">優先序</label>
                <ValidationProvider style="width:100%" rules="required">
                  <v-select label="選項" v-model="itemsimportant" :items="['普通','優先','重要']" solo :disabled ="$store.state.thing.inputoredit"></v-select>
                </ValidationProvider>
              </div>
            </v-col>
            <v-col cols="4" class="d-flex  align-center mt-n8">
              <label for class="mx-4">完成</label>
              <input type="checkbox"   v-model="finishend" value = "1" :disabled ="$store.state.thing.inputoredit">
            </v-col>
          </v-row>
          <v-container>
            <v-row justify-space-between>
              <v-col cols="6">
                <v-row align="center" class="flex-nowrap">
                  <label class="text-no-wrap mx-4 mt-n6">起始</label>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    style="min-width:400px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field outlined v-model="date" readonly v-bind="attrs" v-on="on" :disabled ="$store.state.thing.inputoredit"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-row>
              </v-col>
              <v-col cols="6" v-if="finishend">
                <v-row align="center" class="flex-nowrap">
                  <label class="text-no-wrap mx-4 mt-n6">截止</label>
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    style="min-width:200px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field outlined v-model="date2" readonly v-bind="attrs" v-on="on" :disabled ="$store.state.thing.inputoredit"></v-text-field>
                    </template>
                    <v-date-picker v-model="date2" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <!-- <v-row>4567878</v-row> -->
          <v-container class="mt-n6">
            <v-row>
              <v-col cols="12" class="d-flex align-center">
                <label for class="mr-4 text-no-wrap">內容</label>
                <ValidationProvider style="width:100%" rules="required">
                  <v-textarea class outlined v-model.trim="itemscontent" :disabled ="$store.state.thing.inputoredit"></v-textarea>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-container>
          <v-container style="border-top:1px solid black">
            <v-row class>
              <v-col cols="12" class="text-right d-flex flex-row-reverse align-center">
                <v-btn
                  v-if = "$store.state.thing.addoredit == true"
                  solo
                  text
                  depressed
                  class="mt-n2"
                  :disabled="invalid"
                  @click="addprojectitems"
                >確定</v-btn>
                <v-btn v-else-if= "$store.state.thing.addoredit == false&&$store.state.thing.inputoredit == true"   solo
                  text
                  depressed
                  class="mt-n2"
                  @click="$store.state.thing.inputoredit = false">編輯</v-btn>
                  <v-btn v-else  depressed text
                  class="mt-n2" @click="senteditproject">送出</v-btn>

                <v-btn solo text depressed class="mt-n2" @click="cancelprojectitems">取消</v-btn>
                
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </ValidationObserver>
    <!-- this.$store.commit('thing/editstate',val) -->
  </div>
</template>

<script>
// import { params } from 'vee-validate/dist/types/rules/alpha'
import Vue from 'vue'
import { ValidationObserver, extend, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required
})
export default {
  name: 'Thing',
  data() {
    return {
      // items:[1,2,3]
      aabb: true,
      // picker:'2020-08-05',
      dateMenu: false,
      // dateVal:'2020-08-05'
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      end: false,
      itemsname: '',
      itemsimportant: '',
      selectvalue: '',
      selectindex: '',
      // gg:"456"
      itemscontent: '',
      finishend:false
      // edit:'',
      // selectitem:{selectvalue,selectindex}
    }
  },
  //生命周期 - 創建完成（訪問當前this實例）
  async created() {
    //   console.log(this.$route.query.acc)
    //   // 如果傳遞參數值
    //  let ss = await this.$http.get('/gg', {
    //    params:{
    //      acc: this.$route.query.acc,
    //       // index:12,
    //       items:[1,2,3]
    //    }
    //  })
  },
  //生命周期 - 掛載完成（訪問DOM元素）
  mounted() {},
  methods: {
    onclick() {
      this.$store.state.thing.class = 'd-none'
      this.$store.state.thing.addoredit = true,
      this.$store.state.thing.inputoredit = false,
      this.finishend = ''
      // this.end = false
      this.itemsname = ''
      this.selectvalue = ''
      this.itemsimportant = ''
      this.itemscontent = ''
      
      this.date = new Date().toISOString().substr(0, 10)
      // (this.date = new Date().toISOString().substr(0, 10),
      // )
    },
    // enddate() {
    //   if (this.end) {
    //     this.end = false
    //   } else {
    //     this.end = true
    //   }},
    alterselectvalue(val) {
      // console.log(this.$store.state.thing.items)
      this.$store.state.thing.items.findIndex((value, index) => {
        if (val == value) {
          this.selectindex = index
          console.log(this.selectindex)
          return
        }
      })
    },
    async addprojectitems() {
      await this.$http.get('/addprojectitems', {
        params: {
          acc: this.$route.query.acc,
          projectlen: this.$store.state.thing.items.length,
          index: this.selectindex,
          items: [
            this.itemsname,
            this.selectvalue,
            this.itemsimportant,
            this.date,
            this.itemscontent,
            this.date2,
            this.finishend
          ]
        }
      })
      let ssm = await this.$http.get('/getprojectitems',{
      params: {
        acc: this.$route.query.acc
      }
    })
    // this.eachprojectitems = ssm
    this.$store.state.thing.eachprojectitems = ssm
    // 
    // if(this.finishend) {
    //   this.$store.state.thing.checked[this.selectindex]
    // }

      // 關掉thing
      this.$store.state.thing.class = 'd-none'
      this.itemsname = ''
      this.selectvalue = ''
      this.itemsimportant = ''
      this.itemscontent = ''
      this.finishend = false
      this.end = false
      this.date2 = new Date().toISOString().substr(0, 10)
      this.date = new Date().toISOString().substr(0, 10)
      // (this.date = new Date().toISOString().substr(0, 10))
    },
    cancelprojectitems() {
      this.$store.state.thing.class = 'd-none'
      this.$store.state.thing.addoredit = true,
      this.$store.state.thing.inputoredit = false
      this.finishend = false
      // this.end = false
      this.itemsname = ''
      this.selectvalue = ''
      this.itemsimportant = ''
      this.itemscontent = ''
      this.date = new Date().toISOString().substr(0, 10)
      this.date2 = new Date().toISOString().substr(0, 10)
      //   (this.date = new Date().toISOString().substr(0, 10))
      // }
    },
    async senteditproject(){
     let flag =  await this.$http.get('/editprojectitems', {
        params: {
          acc: this.$route.query.acc,
          index: this.$store.state.thing.editindex.index,
          index2:this.$store.state.thing.editindex.index2,
          items: [
            this.itemsname,
            this.selectvalue,
            this.itemsimportant,
            this.date,
            this.itemscontent,
            this.date2,
            this.finishend
          ]
        }
      })
      this.$store.state.thing.eachprojectitems = flag
      this.$store.state.thing.class = 'd-none'

    }
  },
  computed: {
    ss() {
      return this.$store.state.thing.class
    },
    dateVal: {
      get() {
        const year = new Date().getFullYear()
        console.log(year)
        const month = new Date().getMonth() + 1
        console.log(month)
        const date = new Date().getDate()
        console.log(date)
        return ` ${year} - ${month} - ${date} `
      },
      set() {}
    },
    // vueVue中監聽$store 中的數據的方法**********
    edit() {
      // console.log("test")

      return this.$store.state.thing.edit
    },

  },

  watch: {
    edit() {
      
      let temp = this.$store.state.thing.index
      let temp1 = this.$store.state.thing.eachprojectitems[temp.index][
        temp.index2
      ]
      // console.log(typeof temp1[6])
      this.itemsname = temp1[0]
      this.selectvalue = temp1[1]
      this.itemsimportant = temp1[2]
      this.date = temp1[3]
      this.itemscontent = temp1[4]
      this.date2 = temp1[5]
      // console.log(temp1)
      this.finishend = temp1[6]
    }
  }

  // ******************************************
}
</script>
<style scoped>
/* @import 'style.css'; 引入css類 */
.body {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: darkblue;
  z-index: 99;
  opacity: 0.1;
}
.gg {
  background: white;
  width: 50%;
  height: 80%;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  color: tan;
  z-index: 100;
  border-radius: 15px;
  overflow: hidden;
  min-width: 320px;
  max-width: 700px;
}
@media screen and (min-width: 600px) {
  .gg {
    height: 70%;
  }
}

.header {
  /* height: 120px; */
  background: #424242;
  /* height: 400px; */
  /* height: 100px; */
}
.sss {
  width: 100%;
}
.test {
  display: none;
}
</style>