<template>
  <q-dialog
    :modelValue="registerDialogStore.open"
    @update:model-value="closeRegisterDialog"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">新增管理者</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closeRegisterDialog" />
      </q-card-section>
      <div style="max-height: 50vh" class="scroll">
        <q-card-section>
          <q-input
            v-model="registerDialogStore.userId"
            label="輸入使用者教職員編號"
            ref="idRef"
            lazy-rules="ondemand"
            :rules="[notEmpty]"
            filled
          /><q-input
            v-model="registerDialogStore.userName"
            label="輸入使用者名稱"
            ref="nameRef"
            lazy-rules="ondemand"
            :rules="[notEmpty]"
            filled
          /><q-input
            v-model="registerDialogStore.userEmail"
            label="輸入使用者Email"
            ref="emailRef"
            lazy-rules="ondemand"
            :rules="[notEmpty]"
            filled
          />
          <OptionSelect
            v-if="registerDialogStore.userPermission == 'assigner'"
            v-model:currentOption="registerDialogStore.role"
            :options="registerDialogStore.options"
            title="權限"
          />
        </q-card-section>
      </div>
      <q-card-actions align="right" class="q-pa-md">
        <FilterSelect
          v-show="
            registerDialogStore.userPermission == 'assigner' &&
            registerDialogStore.role.value != 'assigner'
          "
          title="註冊單位: "
          v-model:currentOption="registerDialogStore.office"
          :filterFn="filterFn"
          :filterOption="registerDialogStore.filterOption"
        />
        <DialogButton btnName="取消" @clicked="closeRegisterDialog" />
        <DialogButton btnName="註冊" @clicked="signupMember" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import DialogButton from 'src/components/Button/Dialog/DialogButton.vue';
import OptionSelect from '../Table/Toolbar/OptionSelect.vue';
import FilterSelect from '../Select/FilterSelect.vue';
import { notEmpty } from 'src/components/Input/rules';
import { storeToRefs } from 'pinia';
import { useRegisterDialogStore } from 'src/stores/Dialog/registerDialog';

const registerDialogStore = useRegisterDialogStore();
const { nameRef, emailRef, idRef } = storeToRefs(registerDialogStore);

const signupMember = () => {
  registerDialogStore.signupMember();
};
const closeRegisterDialog = () => {
  registerDialogStore.closeRegisterDialog();
};
const filterFn = (val: string, update: any) => {
  registerDialogStore.filterFn(val, update);
};
</script>
