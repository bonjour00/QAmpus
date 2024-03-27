<template>
  <div class="q-pa-md">
    <Table
      :rows="rows"
      :columns="memberColumns"
      v-model:page-now="pageNow"
      v-model:search-now="searchNow"
      v-model:order-now="orderNow"
      :loading="loading"
      :tableTitle="tableTitle"
      :totalCount="totalCount"
    >
      <template v-slot:action>
        <q-btn
          label="新增管理者"
          unelevated
          style="background: #eff0f5"
          @click="registerOpen = true"
        ></q-btn>
      </template>
      <template v-slot:btnAction="slotProps"
        ><AuctionBtn
          :selectRow="slotProps"
          @updated="(row) => handleAction(row, 'admin', '審核成功')"
          icon="check"
        />
        <AuctionBtn
          :selectRow="slotProps"
          @updated="(row) => needConfirm(row)"
          icon="delete"
        />
      </template>
    </Table>
    <ConfirmDialog
      btnName="刪除"
      v-model:openConfirm="openConfirm"
      title="確定修改此用戶權限嗎?"
      description="這將使其權限變更為 '使用者'!"
      @clean="data = null"
      @confirm="handleAction(data, 'user', '已修改其權限為使用者')"
    />
    <RegisterDialog
      v-model:registerOpen="registerOpen"
      @registerUpdate="updated++"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, watch, computed } from 'vue';
import Table from '../components/Table/QaTable.vue';
import {
  Member,
  paginationInitial,
  orderInitial,
} from '../components/Table/data ';
import { memberColumns } from '../components/Table/Columns';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import AuctionBtn from '../components/Table/ActionBtn/ActionBtn.vue';
import ConfirmDialog from '../components/Table/Dialog/ConfirmDialog.vue';
import RegisterDialog from '../components/Table/Dialog/RegisterDialog.vue';

//table
//toolValue
const tableTitle = '權限管理';
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
const rows: Ref<Member[]> = ref([]);
const totalCount = ref(0);
const loading = ref(false);
//fetch data
const fetchRows = async () => {
  loading.value = true;
  const result = await axios.post(
    'http://140.136.202.125/api/User/paged',
    {
      query: searchNow.value,
      startIndex: (pageNow.value.page - 1) * pageNow.value.rowsPerPage,
      perPage: pageNow.value.rowsPerPage,
      order: orderNow.value.value,
      // status: 'UNCONFIRMED',
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
const handleAction = async (
  row: Member | null,
  status: string,
  success: string
) => {
  try {
    if (row !== null) {
      const result = await axios.patch('http://140.136.202.125/api/User', {
        userEmail: row.userEmail,
        userPermission: status,
      });
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
//registerOpen
const registerOpen = ref(false);
</script>
