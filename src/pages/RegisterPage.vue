<template>
  <div class="main">
    <div class="logo-container">
      <img class="logo" :src="collapsedLogo" />
      <p class="title">註冊您的帳戶</p>

      <q-input class="username" v-model="userName" label="輸入您的使用者名稱" />
      <q-input class="account" v-model="userEmail" label="輸入您的EMAIL" />
      <q-input class="password" v-model="userPassword" label="輸入您的密碼" />
      <q-btn
        class="login-button"
        text-color="white"
        label="註冊"
        @click="register"
      />
      <div class="forget">
        <p>已經有帳號了？</p>
        <a class="alter" href="http://localhost:9000/#/login" target="_blank"
          >登入</a
        >
      </div>
      <AuthWave />
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import collapsedLogo from '../assets/collapsed-logo.png';
import AuthWave from '../components/Auth/AuthWave.vue';

const router = useRouter();

const userName = ref('');
const userPassword = ref('');
const userEmail = ref('');

const register = async () => {
  try {
    const result = await axios.post('http://140.136.202.125/api/User', {
      userId: `${Date.now()}`,
      userName: userName.value,
      userPassword: userPassword.value,
      userEmail: userEmail.value,
      userPermission: 'user',
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
  width: 100vw;
  height: 100vh;
}
.logo-container {
  width: 100vw;
  height: 100vh;
}

.logo {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -25%);
  width: 6%;
}
.title {
  background-color: none;
  position: absolute;
  font-size: 25px;
  top: 28%;
  left: 50%;
  transform: translate(-50%, -25%);
  font-weight: 900;
  color: #484848;
}
.username {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -25%);
  width: 20%;
}
.account {
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -25%);
  width: 20%;
}
.password {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -25%);
  width: 20%;
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
  top: 60%;
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
  top: 72%;
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
