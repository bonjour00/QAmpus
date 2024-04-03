<template>
  <AuthContainer title="註冊您的帳戶" btnLabel="註冊" @clickBtn="register">
    <q-input
      v-model="userName"
      label="輸入您的使用者名稱"
      ref="nameRef"
      lazy-rules="ondemand"
      :rules="[(val) => notEmpty(val) || '使用者名稱不能是空的']"
    />
    <q-input
      v-model="userEmail"
      label="輸入您的Email"
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
      :rules="[
        (val) => notEmpty(val) || '密碼不能是空的',
        (val) =>
          /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(val) ||
          '密碼強度不夠，須包含英文及數字',
        (val) => val.length >= 8 || '密碼強度不夠，密碼長度需至少8個字元',
      ]"
      ><template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <q-input
      v-model="comfirmPassword"
      label="再次輸入您的密碼"
      :type="isConfirmPwd ? 'password' : 'text'"
      ref="confirmPwdRef"
      lazy-rules="ondemand"
      :rules="[
        (val) => notEmpty(val) || '密碼不能是空的',
        (val) => val === userPassword || '密碼不一致',
      ]"
      ><template v-slot:append>
        <q-icon
          :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isConfirmPwd = !isConfirmPwd"
        />
      </template>
    </q-input>
    <template #link>
      <AuthLink toDescription="已經有帳號了？" to="/login" toLinkTitle="登入" />
    </template>
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import AuthLink from 'src/components/Auth/AuthLink.vue';
import { notEmpty } from 'src/components/Input/rules';

const router = useRouter();

const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const comfirmPassword = ref('');

//pwd see or not
const isPwd = ref(true);
const isConfirmPwd = ref(true);

//rules
const nameRef: any = ref(null);
const emailRef: any = ref(null);
const pwdRef: any = ref(null);
const confirmPwdRef: any = ref(null);

const register = async () => {
  nameRef.value?.validate();
  emailRef.value?.validate();
  pwdRef.value?.validate();
  confirmPwdRef.value?.validate();
  if (
    nameRef.value.hasError ||
    emailRef.value.hasError ||
    pwdRef.value.hasError ||
    confirmPwdRef.value.hasError
  ) {
    return;
  } else {
    try {
      const result = await axios.post(`${process.env.API_URL}/User/normal`, {
        userName: userName.value,
        userPassword: userPassword.value,
        userEmail: userEmail.value,
        userPermission: 'user',
      });
      successs('完成Email驗證後即註冊成功');
      router.push({ path: '/login' });
    } catch (e) {
      console.log('註冊失敗', e);
    }
  }
};
</script>
