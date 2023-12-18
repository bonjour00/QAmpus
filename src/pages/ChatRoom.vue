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
        <p>我：{{ message.question }}</p>
        <p>回答：{{ message.answer }}</p>
      </div>

      <div class="input-container">
        <input
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

const tab = ref('chatroom');
const QAs = ref([
  { Q: '聖言樓代號', A: 'SF', time: '5 min ago' },
  { Q: '利瑪竇代號', A: 'LM', time: '5 hour ago' },
  { Q: '輔大校長？', A: '藍易振', time: '6 hour ago' },
]);
const messageList = ref<Array<{ question: string; answer: any }>>([]);

const message = ref('');

const setTab = (newTab: string) => {
  tab.value = newTab;
};

const sendMessage = async () => {
  if (message.value.trim() !== '') {
    const { answer } = await fetchAnswer(message.value);
    messageList.value.push({
      question: message.value,
      answer: answer,
    });

    message.value = '';
  }
};

const fetchAnswer = async (question: string): Promise<{ answer: any }> => {
  try {
    const response = await fetch(
      `https://fju-test3.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=shelly-search-test&api-version=2021-10-01`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'fde6fc08d2e14a71b844af69aeea65f7',
        },
        body: JSON.stringify({
          question: question,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const answer = data.answers[0]?.answer;

      return { answer };
    } else {
      console.error('Failed to fetch answer.');
      return { answer: 'Error fetching answer.' };
    }
  } catch (error) {
    console.error('Error:', error);
    return { answer: 'Error fetching answer.' };
  }
};
</script>
