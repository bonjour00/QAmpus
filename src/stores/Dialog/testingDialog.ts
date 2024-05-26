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
import useNotify from 'src/composables/Notify/useNotify';

export const useTestingDialogStore = defineStore('testingDialog', () => {
  const tableStore = useTableStore();
  const { notifyWarning } = useNotify();

  const open = ref(false);
  const rows: Ref<QA[]> = ref([]);
  const questionIds: Ref<number[]> = ref([]);
  const url = ref('');
  const status = ref('');
  const loading = ref(false);

  const testingQa = async (QA: QA, index: number) => {
    try {
      const result = await api.post('/Question/ask', {
        question: QA.questionQuestion,
      });
      return result.data.originalResponse.answer;
    } catch (e) {
      console.log(e, index);
      return '發生錯誤，請稍後再試一次';
    }
  };
  const testingQaMuti = async (data: QA[]) => {
    try {
      for (let i = 0; i < data.length; i++) {
        rows.value[i].questionAnswer = (await testingQa(data[i], i)) as string;
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
      notifyWarning('尚未勾選可核准之問答');
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
    loading.value = false;
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
        loading.value = true;
        for (let i = 0; i < ids.length; i++) {
          const index = rows.value.findIndex(
            (question) => question.questionId == ids[i]
          );
          await confirmQa(ids[i], rows.value[index].questionAnswer);
        }
        loading.value = false;
        successs('已確認，並送信');
        tableStore.selected = [];
        tableStore.fetchRows(url.value, status.value);
        closeTestingDialog();
      } else {
        notifyWarning('尚未選取測試內容');
      }
    } catch (e) {
      console.log(e, 'llll');
      closeTestingDialog();
    }
  };

  return {
    url,
    status,
    open,
    rows,
    questionIds,
    loading,
    openTestingDialog,
    isTestingLoading,
    closeTestingDialog,
    cofirmMuti,
  };
});
