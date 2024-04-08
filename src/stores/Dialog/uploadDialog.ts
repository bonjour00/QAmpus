import { defineStore } from 'pinia';
import {
  BLOB_TABLE_API,
  MANAGE_BLOB_TABLE_STATUS,
  Resource,
} from 'src/components/Table/data ';
import { Ref, computed, ref } from 'vue';
import { api } from 'src/boot/axios';
import { successs } from 'src/components/AnimateAction/AnimateAction';
import { useTableStore } from '../Table/table';

export const useUploadDialogStore = defineStore('uploadDialog', () => {
  const tableStore = useTableStore();

  const open = ref(false);
  const tab = ref('file');
  const urlInput = ref('');
  const sourceName = ref('');
  const file: Ref<File | null> = ref(null);
  const fileName = ref(''); //原檔案名稱 (重新上傳)
  const btnName = ref('上傳');
  const sourceNameRef: any = ref(null);
  const fileRef: any = ref(null);

  const openUploadDialog = () => {
    open.value = true;
  };
  const openUploadWithData = (data: Resource) => {
    open.value = true;
    sourceName.value = data.dataDescription;
    fileName.value = data.dataFilename.replace(/^\d+-/, '');
    btnName.value = '重新上傳';
  };
  const $reset = () => {
    open.value = false;
    tab.value = 'file';
    urlInput.value = '';
    sourceName.value = '';
    file.value = null;
    fileName.value = '';
    btnName.value = '上傳';
    sourceNameRef.value = null;
    fileRef.value = null;
  };

  const closeUploadDialog = () => {
    $reset();
  };
  const rejected = (rejection: any) => {
    if (rejection[0].failedPropValidation) {
      alert('只接受.pdf');
    }
  };
  const makeForm = (file: any) => {
    const data = new FormData();
    if (file) {
      data.append('file', file);
    }
    return data;
  };

  const upload = async (url: string) => {
    const formData = makeForm(file.value);
    const response = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('token'),
      },
    });
  };
  const uploadResource = async () => {
    if (tab.value == 'url') {
      alert('訂閱可解鎖URL功能 ，詳情請聯絡QAmpus管理員~');
      return;
    }
    fileRef.value?.validate();
    sourceNameRef.value?.validate();
    if (sourceNameRef.value.hasError || fileRef.value.hasError) {
      return;
    } else {
      try {
        if (tab.value === 'file') {
          if (fileName.value) {
            //reUpload
            await upload(`/Blob/reupload?originalfilename=${fileName.value}`);
          } else {
            //first upload
            await upload(`/Blob/upload?description=${sourceName.value}`);
          }
          successs('上傳成功');
          tableStore.fetchRows(BLOB_TABLE_API, MANAGE_BLOB_TABLE_STATUS);
        }
        closeUploadDialog();
      } catch (error: any) {
        console.error('error:', error.response?.data || '發生錯誤');
      }
    }
  };
  const reuploadRule = (val: any) => {
    if (fileName.value) {
      return (
        fileName.value == file.value!.name ||
        `與原檔案名稱: ${fileName.value}不符`
      );
    }
    return true;
  };

  return {
    open,
    tab,
    urlInput,
    sourceName,
    file,
    fileName,
    btnName,
    sourceNameRef,
    fileRef,
    openUploadDialog,
    openUploadWithData,
    closeUploadDialog,
    rejected,
    uploadResource,
    reuploadRule,
  };
});
