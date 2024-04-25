<template>
  <q-dialog
    :modelValue="editMemberDialogStore.open"
    @update:model-value="closeEditMemberDialog"
  >
    <q-card style="border-radius: 10px; width: 300px; max-width: 90vh">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">
          修改{{ ' ' + editMemberDialogStore.userName + ' ' }}單位權限
        </div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeEditMemberDialog" />
      </q-card-section>

      <q-card-section>
        <OptionSelect
          v-model:currentOption="editMemberDialogStore.role"
          :options="editMemberDialogStore.options"
          title="權限"
        />
      </q-card-section>
      <q-card-section v-show="editMemberDialogStore.role.value != 'assigner'">
        <FilterSelect
          title="單位: "
          v-model:currentOption="editMemberDialogStore.office"
          :filterFn="filterFn"
          :filterOption="editMemberDialogStore.filterOption"
        />
      </q-card-section>
      <q-card-section
        v-show="
          editMemberDialogStore.role.value == 'assigner' &&
          editMemberDialogStore.row?.officeName !=
            editMemberDialogStore.officeName
        "
      >
        <q-banner class="bg-warning">
          <template v-slot:avatar>
            <q-icon name="warning" color="negative" />
          </template>
          這將轉移此使用者單位至<br />
          <b>{{ editMemberDialogStore.officeName }}</b>
        </q-banner>
      </q-card-section>

      <q-card-actions align="right">
        <DialogButton
          btnName="取消"
          @clicked="closeEditMemberDialog"
          :flat="true"
        />
        <DialogButton btnName="修改" @clicked="editMember" /> </q-card-actions
      ><HourglassLoading :showing="editMemberDialogStore.loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import DialogButton from 'src/components/Button/Dialog/DialogButton.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import FilterSelect from '../Select/FilterSelect.vue';
import HourglassLoading from '../Loading/HourglassLoading.vue';
import OptionSelect from '../Table/Toolbar/OptionSelect.vue';
import { useEditMemberDialogStore } from 'src/stores/Dialog/editMemberDialog';

const editMemberDialogStore = useEditMemberDialogStore();

const editMember = () => {
  editMemberDialogStore.editMember();
};
const closeEditMemberDialog = () => {
  editMemberDialogStore.closeEditMemberDialog();
};
const filterFn = (val: string, update: any) => {
  editMemberDialogStore.filterFn(val, update);
};
</script>
