<template>
  <q-dialog
    :modelValue="uploadDialogStore.open"
    @update:model-value="closeUploadDialog"
  >
    <q-card
      style="border-radius: 10px; width: 600px; max-width: 90vh"
      class="q-pa-sm"
    >
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">上傳檔案</div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeUploadDialog" />
      </q-card-section>
      <q-card-section class="column items-center">
        <q-tabs
          v-model="uploadDialogStore.tab"
          indicator-color="primary"
          dense
          align="center"
        >
          <q-tab name="url" label="URL" />
          <q-tab name="file" label="檔案" />
        </q-tabs>
        <div class="row fit q-mt-lg q-gutter-sm">
          <div class="text-weight-bold col-12 col-sm">
            資源名稱
            <q-input
              v-model="uploadDialogStore.sourceName"
              dense
              label-color="grey-9"
              outlined
              placeholder="請輸入資源名稱"
              input-class="text-weight-bold"
              autogrow
              :disable="uploadDialogStore.tab == 'url'"
              ref="sourceNameRef"
              lazy-rules="ondemand"
              :rules="[notEmpty]"
            />
          </div>
          <q-tab-panels
            v-model="uploadDialogStore.tab"
            animated
            class="col-12 col-sm-6"
          >
            <q-tab-panel name="url" class="q-pa-none">
              <div class="text-weight-bold">
                URL
                <q-input
                  v-model="uploadDialogStore.urlInput"
                  dense
                  label-color="grey-9"
                  outlined
                  placeholder="請輸入URL"
                  input-class="text-weight-bold"
                  autogrow
                  disable
                />
              </div>
            </q-tab-panel>
            <q-tab-panel name="file" class="q-pa-none full-width">
              <div class="text-weight-bold">
                檔案
                <q-file
                  v-model="uploadDialogStore.file"
                  :label="uploadDialogStore.fileName || '選擇或拖曳檔案(.pdf)'"
                  label-color="grey-9"
                  input-class="text-weight-bold"
                  filled
                  dense
                  accept=".pdf"
                  clearable
                  @rejected="rejected"
                  ref="fileRef"
                  :rules="
                    uploadDialogStore.fileName && uploadDialogStore.file == null
                      ? []
                      : [
                          notEmptyResource,
                          blobUploadVaild,
                          blobUploadLength,
                          uploadDialogStore.reuploadRule,
                        ]
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="q-pa-md">
        <FilterSelect
          v-show="
            userStore.userPermission == 'assigner' &&
            !uploadDialogStore.fileName
          "
          title="註冊單位: "
          v-model:currentOption="uploadDialogStore.office"
          :filterFn="filterFn"
          :filterOption="uploadDialogStore.filterOption"
        />
        <q-space />
        <DialogButton
          btnName="取消"
          @clicked="closeUploadDialog"
          :flat="true"
        />
        <DialogButton
          :btnName="
            uploadDialogStore.tab == 'url'
              ? '付費解鎖'
              : uploadDialogStore.btnName
          "
          @clicked="uploadResource"
        />
      </q-card-actions>
      <HourglassLoading :showing="uploadDialogStore.loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import DialogButton from 'src/components/Button/Dialog/DialogButton.vue';
import HourglassLoading from '../Loading/HourglassLoading.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import FilterSelect from '../Select/FilterSelect.vue';
import { useUploadDialogStore } from 'src/stores/Dialog/uploadDialog';
import {
  notEmpty,
  blobUploadVaild,
  blobUploadLength,
  notEmptyResource,
} from '../Input/rules';
import { storeToRefs } from 'pinia';
import { useUserStore } from 'src/stores/Auth/user';

const uploadDialogStore = useUploadDialogStore();
const userStore = useUserStore();
const { sourceNameRef, fileRef } = storeToRefs(uploadDialogStore);

const rejected = (rejection: any) => {
  uploadDialogStore.rejected(rejection);
};
const uploadResource = () => {
  uploadDialogStore.uploadResource();
};
const closeUploadDialog = () => {
  uploadDialogStore.closeUploadDialog();
};
const filterFn = (val: string, update: any) => {
  uploadDialogStore.filterFn(val, update);
};
</script>
