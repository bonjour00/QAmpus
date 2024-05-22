<template>
  <q-dialog v-model="open" persistent>
    <q-card class="full-width">
      <q-card-section align="center">
        <div class="text-h6 text-weight-bold">QAmpus使用導覽</div>
      </q-card-section>
      <q-card-section align="center">
        <q-carousel
          v-model="slide"
          v-model:fullscreen="fullscreen"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          navigation
          padding
          class="bg-primary text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide
            v-for="(guide, index) in guides"
            :key="index"
            :name="index"
            class="column no-wrap flex-center"
            style="padding-left: 0px; padding-right: 0px"
            ><div class="q-mb-lg text-center text-h6 text-weight-bold">
              {{ guide.title }}
            </div>
            <q-img :src="guide.src" />
          </q-carousel-slide>
          <template v-slot:control>
            <q-carousel-control position="bottom-right" :offset="[18, 18]">
              <q-btn
                push
                round
                dense
                color="white"
                text-color="primary"
                :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                @click="fullscreen = !fullscreen"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
      </q-card-section>
      <q-card-actions align="center">
        <ConfirmBtn
          btnName="上一頁"
          @clicked="slide--"
          v-show="slide > 0"
          :props="props"
        />
        <ConfirmBtn
          btnName="下一頁"
          @clicked="slide++"
          v-show="slide < guides.length - 1"
          :props="props"
        />
        <ConfirmBtn
          :props="underStandProp"
          btnName="我了解了!"
          @clicked="underStand"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import ConfirmBtn from '../Button/Dialog/ConfirmBtn.vue';
import guide1 from '../../assets/onBoarding/1.gif';
import guide2 from '../../assets/onBoarding/2.gif';
import guide3 from '../../assets/onBoarding/3.gif';
import guide4 from '../../assets/onBoarding/4.gif';
import { useQuasar } from 'quasar';
const $q = useQuasar();

import { computed, ref } from 'vue';
const open = ref(localStorage.getItem('hasBoarding') != 'true');
const slide = ref(0);

const fullscreen = ref(false);
const props = {
  outline: true,
};
const underStandProp = computed(() => {
  return {
    disable: slide.value !== guides.length - 1,
  };
});
const guides = [
  {
    src: guide1,
    title: '您可以直接點選推薦(範例)問題來詢問',
  },
  { src: guide2, title: '或在下方輸入框輸入您的問題' },
  { src: guide3, title: '您需要先「登入」才能享有不滿意功能' },
  { src: guide4, title: '登入後的不滿意功能流程示意圖' },
];
const underStand = () => {
  open.value = false;
  localStorage.setItem('hasBoarding', 'true');
};
</script>
