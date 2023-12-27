export function generateHtml(bodyHtml, fileName = "运营日报") {
  const htmlStr = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
    <style>
      .myPage {
        padding: 20px
      }

      .el-table--border,
      .el-table--group {
        border: 1px solid #EBEEF5;
      }

      .el-table {
        position: relative;
        font-size: 14px;
        color: #606266;
      }

      .el-table__body-wrapper,
      .el-table {
        height: auto !important;
      }

      .el-table--small {
        font-size: 12px;
      }

      .el-table__body,
      .el-table__footer,
      .el-table__header {
        table-layout: fixed;
        border-collapse: separate;
      }

      .el-table thead {
        display: table-header-group;
        vertical-align: middle;
        border-color: inherit;
        color: #909399;
        font-weight: 500;
      }

      .el-table tr {
        background-color: #FFF;
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
      }

      .el-table td.el-table__cell,
      .el-table th.el-table__cell.is-leaf {
        border-bottom: 1px solid #EBEEF5;
      }

      .el-table--border th.el-table__cell,
      .el-table__fixed-right-patch {
        border-bottom: 1px solid #EBEEF5;
      }

      .el-table--border .el-table__cell,
      .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
        border-right: 1px solid #EBEEF5;
      }

      .el-table .el-table__cell {
        padding: 12px 0;
        min-width: 0;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        text-align: left;
      }

      .el-table .el-table__cell.is-center {
        text-align: center;
      }

      .el-table .el-table__cell.is-right {
        text-align: right;
      }

      .el-table--small .el-table__cell {
        padding: 8px 0;
      }

      .el-table td.el-table__cell div {
        box-sizing: border-box;
      }

      .el-table .cell {
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        word-break: break-all;
        line-height: 23px;
        padding-left: 10px;
        padding-right: 10px;
      }

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
  </style>
  </head>
  
  <body>
  <div class="myPage">
   ${bodyHtml}
   </div>
  </body>
  
</html>`;
  return htmlStr;
}
