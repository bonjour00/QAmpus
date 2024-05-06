import { defineStore } from 'pinia';
import { Ref, computed, ref } from 'vue';
import { api } from 'src/boot/axios';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { useUserStore } from '../Auth/user';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useUserDislikeDialogStore } from '../Dialog/userDislikeDialog';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();
  const userDislikeDialogStore = useUserDislikeDialogStore();
  const router = useRouter();
  const $q = useQuasar();
  type MessageQA = {
    question: string;
    answer: string;
    loading: boolean;
    copyIcon: string;
    officeId: number;
    officeName: string | null;
  };
  const question = ref('');
  const qaList: Ref<MessageQA[]> = ref([]);
  const loading = ref(false); //input disable or not
  const open = ref(false);
  const copyRef: Ref<HTMLElement | null> = ref(null);
  const inputRef: Ref<HTMLElement | null> = ref(null);
  const barRef = ref<HTMLDivElement | null>(null);
  const barHeight = ref(87);
  const examples = [
    { label: '問科系資訊0', subTitle: '資管系課程大綱' },
    { label: '問科系資訊1', subTitle: '資管系課程大綱' },
    { label: '問科系資訊2', subTitle: '資管系課程大綱' },
    { label: '問科系資訊3', subTitle: '資管系課程大綱' },
  ];

  const exampleList = computed(() => {
    return $q.screen.lt.sm ? examples.slice(0, 2) : examples;
  });

  const $reset = () => {
    question.value = '';
    qaList.value = [];
    loading.value = false;
    open.value = false;
    copyRef.value = null;
    inputRef.value = null;
    barRef.value = null;
  };
  const submitQuestion = async (q: string) => {
    qaList.value.push({
      question: q,
      answer: '',
      loading: true,
      copyIcon: 'content_copy',
      officeId: 0,
      officeName: null,
    });
    try {
      loading.value = true;
      const result = await api.post('/Question/ask', {
        question: q,
      });
      qaList.value[qaList.value.length - 1].answer =
        result.data.originalResponse.answer;
      qaList.value[qaList.value.length - 1].officeId = result.data.officeId;
      qaList.value[qaList.value.length - 1].officeName = result.data.officeName;
      qaList.value[qaList.value.length - 1].loading = false;
      loading.value = false;
    } catch (e) {
      console.log('error', e);
      qaList.value[qaList.value.length - 1].answer = '發生錯誤';
      qaList.value[qaList.value.length - 1].loading = false;
      loading.value = false;
    }
    setTimeout(() => {
      inputRef.value && inputRef.value.focus();
    }, 100);
  };
  const sendMessage = async () => {
    if (question.value.trim() !== '') {
      const q = question.value;
      question.value = '';
      await submitQuestion(q);
    }
  };
  const sendExample = async (q: string) => {
    await submitQuestion(q);
  };
  const handleInputDevice = async () => {
    //如果手機按enter不會直接送出而是換行
    //電腦按enter則送出，shift+enter換行
    if ($q.screen.lt.sm) {
      question.value += '\n';
      return;
    }
    await sendMessage();
  };
  const handleThumbDown = async (index: number) => {
    const questionQuestion = qaList.value[index].question;
    const questionAnswer = qaList.value[index].answer;
    const maybeOffice = {
      officeName: qaList.value[index].officeName,
      officeId: qaList.value[index].officeId,
    };
    userDislikeDialogStore.question = questionQuestion;
    userDislikeDialogStore.answer = questionAnswer;
    userDislikeDialogStore.maybeOffice = maybeOffice;
    if (!userStore.userEmail) {
      open.value = true; //去登入
    }
    userDislikeDialogStore.openDislikeDialog();
  };
  const confirm = () => {
    router.push({ path: '/login' });
    open.value = false;
  };

  const copy = async (index: number) => {
    const QA = qaList.value[index];
    try {
      const text = QA.answer;
      await navigator.clipboard.writeText(text);
      QA.copyIcon = 'check';
      setTimeout(() => {
        QA.copyIcon = 'content_copy';
      }, 300);
    } catch (e) {
      QA.copyIcon = 'content_copy';
      console.log(e);
    }
  };
  return {
    question,
    qaList,
    loading,
    open,
    copyRef,
    inputRef,
    exampleList,
    barRef,
    barHeight,
    copy,
    sendMessage,
    handleInputDevice,
    handleThumbDown,
    confirm,
    sendExample,
  };
});
