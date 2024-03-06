<template>
  <q-btn
    dense
    round
    flat
    icon="delete"
    class="q-mx-md"
    @click="deleteSubmit(selectRow.props.row.questionId)"
  ></q-btn>
</template>
<script setup lang="ts">
import axios from 'axios';
import { successs } from './AnimateAction';
const props = defineProps<{
  selectRow: any;
}>();
const emit = defineEmits(['updated']);
const deleteSubmit = async (qaId: number) => {
  try {
    const result = await axios.delete(
      `http://140.136.202.125/api/Question/${props.selectRow.props.row.questionId}`
    );
    successs('刪除成功');
    emit('updated');
  } catch (e: any) {
    console.log(e, 'error');
  }
};
</script>
