<template>
  <q-dialog
    :modelValue="editDialogStore.open"
    @update:model-value="closeEditDialog"
  >
    <q-card style="max-width: 550px" class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">問答</div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeEditDialog" />
      </q-card-section>
      <div style="max-height: 45vh" class="scroll">
        <q-card-section>
          <q-input
            :model-value="
              editDialogStore.row && editDialogStore.row.questionQuestion
            "
            dense
            autogrow
            readonly
            ><template v-slot:prepend>
              <span class="text-subtitle1">Q:&nbsp;</span>
            </template>
          </q-input>
          <q-input
            :model-value="
              editDialogStore.row && editDialogStore.row.questionAnswer
            "
            dense
            autogrow
            readonly
            ><template v-slot:prepend>
              <span class="text-subtitle1">A:&nbsp;</span>
            </template>
          </q-input>
        </q-card-section>
      </div>
      <q-card-section
        style="max-height: 20vh"
        class="scroll q-py-none"
        v-if="editDialogStore.officeRecord.length != 0"
        ><div class="text-subtitle1 text-weight-bold">轉移單位歷史紀錄</div>
        <OfficeRecord :record="editDialogStore.officeRecord" />
      </q-card-section>
      <q-card-section v-if="canDirectAssign()" class="q-py-none">
        <q-checkbox
          v-model="editDialogStore.needDirectAssign"
          label="不確定所屬單位，需轉移給系統管理者以負責指派"
        />
      </q-card-section>
      <q-card-section v-if="canTrans()" class="q-py-none">
        <FilterSelect
          title="指派單位: "
          v-model:currentOption="editDialogStore.office"
          :filterFn="filterFn"
          :filterOption="editDialogStore.filterOption"
        />
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <QuasarChip
          v-if="hasDirectAssign()"
          color="pink-5"
          textColor="white"
          :text="editDialogStore.text"
        />
        <q-space />
        <CancelBtn @clicked="closeEditDialog" />
        <ConfirmBtn
          :btnName="btnName"
          @clicked="editSubmit"
          v-if="canTrans() || editDialogStore.needDirectAssign"
        />
      </q-card-actions>
      <HourglassLoading :showing="editDialogStore.loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import CancelBtn from '../Button/Dialog/CancelBtn.vue';
import ConfirmBtn from '../Button/Dialog/ConfirmBtn.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import FilterSelect from '../Select/FilterSelect.vue';
import OfficeRecord from '../TransRecord/OfficeRecord.vue';
import HourglassLoading from '../Loading/HourglassLoading.vue';
import QuasarChip from '../Chip/QuasarChip.vue';
import { useEditDialogStore } from 'src/stores/Dialog/editDialog';
import { useUserStore } from 'src/stores/Auth/user';

const props = defineProps<{
  btnName: string;
}>();

const editDialogStore = useEditDialogStore();
const userStore = useUserStore();

const editSubmit = () => {
  editDialogStore.editSubmit();
};
const closeEditDialog = () => {
  editDialogStore.closeEditDialog();
};
const filterFn = (val: string, update: any) => {
  editDialogStore.filterFn(val, update);
};

const canTrans = () => {
  return (
    userStore.userPermission == 'assigner' ||
    (editDialogStore.row &&
      !editDialogStore.row.questoinFinalassign &&
      !editDialogStore.needDirectAssign)
  );
};
const canDirectAssign = () => {
  return (
    userStore.userPermission != 'assigner' &&
    editDialogStore.row &&
    !editDialogStore.row.questoinFinalassign
  );
};
const hasDirectAssign = () => {
  return (
    userStore.userPermission != 'assigner' &&
    editDialogStore.row &&
    editDialogStore.row.questoinFinalassign
  );
};
</script>
