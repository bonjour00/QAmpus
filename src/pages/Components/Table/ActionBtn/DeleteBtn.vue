<template>
  <q-btn
    dense
    round
    flat
    icon="delete"
    class="q-mx-md"
    @click="deleteSubmit(selectRow.props.row.qaId)"
  ></q-btn>
</template>
<script setup lang="ts">
import { successs } from './AnimateAction';
const props = defineProps<{
  selectRow: any;
}>();
const deleteSubmit = (qaId: number) => {
  console.log(props.selectRow.props.row.qaId);
  //刪除邏輯
  successs('刪除成功');
};
</script>
