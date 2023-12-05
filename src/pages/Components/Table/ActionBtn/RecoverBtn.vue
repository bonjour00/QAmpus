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
const emit = defineEmits(['updated']);
const recoverSubmit = (qaId: number) => {
  emit('updated')
  console.log({
    ...props.selectRow.props.row,
    qaStatus: 'pending',
    qaLastUpdaterId:'111',
    qaUpdatetime: new Date(),
    qaDaletetime: null,
  });
  //刪除邏輯
  successs('已復原');
};
</script>
