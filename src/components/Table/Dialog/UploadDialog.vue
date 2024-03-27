<template>
  <q-dialog :modelValue="upload" @update:model-value="closePopup">
    <q-card style="border-radius: 10px" class="q-pa-sm">
      <q-card-section class="row items-center q-pb-none">
        <div style="font-size: 25px" class="text-weight-bold">上傳檔案</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closePopup" />
      </q-card-section>
      <q-card-section class="column items-center q-px-sm">
        <q-tabs
          v-model="tab"
          indicator-color="primary"
          dense
          align="center"
          :breakpoint="0"
        >
          <q-tab name="url" label="URL" />
          <q-tab name="file" label="檔案" />
        </q-tabs>
        <div class="row q-mt-lg q-col-gutter-x-sm flex">
          <div class="text-weight-bold col-5">
            資源名稱
            <q-input
              v-model="sourceName"
              dense
              label-color="grey-9"
              outlined
              placeholder="請輸入資源名稱"
              input-class="text-weight-bold"
              autogrow
            />
          </div>
          <q-tab-panels v-model="tab" animated class="col">
            <q-tab-panel name="url" class="q-pa-none">
              <div class="text-weight-bold">
                URL
                <q-input
                  v-model="url"
                  dense
                  label-color="grey-9"
                  outlined
                  placeholder="請輸入URL"
                  input-class="text-weight-bold"
                />
              </div>
            </q-tab-panel>
            <q-tab-panel name="file" class="q-pa-none">
              <div class="text-weight-bold">
                檔案
                <div class="relative-position">
                  <input
                    type="file"
                    class="uploadInput"
                    accept=".pdf"
                    @change="handleFiles"
                  />
                  <div class="file-drop-area">
                    <span v-if="!fileName" style="color: #79a0bd">選擇</span>
                    <span v-if="!fileName">或直接拖曳檔案</span>
                    {{ fileName }}
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
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
import axios from 'axios';
import { successs } from '..//ActionBtn/AnimateAction';

const props = defineProps<{
  upload: boolean;
  data: any;
}>();

const emit = defineEmits(['update:upload', 'update', 'clean']);
const tab = ref('file');
const url = ref('');
const sourceName = ref('');
const formData = ref();
const closePopup = () => {
  emit('update:upload', false);
  fileName.value = '';
  tab.value = 'file';
  formData.value = '';
  sourceName.value = '';
  emit('clean');
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
  background: #eaeaea;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.uploadInput {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  opacity: 0;
}
</style>
