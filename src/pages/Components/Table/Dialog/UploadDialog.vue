<template>
  <q-dialog :modelValue="upload" @update:model-value="closePopup">
    <q-card style="padding: 5px; border-radius: 0.5rem">
      <q-card-section class="row items-center q-pb-none" style="width: 550px">
        <div style="font-size: 25px; font-weight: 900">
          <strong>上傳檔案</strong>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closePopup" />
      </q-card-section>
      <q-card-section
        class="row items-center q-pb-none"
        style="margin-bottom: 80px"
        ><q-tabs
          class="tab-head"
          v-model="tab"
          indicator-color="primary"
          dense
          align="center"
          :breakpoint="0"
        >
          <q-tab name="url" label="URL" />
          <q-tab name="file" label="檔案" />
        </q-tabs>
        <div class="tab">
          <div style="font-weight: 900">
            資源名稱<q-input
              v-model="sourceName"
              dense
              label-color="grey-9"
              outlined
              placeholder="請輸入資源名稱"
              input-style="font-weight: 700"
            />
          </div>

          <div style="width: 100%">
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="url">
                <div
                  style="
                    font-size: 15px;
                    font-weight: 500;
                    padding: 0px 0px 0px 10px;
                  "
                >
                  URL
                  <q-input
                    v-model="url"
                    dense
                    label-color="grey-9"
                    outlined
                    placeholder="請輸入URL"
                    input-style="font-weight: 700"
                  />
                </div>
              </q-tab-panel>
              <q-tab-panel name="file">
                <div
                  style="
                    padding: 0px 0px 0px 10px;
                    font-weight: 900;
                    font-size: 15px;
                  "
                >
                  檔案
                  <input
                    type="file"
                    style="
                      top: 0;
                      right: 0;
                      bottom: 0;
                      left: 0;
                      position: absolute;
                      opacity: 0;
                    "
                    @change="handleFiles"
                  />
                  <div class="file-drop-area">
                    <span
                      v-if="!fileName"
                      style="color: #79a0bd; font-weight: 900; cursor: pointer"
                      >選擇</span
                    >
                    <span v-if="!fileName" style="font-weight: 900"
                      >或直接拖曳檔案</span
                    >
                    <div style="font-weight: 900">{{ fileName }}</div>
                  </div>
                </div></q-tab-panel
              >
            </q-tab-panels>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" style="color: #79a0bd" @click="closePopup" />
        <q-btn
          flat
          label="確認"
          color="white"
          @click="uploadResource"
          style="background: #79a0bd"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, Ref, computed } from 'vue';
import { QA, Option } from '../data ';
import './UploadDialog.css';
import axios from 'axios';
import { successs } from '..//ActionBtn/AnimateAction';

const props = defineProps<{
  upload: boolean;
  data: any;
}>();

const emit = defineEmits(['update:upload', 'update']);
const tab = ref('url');
const url = ref('');
const sourceName = ref('');
const formData = ref();
const closePopup = () => {
  emit('update:upload', false);
  fileName.value = '';
  tab.value = 'url';
  formData.value = '';
  sourceName.value = '';
};
const fileName = ref('');
const handleFiles = async (e: any) => {
  fileName.value = e.target.files[0].name;

  formData.value = new FormData();
  formData.value.append('file', e.target.files[0]);
};
watch(props, () => {
  fileName.value = props.data !== null ? props.data.dataFilename : '';
  sourceName.value = props.data !== null ? props.data.dataDescription : '';
});

const uploadResource = async () => {
  try {
    if (tab.value == 'file') {
      // formData.value.append('description', sourceName.value);
      const response = await axios.post(
        `http://140.136.202.125/api/Blob?description=${sourceName.value}`,
        formData.value,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      console.log('Upload response:', response.data);
      // for (let [key, value] of formData.value) {
      //   console.log(`${key}: ${value}`);
      // }
      successs('上傳成功');
      emit('update');
      closePopup();
    }
  } catch (error) {
    console.error('上传文件时发生错误:', error);
  }
};
</script>
<style scoped>
.file-drop-area {
  height: 40px;
  /* border: 2px dashed #ccc; */
  background: #eaeaea;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
