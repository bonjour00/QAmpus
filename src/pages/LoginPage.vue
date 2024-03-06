<template>
  <WaveAnimation />
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: calc(100vh - 111px);
    "
  >
    <div
      style="
        width: 25%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 30px;
      "
    >
      <img src="../layouts/expanded-logo.png" style="width: 85%" />
      <input
        style="
          border: 0;
          outline: 0;
          background: transparent;
          border-bottom: 2px solid #2a77af;
          width: 65%;
          padding: 10px;
          margin-top: 50px;
        "
        placeholder="學號/教職員編號"
        v-model="account"
      />
      <input
        style="
          border: 0;
          outline: 0;
          background: transparent;
          border-bottom: 2px solid #2a77af;
          width: 65%;
          padding: 10px;
          margin-top: 15px;
        "
        placeholder="密碼"
        v-model="password"
      />
      <q-btn
        label="登入"
        style="
          background: #2a77af;
          color: white;
          width: 65%;
          font-weight: 900;
          padding: 10px;
          border-radius: 10px;
          margin-top: 30px;
        "
        @click="login"
      />
      <span style="margin-top: 15px"><b>忘記密碼?</b></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WaveAnimation from './Components/Wave/WaveAnimation.vue';
import axios from 'axios';

const account = ref('');
const password = ref('');
const login = async () => {
  try {
    const result = await axios.post('http://140.136.202.125/api/User/signin', {
      userId: account.value,
      userPassword: password.value,
    });
  } catch (e) {
    console.log(e, 'error');
  }
};
</script>
<style scoped>
input::placeholder {
  font-weight: 900;
  font-size: 15px;
  color: #797979;
}
</style>
