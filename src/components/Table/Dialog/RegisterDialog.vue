<template>
  <q-dialog :modelValue="registerOpen" @update:model-value="closePopup">
    <q-card class="q-pa-sm">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6"><b>新增管理者</b></div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closePopup" />
      </q-card-section>
      <div style="max-height: 50vh" class="scroll">
        <q-card-section>
          <q-input
            v-model="userId"
            label="輸入使用者教職員編號"
            ref="idRef"
            lazy-rules="ondemand"
            :rules="[(val) => notEmpty(val) || '使用者教職員編號不能是空的']"
            dense
            filled
          /><q-input
            v-model="userName"
            label="輸入使用者名稱"
            ref="nameRef"
            lazy-rules="ondemand"
            :rules="[(val) => notEmpty(val) || '使用者名稱不能是空的']"
            dense
            filled
          /><q-input
            v-model="userEmail"
            label="輸入使用者Email"
            ref="emailRef"
            lazy-rules="ondemand"
            :rules="[(val) => notEmpty(val) || '信箱不能是空的']"
            dense
            filled
          />
        </q-card-section>
      </div>
      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="closePopup" />
        <q-btn
          id="editOK"
          flat
          label="新增"
          color="primary"
          @click="editSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { successs } from '../ActionBtn/AnimateAction';
// import OptionSelect from '../Toolbar/OptionSelect.vue';
import axios from 'axios';

const props = defineProps<{
  registerOpen: boolean;
}>();
const emit = defineEmits(['update:registerOpen', 'registerUpdate']);

const userId = ref('');
const userName = ref('');
const userEmail = ref('');

//rules
const notEmpty = (val: any) => val && val.length > 0;
const nameRef: any = ref(null);
const emailRef: any = ref(null);
const idRef: any = ref(null);

const closePopup = () => {
  userId.value = '';
  userName.value = '';
  userEmail.value = '';
  emit('update:registerOpen', false);
};

const editSubmit = async () => {
  idRef.value?.validate();
  nameRef.value?.validate();
  emailRef.value?.validate();

  if (
    nameRef.value.hasError ||
    emailRef.value.hasError ||
    idRef.value.hasError
  ) {
    console.log(nameRef.value.hasError);
    return;
  } else {
    try {
      const result = await axios.post(`${process.env.API_URL}/api/User/admin`, {
        userId: userId.value,
        userName: userName.value,
        userPassword: 'A1234567',
        userEmail: userEmail.value,
        userPermission: localStorage.getItem('role'),
        officeId: localStorage.getItem('role') == '分配者' ? 4 : 3,
      });
      console.log(result);
      successs('修改成功');
    } catch (e: any) {
      console.log(e, 'error');
    }
    emit('registerUpdate');
    closePopup();
  }
};
</script>
