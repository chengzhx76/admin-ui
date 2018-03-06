<template>
  <div class="user">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-setting"></i>
        <span>个人信息</span>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form :model="userForm" status-icon :rules="userRules" ref="userForm" label-width="100px">
            <el-form-item label="账号" prop="username">
              <el-input type="text" v-model="userForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户姓名" prop="name" required>
              <el-input type="text" v-model="userForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobilePhone" required>
              <el-input v-model="userForm.mobilePhone"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-button type="text" @click="visible = true">修改密码</el-button>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" v-model="userForm.remarks"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="submitForm('userForm')">提交</el-button>
              <el-button @click="resetForm('userForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog title="修改密码" :visible.sync="visible">
      <el-row>
        <el-col :span="20">
          <el-form :model="modifyPasswdForm" status-icon :rules="modifyPasswdRules" ref="modifyPasswdForm" label-width="100px">
            <el-form-item label="旧密码" prop="oldPasswd" required>
              <el-input type="password" v-model="modifyPasswdForm.oldPasswd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPasswd" required>
              <el-input type="password" v-model="modifyPasswdForm.newPasswd" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPasswd" required>
              <el-input type="password" v-model="modifyPasswdForm.checkPasswd" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelModPasswd()">取 消</el-button>
        <el-button type="primary" :loading="modPasswdLoading" @click="modPasswd()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  import { mapGetters } from 'vuex'
  import { isvalidMobilePhone } from '@/utils/validate'

  export default {
    name: 'Personal',
    data() {
      const validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名字不能为空'));
        }
        if (value.length > 24) {
          return callback(new Error('名字长度不能超过24位'));
        }
        callback();
      };

      const validateMobilePhone = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入手机号'));
        } else {
          if (!isvalidMobilePhone(value)) {
            return callback(new Error('请输入正确的手机号'));
          }
          callback();
        }
      };

      const validatePasswd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length < 6) {
            return callback(new Error('密码至少为6位'));
          }
          callback();
        }
      };

      const validateNewPasswd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.modifyPasswdForm.checkPasswd !== '') {
            this.$refs.modifyPasswdForm.validateField('checkPasswd');
          }
          callback();
        }
      };

      const validateCheckPasswd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.modifyPasswdForm.newPasswd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
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
        },
        loading: false,
        modPasswdLoading: false,
        visible: false,
        modifyPasswdForm: {
          oldPasswd: '',
          newPasswd: '',
          checkPasswd: ''
        },
        modifyPasswdRules: {
          oldPasswd: [
            { validator: validatePasswd, trigger: 'blur' }
          ],
          newPasswd: [
            { validator: validateNewPasswd, trigger: 'blur' }
          ],
          checkPasswd: [
            { validator: validateCheckPasswd, trigger: 'blur' }
          ]
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('UpdateUser', this.userForm).then(() => {
              this.loading = false
              this.$message.success('更新用户信息成功')
              this.$store.dispatch('delVisitedViews', this.$route)
              setTimeout(() => {
                this.$router.push({ path: '/' })
              }, 800)
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      cancelModPasswd() {
        this.resetForm('modifyPasswdForm')
        this.visible = false
      },
      modPasswd() {
        this.$refs['modifyPasswdForm'].validate((valid) => {
          if (valid) {
            this.modPasswdLoading = true
            this.$store.dispatch('UpdatePasswd', this.modifyPasswdForm.newPasswd).then(() => {
              this.modPasswdLoading = false
              this.resetForm('modifyPasswdForm')
              this.$message.success('更新用户密码成功，请重新登录')
              setTimeout(() => {
                this.visible = false
                this.$store.dispatch('FedLogOut').then(() => {
                  this.$router.push({ path: '/' })
                })
              }, 800)
            }).catch(() => {
              this.modPasswdLoading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        });
      }


    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
