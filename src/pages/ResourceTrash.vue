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
      <template v-slot:btnAction="slotProps"
        ><AuctionBtn
          :selectRow="slotProps"
          @updated="(row) => handleAction(row, 'recover', '已復原')"
          icon="history"
        />
        <AuctionBtn
          :selectRow="slotProps"
          @updated="(row) => handleActionDelete(row, 'deleted', '刪除成功')"
          icon="delete"
        />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, computed } from 'vue';
import Table from '../components/Table/QaTable.vue';
import {
  Recource,
  paginationInitial,
  orderInitial,
} from '../components/Table/data ';
import { resourceColumns } from '../components/Table/Columns';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import AuctionBtn from '../components/Table/ActionBtn/ActionBtn.vue';

//table
//toolValue
const tableTitle = '近期刪除資源';
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
  loading.value = true;
  const result = await axios.post(
    'http://140.136.202.125/api/Blob/paged',
    {
      query: searchNow.value,
      startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
      perPage: pageNow.value.rowsPerPage,
      order: orderNow.value.value,
      status: 'deleted',
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }
  );
  rows.value = result.data.data;
  totalCount.value = result.data.totalCount;
  loading.value = false;
  console.log(result.data, 'fetching');
};
fetchRows();

watch(updatedFetch, () => {
  fetchRows();
});

//handleAction(recover/delete)
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
const handleActionDelete = async (
  row: Recource,
  action: string,
  success: string
) => {
  try {
    const result = await axios.delete(
      `http://140.136.202.125/api/Blob/fileName?filename=${row.dataFilename}`
    );
    successs(success);
    console.log(result.data);
  } catch (e: any) {
    console.log(e, 'error');
  }
  updated.value++;
};
</script>
