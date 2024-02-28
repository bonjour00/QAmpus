<template>
  <q-dialog :modelValue="upload" @update:model-value="closePopup">
    <q-card style="padding: 5px">
      <q-card-section class="row items-center q-pb-none" style="width: 550px">
        <div style="font-size: 25px; font-weight: 900">
          <strong>新增檔案</strong>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closePopup" />
      </q-card-section>
      <q-card-section
        class="row items-center q-pb-none"
        style="margin-bottom: 80px"
      >
        <div style="display: flex; justify-content: space-between; width: 100%">
          <div style="width: 40%; margin-top: 72px">
            <div style="font-size: 15px; font-weight: 900">資源名稱</div>
            <q-input
              v-model="source"
              dense
              label-color="grey-9"
              outlined
              placeholder="請輸入資源名稱"
              input-style="font-weight: 700"
            />
          </div>
          <div style="width: 60%; margin-left: 20px">
            <q-tabs
              v-model="tab"
              indicator-color="primary"
              dense
              align="left"
              :breakpoint="0"
            >
              <q-tab name="url" label="URL" />
              <q-tab name="file" label="檔案" />
            </q-tabs>
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel
                name="url"
                style="padding-left: 0px; padding-right: 0px; padding-top: 36px"
              >
                <div style="font-size: 15px; font-weight: 500">URL</div>
                <q-input
                  v-model="url"
                  dense
                  label-color="grey-9"
                  outlined
                  placeholder="請輸入URL"
                  input-style="font-weight: 700"
                />
              </q-tab-panel>
              <q-tab-panel name="file" style="padding: 36px 0px 0px 0px">
                <div style="font-size: 15px; font-weight: 900">檔案</div>
                <div>
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
                  <div class="file-drop-area" @drop="handleDrop">
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
        <q-btn flat label="取消" color="primary" @click="closePopup" />
        <q-btn
          flat
          label="確認"
          color="white"
          @click="closePopup"
          style="background: #79a0bd"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, Ref, computed } from 'vue';
import { QA, Option } from '../data ';

const props = defineProps<{
  upload: boolean;
}>();

const emit = defineEmits(['update:upload']);
const tab = ref('url');
const url = ref('');
const source = ref('');
const closePopup = () => {
  emit('update:upload', false);
  fileName.value = '';
};
const fileName = ref('');
const handleFiles = (e: any) => {
  fileName.value = e.target.files[0].name;
  console.log('clicl');
};
const handleDrop = (event: any) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  fileName.value = files[0].name;
  console.log('drop');
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
