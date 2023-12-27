<template>
  <el-table-column
    :key="columnData.key"
    :label="columnData.name"
    :prop="columnData.key"
    min-width="120"
    header-align="center"
    :fixed="['pt', 'w_pt'].includes(columnData.key)"
    :align="['pt', 'w_pt'].includes(columnData.key) ? 'center' : 'right'"
    :class-name="columnData.labelClass"
  >
    <template v-if="columnData.child && columnData.child.length != 0">
      <MultTableColumn
        v-for="(item, index) in columnData.child"
        :key="index + item.key"
        :columnData="item"
      ></MultTableColumn>
    </template>
  </el-table-column>
</template>
<script>
export default {
  name: "MultTableColumn",
  props: {
    columnData: {
      required: true,
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
