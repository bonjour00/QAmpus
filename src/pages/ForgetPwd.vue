<template>
  <AuthContainer
    title="忘記密碼"
    customStyle="margin-top: 25vh"
    btnLabel="寄送重設密碼驗證信"
    toDescription=""
    to=""
    toLinkTitle=""
    @clickBtn="forget"
  >
    <q-input
      v-model="userEmail"
      label="輸入您的EMAIL"
      ref="emailRef"
      lazy-rules="ondemand"
      :rules="[(val) => notEmpty(val) || '信箱不能是空的']"
    />
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';

const userEmail = ref('');

//rules
const notEmpty = (val: any) => val && val.length > 0;
const emailRef: any = ref(null);

const forget = async () => {
  emailRef.value?.validate();
  if (emailRef.value.hasError) {
    return;
  } else {
    try {
      // const result = await axios.post(
      //   `${process.env.API_URL}/api/User/signin`,
      //   {
      //     userEmail: userEmail.value,
      //     userPassword: userPassword.value,
      //   }
      // );
    } catch (e: any) {
      console.log('忘記密碼失敗', e);
      console.log(e.response.data);
    }
  }
};
</script>
