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
const emit = defineEmits(['updated']);
const deleteSubmit = (qaId: number) => {
  emit('updated');
  // console.log({qaId:props.selectRow.props.row.qaId,qaStatus:props.selectRow.props.row.qaStatus=='delete'? 'completeDel':'delete'});
  console.log('/api/Qna/', props.selectRow.props.row.qaId);
  //刪除邏輯
  successs('刪除成功');
};
</script>
