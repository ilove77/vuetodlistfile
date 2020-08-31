<!--  -->
<template>
  <div class="body">
    <!-- <div @click="fuck"></div> -->
    <div class="loginform">
      <img src="../assets/logo.png" alt class="png" />
      <div class="loginbody d-flex flex-column align-center">
        <ValidationObserver ref="loginss" v-slot="{invalid}">
          <form>
            <ValidationProvider
              rules="alpha_num1|min1:6|max1:9|required1|account"
              v-slot="{ errors }"
            >
              <!-- purple是背景色 -->
              <div class="justify-center mt-3">
                <v-text-field
                  v-model="value.acc"
                  label="帳號"
                  placeholder="請輸入註冊帳號"
                  @keyup="checkacc"
                  outlined
                >123</v-text-field>
                <div class="mt-n5 text-center">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>
            <ValidationProvider
              rules="alpha_num2|min2:8|max2:12|required2|password"
              v-slot="{ errors }"
            >
              <!-- purple是背景色 -->
              <div class="justify-center mt-4">
                <v-text-field
                  type="password"
                  v-model="value.pass"
                  placeholder="請輸入註冊密碼"
                  label="密碼"
                  @keyup= "checkpass"
                  outlined
                >123</v-text-field>
                <div class="mt-n5 text-center">{{ errors[0] }}</div>
              </div>
            </ValidationProvider>
            <v-container>
              <!-- no-gutters 每個v-cols不會有距離 -->
              <v-row no-gutters>
                <!-- cols 沒有的尺寸會採用這個 -->
                <v-col cols="5" class="text-left">
                  <v-btn class="mr-4" :disabled="invalid" @click="onsubmit">提交</v-btn>
                </v-col>
                 <v-col cols="7" class="text-right">
                  <v-btn class="mr-4"  @click="onlogin">回到登入頁面</v-btn>
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

// Add a rule

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
// var Axios = Vue.prototype.$axios

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
        acc: '',
        pass: ''
      }
    }
  },
  //生命周期 - 創建完成（訪問當前this實例）
  created() {},
  //生命周期 - 掛載完成（訪問DOM元素）
  mounted() {},
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(response => {})
    },

    onsubmit() {
      this.$refs.loginss.validate().then(success => {
        if (success) {
          console.log(this)
        }
      })
    },
    async checkacc() {
      // console.log(this.$)
      // var that = this.$http
      let flag = await this.$http.get('/loginacc', {
        params: {
          value: this.value.acc
        }
      });
      extend('account',{
          validate(){
              return !flag
          },
          message:'此帳號已註冊過'
      })
    },
    async checkpass() {
        let flag = await this.$http.get('/loginpass', {
        params: {
          value: this.value.pass
        }
      });
      extend('password',{
          validate(){
              return !flag
          },
          message:'此密碼已註冊過'
      })
    },
    async onsubmit() {
      let flag =  await this.$http.post('/applicate',this.value)
      if(!flag) {
          alert("此組帳號密碼註冊過了")
          this.$router.push('/Register')
      }
      alert("註冊成功")
      this.$router.push('/Login')
    },
    onlogin() {
        this.$router.push('/Login')
    }
    

    //     extend('account',{
    //     async validate(value){
    //         console.log(that)
    //         try{
    //          await that.get('http://1ocalhost:6050/res',{
    //             params:{
    //                 value
    //             }
    //         })
    //         }
    //         catch(error){
    //             console.log(error)
    //         }
    //         console.log(gg)
    //         if(gg) {
    //             return false
    //         }
    //         else {
    //             return true
    //         }
    //     },
    //     message:"此帳號有人註冊過",
    // })
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