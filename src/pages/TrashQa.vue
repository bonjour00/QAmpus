<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="pendingColumns"
      tableTitle="近期刪除問題"
      rowKey="questionId"
    >
      <template v-slot:btnAction="slotProps">
        <RoundBtn
          @clicked="recoverQaSubmit(slotProps.props.row)"
          icon="history"
        />
        <RoundBtn
          @clicked="openWarningDialog(slotProps.props.row)"
          icon="delete"
        />
      </template>
    </Table>
    <WarningDialog
      v-model:open="openWarning"
      title="確定永久刪除此問答嗎?"
      description="這將永久刪除這則問答!"
      :loading="loading"
      @warningDialogConfirm="permanentDeleteQa"
      @close="closeWarningDialog"
    />
  </div>
</template>

<script setup lang="ts">
import Table from '../components/Table/QaTable.vue';
import {
  QA,
  QA_TABLE_API,
  TRASH_QA_TABLE_STATUS,
} from '../components/Table/data ';
import { pendingColumns } from '../components/Table/Columns';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/Table/useTableApi';
import WarningDialog from 'src/components/Dialog/WarningDialog.vue';
import useWarningDialog from 'src/composables/Dialog/useWarningDialog';
import useTableAction from 'src/composables/Table/useTableAction';

const tableStore = useTableStore();
const {
  open: openWarning,
  row,
  openWithData,
  closeDialog,
} = useWarningDialog();
const { recoverQa, permanentDelQa, loading } = useTableAction();
const { fetchRows } = useTableApi(QA_TABLE_API, TRASH_QA_TABLE_STATUS);

//fetch rows
fetchRows();

//actionBtn clicked (recoverQa)
const recoverQaSubmit = async (row: QA) => {
  await recoverQa(row);
  fetchRows();
};
//actionBtn clicked (openWarningDialog)
const openWarningDialog = (row: QA) => {
  openWithData(row);
};
const closeWarningDialog = () => {
  closeDialog();
};
const permanentDeleteQa = async () => {
  await permanentDelQa(row.value as QA);
  closeDialog();
  fetchRows();
};
</script>
