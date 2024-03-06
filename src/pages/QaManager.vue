<template>
  <div class="q-pa-md">
    <Table
      :rows="rows"
      :columns="columns_2"
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
        <DeleteBtn :selectRow="slotProps" @updated="updated++" />
      </template>
    </Table>
    <EditDialog
      v-model:open="open"
      :selectRow="selectRow"
      :currentOffice="currentOffice"
      :title="title"
      :options="options"
      btnName="指派"
      :disable="disable"
      @updated="updated++"
      :where="true"
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
import { columns_2, rowsData_1 } from './Components/Table/Columns';
import axios from 'axios';

//editPop
const open = ref(false);
const selectRow = ref(initialQASelect);

//input disable
const disable = true;

//optionSelect
const currentOffice = ref(testInitialOffice); //之後用auth fetch?
const title = '指派單位';

//fetch offices
const options = ref([]);
const fetchOffices = async () => {
  const result = await axios.get('http://140.136.202.125/api/Office');
  const offices = result.data.map((office: any) => ({
    label: office.officeName,
    value: office.officeId,
  }));
  options.value = offices;
};
fetchOffices();

//table
//toolValue
const tableTitle = '指派系所管理';
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
    rows.value = rowsData_1;
    loading.value = false;
  }, 1000);
};
fetchRows('noAssign');

watch(updatedFetch, () => {
  fetchRows('noAssign');
});
</script>
