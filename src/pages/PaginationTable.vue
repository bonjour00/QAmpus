<!-- <template>
  <q-pagination
    :modelValue="paginations.page"
    @update:model-value="(value) => $emit('update:paginations', value)"
    :max="pagesNumber"
    max-pages="6"
    boundary-numbers
    direction-links
    active-color="accent"
    unelevated
    color="secondary"
    text-color="black"
    active-text-color="white"
  />
  {{ paginations }}
</template>

<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
//pagination
// const pagination = ref({
//   sortBy: 'desc',
//   descending: false,
//   page: 1,
//   rowsPerPage: 3,
// });
interface Pagination {
  sortBy: string;
  descending: boolean;
  page: number;
  rowsPerPage: number;
}
const props = defineProps<{
  paginations: Pagination;
}>();
defineEmits(['update:paginations']);
const pagesNumber = computed(() =>
  Math.ceil(7 / props.paginations.rowsPerPage)
);
</script> -->
