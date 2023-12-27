<template>
  <div>
    <!-- <Header></Header> -->
    <div class="mainBox">
      <div class="content">
        <span class="fw4 color3 joinName">申请加入耀火计划</span>
      </div>
      <div class="remindBox fw4 disfr">
          <img src="../assets/img/Premind2x.png" alt="" class="remindImg">
          <div>郑重邀请您加入耀火计划，请您认真填写此申请表。</div>
          <!-- <div>郑重邀请您加入耀火计划，请您认真填写此申请表；耀火计划报名及更多问题请参考“<span class="colorCursor" @click="goUrl('https://element.eleme.cn/')">耀火计划操作指导</span>”,<br>温馨提示：6个月内被工信部通报过的应用不能入选耀火计划</div> -->
      </div>
      <div class="formData_content">
        <div class="formData">
          <el-form
            label-position="top"
            :model="formLabelAlign"
            ref="ruleFormRef"
            :rules="rules"
          >
            <el-form-item label="姓名" prop="name">
              <el-input maxlength="20" show-word-limit v-model="formLabelAlign.name"  placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-form-item prop="phone" style="width: 100%;">
              <el-input v-model="formLabelAlign.phone" placeholder="请输入联系电话"/>
              </el-form-item>
              <el-form-item prop="code">
              <div class="disfr jsb ac " style="width: 100%;margin: 0.35rem 0 0 0;">
                <el-input v-model="formLabelAlign.code" placeholder="请输入验证码" style="margin-right: 0.24rem;"/>
                <el-button class="getCodeBtn disfr ac jc fw4 color3" @click="getCodeBtn"  v-if="countdown === 0">发送验证码</el-button>
                <el-button class="getCodeBtn disfr ac jc fw4 color3" v-else disabled>{{ countdown }}秒后获取</el-button>
              </div>
              </el-form-item>
            </el-form-item>
            <el-form-item label="联系邮箱" prop="email">
              <el-input placeholder="请输入联系邮箱" v-model="formLabelAlign.email" />
            </el-form-item>
            <el-form-item label="公司名称" prop="company_name">
              <el-input minlength="2" maxlength="50" show-word-limit placeholder="请输入公司名称" v-model="formLabelAlign.company_name" />
            </el-form-item>
            <el-form-item label="申请加入应用/游戏名称" prop="app_name">
              <el-input maxlength="30" show-word-limit placeholder="请输入应用/游戏名称" v-model="formLabelAlign.app_name" />
            </el-form-item>
          </el-form>
        </div>
        <div class="textBox fw4 color3">
          <span>隐私声明</span>
          <div class="textBoxContent">本次活动由上海卓悠网络科技有限公司为您提供服务，我们将采取安全保护措施保护您的个人数据，本次活动我们将收集您的姓名、联系电话、联系邮箱、公司名称，此收集信息仅为开发者申请加入耀火计划评估使用。</div>
          <!-- <div class="disfr ac">
            <el-checkbox v-model="checked" label="" size="large" style="margin-right: 0.1rem;"/>
            我已阅读“<span class="colorCursor" @click="goUrl('https://www.baidu.com/')">关于开发者联盟与隐私声明</span>”
          </div> -->
        </div>
        <div class="footBtn disfr ac jc">
          <div class="btn disfr ac jc fw4 color3" @click="goback">取消</div>
          <div class="btn disfr ac jc fw4 color3 Submit" @click="submit">立即报名</div>
        </div>
      </div>
    </div>
    <el-dialog v-model="getVerifyDialog" title="验证码" width="90%" center>
    <div class="disfr jc">
      <el-input  placeholder="请输入验证码" v-model="verify_code" style="width: 50%;"/> <img :src="verifyUrl" alt="" class="verifyImg" @click="getVerifyUrl">
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="getVerifyDialog = false">取消</el-button>
        <el-button type="primary" @click="saveVerifyBtn">确认</el-button>
      </span>
    </template>
    </el-dialog>
  </div>
</template>

<script>
// import "@/style/common.css"
import Header from "@/components/HeaderPhone.vue";

export default {
  name: 'Join',
  components: {Header},
  data() {
    const checkSTR = (rule, value, callback) => {
      const patt = /^[\u4e00-\u9fa5]+$/;
      if (value && !patt.test(value)) {
        return callback(new Error("只能输入汉字，不可输入特殊字符"));
      } else {
        callback();
      }
    };
    const checkName = (rule, value, callback) => {
      const patt = /^[\u4e00-\u9fa5a-zA-Z]+$/;
      if (value && !patt.test(value)) {
        return callback(new Error("只能输入汉字和英文，不可输入其他特殊字符"));
      } else {
        callback();
      }
    };
			return {
        // checked:false,
        getVerifyDialog:false,
        verify_code:'',
        verifyUrl:'/index.php/YaohuoPlan/verify',
        countdown: 0,
        formLabelAlign:{
          username:'',
          phone:'',
          code:'',
          email:'',
          company_name:'',
          app_name:'',
        },
        rules:{
          username: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { validator: checkName },
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入联系邮箱', trigger: 'blur' },
            { validator: devutil.checkEmail, trigger: "blur" },
          ],
          company_name: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
            { validator: checkSTR },
          ],
          app_name: [
            { required: true, message: '请输入应用/游戏名称', trigger: 'blur' },
            { validator: checkSTR },
          ]
        }
			}
	},

  created () {
  
  },
  // 定义一个方法
  methods: {
    getCodeBtn(){
      if (!devutil.checkPhoneFun(this.formLabelAlign.phone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      this.getVerifyUrl()
      this.getVerifyDialog=true
      this.verify_code=''
      // this.countdown = 60;
      // this.settime();
    },
    getVerifyUrl(){
      this.verifyUrl = "/api/YaohuoPlan/verify?" + new Date().getTime();
    },
    settime(val) {
      if (this.countdown == 0) {
        this.countdown = 0;
      } else {
        this.countdown--;
        setTimeout(() => {
          this.settime();
        }, 1000);
      }
    },
    async saveVerifyBtn(){
      if(!this.verify_code){
        this.$message.error("请输入验证码");
        return
      }
      let resCode = await Developer.api.sendYaohuoPlanCode({
        phone: this.formLabelAlign.phone,
        verify_code:this.verify_code
      });
      if (resCode.data&&resCode.data.code==1) {
        this.verify_code=''
      this.countdown = 60;
      this.settime();
        this.$message.success("验证码获取成功");
        this.getVerifyDialog=false
      }else{
        this.$message.error(resCode.data.msg);
      }
    },
    submit(){
      // if(!this.checked){
      //   this.$message.error("请先阅读关于开发者联盟与隐私声明");
      //   return
      // }
      this.$refs.ruleFormRef.validate(async (valid, fields) => {
        let { phone } = this.formLabelAlign;
        if (valid) {
          if (!devutil.checkPhoneFun(phone)) {
            this.$message.error("请输入正确的手机号");
            return;
          }
          let params = this.formLabelAlign;
          let res = await Developer.api.submitData(params);
          if (res.data&&res.data.code === 1) {
            this.$message.success("报名成功");
            this.$router.push("/home");
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    goback(){
      this.$router.go(-1);
    },
    goUrl(url){
      // window.open(url,'_blank')
    }
  }
}

</script>

<style scoped lang="scss">
.mainBox{
  // background: #fafafa;
  padding: 0.52rem 0.4rem 1.92rem;
  width: 100%;
  box-sizing: border-box;
}
.content{
  font-size: 0.48rem;
  background: #fff;
}
.remindBox{
width: 6.4rem;
background: rgba(163,176,217,0.2);
border-radius: 0.08rem;
border: 0.02rem solid #A3B0D9;
padding: 0.24rem;
margin: 0.52rem 0 0.56rem;
box-sizing: border-box;
font-size: 0.28rem;
.remindImg{
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.16rem;
  box-sizing: border-box;
  span{
    color: #84acff;
  }
}
}
.formData_content{
  width:6.4rem;
  background: #fff;
  .formData{
    width: 6.4rem;
    .getCodeBtn{
      font-size: 0.28rem;
      width: 2.8rem;
      height: 0.577rem;
      background: #FFFFFF;
      border: 0.02rem solid #333;
      border-radius: 0.08rem;
      box-sizing: border-box;
    }
  }
  .textBox{
    width: 6.4rem;
    box-sizing: border-box;
    font-size: 0.28rem;
    margin-top: 0.8rem;
    .textBoxContent{
      margin: 0.3rem 0 0.48rem;
    }
  }
  .footBtn{
    margin: 0.8rem 0 0 0;
    .btn{
      width: 2.4rem;
      height: 0.96rem;
      border-radius: 0.5rem;
      border: 0.02rem solid #333333;
      font-size: 0.28rem;
      box-sizing: border-box;
    }
    .Submit{
      color: #fff;
      background: #333;
      margin: 0 0 0 0.32rem;
    }
  }
}
.colorCursor{
  color: #84acff
}
.verifyImg{
  width: 80px;
  height: 30px;
  margin-left: 20px;
}
/deep/ .el-dialog{
  border-radius: 0.25rem;
}
</style>
