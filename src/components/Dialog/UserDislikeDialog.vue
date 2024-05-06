<template>
  <q-dialog
    :modelValue="userDislikeDialogStore.open && userStore.userEmail != null"
    @update:model-value="closeDislikeDialog"
  >
    <q-card style="max-width: 550px" class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">轉交人工審核</div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeDislikeDialog" />
      </q-card-section>
      <q-card-section align="center" class="q-pb-none">
        <div class="text-body1">
          我們只會將<b>以下問答資訊</b>提交給相關所屬單位，經人工審核後，我們會<b
            >發信通知您核准後的答覆</b
          >
        </div>
        <q-banner class="bg-grey-3" dense>
          <template v-slot:avatar>
            <q-icon name="info" color="primary" />
          </template>
          <div class="flex flex-center q-gutter-lg">
            <div>
              <span>
                請提供<b>清晰、完整的問題描述</b>，以提高回覆品質， 也<b
                  >可修改該問答之可能所屬單位</b
                >
              </span>
            </div>
          </div>
        </q-banner>
      </q-card-section>
      <q-card-section style="max-height: 43vh" class="scroll">
        <q-input
          v-model="userDislikeDialogStore.question"
          dense
          autogrow
          autofocus
          ><template v-slot:prepend>
            <span class="text-subtitle1">Q:&nbsp;</span>
          </template>
        </q-input>
        <q-input v-model="userDislikeDialogStore.answer" dense autogrow readonly
          ><template v-slot:prepend>
            <span class="text-subtitle1">A:&nbsp;</span>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-py-none">
        <q-checkbox
          v-model="userDislikeDialogStore.needDirectAssign"
          label="不確定所屬單位"
        />
      </q-card-section>
      <q-card-section>
        <FilterSelect
          v-show="!userDislikeDialogStore.needDirectAssign"
          title="所屬單位: "
          v-model:currentOption="userDislikeDialogStore.office"
          :filterFn="filterFn"
          :filterOption="userDislikeDialogStore.filterOption"
      /></q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <q-space />
        <CancelBtn @clicked="closeDislikeDialog" />
        <ConfirmBtn btnName="提交" @clicked="dislikeSubmit" />
      </q-card-actions>
      <HourglassLoading :showing="userDislikeDialogStore.loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import CancelBtn from '../Button/Dialog/CancelBtn.vue';
import ConfirmBtn from '../Button/Dialog/ConfirmBtn.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import FilterSelect from '../Select/FilterSelect.vue';
import HourglassLoading from '../Loading/HourglassLoading.vue';
import { useUserStore } from 'src/stores/Auth/user';
import { useUserDislikeDialogStore } from 'src/stores/Dialog/userDislikeDialog';

const userDislikeDialogStore = useUserDislikeDialogStore();
const userStore = useUserStore();

const dislikeSubmit = () => {
  userDislikeDialogStore.dislikeSubmit();
};
const closeDislikeDialog = () => {
  userDislikeDialogStore.closeDislikeDialog();
};
const filterFn = (val: string, update: any) => {
  userDislikeDialogStore.filterFn(val, update);
};
</script>
