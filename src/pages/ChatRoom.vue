<template>
  <div class="chatbox-wrapper">
    <div class="message-box">
      <div class="qampus-greet" v-if="qaList.length == 0">
        <img :src="collapsedLogo" />
        <span class="greet-text"><b>How can I help you today?</b></span>
      </div>
      <div v-for="(qa, index) in qaList" :key="index">
        <div class="chat message">
          <img src="../assets/user.png" />
          <span
            ><b>您</b> <br />
            {{ qa.question }}
          </span>
        </div>
        <div class="chat response">
          <img :src="collapsedLogo" />
          <span
            ><b>QAmpus</b> <br />
            {{ typeof qa.answer == 'object' ? qa.answer.qaAnswer : qa.answer }}
            <br />
            <div
              v-if="
                typeof qa.answer == 'object' &&
                qa.answer.source &&
                qa.answer.sourcePhrase
              "
            >
              來源: {{ typeof qa.answer == 'object' && qa.answer.source }}
              <br />
              來源訓練句:{{
                typeof qa.answer == 'object' && qa.answer.sourcePhrase
              }}
            </div>
            <q-btn
              icon="thumb_down"
              unelevated
              ripple
              round
              size="10px"
              v-if="qa.answer != '...'"
              @click="handleThumbDown(index)"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="messagebar">
      <div class="bar-wrapper">
        <input
          type="text"
          placeholder="您想問什麼 ..."
          v-model="question"
          @keydown.enter.prevent="sendMessage"
        />
        <q-btn icon="send" unelevated ripple round @click="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import axios from 'axios';
import { successs } from '../components/Table/ActionBtn/AnimateAction';
import collapsedLogo from '../assets/collapsed-logo.png';
//暫時
type MessageQA = {
  question: string;
  answer: string | QuestionAnswering;
};
type QuestionAnswering = {
  qaAnswer: string;
  source: string;
  sourcePhrase: string;
};
const question = ref('');
const qaList: Ref<MessageQA[]> = ref([]);
const scrollToBottom = () => {
  const messageBox = document.querySelector('.message-box');
  if (messageBox) {
    // 滾動到最底部
    messageBox.scrollTop = messageBox.scrollHeight;
  }
};
const sendMessage = async () => {
  if (question.value.trim() !== '') {
    const q = question.value;
    question.value = '';
    qaList.value.push({ question: q, answer: '...' });

    try {
      const result = await axios.post(
        'http://140.136.202.125/api/Question/ask',
        {
          question: q,
        }
      );
      qaList.value[qaList.value.length - 1].answer = result.data.answer;
      console.log(result);
      // const result = await axios.post(
      //   'https://fju-test3.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=shelly-search-test&api-version=2021-10-01',
      //   {
      //     question: q,
      //   },
      //   {
      //     headers: {
      //       'Ocp-Apim-Subscription-Key': 'fde6fc08d2e14a71b844af69aeea65f7',
      //     },
      //   }
      // );

      // // qaList.value[qaList.value.length - 1].answer = result.data;
      // qaList.value[qaList.value.length - 1].answer = {
      //   qaAnswer: result.data.answers[0].answer.replace('A：', ''),
      //   source: result.data.answers[0].source,
      //   sourcePhrase: result.data.answers[0].questions[0],
      // };

      setTimeout(() => scrollToBottom(), 100);
    } catch (e) {
      console.log('error', e);
    }
  }
};
const handleThumbDown = async (index: number) => {
  const result = await axios.post(
    'http://140.136.202.125/api/Question',
    {
      questionQuestion: qaList.value[index].question,
      questionAnswer:
        typeof qaList.value[index].answer == 'object'
          ? (qaList.value[index].answer as QuestionAnswering).qaAnswer
          : qaList.value[index].answer,
      officeId: 3,
    },
    {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    }
  );

  successs('已幫您轉送至相關單位');
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&display=swap');
* {
  padding: 0;
  margin: 0;
  font-family: Poppins, sans-serif, Noto Sans TC;
  box-sizing: border-box;
}
body {
  width: 100%;
  height: 100vh;
}

.chat {
  display: flex;
  gap: 20px;
  padding: 25px;
  color: black;
  font-size: 15px;
  font-weight: 300;
}

.chat img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.response {
  background-color: #f5f7fc;
}

.messagebar {
  position: fixed;
  bottom: 0;
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fc;
}

.messagebar .bar-wrapper {
  background-color: #494b59;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bar-wrapper input {
  width: 100%;
  padding: 5px;
  border: none;
  outline: none;
  font-size: 14px;
  background: none;
  color: #ccc;
}

.bar-wrapper input::placeholder {
  color: #ccc;
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

.message-box {
  height: calc(100vh - 5rem);
  overflow-y: auto;
}
/* 在PC時留下40%vw的空間 */
@media (min-width: 768px) {
  .message-box {
    width: calc(100vw - 40vw);
    margin-left: 20vw;
    margin-right: 20vw;
  }
  .messagebar .bar-wrapper {
    width: 60vw;
  }
}

/* 在手機時留下10vw的空間 */
@media (max-width: 767px) {
  .messagebar .bar-wrapper {
    width: 90vw;
  }
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
  border-radius: 50%;
}
.greet-text {
  margin: 10px;
  font-size: 20px;
}
</style>
