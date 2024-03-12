<template>
  <div class="q-pa-md">
    <Table
      :rows="rowsData_2"
      :columns="columns_3"
      v-model:page-now="pageNow"
      v-model:search-now="searchNow"
      v-model:order-now="orderNow"
      :loading="loading"
      :tableTitle="tableTitle"
    >
      <template v-slot:btnAction="slotProps">
        <CheckBtn />
        <DeleteBtn :selectRow="slotProps" @updated="updated++" />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, computed } from 'vue';
import Table from './Components/Table/QaTable.vue';
import CheckBtn from './Components/Table/ActionBtn/CheckBtn.vue';
import DeleteBtn from './Components/Table/ActionBtn/DeleteBtn.vue';
import { paginationInitial, orderInitial, AC } from './Components/Table/data ';
import { columns_3, rowsData_2 } from './Components/Table/Columns';

// Table state
const tableTitle = '權限管理';
const pageNow = ref(paginationInitial);
const searchNow = ref('');
const orderNow = ref(orderInitial);
const updated = ref(0);
const rows: Ref<AC[]> = ref([]);
const loading = ref(false);

const fetchRows = () => {
  loading.value = true;
  setTimeout(() => {
    rows.value = rowsData_2;
    loading.value = false;
  }, 1000);
};
fetchRows();

watch({ page: pageNow, search: searchNow, order: orderNow, updated }, () => {
  fetchRows();
});
</script>
