<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="memberColumns"
      tableTitle="權限管理"
      rowKey="userPK"
    >
      <template v-slot:action>
        <SlotBtn btnName="新增管理者" @clicked="openRegisterDialog" />
      </template>
      <template #role>
        <OptionSelect
          v-model:currentOption="tableStore.role"
          :options="tableStore.roleOptions"
          title="權限"
          v-if="userStore.userPermission == 'assigner'"
        />
      </template>
      <template v-slot:btnAction="slotProps">
        <RoundBtn
          @clicked="openEditMemberDialog(slotProps.props.row)"
          icon="edit"
          v-if="userStore.userPermission == 'assigner'"
        />
        <RoundBtn
          @clicked="openWarningDialog(slotProps.props.row)"
          icon="delete"
        />
      </template>
    </Table>
    <WarningDialog
      v-model:open="openWarning"
      :title="`確定刪除${(row as Member)?.userName||''}嗎?`"
      description="刪除後我們將其權限變更為User"
      @warningDialogConfirm="deleteMemberSubmit"
      @close="closeWarningDialog"
    />
    <EditMemberDialog />
    <RegisterDialog />
  </div>
</template>

<script setup lang="ts">
import Table from '../components/Table/QaTable.vue';
import { MEMBER_TABLE_API, Member } from '../components/Table/data ';
import { memberColumns } from '../components/Table/Columns';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import SlotBtn from 'src/components/Button/Table/SlotBtn.vue';
import WarningDialog from 'src/components/Dialog/WarningDialog.vue';
import RegisterDialog from 'src/components/Dialog/RegisterDialog.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/Table/useTableApi';
import useWarningDialog from 'src/composables/Dialog/useWarningDialog';
import OptionSelect from 'src/components/Table/Toolbar/OptionSelect.vue';
import { useEditMemberDialogStore } from 'src/stores/Dialog/editMemberDialog';
import EditMemberDialog from 'src/components/Dialog/EditMemberDialog.vue';
import useTableAction from 'src/composables/Table/useTableAction';
import { useRegisterDialogStore } from 'src/stores/Dialog/registerDialog';
import { useUserStore } from 'src/stores/Auth/user';

const tableStore = useTableStore();
const editMemberDialogStore = useEditMemberDialogStore();
const registerDialogStore = useRegisterDialogStore();
const userStore = useUserStore();
const {
  open: openWarning,
  row,
  openWithData,
  closeDialog,
} = useWarningDialog();
const { deleteMember } = useTableAction();
const { fetchRows } = useTableApi(MEMBER_TABLE_API, tableStore.role.value);

tableStore.setInitialRole();
//fetch rows
// fetchRows();

//actionBtn clicked (openEditMemberDialog)
const openEditMemberDialog = (row: Member) => {
  editMemberDialogStore.openMemberDialog(row);
};

//actionBtn clicked (openRegisterDialog)
const openRegisterDialog = (row: Member) => {
  registerDialogStore.openRegisterDialog();
};

//actionBtn clicked (openWarningDialog)
const openWarningDialog = (row: Member) => {
  openWithData(row);
};
const closeWarningDialog = () => {
  closeDialog();
};
const deleteMemberSubmit = async () => {
  await deleteMember(row.value as Member);
  closeDialog();
  fetchRows();
};
</script>
