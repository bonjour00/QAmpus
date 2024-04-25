<template>
  <q-dialog :modelValue="open" @update:model-value="closeWarningDialog">
    <q-card style="width: 300px; max-width: 90vw">
      <q-card-section>
        <WarningAnimate />
      </q-card-section>
      <q-card-section align="center">
        <div class="text-h6 text-weight-bold">{{ title }}</div>
      </q-card-section>
      <q-card-section align="center">
        <div class="text-body1">{{ description }}</div>
      </q-card-section>
      <q-card-actions align="center">
        <DialogButton
          btnName="取消"
          @clicked="closeWarningDialog"
          :flat="true"
        />
        <DialogButton
          :btnName="btnName || '刪除'"
          @clicked="warningDialogConfirm"
        />
      </q-card-actions>
      <HourglassLoading :showing="loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import HourglassLoading from '../Loading/HourglassLoading.vue';
import DialogButton from '../Button/Dialog/DialogButton.vue';
import WarningAnimate from '../AnimateAction/WarningAnimate.vue';

const props = defineProps<{
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  btnName?: string;
}>();
const emit = defineEmits(['warningDialogConfirm', 'close']);

const closeWarningDialog = () => {
  emit('close');
};

const warningDialogConfirm = () => {
  emit('warningDialogConfirm');
};
</script>
