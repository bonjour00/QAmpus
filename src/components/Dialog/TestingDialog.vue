<template>
  <q-dialog
    :modelValue="testingDialogStore.open"
    @update:model-value="closeTestingDialog"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">問答測試</div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeTestingDialog" />
      </q-card-section>
      <div style="max-height: 80vh" class="scroll">
        <q-card-section>
          {{ testingDialogStore.questionIds }}
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
                    unchecked-icon="question_mark"
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
        <DialogButton btnName="取消" @clicked="closeTestingDialog" />
        <DialogButton btnName="確認" @clicked="testingDialogConfirm" />
      </q-card-actions>
      <HourglassLoading :showing="testingDialogStore.loading" />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import DialogButton from 'src/components/Button/Dialog/DialogButton.vue';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import { useTestingDialogStore } from 'src/stores/Dialog/testingDialog';
import HourglassLoading from '../Loading/HourglassLoading.vue';
import InnerLoading from '../Loading/InnerLoading.vue';
import { QA } from '../Table/data ';

const testingDialogStore = useTestingDialogStore();

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
