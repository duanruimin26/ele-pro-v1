<template>
  <div>
    <el-card>
      <div slot="header">复杂表格</div>
      <div class="searchDiv">
        <el-input placeholder="请输入订单号" class="width1" v-model="sch_order" type="text"></el-input>
        <el-select placeholder="请选择状态" class="width1" v-model="sch_status" clearable>
          <el-option
            v-for="item in options"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          type="date"
          placeholder="选择日期"
          class="width1"
          v-model="sch_date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="searchTab">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addTab">添加</el-button>
      </div>

      <el-table :data="tableList" border stripe>
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{(currentPage - 1) * pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="order_no" label="订单号"></el-table-column>
        <el-table-column prop="time" label="下单时间"></el-table-column>
        <el-table-column prop="address" label="配送地址" width="280"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="name" label="配送员"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | tagClass">
              {{
              scope.row.status | statusText
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="medium" @click="editTable(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="warning"
              size="medium"
              @click="toConfirm(scope.row)"
              :disabled="scope.row.status === 1 ? false : true"
            >审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
        class="fyDiv"
      ></el-pagination>
    </el-card>

    <el-dialog title="修改订单" :visible.sync="diaIsShow" width="35%" center>
      <el-form label-width="100px" ref="diaForm" :rules="rules" :model="formData">
        <el-form-item label="订单号" prop="order">
          <el-input type="text" placeholder="请输入订单号" v-model="formData.order"></el-input>
        </el-form-item>
        <el-form-item label="订单时间" prop="dateTime">
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            v-model="formData.dateTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="配送地址" prop="address">
          <el-input type="text" placeholder="请输入配送地址" v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="text" placeholder="请输入联系电话" v-model="formData.phone"></el-input>
        </el-form-item>
        <el-form-item label="配送员" prop="name">
          <el-input type="text" placeholder="请输入姓名" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" v-model="formData.status">
            <el-option
              v-for="item in options"
              :label="item.label"
              :value="item.value"
              :key="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeTab('diaForm', editType)">确认</el-button>
          <el-button @click="diaIsShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getComplexList } from "@/api/table";
export default {
  name: "TableComplex",
  data() {
    return {
      sch_order: "",
      sch_status: null,
      sch_date: null,
      options: [
        { label: "待审核", value: 1 },
        { label: "配送中", value: 2 },
        { label: "已完成", value: 3 },
        { label: "已取消", value: 4 }
      ],
      sch_Arr: [],
      all_list: [],
      tableList: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 30, 40],
      rowIndex: 0, //编辑的是哪一行的数据
      diaIsShow: false,
      editType: "", //用来判断是增加还是编辑
      formData: {},
      rules: {
        order: [{ required: true, message: "请输入订单号", trigger: "blur" }],
        dateTime: [
          { required: true, message: "请输入日期时间", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入配送地址", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        name: [{ required: true, message: "请输入配送员", trigger: "blur" }],
        status: [
          { required: true, message: "请选择订单状态", trigger: "change" }
        ]
      }
    };
  },
  filters: {
    statusText(val) {
      if (val === undefined) return;
      if (val === 1) {
        return "待审核";
      } else if (val === 2) {
        return "配送中";
      } else if (val === 3) {
        return "已完成";
      } else {
        return "已取消";
      }
    },
    tagClass(val) {
      if (val === undefined) return;
      if (val === 1) {
        return "";
      } else if (val === 2) {
        return "warning";
      } else if (val === 3) {
        return "success";
      } else {
        return "danger";
      }
    }
  },
  mounted() {
    this.getData(this.currentPage, this.pageSize);
  },
  methods: {
    // 获取数据
    getData(page, pageSize) {
      getComplexList({ page: page, pageSize: pageSize }).then(res => {
        this.tableList = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData(this.currentPage, this.pageSize);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData(this.currentPage, this.pageSize);
    },

    // 搜索
    searchTab() {},
    // 添加
    addTab() {},
    changeTab(form, type) {
      // 验证表单
      this.$refs[form].validate(valid => {
        if (valid) {
          if (type === "update") {
            this.$notify({
              title: "成功",
              message: "订单已修改成功",
              type: "success"
            });
          } else {
          }
          this.diaIsShow = false;
        } else {
          return;
        }
      });
    },
    // 编辑
    editTable(index, row) {},
    // 审核
    toConfirm(row) {}
  }
};
</script>
<style lang="scss" scoped>
.searchDiv {
  margin-bottom: 20px;
  .el-button {
    padding: 11px 20px;
  }
}
.width1 {
  width: 180px;
  margin-right: 10px;
}
.fyDiv {
  float: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>