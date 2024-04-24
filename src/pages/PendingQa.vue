<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="pendingColumns"
      tableTitle="待解決問題"
      selection="multiple"
      rowKey="questionId"
    >
      <template v-slot:action>
        <SlotBtn
          btnName="批次測試"
          @clicked="openTestingDialog()"
          v-show="tableStore.selected.length > 0"
        />
      </template>
      <template v-slot:btnAction="slotProps">
        <RoundBtn @clicked="openEditDialog(slotProps.props.row)" icon="edit" />
        <RoundBtn
          v-if="
            userStore.userPermission == 'assigner' ||
            !slotProps.props.row.questoinFinalassign
          "
          @clicked="openWarningDialog(slotProps.props.row)"
          icon="delete"
        />
      </template>
    </Table>
    <EditDialog btnName="轉移單位" />
    <TestingDialog />
    <WarningDialog
      v-model:open="openWarning"
      title="確定刪除此問答嗎?"
      description="刪除後30天內 您可以在 '近期刪除問題' 中找到 並恢復"
      :loading="loading"
      @warningDialogConfirm="deleteQaSubmit"
      @close="closeWarningDialog"
    />
  </div>
</template>

<script setup lang="ts">
import EditDialog from 'src/components/Dialog/EditDialog.vue';
import Table from '../components/Table/QaTable.vue';
import {
  PENDING_TABLE_STATUS,
  QA,
  QA_TABLE_API,
} from '../components/Table/data ';
import { pendingColumns } from '../components/Table/Columns';
import TestingDialog from 'src/components/Dialog/TestingDialog.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import SlotBtn from 'src/components/Button/Table/SlotBtn.vue';
import WarningDialog from 'src/components/Dialog/WarningDialog.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/Table/useTableApi';
import { useEditDialogStore } from 'src/stores/Dialog/editDialog';
import useWarningDialog from 'src/composables/Dialog/useWarningDialog';
import useTableAction from 'src/composables/Table/useTableAction';
import { useTestingDialogStore } from 'src/stores/Dialog/testingDialog';
import { useUserStore } from 'src/stores/Auth/user';

const tableStore = useTableStore();
const editDialogStore = useEditDialogStore();
const testingDialogStore = useTestingDialogStore();
const userStore = useUserStore();
const {
  open: openWarning,
  row,
  openWithData,
  closeDialog,
} = useWarningDialog();
const { deleteQa, loading } = useTableAction();
const { fetchRows } = useTableApi(QA_TABLE_API, PENDING_TABLE_STATUS);

//fetch rows
fetchRows();

//actionBtn clicked (openEditDialog)
const openEditDialog = (row: QA) => {
  editDialogStore.openEditDialog(row);
};
//actionBtn clicked (openTestingDialog)
const openTestingDialog = () => {
  testingDialogStore.openTestingDialog(QA_TABLE_API, PENDING_TABLE_STATUS);
};
//actionBtn clicked (openWarningDialog)
const openWarningDialog = (row: QA) => {
  openWithData(row);
};
const closeWarningDialog = () => {
  closeDialog();
};
const deleteQaSubmit = async () => {
  await deleteQa(row.value as QA);
  closeDialog();
  fetchRows();
};
</script>
