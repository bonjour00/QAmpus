import axios from 'axios';
import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();
  const position = 'top';
  const progress = true;
  const timeout = 1500;

  const notifyFail = (message: string, title = '') => {
    // let message;
    // if (axios.isAxiosError(error)) {
    //   message = error.response?.data;
    // } else {
    //   message = error.message;
    // }
    $q.notify({
      type: 'negative',
      progress,
      position,
      timeout,
      message: title + (message || '發生錯誤!'),
    });
  };

  const notifyWarning = (message: string, title = '') => {
    $q.notify({
      type: 'warning',
      progress,
      position,
      timeout,
      message: title + (message || '發生錯誤!'),
    });
  };
  return { notifyFail, notifyWarning };
}
