<template>
  <div class="q-pa-md">
    <Table
      :rows="rows"
      :columns="pendingColumns"
      v-model:page-now="pageNow"
      v-model:search-now="searchNow"
      v-model:order-now="orderNow"
      :loading="loading"
      :tableTitle="tableTitle"
      :totalCount="totalCount"
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
      <template v-slot:btnAction="slotProps">
        <EditBtn
          :selectRow="slotProps"
          @dialogOpen="(value) => (open = value)"
          @setSelectRow="(value) => (selectRow = value)"
        />
        <AuctionBtn
          :selectRow="slotProps"
          @updated="(row) => needConfirm(row)"
          icon="delete"
        />
      </template>
    </Table>
    <EditDialog
      v-model:open="open"
      :selectRow="selectRow"
      :currentOffice="currentOffice"
      :title="title"
      :options="options"
      @updated="updated++"
      :readonly="true"
      :where="true"
    />
    <TestingDialog v-model:testing="testing" :rows="rows" @update="updated++" />
    <ConfirmDialog
      btnName="刪除"
      v-model:openConfirm="openConfirm"
      title="確定刪除此問答嗎?"
      description="刪除後30天內 您可以在 '近期刪除問題' 中找到 並恢復"
      @clean="data = null"
      @confirm="handleAction(data, 'deleted', '已刪除')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, computed } from 'vue';
import EditDialog from '../components/Table/Dialog/EditDialog.vue';
import Table from '../components/Table/QaTable.vue';
import EditBtn from '../components/Table/ActionBtn/EditBtn.vue';
import {
  QA,
  initialQASelect,
  testInitialOffice,
  paginationInitial,
  orderInitial,
} from '../components/Table/data ';
import { pendingColumns } from '../components/Table/Columns';
import TestingDialog from '../components/Table/Dialog/TestingDialog.vue';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import AuctionBtn from '../components/Table/ActionBtn/ActionBtn.vue';
import ConfirmDialog from '../components/Table/Dialog/ConfirmDialog.vue';
//editPop
const open = ref(false);
const selectRow = ref([]);

//optionSelect
const currentOffice = ref(testInitialOffice); //之後用auth fetch?
const title = '指派單位';

//fetch offices
// const options = ref([]);
// const fetchOffices = async () => {
//   const result = await axios.get('http://140.136.202.125/api/Office');
//   const offices = result.data.map((office: any) => ({
//     label: office.officeName,
//     value: office.officeId,
//   }));
//   options.value = offices;
// };
// fetchOffices();
const options = [
  { label: '資管', value: 1 },
  { label: '統資', value: 2 },
  { label: '圖資', value: 3 },
];

//table
//toolValue
const tableTitle = '待解決問題';
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
const totalCount = ref(0);
const loading = ref(false);
//fetch data
const fetchRows = async (status: string) => {
  // console.log({
  //   query: searchNow.value,
  //   startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
  //   perPage: pageNow.value.rowsPerPage,
  //   officeId: testInitialOffice.value,
  //   order: orderNow.value.value,
  //   qaStatus,
  // });
  loading.value = true;

  const result = await axios.post('http://140.136.202.125/api/Question/paged', {
    query: searchNow.value,
    startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
    perPage: pageNow.value.rowsPerPage,
    officeId: 3,
    order: orderNow.value.value,
    status,
  });
  rows.value = result.data.data;
  totalCount.value = result.data.totalCount;
  console.log(result.data, 'fetching');
  loading.value = false;
};
fetchRows('UNCONFIRMED');

watch(updatedFetch, () => {
  fetchRows('UNCONFIRMED');
});
//testingPop
const testing = ref(false);

//handleAction(delete)
const handleAction = async (
  row: QA | null,
  action: string,
  success: string
) => {
  try {
    if (row !== null) {
      const result = await axios.patch(
        `http://140.136.202.125/api/Question/${action}/${row.questionId}`
      );
      console.log(row, action);
      data.value = null;
      successs(success);
      console.log(result.data);
    }
  } catch (e: any) {
    console.log(e, 'error');
  }
  updated.value++;
};

//confirmPop
const openConfirm = ref(false);

//delete need confirm
const data = ref(null);
const needConfirm = (row: any) => {
  openConfirm.value = true;
  data.value = row;
};
</script>
