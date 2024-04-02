<template>
  <AuthContainer title="登入" btnLabel="登入" @clickBtn="login">
    <q-input
      v-model="userEmail"
      label="EMAIL"
      ref="emailRef"
      lazy-rules="ondemand"
      :rules="[(val) => notEmpty(val) || '信箱不能是空的']"
    />
    <q-input
      v-model="userPassword"
      label="輸入您的密碼"
      :type="isPwd ? 'password' : 'text'"
      ref="pwdRef"
      lazy-rules="ondemand"
      :rules="[(val) => notEmpty(val) || '密碼不能是空的']"
      ><template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <template #link>
      <AuthLink toDescription="沒有帳號？" to="/login" toLinkTitle="註冊" />
      <AuthLink
        toDescription="忘記密碼?"
        to="/forget-pwd"
        toLinkTitle="重設密碼"
      />
    </template>
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import AuthLink from 'src/components/Auth/AuthLink.vue';
import { notEmpty } from 'src/components/Input/rules';

const userEmail = ref('');
const userPassword = ref('');
const router = useRouter();

//pwd see or not
const isPwd = ref(true);

//rules
const emailRef: any = ref(null);
const pwdRef: any = ref(null);

const login = async () => {
  emailRef.value?.validate();
  pwdRef.value?.validate();
  if (emailRef.value.hasError || pwdRef.value.hasError) {
    return;
  } else {
    try {
      const result = await axios.post(
        `${process.env.API_URL}/api/User/signin`,
        {
          userEmail: userEmail.value,
          userPassword: userPassword.value,
        }
      );
      const result_analyze = await axios.post(
        `${process.env.API_URL}/api/User/analyzingPermission`,
        {},
        {
          headers: {
            Authorization: result.data.token,
          },
        }
      );
      const userRole = result_analyze.data.permission;
      if (userRole == 'admin') {
        router.push({ path: '/' });
      } else if (userRole == '分配者') {
        router.push({ path: '/assign' });
      } else {
        router.push({ path: '/chat' });
      }
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('role', userRole);
    } catch (e: any) {
      console.log('登錄失敗', e);
      console.log(e.response.data);
    }
  }
};
</script>
