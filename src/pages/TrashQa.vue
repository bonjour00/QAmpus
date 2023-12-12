<template>
  <div class="q-pa-md">
    <Table
      :rows="rows"
      :columns="columns"
      v-model:page-now="pageNow"
      v-model:search-now="searchNow"
      v-model:order-now="orderNow"
      :loading="loading"
      :tableTitle="tableTitle"
    >
      <template v-slot:btnAction="slotProps"
        ><RecoverBtn :selectRow="slotProps" @updated = "updated++"/>
        <DeleteBtn :selectRow="slotProps" @updated = "updated++"/>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, computed } from 'vue';
import Table from './Components/Table/QaTable.vue';
import RecoverBtn from './Components/Table/ActionBtn/RecoverBtn.vue';
import DeleteBtn from './Components/Table/ActionBtn/DeleteBtn.vue';
import {
  QA,
  initialQASelect,
  testInitialOffice,
  paginationInitial,
  orderInitial,
} from './Components/Table/data ';
import { columns, rowsData } from './Components/Table/Columns';


//table
//toolValue
const tableTitle = '資源回收桶';
const pageNow = ref(paginationInitial);
const searchNow = ref('');
const orderNow = ref(orderInitial);
const updated = ref(0)
const updatedFetch = computed(() => {
  return {
    page: pageNow.value,
    search: searchNow.value,
    order: orderNow.value,
    updated:updated.value
  };
});

//rows
const rows: Ref<QA[]> = ref([]);
const loading = ref(false);
//fetch data
const fetchRows = (type: boolean) => {
  loading.value = true;
  console.log({
    query: searchNow.value,
    startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
    perPage: pageNow.value.rowsPerPage,
    officeId: testInitialOffice.value,
    order: orderNow.value.value,
    type,
  });
  setTimeout(() => {
    rows.value = rowsData;
    loading.value = false;
  }, 1000);
};
fetchRows(true);

watch(updatedFetch, () => {
  fetchRows(true);
});
</script>
