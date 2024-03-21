<template>
  <div class="q-pa-md">
    <Table
      :rows="rows"
      :columns="resourceColumns"
      v-model:page-now="pageNow"
      v-model:search-now="searchNow"
      v-model:order-now="orderNow"
      :loading="loading"
      :tableTitle="tableTitle"
      :totalCount="totalCount"
    >
      <template v-slot:add>
        <q-btn
          unelevated
          style="
            background: #eff0f5;
            margin-top: 110px;
            position: absolute;
            margin-left: 220px;
            width: 120px;
            border-radius: 10px;
            font-weight: 900;
          "
          @click="upload = true"
          ><q-icon name="add" />上傳檔案</q-btn
        >
      </template>
      <template v-slot:btnAction="slotProps">
        <q-btn
          label="重新上傳"
          style="background: #eff0f5; border-radius: 10px; font-weight: 900"
          unelevated
          @click="upload = true"
        />
        <AuctionBtn
          :selectRow="slotProps"
          @updated="(row) => handleAction(row, 'deleted', '刪除成功')"
          icon="delete"
        />
      </template>
    </Table>
    <UploadDialog v-model:upload="upload" @update="updated++" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, computed } from 'vue';
import Table from './Components/Table/QaTable.vue';
import {
  Recource,
  paginationInitial,
  orderInitial,
} from './Components/Table/data ';
import { resourceColumns } from './Components/Table/Columns';
import UploadDialog from './Components/Table/Dialog/UploadDialog.vue';
import axios from 'axios';
import { successs } from './Components/Table/ActionBtn/AnimateAction';
import AuctionBtn from './Components/Table/ActionBtn/ActionBtn.vue';

//table
//toolValue
const tableTitle = '資源管理';
const pageNow = ref(paginationInitial);
const searchNow = ref('');
const orderNow = ref(orderInitial);
const updated = ref(0);
const updatedFetch = computed(() => {
  return {
    page: pageNow.value,
    search: searchNow.value,
    order: orderNow.value,
    updated: updated.value,
  };
});

//rows
const rows: Ref<Recource[]> = ref([]);
const totalCount = ref(0);
const loading = ref(false);
//fetch data
const fetchRows = async () => {
  // console.log({
  //   query: searchNow.value,
  //   startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
  //   perPage: pageNow.value.rowsPerPage,
  //   officeId: testInitialOffice.value,
  //   order: orderNow.value.value,
  //   qaStatus,
  // });
  loading.value = true;
  // const result = await axios.post('http://140.136.202.125/api/Blob/paged', {
  //   query: searchNow.value,
  //   startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
  //   perPage: pageNow.value.rowsPerPage,
  //   // officeId: 1,
  //   order: orderNow.value.value,
  //   status: 'notdeleted',
  // });
  // rows.value = result.data;
  loading.value = false;
  // console.log(result.data, 'fetching');
};
fetchRows();

watch(updatedFetch, () => {
  fetchRows();
});
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
</script>
