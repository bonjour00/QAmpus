<template>
  <div class="main">
    <!-- Logo -->
    <div class="content">
      <div class="title-container">
        <img class="logo" :src="collapsedLogo" />
        <!-- Title -->
        <p class="title">管理者註冊</p>
      </div>
      <!-- Form Grid -->
      <div class="form-grid">
        <q-input class="input-field" label="教職員編號" v-model="userId" />
        <q-input v-model="userName" class="input-field" label="用戶名" />
        <q-input
          v-model="userPassword"
          class="input-field"
          label="密碼"
          type="password"
        />
        <q-input
          v-model="userEmail"
          class="input-field"
          label="EMAIL"
          type="email"
        />
        <!-- <q-select
          style="padding-top: 1rem"
          class="input-field"
          outlined
          :options="options"
          label="選擇您的單位"
        /> -->

        <!-- <q-input
          class="input-field"
          v-model="passwordText"
          label="輸入您的密碼"
          :dense="dense"
          type="password"
        /> -->
      </div>
    </div>
    <!-- Register Button -->
    <q-btn
      class="login-button"
      text-color="white"
      label="註冊"
      @click="register"
    />

    <!-- Login Link -->
    <div class="forget">
      <p>已經有帳號了？</p>
      <a class="alter" href="http://localhost:9000/#/login" target="_blank"
        >登入</a
      >
    </div>
    <AuthWave />
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import collapsedLogo from '../assets/collapsed-logo.png';
import AuthWave from '../components/Auth/AuthWave.vue';

const router = useRouter();

const userId = ref('');
const userName = ref('');
const userPassword = ref('');
const userEmail = ref('');

const register = async () => {
  try {
    const result = await axios.post('http://140.136.202.125/api/User', {
      userId: userId.value,
      userName: userName.value,
      userPassword: userPassword.value,
      userEmail: userEmail.value,
      userPermission: 'UNCONFIRMED',
    });
    console.log('註冊成功', result);
    router.push({ path: '/login' });
  } catch (e) {
    console.log('註冊失敗', e);
  }
};
</script>
<style scoped>
.main {
  background-color: white;
  height: 100vh;
  width: 100vw;
}
.logo {
  width: 38%;
  padding-top: 3rem;
  justify-self: center;
}
.content {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 35%;
  left: 50%;
  width: 60%;
  display: flex;
  flex-direction: row;
}
.input-field input[type='number']::-webkit-inner-spin-button,
.input-field input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.title-container {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  font-size: 25px;
  padding-top: 1rem;
  font-weight: bold;
  color: #484848;
}
.form-grid {
  padding-top: 2.5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  justify-self: center;
}
.input-field {
  width: 75%;
  justify-self: center;
}
.q-field__label {
  font-weight: 900;
}
.q-field__native:focus {
  border-bottom: 3px solid #2a77af;
}
.wave {
  width: 100vw;
  position: absolute;
  bottom: 0;
}
.login-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 3rem;
  background-color: #2a77af;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 10px;
  margin-top: 2rem;
}

.q-field__native,
.q-field__prefix,
.q-field__suffix,
.q-field__input {
  margin-top: 0.5rem;
}
.forget {
  position: absolute;
  display: flex;
  top: 62%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  text-decoration: none;
}

.alter {
  text-decoration: none;
  color: #2a77af;
  font-weight: 900;
}
</style>
