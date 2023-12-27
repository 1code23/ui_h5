<template>
  <div class="myMultTable">
    <el-table
      max-height="800"
      :data="tableData"
      style="width: 100%"
      :cell-class-name="cellClassName"
      :row-class-name="rowClassName"
      id="myMultTableId"
    >
      <slot></slot>
      <template v-if="columns.length != 0">
        <MultTableColumn
          v-for="(item, index) in tableColumns"
          :key="index"
          :columnData="item"
        ></MultTableColumn>
      </template>
    </el-table>
  </div>
</template>
<script>
import XLSX from "xlsx-js-style";
import MultTableColumn from "./MultTableColumn";
export default {
  components: { MultTableColumn },
  name: "MultTable",
  props: {
    // 表格的数据
    tableData: {
      required: true,
      type: Array,
      default() {
        return [];
      },
    },
    // 表格的列表，多级表格
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      letterList: [], // 26个英文字母列表
    };
  },
  created() {
    this.getLetterList();
  },
  computed: {
    tableColumns() {
      return this.filterColumns(this.columns);
    },
  },
  methods: {
    // 表头添加颜色类
    filterColumns(list) {
      const _list = JSON.parse(JSON.stringify(list));
      const classList = ["originBg", "greenBg", "blueBg"];
      let colorIndex = 0;
      _list.forEach((item, index) => {
        if (item.child && item.child.length !== 0) {
          const _colorIndex = colorIndex % 3; // 取余
          item.labelClass = classList[_colorIndex];
          colorIndex++;
          // 给所有孩子节点添加更浅的同级色
          this.addChildLabelClass(item, item.labelClass + "Light");
        } else {
          // 给只有一级标题的表头添加统一的背景色
          item.labelClass = "originBgLight";
        }
      });
      return _list;
    },
    // 添加表头孩子元素类名的递归函数
    addChildLabelClass(data, labelClass) {
      data.child.forEach((item) => {
        item.labelClass = labelClass;
        if (item.child && item.child.length !== 0) {
          this.addChildLabelClass(item, labelClass);
        }
      });
    },
    // 单元格类名
    cellClassName({ row, column }) {
      if (row.rowDataType === "specialNumber") {
        // 需标识正负值
        let key = column.property;
        if (parseFloat(row[key]) < 0) {
          return "cellGreenColor";
        }
      }
    },
    // 行类名
    rowClassName(rowData) {
      const rowClass = rowData.row.rowClass;
      if (rowClass) {
        return rowClass;
      }
    },
    // 获取26个英文字母列表
    getLetterList() {
      const letterList = [];
      for (let i = 0; i < 26; i++) {
        const char = String.fromCharCode(65 + i);
        letterList.push(char);
      }
      return letterList;
    },
    // 获取导出的excel单元格的样式
    getExcelCellStyle(merges) {
      const resObj = {};
      const styleList = ["ed7d31", "00b050", "0070c0"]; //橙、绿、蓝
      const lightStyleList = ["f8cbad", "e2efc6", "ddebf7"]; //橙、绿、蓝
      const letterList = this.getLetterList(); // 26个英文字母列表
      let colorIndex = 0;
      merges.forEach((item) => {
        const _start = item.s;
        const _end = item.e;
        // 没有子列的表头
        if (_start.c == _end.c && _start.r == 0) {
          const fgColor = lightStyleList[0];
          setCellColor(_start.r, _start.c, fgColor);
        }
        // 合并的是列
        if (_start.r == _end.r) {
          const _colorIndex = colorIndex % 3; // 取余
          if (_start.r == 0) {
            // 第一行改变时才更换颜色组
            colorIndex++;
          }
          const propColor = styleList[_colorIndex];
          let lightColor = lightStyleList[_colorIndex];
          // 第一行着色
          if (_start.r == 0) {
            setCellColor(_start.r, _start.c, propColor);
          } else {
            // 非第一行的合并单元格，取出他本身的颜色
            lightColor = getCellColor(_start.r, _start.c);
          }
          // 下一行的所有单元格着色
          for (let i = _start.c; i <= _end.c; i++) {
            setCellColor(_start.r + 1, i, lightColor);
          }
        }
      });
      // 根据行列给单元格设置样式，row，col从0开始
      function setCellColor(row, col, fgColor) {
        const key = getCellKey(row, col);
        resObj[key] = {
          fill: {
            fgColor: { rgb: fgColor },
          },
          alignment: {
            vertical: "center",
            horizontal: "center",
          },
        };
      }
      // 根据行列获取当前单元格的颜色
      function getCellColor(row, col) {
        const key = getCellKey(row, col);
        let color = lightStyleList[0];
        if (resObj[key]) {
          color = resObj[key].fill.fgColor.rgb;
        }
        return color;
      }
      //根据行列获取出单元的标识；row，col从0开始
      function getCellKey(row, col) {
        let _col = letterList[col];
        if (col >= 26) {
          let a = Math.floor((col + 1) / 26); // 商
          let b = (col + 1) % 26; // 余数
          if (b == 0) {
            // 刚好整除时，商减一，余数设置为26
            a -= 1;
            b = 26;
          }
          _col = `${letterList[a - 1]}${letterList[b - 1]}`; // 超过26列时，由列由两个字母组成
        }
        return `${_col}${row + 1}`;
      }
      return resObj;
    },
    // 暴露给父组件调用下载当前表格
    downloadTable(fileName = "表格") {
      const table_elt = document.getElementById("myMultTableId");
      // 表格里存在固定列，导出的excel表格会重复两边
      const table_fixed = table_elt.querySelector(".el-table__fixed");
      let workbook;
      if (table_fixed) {
        // 存在固定列时，将表格节点复制一份后删除固定表格
        const tmp_table_elt = table_elt.cloneNode(true);
        tmp_table_elt.removeChild(
          tmp_table_elt.querySelector(".el-table__fixed")
        );
        workbook = XLSX.utils.table_to_book(tmp_table_elt);
      } else {
        workbook = XLSX.utils.table_to_book(table_elt);
      }
      const ws = workbook.Sheets["Sheet1"];
      const cellStyleObj = this.getExcelCellStyle(ws["!merges"]);
      // 循环遍历单元格
      Object.keys(ws).forEach((key) => {
        // 取出有的样式的单元格，并添加到工作簿的单元格中
        if (cellStyleObj[key]) {
          ws[key].s = cellStyleObj[key];
        }
      });
      const nowDate = new Date().toLocaleDateString().split("/").join("-");
      const _fileName = fileName + nowDate;
      XLSX.writeFile(workbook, `${_fileName}.xlsx`);
    },
    // 暴露给父组件，获取渲染之后的表格html
    getTableHtml() {
      return document.getElementById("myMultTableId").outerHTML;
    },
  },
};
</script>
<style lang="less">
.myMultTable {
  .el-table__row.rowGreyBg {
    background: #ededed;
    font-weight: 700;
  }
  .el-table__row.rowRedColor {
    color: red;
  }
  .el-table__cell.cellGreenColor {
    color: #00b050;
  }

  th div {
    font-weight: 700;
  }
  th.originBg {
    background: #ed7d31 !important;
    color: #fff;
  }
  th.originBgLight {
    background: #f8cbad !important;
    color: #000;
  }
  th.greenBg {
    background: #00b050 !important;
    color: #fff;
  }
  th.greenBgLight {
    background: #e2efc6 !important;
    color: #000;
  }
  th.blueBg {
    background: #0070c0 !important;
    color: #fff;
  }
  th.blueBgLight {
    background: #ddebf7 !important;
    color: #000;
  }
}
</style>
