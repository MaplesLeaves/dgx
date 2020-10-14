<!--  -->
<template>
  <span>
    <span v-if="conditionData.data.length > 1">
      {{ span.condition.code }}
    </span>
    <span
      v-for="(condition, ic) in conditionData.data"
      :key="ic + 'ic'"
      style="white-space: nowrap"
    >
      <span v-for="(expression, ie) in condition.expression" :key="ie + 'ie'">
        <span class="">
          <span v-if="expression.type === 'op'">
            {{ expression.name }}
          </span>
          <span v-if="expression.type === 'input'">
            {{ expression.code }}
          </span>
          <span v-if="expression.type === 'const'">
            {{ expression.name }}
          </span>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    conditionData: {
      expression: Object,
      required: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  created() {
  },
  mounted() {},
  methods: {},
};
</script>
<style lang='' scoped>
</style>