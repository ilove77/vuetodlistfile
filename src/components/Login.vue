<!--  -->
<template>
  <div class="body">
   

    <div class="loginform">
      <img src="../assets/logo.png" alt class="png" />
      <div class="loginbody">
        <ValidationObserver ref="loginss" v-slot="{invalid}">
          <form class="d-flex flex-column align-center">
            <ValidationProvider rules="alpha_num1|min1:6|max1:9|required1" v-slot="{ errors }">
              <!-- purple是背景色 -->
              <div class="justify-center mt-3">
                <v-text-field v-model="value.acc" label="帳號" placeholder="請輸入帳號" outlined>123</v-text-field>
                <div class="mt-n5 text-center">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>
            <ValidationProvider rules="alpha_num2|min2:8|max2:12|required2" v-slot="{ errors }">
              <!-- purple是背景色 -->
              <div class="justify-center mt-4">
                <v-text-field
                  type="password"
                  v-model="value.pass"
                  placeholder="請輸入密碼"
                  label="密碼"
                  outlined
                >123</v-text-field>
                <div class="mt-n5 text-center">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>
            <!-- v-container -->
            <v-container class="" >
              <!-- no-gutters 每個v-cols不會有距離 -->
              <v-row no-gutters justify="center" align-content ="center" class="" >
                <!-- cols 沒有的尺寸會採用這個 -->
                <v-col cols="12" sm="4" class="text-center">
                  <v-btn  :disabled="invalid" @click="onsubmit" class="ml-sm-15">登入</v-btn>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <v-btn  @click="onregister">註冊</v-btn>
                </v-col>
                  <v-col cols="12" sm="4" class="text-center">
                  <v-btn link :href = 'url' class="mr-sm-15"  >google登入</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { alpha_num, required, min, max } from 'vee-validate/dist/rules'
import { mapMutations } from 'vuex'

// Add a rule

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)


// extend('required',{
//     validate: (value, args) => {
//         const length = value.length
//         const lengths= args.min
//         return length > lengths
//     },
//     params: ['min'],
//     message: "1234564654564656"
// })

// extend('required', {
//   // value是輸入的值
//   // args是傳來的值 rules=required:4
//   validate: (value, args) => {
//     const length = value.length
//     const lengths = args.min
//     return {
//       required: true,
//       valid: length > lengths
//     }
//   },
//   computesRequired: true,
//   params: ['min'],
//   message: '你好嗎'
// }),
extend('required1', {
  ...required,
  message: '帳號不能為空白'
})

extend('required2', {
  ...required,
  message: '密碼不能為空白'
})

extend('min1', {
  ...min,
  message: '長度需包含6-9字，只能輸入英文和數字'
})

extend('min2', {
  ...min,
  message: '長度需包含8-12字，只能輸入英文和數字'
})
extend('max1', {
  ...max,
  message: '長度需包含6-9字，只能輸入英文和數字'
})

extend('max2', {
  ...max,
  message: '長度需包含8-12字，只能輸入英文和數字'
}),
  extend('alpha_num1', {
    ...alpha_num,
    message: '長度需包含6-9字，只能輸入英文和數字'
  })

extend('alpha_num2', {
  ...alpha_num,
  message: '長度需包含8-12字，只能輸入英文和數字'
})

extend('requ', {
  ...required,
  message: '長度需包含8-12字，且需包含英文和數字'
})
// extend('integer', {
//   ...integer,
//   message: '456'
// })

export default {
  name: 'Login',

  data() {
    return {
      value: {
        acc: '555555',
        pass: '44444444'
      },
      url:'',
    }
  },
  //生命周期 - 創建完成（訪問當前this實例）
  async created() {
     let url = await this.$http.get('/ss')
     this.url = url
  },
  //生命周期 - 掛載完成（訪問DOM元素）
  mounted() {},
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(response => {})
    },
    // ...mapMutations('login',['welcome']),
    async onsubmit() {
        let flag = await this.$http.post('/success',{
            acc:this.value.acc,
            pass:this.value.pass
        })
        // console.log(flag)
        if (!flag){
            alert("無此帳號密碼，登入失敗")
            this.$router.push('/Login')
            return
        }
      // validate()是在observer
      this.$refs.loginss.validate().then(success => {
        if (success) {
          //   this.$store.commit({
          //       type:'welcome',
          //   })
          this.$store.commit('login/welcome',{
              acc:this.value.acc,
          })
          this.$router.push({
              path:'/Home',
              query:{
                  acc:this.value.acc
              }
          })
        }
      })
    },

    onregister() {
      this.$router.push('/Register')
    }
  }
}
</script>
<style scoped>
/* @import 'style.css'; 引入css類 */
.body {
  background: #2b4b6b;
  height: 100%;
}

.loginform {
  width: 500px;
  height: 350px;
  background-color: white;
  box-shadow: 0px 0px 20px #00897b;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.loginbody {
  margin-top: 70px;
}
.png {
  position: absolute;
  width: 150px;
  top: -75px;
  left: 175px;
  border: 1px solid black;
  border-radius: 50%;
  background-color: #607d8b;
  box-shadow: 15px 20px solid goldenrod;
}
input {
  border: 1px gray solid;
}
</style>