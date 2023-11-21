<template>
  <div class="q-pa-md" align="center">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-tabs v-model="tab" indicator-color="primary" class="text-teal">
        <q-tab name="chatroom" icon="chat" />
        <q-tab name="mails" icon="mail"
          ><q-badge color="red" floating>{{ QAs.length }}</q-badge></q-tab
        >
      </q-tabs>
    </div>
  </div>
  <div v-if="tab == 'chatroom'">
    <div
      class="q-pa-md column col"
      v-for="(message, index) in messageList"
      :key="index"
    >
      <q-chat-message :text="[message.question]" sent />
      <q-chat-message :text="[message.answer]" style="max-width: 45%" />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form @submit="sendMessage" class="full-width q-ma-md"
          ><q-input rounded outlined bg-color="white" v-model="message">
            <q-btn round dense flat icon="send" type="submit" />
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </div>

  <q-list v-else class="q-pa-md column col">
    <div v-for="(QA, index) in QAs" :key="index">
      <q-item>
        <q-item-section>
          <q-item-label>{{ QA.Q }}</q-item-label>
          <q-item-label caption>{{ QA.A }}</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-item-label caption>{{ QA.time }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced inset />
    </div>
  </q-list>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const tab = ref('chatroom');
const QAs = ref([
  { Q: '聖言樓代號', A: 'SF', time: '5 min ago' },
  { Q: '利瑪竇代號', A: 'LM', time: '5 hour ago' },
  { Q: '輔大校長？', A: '藍易振', time: '6 hour ago' },
]);
const messageList: any = ref([]);
const message = ref('');
const sendMessage = async () => {
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
  const result = await res.json();
  const answer = result.answers[0].answer;

  messageList.value.push({
    question: message.value,
    answer,
  });
  message.value = '';
};
</script>
