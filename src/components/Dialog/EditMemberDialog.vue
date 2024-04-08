<template>
  <q-dialog
    :modelValue="editMemberDialogStore.open"
    @update:model-value="closeEditMemberDialog"
  >
    <q-card style="border-radius: 10px; width: 300px; max-width: 90vh">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">
          修改{{ ' ' + editMemberDialogStore.userName + ' ' }}權限
        </div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeEditMemberDialog" />
      </q-card-section>

      <q-card-section>
        <OptionSelect
          v-model:currentOption="editMemberDialogStore.role"
          :options="editMemberDialogStore.options"
          title="權限"
      /></q-card-section>
      <q-card-actions align="right">
        <DialogButton btnName="取消" @clicked="closeEditMemberDialog" />
        <DialogButton btnName="修改" @clicked="editMember" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import DialogButton from 'src/components/Button/Dialog/DialogButton.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import OptionSelect from '../Table/Toolbar/OptionSelect.vue';
import { useEditMemberDialogStore } from 'src/stores/Dialog/editMemberDialog';

const editMemberDialogStore = useEditMemberDialogStore();

const editMember = () => {
  editMemberDialogStore.editMember();
};
const closeEditMemberDialog = () => {
  editMemberDialogStore.closeEditMemberDialog();
};
</script>
