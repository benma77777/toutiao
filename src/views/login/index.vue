<template>
  <div class="login-container">
    <van-nav-bar title="标题" />
    <!-- from表单 -->
    <van-form ref="from" @submit="onSubmit">
      <van-field
        clearable
        required
        v-model="user.mobile"
        name="mobile"
        placeholder="手机号"
        :rules="rules.mobile"
      >
        <template #left-icon>
          <TouTiaoIcon icon="shouji"></TouTiaoIcon> </template
      ></van-field>

      <van-field
        clearable
        type="number"
        maxlength="6"
        required
        v-model="user.code"
        placeholder="验证码"
        :rules="rules.code"
      >
        <template #left-icon>
          <TouTiaoIcon icon="yanzhengma"></TouTiaoIcon>
        </template>
        <template #button>
          <van-count-down
            @finish="isShowCount = false"
            v-if="isShowCount"
            :time="5000"
            format="ss秒"
          />
          <van-button
            v-else
            :disabled="isDisabled"
            @click="sendSmsCode"
            class="send-sms-btn"
            native-type="button"
            size="mini"
            type="primary"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSmsCode } from "@/api/login";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      isDisabled: false,
      username: "",
      password: "",
      isShowCount: false,
      user: {
        mobile: "13911111112",
        code: "",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "用户名不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        await login(this.user);
        Toast.success("登陆成功");
      } catch (e) {
        Toast.fail(e.response.data.message);
      }
    },
    async sendSmsCode() {
      try {
        await this.$refs.from.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }

      try {
        this.isDisabled = true;
        await sendSmsCode(this.user.mobile);
        this.isShowCount = true;
        this.$toast.success("发送成功");
      } catch (e) {
        this.$toast(e.response.data.message || "出错了");
        this.isShowCount = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
