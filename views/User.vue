<template>
    <div class="manage">
        <el-dialog
            :title="operateType === 'add' ? '新增用户' : '编辑用户'"
            :visible.sync="isShow"
        >
        <CommonForm 
            :formLabel="operateFormLabel"
            :form="operateForm"
            :inline="true"
            ref="form"
         />
         <div class="dialog footer" slot="footer">
             <el-button @click="isShow=false">取消</el-button>
             <el-button type="primary" @click="confirm">确定</el-button>
         </div>
         </el-dialog>
         <div class="manage-header">
             <el-button type="primary" @click="addUser">+ 新增</el-button>
             <CommonForm 
                :formLabel="FormLabel"
                :form="searchForm"
                :inline="true"
                ref="form"
         />
         </div>
    </div>
</template>
<script>
import CommonForm from "../../src/components/CommonForm";
export default {
  name: "User",
  components: {
    CommonForm,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {},
  },
  addUser() {},
};
</script>