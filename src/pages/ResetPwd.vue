<template>
  <AuthContainer
    title="重設您的密碼"
    customStyle="margin-top: 20vh"
    btnLabel="確認重設密碼"
    toDescription=""
    to=""
    toLinkTitle=""
    @clickBtn="reset"
  >
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
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import { successs } from 'src/components/Table/ActionBtn/AnimateAction';

const router = useRouter();

const userPassword = ref('');
const comfirmPassword = ref('');

//pwd see or not
const isPwd = ref(true);
const isConfirmPwd = ref(true);

//rules
const notEmpty = (val: any) => val && val.length > 0;
const pwdRef: any = ref(null);
const confirmPwdRef: any = ref(null);

const reset = async () => {
  pwdRef.value?.validate();
  confirmPwdRef.value?.validate();
  if (pwdRef.value.hasError || confirmPwdRef.value.hasError) {
    return;
  } else {
    try {
      const token = localStorage.getItem('tokenPwd');
      const result = await axios.post(
        `${process.env.API_URL}/api/User/reset-password?token=${token}&newPassword=${userPassword.value}`
      );
      console.log(result.data);
      successs('修改成功');
      router.push({ path: '/login' });
    } catch (e: any) {
      console.log('重設失敗', e);
      console.log(e.response.data);
    }
  }
};
</script>
