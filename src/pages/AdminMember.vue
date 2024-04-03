<template>
  <div class="q-pa-md">
    <Table
      :rows="tableStore.rows"
      :columns="memberColumns"
      :tableTitle="tableTitle"
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
          icon="edit"
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
import { ref, Ref } from 'vue';
import Table from '../components/Table/QaTable.vue';
import { Member } from '../components/Table/data ';
import { memberColumns } from '../components/Table/Columns';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import AuctionBtn from '../components/Table/ActionBtn/ActionBtn.vue';
import ConfirmDialog from '../components/Table/Dialog/ConfirmDialog.vue';
import RegisterDialog from '../components/Table/Dialog/RegisterDialog.vue';
import { useTableStore } from 'src/stores/Table/table';
import useTableApi from 'src/composables/useTableApi';

const tableStore = useTableStore();
const { fetchRows } = useTableApi('/User/paged');
fetchRows();

//table
//toolValue
const tableTitle = '權限管理';
const updated = ref(0);

//rows
const rows: Ref<Member[]> = ref([]);

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
