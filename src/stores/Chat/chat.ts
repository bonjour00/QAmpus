import { defineStore } from 'pinia';
import { Ref, computed, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useUserStore } from '../Auth/user';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useUserDislikeDialogStore } from '../Dialog/userDislikeDialog';
import useTableAction from 'src/composables/Table/useTableAction';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();
  const userDislikeDialogStore = useUserDislikeDialogStore();
  const { downloadResource, loading: isLoading } = useTableAction();
  const router = useRouter();
  const $q = useQuasar();
  type MessageQA = {
    question: string;
    answer: string;
    loading: boolean;
    loadingFinish: boolean;
    copyIcon: string;
    officeId: number;
    officeName: string | null;
    fileName: string | null;
  };
  const question = ref('');
  const qaList: Ref<MessageQA[]> = ref([]);
  const loading = ref(false); //input disable or not
  const open = ref(false);
  const copyRef: Ref<HTMLElement | null> = ref(null);
  const inputRef: Ref<HTMLElement | null> = ref(null);
  const barRef = ref<HTMLDivElement | null>(null);
  const barHeight = ref(87);
  const recording = ref(false);
  const examples = [
    { label: 'QAmpus回答範圍', subTitle: 'QAmpus有什麼功能?' },
    { label: '問科系教授', subTitle: '資管系師資?' },
    { label: '問科系畢業門檻', subTitle: '資管系畢業門檻?' },
    { label: '問科系資訊', subTitle: '資管系課程規劃' },
  ];
  // const recognition: any =
  //   window.SpeechRecognition || window.webkitSpeechRecognition;
  // recognition.lang = 'cmn-Hant-TW';
  // recognition.continuous = true;
  // recognition.onresult = (event: any) => {
  //   const text = event.results[0][0].transcript;
  //   question.value += text;
  // };

  const exampleList = computed(() => {
    return $q.screen.lt.sm ? examples.slice(0, 2) : examples;
  });
  const recordIcon = computed(() => {
    return recording.value ? 'stop_circle' : 'mic';
  });

  const $reset = () => {
    question.value = '';
    qaList.value = [];
    loading.value = false;
    open.value = false;
    copyRef.value = null;
    inputRef.value = null;
    barRef.value = null;
    recording.value = false;
  };
  const scrollToBottom = () => {
    const container = document.querySelector('.message-box');
    if (container) {
      // 滾動到最底部
      container.scrollTop = container.scrollHeight;
      // console.log(container!.scrollHeight);
    }
  };
  const submitQuestion = async (q: string) => {
    // recognition.stop();
    // recording.value = false;
    qaList.value.push({
      question: q,
      answer: '',
      loading: true,
      copyIcon: 'content_copy',
      officeId: 0,
      officeName: null,
      loadingFinish: false,
      fileName: null,
    });
    try {
      loading.value = true;

      const result = await api.post('/Question/ask', {
        question: q,
      });
      console.log(result.data);
      const answer = result.data.originalResponse.answer;
      const words: string[] = [];
      //逐字輸出
      for (let i = 0; i < answer.length; i += 10) {
        words.push(answer.substr(i, 10));
      }
      const wordsLen = words.length;
      for (let i = 0; i < wordsLen; i++) {
        setTimeout(() => {
          qaList.value[qaList.value.length - 1].answer += words[i];
          if (wordsLen - 1 == i) {
            qaList.value[qaList.value.length - 1].loadingFinish = true;
          }
          scrollToBottom();
        }, i * 60);
      }
      // qaList.value[qaList.value.length - 1].answer =
      //   result.data.originalResponse.answer;
      qaList.value[qaList.value.length - 1].loading = false;
      qaList.value[qaList.value.length - 1].officeId = result.data.officeId;
      qaList.value[qaList.value.length - 1].officeName = result.data.officeName;
      qaList.value[qaList.value.length - 1].fileName = result.data.fileName;
      loading.value = false;
    } catch (e) {
      console.log('error', e);
      qaList.value[qaList.value.length - 1].answer =
        '抱歉，目前QAmpus找不到相對應的答案';
      qaList.value[qaList.value.length - 1].loading = false;
      qaList.value[qaList.value.length - 1].loadingFinish = true;
      loading.value = false;
      // recognition.stop();
      // recording.value = false;
    }
    setTimeout(() => {
      inputRef.value && inputRef.value.focus();
    }, 100);
  };
  const sendMessage = async () => {
    if (question.value.trim() !== '') {
      setTimeout(() => {
        scrollToBottom();
      }, 10);
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
    if ($q.screen.lt.sm || $q.screen.lt.md) {
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
  const downloadFile = (index: number) => {
    const QA = qaList.value[index];
    const dataFilename = QA.fileName;
    downloadResource({
      dataFilename,
    });
  };
  // const record = () => {
  //   recording.value = !recording.value;
  //   if (recording.value) {
  //     return recognition.start();
  //   }
  //   return recognition.stop();
  // };
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
    recordIcon,
    isLoading,
    copy,
    sendMessage,
    handleInputDevice,
    handleThumbDown,
    confirm,
    sendExample,
    downloadFile,
    // record,
  };
});
