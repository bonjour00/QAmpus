<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="resourceColumns"
      :tableTitle="tableTitle"
    >
      <template v-slot:action>
        <q-btn unelevated style="background: #eff0f5" @click="upload = true"
          ><q-icon name="add" />上傳檔案</q-btn
        >
      </template>
      <template v-slot:btnAction="slotProps">
        <q-btn
          label="重新上傳"
          style="background: #eff0f5; border-radius: 10px"
          unelevated
          @click="editUpload(slotProps.props.row)"
        />
        <ActionBtn
          :selectRow="slotProps"
          @updated="(row) => handleAction(row, 'deleted', '刪除成功')"
          icon="delete"
        />
      </template>
    </Table>
    <UploadDialog
      v-model:upload="upload"
      @update="updated++"
      :data="data"
      @clean="data = ''"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import Table from '../components/Table/QaTable.vue';
import { Recource } from '../components/Table/data ';
import { resourceColumns } from '../components/Table/Columns';
import UploadDialog from '../components/Table/Dialog/UploadDialog.vue';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import ActionBtn from '../components/Table/ActionBtn/ActionBtn.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/useTableApi';

const tableStore = useTableStore();
const { fetchRows } = useTableApi('/Blob/paged', 'notdeleted');
fetchRows();

//table
//toolValue
const tableTitle = '資源管理';
const updated = ref(0);

//rows
const rows: Ref<Recource[]> = ref([]);

//upload
const upload = ref(false);

//handleAction(delete)
const handleAction = async (row: Recource, action: string, success: string) => {
  try {
    const result = await axios.patch(
      `http://140.136.202.125/api/Blob/${action}/${row.dataFilename}`
    );
    successs(success);
    console.log(result.data);
  } catch (e: any) {
    console.log(e, 'error');
  }
  updated.value++;
};

const data: any = ref(null);
const editUpload = (row: Recource) => {
  upload.value = true;
  data.value = row;
};
</script>
