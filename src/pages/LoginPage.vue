<template>
  <div class="main">
    <div class="logo-container">
      <img class="logo" :src="collapsedLogo" />
      <p class="title">登入</p>
      <q-input class="account" v-model="accountText" label="EMAIL" />
      <q-input
        class="password"
        v-model="passwordText"
        label="密碼"
        type="password"
      />
      <q-btn
        class="login-button"
        text-color="white"
        label="登入"
        @click="login"
      />
      <div class="forget">
        <p>沒有帳號？</p>
        <a class="alter" href="http://localhost:9000/#/register" target="_blank"
          >註冊</a
        >
      </div>
      <AuthWave />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import collapsedLogo from '../assets/collapsed-logo.png';
import { useRouter } from 'vue-router';
import AuthWave from '../components/Auth/AuthWave.vue';

const accountText = ref('');
const passwordText = ref('');
const router = useRouter();

const login = async () => {
  try {
    const result = await axios.post('http://140.136.202.125/api/User/signin', {
      userEmail: accountText.value,
      userPassword: passwordText.value,
    });
    const result_analyze = await axios.post(
      `http://140.136.202.125/api/User/analyzingPermission?token=${result.data.token}`
    );
    if (result_analyze.data.permission == 'admin') {
      router.push({ path: '/' });
    } else if (result_analyze.data.permission == 'assigner') {
      router.push({ path: '/assign' });
    } else {
      router.push({ path: '/Chat' });
    }
    localStorage.setItem('token', result.data.token);
    console.log('登錄成功', result);
  } catch (e) {
    console.log('登錄失敗', e);
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
.account {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -25%);
  width: 20%;
}
.password {
  position: absolute;
  top: 44%;
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

.login-button {
  position: absolute;
  top: 51%;
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
  top: 63%;
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
