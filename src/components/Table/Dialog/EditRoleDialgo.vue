<!-- <template>
  <q-dialog :modelValue="open" @update:model-value="closePopup">
    <q-card>
      <q-card-section>
        <OptionSelect
          v-model="currentRole"
          :options="roleOptions"
          :title="title"
      /></q-card-section>
      <q-card-actions align="right">
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
}>();

const currentRole = ref({label:'分配者'})

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
</style> -->
