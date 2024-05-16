<template>
  <AuthContainer
    title="重設密碼"
    btnLabel="送出"
    @clickBtn="vertify"
    :loadingShow="loadingShow"
  >
    <q-input
      v-model="userPassword"
      label="請輸入舊密碼"
      :type="isPwd ? 'password' : 'text'"
      ref="pwdRef"
      lazy-rules="ondemand"
      :rules="[notEmpty, pwTooEasy, pwTooShort]"
      @keyup.enter.exact.prevent="vertify"
      ><template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
  </AuthContainer>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AuthContainer from 'src/components/Auth/AuthContainer.vue';
import { notEmpty, pwTooEasy, pwTooShort } from 'src/components/Input/rules';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { api } from 'src/boot/axios';
import useNotify from 'src/composables/Notify/useNotify';
import { useRouter } from 'vue-router';

const { notifyFail } = useNotify();
const router = useRouter();
const loadingShow = ref(false);
const userPassword = ref('');

//pwd see or not
const isPwd = ref(true);

//rules
const pwdRef: any = ref(null);
const vertify = async () => {
  pwdRef.value?.validate();
  const token = localStorage.getItem('token');
  if (pwdRef.value.hasError) {
    return;
  } else {
    loadingShow.value = true;
    try {
      const result = await api.post(
        `/User/verify?password=${userPassword.value}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      successs('驗證成功');
      const paramsToken = result.data.split('token=')[1];
      router.push({
        path: 'reset-person-pwd',
        query: { token: paramsToken },
      });
    } catch (error: any) {
      console.log(error);
      notifyFail(error.response, '驗證失敗');
    }
    loadingShow.value = false;
  }
};
</script>
