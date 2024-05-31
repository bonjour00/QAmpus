<template>
  <q-dialog
    :modelValue="examplesDialog.open"
    @update:model-value="closeExamplesDialog"
  >
    <q-card style="max-width: 550px" class="full-width">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold">QAmpusAI範例問題</div>
        <q-space />
        <RoundBtn icon="close" @clicked="closeExamplesDialog" />
      </q-card-section>
      <q-card-section class="q-pb-none">
        <q-banner class="bg-grey-3" dense>
          <template v-slot:avatar>
            <q-icon name="info" color="primary" />
          </template>
          <div class="flex flex-center q-gutter-lg">
            <span>目前僅有<b>資管系</b>之資料</span>
          </div>
        </q-banner>
      </q-card-section>
      <q-card-section class="column items-center">
        <q-tabs
          v-model="examplesDialog.tab"
          inline-label
          outside-arrows
          mobile-arrows
          class="bg-primary text-white full-width"
        >
          <q-tab
            :name="name"
            :label="name"
            v-for="(name, index) in examplesDialog.tabList"
            :key="index"
          />
        </q-tabs>

        <q-tab-panels
          v-model="examplesDialog.tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
          class="full-width scroll"
          v-for="(panel, panelIndex) in examplesDialog.panelsList"
          :key="panelIndex"
          style="max-height: 60vh"
        >
          <q-tab-panel :name="panel.panelName" class="q-px-none">
            <q-intersection
              v-for="(example, index) in panel.examples"
              :key="index"
              transition="jump-down"
              transition-duration="800"
            >
              <q-card
                flat
                bordered
                class="q-ma-sm radius-8 cursor-pointer"
                @click="sendExample(example)"
              >
                <q-card-section>
                  <div class="text-subtitle2 text-weight-bold">
                    {{ example }}
                  </div>
                </q-card-section>
              </q-card>
            </q-intersection>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import { useExamplesDialogStore } from 'src/stores/Dialog/examplesDialog';

const examplesDialog = useExamplesDialogStore();

const sendExample = (q: string) => {
  examplesDialog.sendExample(q);
};

const closeExamplesDialog = () => {
  examplesDialog.closeExamplesDialog();
};
</script>
