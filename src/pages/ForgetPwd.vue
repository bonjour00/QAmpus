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
import { notEmpty } from 'src/components/Input/rules';
import { successs } from 'src/components/Table/ActionBtn/AnimateAction';

const userEmail = ref('');

//rules
const emailRef: any = ref(null);

const forget = async () => {
  emailRef.value?.validate();
  if (emailRef.value.hasError) {
    return;
  } else {
    try {
      const result = await axios.post(
        `${process.env.API_URL}/User/forgot-password`,
        {
          email: userEmail.value,
        }
      );
      successs('已發送重設密碼Email驗證信');
      console.log(result.data);
    } catch (e: any) {
      console.log('忘記密碼失敗', e);
      console.log(e.response.data);
    }
  }
};
</script>
