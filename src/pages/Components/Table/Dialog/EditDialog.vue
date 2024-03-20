<template>
  <q-dialog
    :modelValue="open"
    @update:model-value="closePopup"
    v-if="currentRow"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none" v-if="where">
        <div class="text-h6"><b>問答</b></div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closePopup" />
      </q-card-section>
      <div style="max-height: 50vh" class="scroll">
        <q-card-section v-if="where">
          <q-input
            :model-value="currentRow.questionQuestion"
            @update:model-value="
              (value) =>
                (currentRow = { ...currentRow, questionQuestion: value })
            "
            for="qedit"
            dense
            type="textarea"
            autogrow
            :readonly="readonly"
            ><template v-slot:prepend>
              <span class="text-subtitle1">Q:&nbsp;</span>
            </template>
          </q-input>
        </q-card-section>

        <q-card-section v-if="where">
          <q-input
            :model-value="currentRow.questionAnswer"
            @update:model-value="
              (value) => (currentRow = { ...currentRow, questionAnswer: value })
            "
            dense
            type="textarea"
            autogrow
            :readonly="readonly"
            ><template v-slot:prepend>
              <span class="text-subtitle1">A:&nbsp;</span>
            </template>
          </q-input>
        </q-card-section>
      </div>
      <q-card-actions>
        <OptionSelect
          v-model:currentOption="currentOption"
          :options="options"
          :title="title"
        />
        <q-btn flat label="取消" color="primary" @click="closePopup" />
        <q-btn
          id="editOK"
          flat
          :label="btnName ? btnName : '修改'"
          color="primary"
          @click="editSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch, Ref, computed } from 'vue';
import { QA, Option } from '../data ';
import { successs } from '../ActionBtn/AnimateAction';
import OptionSelect from '../Toolbar/OptionSelect.vue';
import axios from 'axios';

const props = defineProps<{
  open: boolean;
  selectRow: QA | never[];
  currentOffice: Option;
  options: Option[];
  title: string;
  btnName?: string;
  readonly?: boolean;
  where?: boolean;
}>();

const emit = defineEmits(['update:open', 'updated']);
const currentRow: Ref<any> = ref(props.selectRow); //暫時不管
const currentOption = ref(props.currentOffice);
watch(
  () => props.selectRow,
  () => {
    return (currentRow.value = props.selectRow);
  }
);
watch(
  () => props.currentOffice,
  () => (currentOption.value = props.currentOffice)
);
const closePopup = () => {
  emit('update:open', false);
  currentRow.value = props.selectRow;
  currentOption.value = props.currentOffice;
};

const editSubmit = async () => {
  // console.log({
  //   ...currentRow.value,
  //   officeId: currentOption.value.value,
  // });
  try {
    const result = await axios.post(
      `http://140.136.202.125/api/AssignedOffice
`,
      {
        qaId: currentRow.value.questionId,
        officeId: currentOption.value.value,
      }
    );
    console.log(result);
    successs('修改成功');
  } catch (e: any) {
    console.log(e, 'error');
  }
  emit('update:open', false);
  emit('updated');
  closePopup();
};
</script>
