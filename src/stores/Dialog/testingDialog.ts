import { defineStore } from 'pinia';
import {
  QA_TABLE_API,
  PENDING_TABLE_STATUS,
  QA,
} from 'src/components/Table/data ';
import { Ref, ref } from 'vue';
import { api } from 'src/boot/axios';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { useTableStore } from '../Table/table';

export const useTestingDialogStore = defineStore('testingDialog', () => {
  const tableStore = useTableStore();

  const open = ref(false);
  const rows: Ref<QA[]> = ref([]);
  const questionIds: Ref<number[]> = ref([]);
  const url = ref('');
  const status = ref('');

  const testingQa = async (QA: QA) => {
    const result = await api.post('/Question/ask', {
      question: QA.questionQuestion,
    });
    return result.data.answer;
  };
  const testingQaMuti = async (data: QA[]) => {
    try {
      for (let i = 0; i < data.length; i++) {
        rows.value[i].questionAnswer = (await testingQa(data[i])) as string;
      }
    } catch (e) {
      console.log(e, 'ppppppppp');
    }
  };
  const openTestingDialog = (tableUrl: string, tableStatus = '') => {
    const data = tableStore.selected as QA[];
    if (data.length > 0) {
      open.value = true;
      rows.value = data.map((row) => ({ ...row, questionAnswer: 'loading' }));
      url.value = tableUrl;
      status.value = tableStatus;
      testingQaMuti(data);
    } else {
      alert('沒選');
    }
  };

  const isTestingLoading = (row: QA) => {
    return row.questionAnswer == 'loading';
  };

  const $reset = () => {
    open.value = false;
    rows.value = [];
    questionIds.value = [];
    url.value = '';
    status.value = '';
  };
  const closeTestingDialog = () => {
    $reset();
  };

  // 按下確認->寄信
  const confirmQa = async (questionId: number, answer: string) => {
    const result = await api.patch(
      `/Question/confirm/${questionId}?answer=${answer}`
    );
    console.log(result.data);
  };
  const cofirmMuti = async () => {
    try {
      const ids = questionIds.value;
      if (ids.length > 0) {
        for (let i = 0; i < ids.length; i++) {
          const index = rows.value.findIndex(
            (question) => question.questionId == ids[i]
          );
          await confirmQa(ids[i], rows.value[index].questionAnswer);
        }
        successs('已確認，並送信');
        tableStore.selected = [];
        closeTestingDialog();
        tableStore.fetchRows(QA_TABLE_API, PENDING_TABLE_STATUS);
      } else {
        alert('沒選');
      }
    } catch (e) {
      console.log(e, 'llll');
      closeTestingDialog();
    }
  };

  return {
    open,
    rows,
    questionIds,
    openTestingDialog,
    isTestingLoading,
    closeTestingDialog,
    cofirmMuti,
  };
});
