/**
 * 活动模块错误码(300000)
 */
module.exports = {
  /**
   * 活动时间设置错误(300001)
   */
  TIME_ERROR: new ErrorCode(300001, '活动的开始时间不能小于等于结束时间'),
  /**
   * 只有认证用户才可以发布/修改活动(300002)
   */
  ONLY_VIP_CAN_PUBLISH: new ErrorCode(300002, '只有认证用户才可以发布/修改活动'),
  /**
   * 活动报名人数只能增加不能减少(300003)
   */
  JOIN_LIMIT_ONLY_CAN_INCREMENT: new ErrorCode(300003, '活动报名人数只能增加不能减少'),
  /**
   * 活动不存在(300004)
   */
  NOT_EXISTS: new ErrorCode(300004, '活动不存在'),
  /**
   * 活动已收藏(300005)
   */
  HAS_FAV: new ErrorCode(300005, '活动已收藏'),
  /**
   * 活动未收藏(300006)
   */
  HAS_NOT_FAV: new ErrorCode(300006, '活动未收藏'),
  /**
   * 活动报名人数已达上限(300007)
   */
  IS_FULL_OF_PEOPLE: new ErrorCode(300007, '活动报名人数已达上限'),
  /**
   * 活动已报名
   */
  HAS_JOIN: new ErrorCode(300008, '活动已报名'),
  /**
   * 评论不存在(300009)
   */
  COMMENT_NOT_EXISTS: new ErrorCode(300009, '评论不存在'),
  /**
   * 不是自己发的评论不可以删除(300010)
   */
  COMMENT_NOT_PUBLISH_BY_ME: new ErrorCode(300010, '不是自己发的评论不可以删除'),
  /**
   * 活动已经下架(300011)
   */
  IS_OFF_SHELF: new ErrorCode(300011, '活动已经下架'),
};
