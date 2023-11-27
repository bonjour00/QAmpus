<template>
  <q-btn
    dense
    round
    flat
    icon="history"
    class="q-mx-md"
    @click="recoverSubmit(selectRow.props.row.qaId)"
  ></q-btn>
</template>
<script setup lang="ts">
import { successs } from './AnimateAction';
const props = defineProps<{
  selectRow: any;
}>();
const recoverSubmit = (qaId: number) => {
  console.log(props.selectRow.props.row.qaId);
  //刪除邏輯
  successs('已復原');
};
</script>
