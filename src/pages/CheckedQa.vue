<template>
  <div class="q-pa-md">
    <Table
      :rows="rows"
      :columns="columns_1"
      v-model:page-now="pageNow"
      v-model:search-now="searchNow"
      v-model:order-now="orderNow"
      :loading="loading"
      :tableTitle="tableTitle"
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
        <DeleteBtn :selectRow="slotProps" @updated="updated++" />
      </template>
    </Table>
    <UploadDialog v-model:upload="upload" />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, computed } from 'vue';
import EditDialog from './Components/Table/Dialog/EditDialog.vue';
import Table from './Components/Table/QaTable.vue';
import EditBtn from './Components/Table/ActionBtn/EditBtn.vue';
import DeleteBtn from './Components/Table/ActionBtn/DeleteBtn.vue';
import {
  QA,
  initialQASelect,
  testInitialOffice,
  paginationInitial,
  orderInitial,
  Option,
} from './Components/Table/data ';
import { columns_1, rowsData } from './Components/Table/Columns';
import UploadDialog from './Components/Table/Dialog/UploadDialog.vue';

//editPop
const open = ref(false);
const selectRow = ref(initialQASelect);

//table
//toolValue
const tableTitle = '問答集';
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
const rows: Ref<QA[]> = ref([]);
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
  const result = await axios.post('http://140.136.202.125/api/Blob/paged', {
    query: searchNow.value,
    startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
    perPage: pageNow.value.rowsPerPage,
    officeId: 1,
    order: orderNow.value.value,
    status: 'notdeleted',
  });
  rows.value = result.data;
  loading.value = false;
  console.log(result.data, 'fetching');
};
fetchRows();

watch(updatedFetch, () => {
  fetchRows();
});
//upload
const upload = ref(false);
import axios from 'axios';
</script>
