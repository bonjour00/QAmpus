<template>
  <div class="chatroom-container">
    <div class="chatroom">
      <div v-for="(message, index) in messageList" :key="index" class="message">
        <p>我：{{ message.qaQuestion }}</p>
        <p>回答：{{ message.qaAnswer }}</p>
        <p v-if="message.source">來源:{{ message.source }}</p>
        <p v-if="message.source">來源訓練句:{{ message.sourcePhrase }}</p>
        <p>信心度:{{ message.confidenceScore }}</p>
      </div>

      <div class="input-container">
        <input
          class="input"
          id="messageQ"
          v-model="message"
          placeholder="輸入訊息"
          @keydown.enter.prevent="sendMessage"
        />
        <q-icon class="send" name="send" @click="sendMessage" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const messageList: any = ref([]);

const message = ref('');

const sendMessage = async () => {
  if (message.value.trim() !== '') {
    const res = await fetch(
      'https://fju-test3.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=shelly-search-test&api-version=2021-10-01',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'fde6fc08d2e14a71b844af69aeea65f7',
        },
        body: JSON.stringify({
          question: message.value,
        }),
      }
    );
    //confidenceScore source
    const result = await res.json();
    console.log(result);
    const qaAnswer = result.answers[0].answer.replace('A：', '');
    const source = result.answers[0].source;
    const sourcePhrase = result.answers[0].questions[0];
    const confidenceScore = result.answers[0].confidenceScore;

    messageList.value.push({
      qaQuestion: message.value,
      qaAnswer,
      source,
      confidenceScore,
      sourcePhrase,
    });
    ///api/Qna
    if (confidenceScore < 0.7) {
      const qaAdd = async () => {
        const result = await axios.post(
          'http://140.136.202.125/api/Question',
          {
            questionQuestion: message.value,
            questionAnswer: qaAnswer,
          },
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        );
        console.log(result.data, localStorage.getItem('token'));
      };
      qaAdd();
    }
    message.value = '';
  }
};
</script>
<style scoped>
.chatroom-container {
  height: 100vh;
  width: 100vw;
  background-color: white;
}
.tabs-container {
  background-color: white;
  height: 5rem;
}
.tabs {
  display: flex;
  justify-content: center;
}
.chatroom {
  max-height: 70%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input-container {
  position: absolute;
  bottom: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.message {
  width: 50%;
}
.input {
  position: relative;
  height: 3rem;
  width: 50%;
  padding-right: 40px;
  border-radius: 10px;
  border: 1px solid gray;
}
.input:active {
  border-color: aqua !important; /* Change to whatever color you want */
}

.send {
  position: absolute;
  cursor: pointer;
  right: 26%;
  margin-top: 0.65rem;
  font-size: 25px;
  color: #808080;
}
.send:hover {
  color: #2976af;
}
</style>
