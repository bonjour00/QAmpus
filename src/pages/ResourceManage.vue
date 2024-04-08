<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="resourceColumns"
      tableTitle="資源管理"
      rowKey="dataId"
      fileCustom="cursor-pointer"
      @download="clickDownloadResource"
    >
      <template v-slot:action>
        <NormalBtn btnName="上傳檔案" icon="add" @clicked="openUploadDialog" />
      </template>
      <template v-slot:btnAction="slotProps">
        <SlotBtn
          btnName="修改檔案"
          @clicked="openUploadWithData(slotProps.props.row)"
        />
        <RoundBtn
          @clicked="clickDownloadResource(slotProps.props.row)"
          icon="download"
        />
        <RoundBtn
          @clicked="openWarningDialog(slotProps.props.row)"
          icon="delete"
        />
      </template>
    </Table>
    <WarningDialog
      v-model:open="openWarning"
      :title="`確定刪除${(row as Resource)?.dataFilename.replace(/^\d+-/, '')||''}嗎?`"
      description="刪除後30天內 您可以在 '近期刪除資源' 中找到 並恢復"
      @warningDialogConfirm="deleteFileSubmit"
      @close="closeWarningDialog"
    />
    <UploadDialog />
  </div>
</template>

<script setup lang="ts">
import Table from '../components/Table/QaTable.vue';
import {
  MANAGE_BLOB_TABLE_STATUS,
  BLOB_TABLE_API,
  Resource,
} from '../components/Table/data ';
import { resourceColumns } from '../components/Table/Columns';
import UploadDialog from 'src/components/Dialog/UploadDialog.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/Table/useTableApi';
import NormalBtn from 'src/components/Button/IconBtn/NormalBtn.vue';
import SlotBtn from 'src/components/Button/Table/SlotBtn.vue';
import useWarningDialog from 'src/composables/Dialog/useWarningDialog';
import useTableAction from 'src/composables/Table/useTableAction';
import WarningDialog from 'src/components/Dialog/WarningDialog.vue';
import { useUploadDialogStore } from 'src/stores/Dialog/uploadDialog';

const tableStore = useTableStore();
const uploadDialogStore = useUploadDialogStore();
const {
  open: openWarning,
  row,
  openWithData,
  closeDialog,
} = useWarningDialog();
const { deleteFile, downloadResource } = useTableAction();
const { fetchRows } = useTableApi(BLOB_TABLE_API, MANAGE_BLOB_TABLE_STATUS);

//fetch rows
fetchRows();

//actionBtn clicked (openWarningDialog)
const openWarningDialog = (row: Resource) => {
  openWithData(row);
};
const closeWarningDialog = () => {
  closeDialog();
};
const deleteFileSubmit = async () => {
  await deleteFile(row.value as Resource);
  closeDialog();
  fetchRows();
};

//actionBtn clicked (openUploadDialog)
const openUploadDialog = () => {
  uploadDialogStore.openUploadDialog();
};
//reUpload
const openUploadWithData = (row: Resource) => {
  uploadDialogStore.openUploadWithData(row);
};
//download resource
const clickDownloadResource = (row: Resource) => {
  downloadResource(row);
};
</script>
