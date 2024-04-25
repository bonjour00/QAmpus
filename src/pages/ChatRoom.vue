<template>
  <div class="flex flex-center container">
    <div class="message-box">
      <div class="qampus-greet" v-if="chatStore.qaList.length == 0">
        <img :src="collapsedLogo" />
        <span class="greet-text"><b>How can I help you today?</b></span>
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
                icon="thumb_down"
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
    <div class="messagebar column">
      <q-input
        v-model="chatStore.question"
        filled
        autogrow
        placeholder="傳訊息給QAmpus...."
        class="bar-input"
        @keydown.enter.exact.prevent="sendMessage"
        :input-style="{ color: 'white', maxHeight: '150px' }"
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
</template>

<script setup lang="ts">
import collapsedLogo from '../assets/collapsed-logo.png';
import RoundBtn from 'src/components/Button/IconBtn/RoundBtn.vue';
import DotFlashing from 'src/components/Loading/DotFlashing.vue';
import { useChatStore } from 'src/stores/Chat/chat';
import WarningDialog from 'src/components/Dialog/WarningDialog.vue';

const chatStore = useChatStore();

const title = '請先登入';
const description =
  '登入後即可享有倒讚後的人工審核功能，當您的問題經確認後，我們將會發信通知您~';
const sendMessage = () => {
  chatStore.sendMessage();
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

// const scrollToBottom = () => {
//   const container = document.querySelector('.container');
//   if (container) {
//     // 滾動到最底部
//     container.scrollTop = container.scrollHeight;
//     console.log(container!.scrollHeight);
//   }
// };
</script>
<style scoped>
.container {
  overflow-y: auto;
}
.message-box {
  height: calc(100vh - 10rem);
  width: 60vw;
}
.chat {
  display: flex;
  gap: 20px;
  padding: 25px;
  color: black;
  font-size: 15px;
  font-weight: 400;
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
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60vw;
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
  margin-top: -70px;
}

.qampus-greet img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.greet-text {
  margin: 10px;
  font-size: 20px;
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
