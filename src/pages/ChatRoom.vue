<template>
  <div class="flex flex-center container" style="border: 1px solid red">
    <div
      class="message-box"
      style="border: 1px solid pink"
      :style="{
        height: `calc(100vh - ${layoutHeight}px - ${barHeight}px)`,
      }"
    >
      <div
        class="relative-position full-height"
        v-if="chatStore.qaList.length == 0"
      >
        <div
          class="qampus-greet"
          :style="{
            height: `calc(100% - ${exampleHeight}px)`,
          }"
        >
          <img :src="collapsedLogo" />
          <span class="greet-text"><b>How can I help you today?</b></span>
        </div>
        <div class="row full-width absolute-bottom" ref="exampleRef">
          <q-intersection
            v-for="(example, index) in chatStore.exampleList"
            :key="index"
            transition="scale"
            transition-duration="800"
            class="col-xs-12 col-sm-6 col-6"
          >
            <q-card
              flat
              bordered
              class="q-ma-sm radius-8 cursor-pointer example"
              @click="sendExample(example.subTitle)"
            >
              <q-card-section>
                <div class="text-caption">{{ example.label }}</div>
                <div class="text-caption">{{ example.subTitle }}</div>
              </q-card-section>
            </q-card>
          </q-intersection>
        </div>
      </div>
      <div v-for="(qa, index) in chatStore.qaList" :key="index">
        <div class="chat">
          <img src="../assets/user.png" />
          <span>
            <b>您</b>
            <br />
            {{ qa.question }}
          </span>
        </div>
        <div class="chat">
          <img :src="collapsedLogo" />
          <span>
            <b>QAmpus</b>
            <br />
            <div class="q-mt-md" v-if="qa.loading"><DotFlashing /></div>
            <div v-else>{{ qa.answer }}</div>
            <div
              class="toolbar flex"
              v-if="!qa.loading"
              :style="{
                display: index === chatStore.qaList.length - 1 ? 'block' : '',
              }"
            >
              <q-btn
                :icon="qa.copyIcon"
                unelevated
                ripple
                round
                size="10px"
                @click="copy(index)"
              />
              <q-btn
                icon="o_thumb_down"
                unelevated
                ripple
                round
                size="10px"
                @click="handleThumbDown(index)"
              />
            </div>
          </span>
        </div>
      </div>
    </div>
    <div class="messagebar column" ref="barRef">
      <q-input
        ref="inputRef"
        autofocus
        v-model="chatStore.question"
        autogrow
        placeholder="傳訊息給QAmpus...."
        class="bar-input q-px-md"
        borderless
        @keydown.enter.exact.prevent="handleInputDevice"
        :input-style="{
          color: 'white',
          maxHeight: '150px',
        }"
        :disable="chatStore.loading"
      >
        <template v-slot:append>
          <RoundBtn icon="send" @clicked="sendMessage" />
        </template>
      </q-input>
      <span style="padding: 5px"
        >QAmpus 可能會發生錯誤。建議你查核重要資訊。</span
      >
    </div>
  </div>
  <WarningDialog
    v-model:open="chatStore.open"
    @close="chatStore.open = false"
    :title="title"
    :description="description"
    btnName="去登入"
    @warningDialogConfirm="confirm"
  />
  <UserDislikeDialog />
</template>

<script setup lang="ts">
import collapsedLogo from '../assets/collapsed-logo.png';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import DotFlashing from 'src/components/Loading/DotFlashing.vue';
import { useChatStore } from 'src/stores/Chat/chat';
import WarningDialog from 'src/components/Dialog/WarningDialog.vue';
import UserDislikeDialog from 'src/components/Dialog/UserDislikeDialog.vue';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const chatStore = useChatStore();
const $q = useQuasar();
const { inputRef, barHeight } = storeToRefs(chatStore);
const barRef = ref<HTMLDivElement | null>(null);
const exampleRef = ref<HTMLDivElement | null>(null);
const exampleHeight = ref(90);
const layoutHeight = ref(145);

setTimeout(() => {
  exampleHeight.value = exampleRef.value?.clientHeight || 185;
  layoutHeight.value = $q.screen.lt.sm ? 145 : 70;
  barHeight.value = barRef.value?.clientHeight || 87;
}, 150);
const title = '請先登入';
const description =
  '登入後即可享有倒讚後的人工審核功能，當您的問題經確認後，我們將會發信通知您~';
const sendMessage = async () => {
  scrollToBottom();
  await chatStore.sendMessage();
};
const handleInputDevice = () => {
  chatStore.handleInputDevice();
};
const sendExample = (q: string) => {
  chatStore.sendExample(q);
};
const confirm = () => {
  chatStore.confirm();
};
const handleThumbDown = (index: number) => {
  chatStore.handleThumbDown(index);
};
const copy = (index: number) => {
  chatStore.copy(index);
};
watch(
  () => chatStore.loading,
  () => {
    if (!chatStore.loading) {
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }
  }
);
const scrollToBottom = () => {
  const container = document.querySelector('.container');
  if (container) {
    // 滾動到最底部
    container.scrollTop = container.scrollHeight;
    console.log(container!.scrollHeight);
  }
};
</script>
<style scoped>
.container {
  overflow-y: auto;
  height: 100%;
}
.message-box {
  /* height: calc(100vh - 11.5rem); */
  width: 60vw;
}
.chat {
  display: flex;
  gap: 20px;
  padding-top: 25px;
  padding-bottom: 25px;
  color: black;
  font-size: 15px;
  font-weight: 400;
  white-space: pre-line;
}

.chat img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
.chat:hover .toolbar {
  display: block;
}

.toolbar {
  display: none; /* 初始隐藏 */
}
.messagebar {
  position: fixed;
  bottom: 0;
  /* height: 100px; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.messagebar .bar-input {
  background-color: #494b59;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
  border-radius: 10px;
}

.messagebar button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
}

.qampus-greet {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.qampus-greet img {
  width: 60px;
  height: 60px;
}
.greet-text {
  margin: 10px;
  font-size: 20px;
}
.example:hover {
  background-color: rgb(248, 246, 246);
}
/* 在手機時留下10vw的空間 */
@media (max-width: 768px) {
  .message-box {
    width: 90vw;
  }
  .messagebar .bar-input {
    width: 90vw;
  }
}
</style>
