<template>
  <q-dialog :modelValue="open" @update:model-value="closePopup">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <q-input
          :model-value="selectRow.qaQuestion"
          @update:model-value="
            (value) =>
              $emit('update:selectRow', { ...selectRow, qaQuestion: value })
          "
          dense
          type="textarea"
          autogrow
          ><template v-slot:prepend>
            <span class="text-subtitle1">Q:&nbsp;</span>
          </template>
        </q-input>
        <q-space />
        <q-btn icon="close" flat round dense @click="closePopup" />
      </q-card-section>

      <q-card-section>
        <q-input
          :model-value="selectRow.qaAnswer"
          @update:model-value="
            (value) =>
              $emit('update:selectRow', { ...selectRow, qaAnswer: value })
          "
          dense
          type="textarea"
          autogrow
          ><template v-slot:prepend>
            <span class="text-subtitle1">A:&nbsp;</span>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions>
        <OptionSelect
          v-model:currentOption="currentOption"
          :options="options"
          :title="title"
        />
        <q-btn flat label="取消" color="primary" @click="closePopup" />
        <q-btn flat label="修改" color="primary" @click="editSubmit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { QA, Option, testInitialOffice } from '../data ';
import { successs } from '../ActionBtn/AnimateAction';
import OptionSelect from '../Toolbar/OptionSelect.vue';

const props = defineProps<{
  selectRow: QA;
  open: boolean;
  currentOffice: Option;
  options: Option[];
  title: string;
}>();

const emit = defineEmits([
  'update:open',
  'update:currentOffice',
  'update:selectRow',
]);
const currentOption = ref(props.currentOffice);
watch(currentOption, () => {
  emit('update:currentOffice', currentOption.value);
});
const closePopup = () => {
  emit('update:open', false);
  emit('update:currentOffice', testInitialOffice); //初始化(利用auth?)
  currentOption.value = testInitialOffice;
};

const editSubmit = () => {
  // emit('update:selectRow', {
  //   ...props.selectRow,
  //   officeId: props.currentOffice.value,
  // });
  console.log({
    ...props.selectRow,
    officeId: props.currentOffice.value,
  });

  successs('修改成功');
  closePopup();

  // const officeId = offices.filter(
  //   (x) => x.office_name === selectRow.value.office_name
  // )[0].office_id;
  // const editData = { ...selectRow.value, office_id: officeId };
};
</script>
