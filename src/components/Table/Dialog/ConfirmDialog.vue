<template>
  <q-dialog :modelValue="openConfirm" @update:model-value="closePopup">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ title }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closePopup" />
      </q-card-section>

      <q-card-section>
        {{ description }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="closePopup" />
        <q-btn flat :label="btnName" color="primary" @click="editSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, Ref, computed } from 'vue';
import { QA, Option } from '../data ';
import { successs } from '../ActionBtn/AnimateAction';
import OptionSelect from '../Toolbar/OptionSelect.vue';
import axios from 'axios';

const props = defineProps<{
  btnName: string;
  openConfirm: boolean;
  title: string;
  description: string;
}>();

const emit = defineEmits(['update:openConfirm', 'confirm', 'clean']);

const closePopup = () => {
  emit('update:openConfirm', false);
  emit('clean');
};

const editSubmit = async () => {
  emit('update:openConfirm', false);
  emit('confirm');
};
</script>
