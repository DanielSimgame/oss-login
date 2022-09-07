<template>
  <div class="bg-gray-50">
    <div class="login-bg my-0 px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">

      <div class="login-slogan-wrap-outer ">
        <div class="login-slogan-wrap-inner">
          <div class="login-slogan-text w-fit">
<!--            random slogan in slogans-->
            <h1 class="text-4xl font-bold leading-tight">
              {{ slogans[Math.floor(Math.random() * slogans.length + 1)-1] }}
            </h1>
          </div>
        </div>
      </div>

      <div class="lg:container h-80 relative">
        <div class="login-container absolute right-2 top-30 w-96 h-60 bg-white p-6">
          <el-tabs v-model="loginMethod">
            <el-tab-pane label="账号密码登录" name="account"></el-tab-pane>
          </el-tabs>
          <el-form v-model="loginForm.value" label-width="60px">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  @keyup.enter="onLoginClick"
                  type="password">
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="login-submit flex-row justify-between min-w-full">

                <el-button
                    type="primary"
                    size="large"
                    class="w-full"
                    @click="onLoginClick"
                    :loading="isLoading">
                  登录
                </el-button>

                <el-button size="large" class="w-20" @click="onSignupClick">注册</el-button>

              </div>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from "vue-router"
// import RequestUtil from "@/lib/utils/RequestUtil"

import Notifications from "../lib/Notifications";
// import UserStorages from "../lib/Storages/UserStorages"
import {postTokenVerify, postLogin} from "../lib/Requests/User";
import UserStorages from "../lib/Storages/UserStorages";
import Encoders from "../lib/Encoders";

const slogans = ref([
    '一个账号，全局畅通',
    '单点登录，多站互联',
])

const router = useRouter()

let loginMethod = ref('account')
let isLoading = ref(false)
let loginForm = reactive({
  username: '',
  password: '',
})

/**
 * @function loginValidator
 * @description 校验登录表单
 * @returns {boolean}
 * */
const loginValidator = () => {
  const USERNAME_REGEXP_1 = /[^\x00-\xff]/
  const USERNAME_REGEXP_2 = /[^a-zA-Z0-9]/

  if (loginForm.username.length === 0) {
    Notifications.error('用户名不能为空')
    return false
  }
  // if loginForm.username includes any special character like !@#$%^&*() or non-ASCII character, return false
  if (USERNAME_REGEXP_1.test(loginForm.username) || USERNAME_REGEXP_2.test(loginForm.username)) {
    Notifications.error('用户名不能包含特殊字符')
    return false
  }
  if (loginForm.password.length === 0) {
    Notifications.error('密码不能为空')
    return false
  }
  if (loginForm.password.length < 8 || loginForm.password.length > 20) {
    Notifications.error('密码长度不能小于8位或大于20位')
    return false
  }
  return true
}

/**
 * @function onLoginClick
 * @description 登录按钮点击事件
 * */
const onLoginClick = async () => {
  isLoading.value = true
  if (!loginValidator()) {
    return
  }

  const username = loginForm.username
  const password = loginForm.password

  const loginDto = new FormData()
  loginDto.append("username", username)
  loginDto.append("password", password)

  await postLogin(loginDto)
      .then((res) => {
        return res.json()
      })
      .then((r = {access_token: "", token_type: ""}) => {
        if (r.access_token !== "") {
          UserStorages.setToken(r.access_token)
          return r.access_token
        } else {
          throw new Error('请检查您的账号密码')
        }
      })
      .then((token) => {
        if (token !== undefined) {
          const userInfoDto = {
            username: username,
            token: token
          }
          return Encoders.getEncode64New(JSON.stringify(userInfoDto))
        }
        throw new Error('无法获取Token')
      })
      .then(token => {
        if (token !== undefined) {
          // TODO: 待修改为可自定义重定向URL
          window.location = `http://localhost:3000/home?u=${token}`
          // window.location
        }
      })
      .catch(err => {
        console.log(err)
        Notifications.error(err)
      })
      .finally(() => {
        isLoading.value = false
      })

}

/**
 * @function onSignupClick
 * @description 注册按钮点击事件
 */
const onSignupClick = () => {
  router.push('/register')
}
</script>

<style>
.login-bg {
  height: 600px;
  background-image: url("../assets/images/bg_login.png");
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
}

.login-slogan-wrap-outer {
  width: 35rem;
  height: 70px;
  background: linear-gradient(-60deg, transparent 35px, #1689ff 0) bottom right;
  animation: dash-in 0.5s forwards;
  @apply absolute left-0;
}

.login-slogan-wrap-inner {
  width: 95%;
  height: 100%;
  transform: translateX(-100%);
  background: linear-gradient(-60deg, transparent 35px, #fff 0) bottom right;
  animation: dash-in 0.5s forwards;
  animation-delay: 0.1s;
  @apply flex justify-center items-center;
}

.login-slogan-text {
  @apply font-bold italic;
}

.login-submit {
  display: flex !important;
  flex-direction: row;
}

@keyframes dash-in {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: rotateX(0);
  }
}

</style>
