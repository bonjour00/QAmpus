<template>
  <div class="chatroom-container">
    <div class="tabs-container">
      <button @click="setTab('chatroom')">Chatroom</button>
      <button @click="setTab('mails')">
        Mails <span class="badge" v-if="tab === 'mails'">{{ QAs.length }}</span>
      </button>
    </div>

    <div v-if="tab === 'chatroom'" class="chatroom">
      <div v-for="(message, index) in messageList" :key="index" class="message">
        <p>我：{{ message.qaQuestion }}</p>
        <p>回答：{{ message.qaAnswer }}</p>
        <p v-if="message.source">來源:{{ message.source }}</p>
        <p v-if="message.source">來源訓練句:{{ message.sourcePhrase }}</p>
        <p>信心度:{{ message.confidenceScore }}</p>
      </div>

      <div class="input-container">
        <input
          id="messageQ"
          v-model="message"
          placeholder="輸入訊息"
          @keydown.enter.prevent="sendMessage"
        />
        <button @click="sendMessage">傳送</button>
      </div>
    </div>

    <div v-else class="q-list">
      <div v-for="(QA, index) in QAs" :key="index" class="QA-item">
        <p>{{ QA.Q }}</p>
        <p>{{ QA.A }}</p>
        <p>{{ QA.time }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
const tab = ref('chatroom');
const QAs = ref([
  { Q: '聖言樓代號', A: 'SF', time: '5 min ago' },
  { Q: '利瑪竇代號', A: 'LM', time: '5 hour ago' },
  { Q: '輔大校長？', A: '藍易振', time: '6 hour ago' },
]);
const messageList: any = ref([]);

const message = ref('');

const setTab = (newTab: string) => {
  tab.value = newTab;
};

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
    const qaAnswer = result.answers[0].answer;
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
      // const qaAdd = async () => {
      //   const result = await axios.post('http://140.136.202.125/api/Qna', {
      //     qaQuestion: message.value,
      //     qaAnswer,
      //     qaCreaterId: '001',
      //     officeId: 0,
      //   });
      //   console.log('start');
      //   console.log(result, 'add');
      // };
      // qaAdd();
      console.log({
        qaQuestion: message.value,
        qaAnswer,
        qaCreaterId: '001',
        officeId: 1,
      });
    }
    message.value = '';
  }
};

// const fetchAnswer = async (question: string): Promise<{ answer: any }> => {
//   try {
//     const response = await fetch(
//       `https://fju-test3.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=shelly-search-test&api-version=2021-10-01`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Ocp-Apim-Subscription-Key': 'fde6fc08d2e14a71b844af69aeea65f7',
//         },
//         body: JSON.stringify({
//           question: question,
//         }),
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       const answer = data.answers[0]?.answer;

//       return { answer };
//     } else {
//       console.error('Failed to fetch answer.');
//       return { answer: 'Error fetching answer.' };
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return { answer: 'Error fetching answer.' };
//   }
// };
</script>
