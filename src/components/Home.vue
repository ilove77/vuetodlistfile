<!-- 主頁面 -->
<template>
  <div>
    <AddProject
      :index="index"
      :values="value"
      :flag="flag"
      :pstr="pstr"
      @editprojectname="editprojectname(arguments)"
      @noaddproject="noadd"
      @addprojectname="addprojectname"
    ></AddProject>
    <!-- 使用app屬性會自動應用位置：fixed到佈局元素。如果你得應用程序需要一個absolute元素，你可以通過使用absolute屬性來覆蓋此功能。 -->
    <v-app-bar color="#373D41" height="80" app clipped-left style="position:absolute" >
      <v-container fluid style="min-width:800px">
        <v-row align="center">
          <v-col cols="3">
            <span>
              <!-- <div>{{items}}</div> -->
              <div style="color:red; font-weight:700; font-size:15px">TODOLIST</div>
              <!-- <div class="icon-pencil"></div> -->
            </span>
          </v-col>
          <v-col cols="6" class="text-center d-flex align-center justify-start">
            <!-- solo改變input的樣式 -->
            <!-- prepend-inner-icon ="fas fa-search" -->
            <!-- icon-serach 外部添加的圖案 -->
            <v-text-field
              class="mt-7"
              prepend-inner-icon="icon-search"
              placeholder="搜尋名稱和內容"
              dark
              solo
            ></v-text-field>
            <!-- depressed 移除按鈕陰影 -->
            <v-btn class="ml-2" color="#373D41" dark depressed @click="onthing">+</v-btn>
          </v-col>
          <v-col cols="3" class="text-right">
            <v-btn link to="/login">登出</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <!-- app cliped 讓drawer在app-bar下面 permanent不管多尺寸多少都會顯示 -->
    <!-- <div>{{ss}}</div> -->
    <v-navigation-drawer color="#26A69A" app absolute clipped permanent width="280" style="">
      <div class="text-center drawer-title">Project List</div>
      <!-- <div class="border">{{ss}}</div> -->
      <v-container>
        <v-row justify="center" v-for="(item,index) in this.$store.state.thing.items" :key="index">
          <v-col class="text-left" col="12">
            <!-- iink啟動to屬性 to連結到要的路由 -->
            <!-- link to就是a標籤屬性 任何嵌在a屬性都會觸發a屬性 -->
            <v-card
              link
              :to="{path:'/Main',query:{project:item,acc:$route.query.acc}}"
              height="40"
              class="lineheight teal accent-1"
            >
              <!-- 用div不用v-row原因是 v-row上下會有間隔 -->
              <div class="d-flex justify-space-between align-center">
                <span>{{item}}</span>
                <!-- <span>{{item}}</span> -->
                <div>
                  <v-btn solo icon class @click="editproject(index)">
                    <v-icon class="icon-search" color="black"></v-icon>
                  </v-btn>
                  <v-btn solo icon @click.stop="deleteproject(index)">
                    <v-icon class="icon-bin" color="red"></v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col class="text-center" col="12">
            <!-- iink啟動to屬性 to連結到要的路由 -->

            <v-btn solo width="100%" color="blue" @click="addproject">+</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <!-- v-content被v-main代替 -->
    <v-main>
      <Main v-for=" (item,index) in itemss" :key="index">
        <template v-if="item == $route.query.project" v-slot:[$route.query.project]>
         <div class= "font-weight-black"> 專案 {{$route.query.project}} 的待辦事項</div>
          <!-- <v-text-field solo></v-text-field> -->
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-card
                  height="60"
                  color="blue"
                  class="mt-5 px-4 rounded-0 d-flex flex-wrap justify-space-between align-center"
                  style="line-height:60px"
                  v-for="(item2,index2) in $store.state.thing.eachprojectitems[index]"
                  :key="index2"
                  @click="getedititemscontent({index,index2})"
                >
                  <span>{{$store.state.thing.eachprojectitems[index][index2][0]}}</span>
                  <!-- <v-checkbox v-model="success" class="mx-2" label="Success"></v-checkbox> -->
                  <input
                  type="checkbox"
                  style="width:20px;height:20px"
                  @click.stop="finishdate({index,index2})"
                  :checked="$store.state.thing.eachprojectitems[index][index2][6] == 'true' ? true : false">
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <!-- <template v-slot:[$route.query.project]>
              <v-container>
                <v-row  v-for >
                  <v-col cols ="12">456</v-col>
                </v-row>
              </v-container>
        </template>-->
      </Main>
      <!-- 這樣設置會變成localhost:6000/www.yahoo.com -->
      <!-- <a href="www.yahoo.com">456</a> -->
    </v-main>
  </div>
</template>

<script>
import AddProject from './AddProject'
import Main from './vmain'
export default {
  name: 'Home',
  data() {
    return {
      pstr: false,
      // kk:[1,2,5]
      itemss: [],
      count: 0,
      value: '',
      flag: '',
      temp: '',
      index: 0,
      eachprojectitems: ''
      // success: true,
      // radioGroup: 1,
      // ss:this.$route.query.project
    }
  },
  components: {
    AddProject,
    Main
  },
  //生命周期 - 創建完成（訪問當前this實例）
  async created() {
    var that = this
    if (this.$store.state.login.flag) {
      window.setTimeout(() => {
        // console.log(this)
        alert(`${this.$store.state.login.acc} 登入成功`)
      }, 500)
      this.$store.state.login.flag = false
    }
    // alert('gg')
    // await this.$http.get('/callback',{
    //     params:{
    //         code:this.$route.query.code
    //     }

    // })
    // await this.$http.get('/callback2')
    // // console.log(this.$route.query.code)

    // // 把剛建立project列在projectlist
    let ss = await this.$http.get('/getproject', {
      params: {
        acc: this.$route.query.acc
      }
    })
    this.itemss = ss
    this.$store.state.thing.items = ss
    // ////////

    // 每個專案建立多個陣列， 處理每個專案的代辦事項
    let ssm = await this.$http.get('/getprojectitems', {
      params: {
        acc: this.$route.query.acc
      }
    })
    console.log(ssm)
    this.eachprojectitems = ssm
    this.$store.state.thing.eachprojectitems = ssm
    console.log(this.$store.state.thing.eachprojectitems)
    ////////////////////////
  },
  //生命周期 - 掛載完成（訪問DOM元素）
  mounted() {},
  methods: {
    onthing() {
      console.log(this.$store.commit('thing/block'))
    },
    addproject() {
      // addoredit 加在最前面 才會再thing
      this.pstr = true
      this.flag = false
    },
    noadd() {
      // console.log(this.pstr)
      this.pstr = false
    },
    editproject(index) {
      this.pstr = true
      // console.log(this.itemss[index])
      this.value = this.itemss[index]
      //   console.log(this.value)
      this.flag = true
      this.index = index
    },
    async addprojectname(val) {
      // this.items.push(val)
      //   console.log(val)
      let ss = await this.$http.get('/addproject', {
        params: {
          acc: this.$route.query.acc,
          item: val
        }
      })
      console.log(ss)
      if(ss === false){
        alert("此專案名稱已有")
      }
      this.count += 1
      // this.$store.state.thing.addoredit = true
    },
    async editprojectname(val) {
      this.itemss[val[1]] = val[0]
      //   this.$route.query.project = val[0]
      // console.log(this.$route.query.project)
      let ss = await this.$http.get('/editprojectname', {
        params: {
          acc: this.$route.query.acc,
          item: this.itemss
        }
      })
      this.itemss = ss
      this.$store.state.thing.items = ss
      // console.log(this.$store.state.thing.items)
    },
    // 顯示某個project的 main 事項
    async finishdate(val) {
      console.log(1)
      // this.$store.state.thing.eachprojectitems[val.index][val.index2][6] =
      if (this.$store.state.thing.eachprojectitems[val.index][val.index2][6]) {
        this.$store.state.thing.eachprojectitems[val.index][
          val.index2
        ][6] = false
        this.$store.state.thing.eachprojectitems[val.index][val.index2][5] = 
        new Date().toISOString().substr(0, 10)
      } else {
        this.$store.state.thing.eachprojectitems[val.index][
          val.index2
        ][6] = true
        this.$store.state.thing.eachprojectitems[val.index][val.index2][5] = 
        new Date().toISOString().substr(0, 10)
      }
      let ss = await this.$http.get('/editprojectitemsenddate', {
        params: {
          acc: this.$route.query.acc,
          index: val.index,
          index2: val.index2,
          flag: this.$store.state.thing.eachprojectitems[val.index][
            val.index2
          ][6]
        }
      })
    },
    additem(val) {
      console.log(val)
      this.eachprojectitems[val.selectindex].push(0)
      console.log(1)
    },
    getedititemscontent(val) {
      this.$store.state.thing.editindex = val
      this.$store.state.thing.class = 'd-flex'
      this.$store.state.thing.addoredit = false
      this.$store.state.thing.inputoredit = true
      console.log(this.$store.commit('thing/editstate', val))
      this.$store.commit('thing/editstate', val)
      // this.$store.state.thing.addoredit = true
    },
    async deleteproject(index) {
      let ss = await this.$http.get('/deleteproject',{
        params:{
          acc: this.$route.query.acc,
          index:index,
        }
      })
      this.itemss = ss.flag
    this.$store.state.thing.items = ss.flag
    this.$store.state.thing.eachprojectitems = ss.flag1
    }
  },
  computed: {
    //   ss(){
    // 有多個模塊要這樣使用
    //       return this.$store.state.login.count
    //   }
    // async itemss() {
    //     //  var reqq = ''
    //     // console.log(items)
    //  let ss =  await this.$http.get('/getproject',{
    //       params:{
    //           acc: this.$route.query.acc
    //       }
    //   })
    //   let gg = [1,2,3]
    //   console.log(gg)
    //   console.log(ss)
    //   return gg
    // }
    // ss(){
    //     return this.count
    // }
    // eachprojectitems() {}
  },
  watch: {
    //   在addprojectname方法裡 用count=count+1 讓 ss可以變化
    //  computed 搭配 this.axios好像不型
    async count() {
      //  var reqq = ''
      // console.log(items)
      let ss = await this.$http.get('/getproject', {
        params: {
          acc: this.$route.query.acc
        }
      })

      this.itemss = ss
      this.$store.state.thing.items = ss
    }
  }
}
</script>
<style scoped>
/* @import '"https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css"'; */
.lineheight {
  line-height: 40px;
}
.kk {
  background: tan;
}
.drawer-title {
  font-size: 30px;
  color: black;
  border-bottom: 1px black dashed;
}
button {
  color: white !important;
  /* outline:none !important; */
  font-size: 40px !important;
  /* border-radius: 50% */
}


/* .icon-search::before{
    font-size: 5px!important
} */

/* @import 'style.css'; 引入css類 */
</style>