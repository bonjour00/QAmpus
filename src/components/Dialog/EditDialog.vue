<template>
  <q-dialog
    :modelValue="editDialogStore.open"
    @update:model-value="closeEditDialog"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">問答</div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeEditDialog" />
      </q-card-section>

      <q-card-section style="max-height: 50vh" class="scroll">
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

      <q-card-section
        style="max-height: 20vh"
        class="scroll"
        v-if="editDialogStore.officeRecord"
      >
        <OfficeRecord :record="editDialogStore.officeRecord" />
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <FilterSelect
          title="指派單位: "
          v-model:currentOption="editDialogStore.office"
          :filterFn="filterFn"
          :filterOption="editDialogStore.filterOption"
        />
        <DialogButton btnName="取消" @clicked="closeEditDialog" />
        <DialogButton :btnName="btnName" @clicked="editSubmit" />
      </q-card-actions>
      <HourglassLoading :showing="editDialogStore.loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import DialogButton from 'src/components/Button/Dialog/DialogButton.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import FilterSelect from '../Select/FilterSelect.vue';
import OfficeRecord from '../TransRecord/OfficeRecord.vue';
import HourglassLoading from '../Loading/HourglassLoading.vue';
import { useEditDialogStore } from 'src/stores/Dialog/editDialog';

const props = defineProps<{
  btnName: string;
}>();

const editDialogStore = useEditDialogStore();

const editSubmit = () => {
  editDialogStore.editSubmit();
};
const closeEditDialog = () => {
  editDialogStore.closeEditDialog();
};
const filterFn = (val: string, update: any) => {
  editDialogStore.filterFn(val, update);
};
</script>
