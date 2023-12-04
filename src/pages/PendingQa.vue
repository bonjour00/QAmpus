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
        ><EditBtn
          :selectRow="slotProps"
          @dialogOpen="(value) => (open = value)"
          @setSelectRow="(value) => (selectRow = value)"
        />
        <DeleteBtn :selectRow="slotProps" />
      </template>
    </Table>
    <EditDialog
      v-model:open="open"
      :selectRow="selectRow"
      :currentOffice="currentOffice"
      :title="title"
      :options="options"
    />
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
} from './Components/Table/data ';
import { columns, rowsData } from './Components/Table/Columns';

//editPop
const open = ref(false);
const selectRow = ref(initialQASelect);

//optionSelect
const currentOffice = ref(testInitialOffice); //之後用auth fetch?
const title = '指派單位';

//fetch offices
const options = [
  { label: '資管', value: 1 },
  { label: '統資', value: 2 },
  { label: '圖資', value: 3 },
];

//table
//toolValue
const tableTitle = '待審核問題';
const pageNow = ref(paginationInitial);
const searchNow = ref('');
const orderNow = ref(orderInitial);
const toolValue = computed(() => {
  return {
    page: pageNow.value,
    search: searchNow.value,
    order: orderNow.value,
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

watch(toolValue, () => {
  fetchRows(true);
});
</script>
