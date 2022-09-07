<template>
  <div class="bg-gray-50">
    <div
        class="login-bg my-0 px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <div class="lg:container h-80 relative">

        <div class="signup-container flex flex-col items-center w-96 h-fit bg-white p-6 mx-auto my-0">
          <el-form v-model="signupForm.value" class="w-full" label-width="100px" @submit.prevent>
            <el-form-item label="用户名">
              <el-input v-model="signupForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input v-model="signupForm.name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                  v-model="signupForm.password"
                  placeholder="请输入密码"
                  type="password"
                  show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                  v-model="signupForm.confirmPassword"
                  placeholder="请再次确认密码"
                  type="password"
                  show-password
              ></el-input>
            </el-form-item>
<!--            <el-form-item label="手机号">-->
<!--              <el-input-->
<!--                  v-model="signupForm.phone"-->
<!--                  @blur="onInputPhoneBlur"-->
<!--                  placeholder="请输入手机号"-->
<!--              ></el-input>-->
<!--              <transition name="el-zoom-in-top">-->
<!--                <div-->
<!--                    class="phone-illegal w-full mt-2 text-center rounded-lg border-5 bg-red-400 text-white"-->
<!--                    v-if="!isPhoneAvailable && errorTips.phoneMsg !== ''"-->
<!--                >-->
<!--                  <p>{{ errorTips.phoneMsg }}</p>-->
<!--                </div>-->
<!--              </transition>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="Email">-->
<!--              <el-input-->
<!--                  v-model="signupForm.email"-->
<!--                  @blur="onInputEmailBlur"-->
<!--                  placeholder="请输入邮箱"-->
<!--              ></el-input>-->
<!--              <transition name="el-zoom-in-top">-->
<!--                <div-->
<!--                    class="phone-illegal w-full mt-2 text-center rounded-lg border-5 bg-red-400 text-white"-->
<!--                    v-if="!isEmailAvailable && errorTips.emailMsg !== ''"-->
<!--                >-->
<!--                  <p>{{ errorTips.emailMsg }}</p>-->
<!--                </div>-->
<!--              </transition>-->
<!--            </el-form-item>-->
          </el-form>
          <el-button class="w-full" @click="onRegisterClick" :loading="isLoading" type="primary">注册</el-button>
          <el-link class="mt-5 w-fit" @click="onBackToLoginClick">已有账号？返回登录</el-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {useRouter} from "vue-router"
import {useStore} from "vuex";
import {postSignUp, getUserInfo} from "../lib/Requests/User";

import Notifications from "../lib/Notifications";
import UserStorages from "../lib/Storages/UserStorages"
import ErrorHandlers from "../lib/ErrorHandlers";

const store = useStore()
const router = useRouter()

let isLoading = ref(false)
let signupForm = reactive({
  username: '',
  name: '',
  password: '',
  confirmPassword: '',
})

/**
 * @function loginValidator
 * @description 校验登录表单
 * @returns {boolean}
 * */
const loginValidator = () => {
  const USERNAME_REGEXP_1 = /[^\x00-\xff]/
  const USERNAME_REGEXP_2 = /[^a-zA-Z0-9]/
  const REAL_NAME_REGEXP =  /^([a-zA-Z0-9\u4e00-\u9fa5\·]{1,10})$/
  // 密码强度校验正则表达式，密码必须8~20位，且至少包含大写字母、小写字母、数字以及特殊符号（-_!?,.~@#）的其中一种
  const PASSWORD_STRENGTH_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_!?,.~@#])(?=[^$%^&*]).{8,20}$/

  if (signupForm.username.length === 0) {
    Notifications.error('用户名不能为空')
    return false
  }
  if (signupForm.name.length === 0) {
    Notifications.error('真实姓名不能为空')
    return false
  }
  if (!REAL_NAME_REGEXP.test(signupForm.name)) {
    Notifications.error('姓名格式不正确')
    return false
  }
  // 如果 signupForm.username 包含 !@#$%^&*() 或者 非ASCII字符，返回错误
  if (USERNAME_REGEXP_1.test(signupForm.username) || USERNAME_REGEXP_2.test(signupForm.username)) {
    Notifications.error('用户名不能包含特殊字符')
    return false
  }
  if (signupForm.password.length === 0) {
    Notifications.error('密码不能为空')
    return false
  }
  // 密码强度校验正则表达式，密码必须8~20位，且至少包含大写字母、小写字母、数字以及特殊符号（-_!?,.~@#）的其中一种
  if (!PASSWORD_STRENGTH_REGEXP.test(signupForm.password)) {
    Notifications.error('密码强度不足，长度必须8~20位，且至少包含大写字母、小写字母、数字以及特殊符号（-_!?,.~@#）的其中一种')
    return false
  }
  if (signupForm.password.length < 8 || signupForm.password.length > 20) {
    Notifications.error('密码长度不能小于8位或大于20位')
    return false
  }
  if (signupForm.password !== signupForm.confirmPassword) {
    Notifications.error('两次密码不一致')
    return false
  }
  return true
}

/**
 * @function onRegisterClick
 * @description 登录按钮点击事件
 * */
const onRegisterClick = async () => {
  const validation = loginValidator()
  const signUpDto = {
    'Account': signupForm.username,
    'Alias': signupForm.name,
    'Passwd': signupForm.password,
    'Type': 'user',
  }
  // const registerForm = {
  //   username: signupForm.username,
  //   name: signupForm.name,
  //   password: signupForm.password,
  //   confirmPassword: signupForm.confirmPassword,
  // }

  if (!validation) {
    console.log('校验失败')
    return
  }
  isLoading.value = true
  await postSignUp(signUpDto)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        Notifications.topMsg('注册成功', {type: 'success'})
        router.push('/')
      })
      .catch(err => {
        console.log(err)
        Notifications.error(ErrorHandlers.parseError(err))
      })
      .finally(() => {
          isLoading.value = false
      })
}

/**
 * @function onBackToLoginClick
 * @description 返回登录按钮点击事件
 * */
const onBackToLoginClick = () => {
  router.push('/')
}

/**
 * @function onEulaChange
 * @description 同意用户协议按钮点击事件
 * */
// const onEulaChange = () => {
//     loginBtnDisabled.value = !eulaAgreed.value
// }

/**
 * @function onEulaClick
 * @description 用户协议按钮点击事件
 * */
// const onEulaClick = () => {
//     this.$router.push('/user/eula')
// }

/**
 * @function onPrivacyClick
 * @description 隐私政策按钮点击事件
 * */
// const onPrivacyClick = () => {
//     this.$router.push('/user/privacy')
// }
</script>

<style>
.login-bg {
  height: 600px;
  background-image: url("../assets/images/bg_login.png");
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
}

.sign-up-submit {
  display: flex !important;
  flex-direction: row;
}
</style>
