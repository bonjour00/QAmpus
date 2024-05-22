<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="assignColumn"
      tableTitle="指派單位"
      selection="multiple"
      rowKey="questionId"
      filterTitle="目前指派單位"
    >
      <template v-slot:action>
        <SlotBtn
          btnName="批次測試"
          @clicked="openTestingDialog()"
          :disable="!(tableStore.selected.length > 0)"
        />
      </template>
      <template v-slot:btnAction="slotProps">
        <RoundBtn @clicked="openEditDialog(slotProps.props.row)" icon="edit" />
        <RoundBtn
          @clicked="openWarningDialog(slotProps.props.row)"
          icon="delete"
        />
      </template>
    </Table>
    <EditDialog btnName="指派" />
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
  QA,
  QA_ASSIGN_TABLE_API,
  ASSIGN_TABLE_STATUS,
} from '../components/Table/data ';
import { assignColumn } from '../components/Table/Columns';
import TestingDialog from 'src/components/Dialog/TestingDialog.vue';
import SlotBtn from 'src/components/Button/Table/SlotBtn.vue';
import WarningDialog from 'src/components/Dialog/WarningDialog.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/Table/useTableApi';
import { useEditDialogStore } from 'src/stores/Dialog/editDialog';
import useWarningDialog from 'src/composables/Dialog/useWarningDialog';
import useTableAction from 'src/composables/Table/useTableAction';
import { useTestingDialogStore } from 'src/stores/Dialog/testingDialog';

const tableStore = useTableStore();
const editDialogStore = useEditDialogStore();
const testingDialogStore = useTestingDialogStore();
const {
  open: openWarning,
  row,
  openWithData,
  closeDialog,
} = useWarningDialog();
const { deleteQa, loading } = useTableAction();
const { fetchRows } = useTableApi(QA_ASSIGN_TABLE_API, ASSIGN_TABLE_STATUS);

tableStore.setAssignSelect();
//fetch rows
// fetchRows();

//actionBtn clicked (openEditDialog)
const openEditDialog = (row: QA) => {
  editDialogStore.openEditDialog(row, QA_ASSIGN_TABLE_API, ASSIGN_TABLE_STATUS);
};
//actionBtn clicked (openTestingDialog)
const openTestingDialog = () => {
  testingDialogStore.openTestingDialog(
    QA_ASSIGN_TABLE_API,
    ASSIGN_TABLE_STATUS
  );
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
