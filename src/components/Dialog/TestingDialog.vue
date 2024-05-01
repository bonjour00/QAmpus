<template>
  <q-dialog
    :modelValue="testingDialogStore.open"
    @update:model-value="closeTestingDialog"
  >
    <q-card style="max-width: 550px" class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">批次問答測試</div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeTestingDialog" />
      </q-card-section>
      <q-card-section align="center" class="q-pb-none">
        <div class="text-body1">
          請<b>勾選</b>可核准之問答，我們將發信通知發問者核准之答覆~
        </div>
        <q-banner class="bg-grey-3" dense>
          <template v-slot:avatar>
            <q-icon name="info" color="primary" />
          </template>
          <div class="flex flex-center q-gutter-lg">
            <div v-for="(info, index) in infos" :key="index">
              <q-icon :name="info.icon" :color="info.color" size="20px" />
              <span
                >表示<b>{{ info.label }}</b></span
              >
            </div>
          </div>
        </q-banner>
      </q-card-section>
      <div style="max-height: 70vh" class="scroll">
        <q-card-section>
          <q-list bordered class="rounded-borders">
            <q-expansion-item
              expand-separator
              default-opened
              v-for="row in testingDialogStore.rows"
              :key="row.questionId"
            >
              <template v-slot:header>
                <q-item-section side class="q-pa-none"
                  ><q-checkbox
                    v-model="testingDialogStore.questionIds"
                    :val="row.questionId"
                    checked-icon="done"
                    :color="
                      testingDialogStore.questionIds.includes(row.questionId)
                        ? 'green'
                        : 'primary'
                    "
                    v-if="!testingLoading(row)"
                    keep-color
                  />
                </q-item-section>
                <q-item-section>
                  {{ row.questionQuestion }}
                </q-item-section>
              </template>
              <q-card>
                <q-card-section class="q-ml-sm">
                  <q-icon name="emoji_objects" color="primary" size="1.5rem" />
                  <InnerLoading :showing="testingLoading(row)" />
                  {{ row.questionAnswer }}
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
      </div>
      <q-card-actions align="right">
        <CancelBtn @clicked="closeTestingDialog" />
        <ConfirmBtn btnName="確認" @clicked="testingDialogConfirm" />
      </q-card-actions>
      <HourglassLoading :showing="testingDialogStore.loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import CancelBtn from '../Button/Dialog/CancelBtn.vue';
import ConfirmBtn from '../Button/Dialog/ConfirmBtn.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import { useTestingDialogStore } from 'src/stores/Dialog/testingDialog';
import HourglassLoading from '../Loading/HourglassLoading.vue';
import InnerLoading from '../Loading/InnerLoading.vue';
import { QA } from '../Table/data ';

const testingDialogStore = useTestingDialogStore();
const infos = [
  {
    icon: 'done',
    label: '已核准，並發信通知使用者',
    color: 'green',
  },
  // {
  //   icon: 'question_mark',
  //   label: '未核准',
  //   color: 'primary',
  // },
];

const closeTestingDialog = () => {
  testingDialogStore.closeTestingDialog();
};
const testingDialogConfirm = () => {
  testingDialogStore.cofirmMuti();
};
const testingLoading = (QA: QA) => {
  return testingDialogStore.isTestingLoading(QA);
};
</script>
