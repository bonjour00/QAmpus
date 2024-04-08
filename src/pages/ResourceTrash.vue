<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="resourceColumns"
      tableTitle="近期刪除資源"
      rowKey="dataId"
    >
      <template v-slot:btnAction="slotProps"
        ><RoundBtn
          @clicked="recoverFileSubmit(slotProps.props.row)"
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
      :title="`確定永久刪除${(row as Resource)?.dataFilename.replace(/^\d+-/, '')||''}嗎?`"
      description="這將永久刪除這份檔案!"
      @warningDialogConfirm="permanentDeleteFile"
      @close="closeWarningDialog"
    />
  </div>
</template>

<script setup lang="ts">
import Table from '../components/Table/QaTable.vue';
import {
  BLOB_TABLE_API,
  Resource,
  TRASH_BLOB_TABLE_STATUS,
} from '../components/Table/data ';
import { resourceColumns } from '../components/Table/Columns';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/Table/useTableApi';
import useWarningDialog from 'src/composables/Dialog/useWarningDialog';
import useTableAction from 'src/composables/Table/useTableAction';
import WarningDialog from 'src/components/Dialog/WarningDialog.vue';

const tableStore = useTableStore();
const {
  open: openWarning,
  row,
  openWithData,
  closeDialog,
} = useWarningDialog();
const { recoverFile, permanentDelFile } = useTableAction();
const { fetchRows } = useTableApi(BLOB_TABLE_API, TRASH_BLOB_TABLE_STATUS);

//fetch rows
fetchRows();

//actionBtn clicked (recoverFile)
const recoverFileSubmit = async (row: Resource) => {
  await recoverFile(row);
  fetchRows();
};
//actionBtn clicked (openWarningDialog)
const openWarningDialog = (row: Resource) => {
  openWithData(row);
};
const closeWarningDialog = () => {
  closeDialog();
};
const permanentDeleteFile = async () => {
  await permanentDelFile(row.value as Resource);
  closeDialog();
  fetchRows();
};
</script>
