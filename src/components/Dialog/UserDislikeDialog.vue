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
          我們即將以下<b>問答資訊轉交至所屬單位</b>，待人工審核後將<b>發信通知您</b>核准之答覆~
        </div>
        <q-banner class="bg-grey-3" dense>
          <template v-slot:avatar>
            <q-icon name="info" color="primary" />
          </template>
          <div class="flex flex-center q-gutter-lg">
            <div>
              <span>
                為求提高回覆品質，請您將您的<b>問題在下方補充、完整描述</b
                ><br />
                ，並<b>可修改該問答之可能所屬單位</b>
              </span>
            </div>
          </div>
        </q-banner>
      </q-card-section>
      <q-card-section style="max-height: 45vh" class="scroll">
        <q-input v-model="userDislikeDialogStore.question" dense autogrow
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
      <q-card-actions align="right" class="q-pa-md">
        <FilterSelect
          v-show="!userDislikeDialogStore.needDirectAssign"
          title="指派單位: "
          v-model:currentOption="userDislikeDialogStore.office"
          :filterFn="filterFn"
          :filterOption="userDislikeDialogStore.filterOption"
        />
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
