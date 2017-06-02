const Base = requireBaseController();
const wechatSDK = requireThirdparty('wechat');
const jwtConfig = think.config('jwt');

module.exports = class extends Base {
  init(...args) {
    super.init(...args);

    // 注入service
    this.userService = requireService('user', 'api', this);

    // 白名单
    this.whiteList = ['login'];
  }

  /**
   * 用户登录
   */
  async loginAction() {
    const ip = this.ip();
    const wxdata = await wechatSDK.wxLoginDataDataDecrypt(this.param());
    if (think.isEmpty(wxdata)) {
      return this.showError(ERROR.USER.WXDATA_PARSE_ERROR);
    }

    const user = await this.userService.create(wxdata, ip);
    const token = await jwt.encrypt({ uid: user.uid, env: think.env }, jwtConfig.expire);
    think.extend(user, { token });
    return this.success(user);
  }

  /**
   * 用户个人资料
   */
  async infoAction() {
    const uid = this.param('uid') || this.member.uid;
    const user = await this.userService.getUserInfoByUid(uid);
    return this.success(user);
  }

  /**
   * 修改用户个人资料
   */
  async updateAction() {
    const nickName = this.param('nickName');
    const mobile = this.param('mobile');
    const birthday = this.param('birthday');
    const sex = this.param('sex');
    const description = this.param('description');
    const user = await this.userService.updateUserInfo(this.member.uid, {
      nickName,
      mobile,
      birthday,
      sex,
      description,
    });
    return this.success(user);
  }

  /**
   * 我参与过的活动列表
   */
  async joinAction() {
    const lastSequence = this.lastSequence();
    const headSequence = this.headSequence();
    const pageSize = this.pageSize();

    const pageData = await this.userService.joinList(this.member.uid, lastSequence, headSequence, pageSize);
    return this.cursorPage(pageData);
  }
};
