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
import './chatroom.css';

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
              Authorization:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MTA0MDIxNjEiLCJuYW1lIjoiTWVsb2R5IiwiZW1haWwiOiJ5OTIwNTMxQGdtYWlsLmNvbSIsImp0aSI6ImRkMTc2ODFhLTcxZmEtNGQ0My1hMmU1LWNiNzU1ZmMzOTg4MyIsInJvbGUiOiJzdHJpbmciLCJuYmYiOjE3MTAzMzc2ODcsImV4cCI6MTcxMDMzOTQ4NywiaWF0IjoxNzEwMzM3Njg3LCJpc3MiOiJKd3RBdXRoRGVtbyJ9.7se-NeJRwUHYawol8m1ESzgCUrW1D5t6udf-n-lxe3I',
            },
          }
        );
        console.log(result.data);
      };
      qaAdd();
    }
    message.value = '';
  }
};
</script>
