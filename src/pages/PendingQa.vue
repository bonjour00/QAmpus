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
      <template v-slot:add>
        <q-btn
          label="測試"
          unelevated
          style="
            background: #eff0f5;
            margin-top: 110px;
            position: absolute;
            margin-left: 280px;
            border-radius: 10px;
            font-weight: 900;
          "
          @click="testing = true"
        ></q-btn>
      </template>
      <template v-slot:btnAction="slotProps"
        ><EditBtn
          :selectRow="slotProps"
          @dialogOpen="(value) => (open = value)"
          @setSelectRow="(value) => (selectRow = value)"
        />
        <DeleteBtn :selectRow="slotProps" @updated="updated++" />
      </template>
    </Table>
    <EditDialog
      v-model:open="open"
      :selectRow="selectRow"
      :currentOffice="currentOffice"
      :title="title"
      :options="options"
      @updated="updated++"
      :where="false"
    />
    <TestingDialog v-model:testing="testing" :rows="rows" />
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
import TestingDialog from './Components/Table/Dialog/TestingDialog.vue';

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
const fetchRows = (qaStatus: string) => {
  loading.value = true;
  console.log({
    query: searchNow.value,
    startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
    perPage: pageNow.value.rowsPerPage,
    officeId: testInitialOffice.value,
    order: orderNow.value.value,
    qaStatus,
  });
  setTimeout(() => {
    rows.value = rowsData;
    loading.value = false;
  }, 1000);
};
fetchRows('pending');

watch(updatedFetch, () => {
  fetchRows('pending');
});
//testingPop
const testing = ref(false);
</script>
