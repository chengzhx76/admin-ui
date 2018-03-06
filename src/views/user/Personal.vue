<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <i class="el-icon-setting"></i>
      <span>个人信息</span>
    </div>
    <div class="user">
      <el-row>
        <el-col :span="12">
          <el-form :model="userForm" status-icon :rules="userRules" ref="userForm" label-width="100px">
            <el-form-item label="账号" prop="username" >
              <el-input type="text" v-model="userForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="name" required>
              <el-input type="text" v-model="userForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobilePhone" required>
              <el-input v-model="userForm.mobilePhone"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" v-model="userForm.remarks"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
              <el-button @click="resetForm('userForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: 'Personal',
    data() {
      var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名字不能为空'));
        }
        if (value.length > 24) {
          return callback(new Error('名字长度不能超过6位'));
        }
        callback();
    };
      const mobilePhoneRex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      var validateMobilePhone = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入手机号'));
        } else {
          if (!mobilePhoneRex.test(value)) {
            return callback(new Error('请输入正确的手机号'));
          }
          callback();
        }
      };
      return {
        userForm: {
          username: this.$store.getters.username,
          name: this.$store.getters.name,
          mobilePhone: this.$store.getters.mobilePhone,
          remarks: this.$store.getters.remarks,
        },
        userRules: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ],
          mobilePhone: [
            { validator: validateMobilePhone, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            this.$message.error('请正确填写用户信息')
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
