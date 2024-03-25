<template>
  <q-dialog :modelValue="testing" @update:model-value="closePopup()">
    <q-card style="padding: 40px; width: 40rem; height: 80%">
      <q-card-section style="padding: 0px 0px 10px 0px">
        <div style="font-size: 25px; font-weight: 900; padding-bottom: 1rem">
          <strong>測試結果:</strong>
        </div>
      </q-card-section>
      <table style="width: 100%; border-collapse: collapse">
        <thead>
          <tr style="background-color: #e8e8e8">
            <th style="padding: 10px 10px 10px 20px; text-align: left">問題</th>
            <th style="padding: 10px 20px 10px 10px; text-align: right">
              結果
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in rows"
            :key="index"
            :style="{
              backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9',
            }"
          >
            <td style="padding: 10px 10px 10px 20px; font-weight: 900">
              {{ row.questionQuestion }}
            </td>
            <td
              align="right"
              style="
                padding: 10px 20px 10px 10px;
                color: #00ab11;
                font-weight: 900;
              "
            >
              通過
            </td>
          </tr>
        </tbody>
      </table>
      <q-card-actions
        style="position: absolute; bottom: 5%; right: 5%"
        align="right"
      >
        <q-btn
          flat
          label="確認"
          @click="cofirmMuti(rows)"
          style="background: #79a0bd; color: white"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { QA, Option } from '../data ';
import axios from 'axios';
import { successs } from '../ActionBtn/AnimateAction';

const props = defineProps<{
  testing: boolean;
  rows: QA[];
}>();
const emit = defineEmits(['update:testing', 'update']);
// const currentRow: Ref<any> = ref(props.selectRow); //暫時不管
const confirmQa = async (questionId: number) => {
  const result = await axios.patch(
    `http://140.136.202.125/api/Question/confirm/${questionId}`
  );
  console.log(result.data);
};
const cofirmMuti = (rows: QA[]) => {
  try {
    for (let i = 0; i < rows.length; i++) {
      confirmQa(rows[i].questionId);
    }
    rows.length > 0 && successs('已確認，並送信');
    emit('update');
    closePopup();
  } catch (e) {
    console.log(e);
  }
};
const closePopup = () => {
  emit('update:testing', false);
};
</script>
