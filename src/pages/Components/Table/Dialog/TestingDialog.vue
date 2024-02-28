<template>
  <q-dialog :modelValue="testing" @update:model-value="closePopup">
    <q-card style="padding: 30px 30px 20px 30px; width: 500px">
      <q-card-section>
        <div style="font-size: 25px; font-weight: 900">
          <strong>測試結果:</strong>
        </div>
      </q-card-section>
      <q-card-section v-for="(row, index) in rows" :key="index"
        ><div
          style="
            display: flex;
            justify-content: space-between;
            padding: 5px 30px;
          "
        >
          <p style="font-size: 20px">
            <b>Q:{{ row.qaQuestion }}</b>
          </p>
          <p style="font-size: 20px; color: #00d515"><b>通過</b></p>
        </div></q-card-section
      >
      <q-card-actions align="right">
        <q-btn
          flat
          label="確認"
          @click="closePopup"
          style="background: #79a0bd; color: white"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { QA, Option } from '../data ';

const props = defineProps<{
  testing: boolean;
  rows: QA[];
}>();
const items = ref([{ message: 'Foo' }, { message: 'Bar' }]);
const emit = defineEmits(['update:testing']);
// const currentRow: Ref<any> = ref(props.selectRow); //暫時不管

const closePopup = () => {
  emit('update:testing', false);
};
</script>
