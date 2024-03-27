<template>
  <q-dialog
    :modelValue="open"
    @update:model-value="closePopup"
    v-if="selectRow"
  >
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6"><b>問答</b></div>
        <q-space />
        <q-btn icon="close" flat round dense @click="closePopup" />
      </q-card-section>
      <div style="max-height: 50vh" class="scroll">
        <q-card-section>
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

        <q-card-section>
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
      <q-card-section v-if="isAssigner" style="max-height: 20vh" class="scroll">
        <q-stepper
          color="primary"
          animated
          inactive-color="primary"
          class="no-shadow"
          v-model="stepper"
        >
          <q-step
            v-for="(x, index) in officeRecord"
            :name="index"
            :title="x.officeId"
            icon="error"
            :key="index"
          />
        </q-stepper>
      </q-card-section>
      <q-card-actions align="right">
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
import { QA, Option, initialOffice } from '../data ';
import { successs } from '../ActionBtn/AnimateAction';
import OptionSelect from '../Toolbar/OptionSelect.vue';
import axios from 'axios';

const props = defineProps<{
  open: boolean;
  selectRow: QA | any;
  options: Option[];
  title: string;
  btnName?: string;
  readonly?: boolean;
  isAssigner?: boolean;
  officeRecord?: any;
}>();

const emit = defineEmits(['update:open', 'updated']);
const stepper = ref(1);
const currentRow: Ref<any> = ref(props.selectRow); //暫時不管
const currentOption = ref(initialOffice);
watch(
  () => props.selectRow,
  () => {
    currentRow.value = props.selectRow;
    currentOption.value = {
      label: props.selectRow.officeName,
      value: props.selectRow.officeId,
    };
  }
);

const closePopup = () => {
  emit('update:open', false);
  currentRow.value = props.selectRow;
  currentOption.value = {
    label: props.selectRow.officeName,
    value: props.selectRow.officeId,
  };
};

const editSubmit = async () => {
  try {
    const result = await axios.post(
      `${process.env.API_URL}/api/AssignedOffice
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
<style scoped>
.q-stepper__content,
.q-panel-parent {
  padding: 0px;
  display: none;
}
</style>
