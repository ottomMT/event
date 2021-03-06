const path = require('path');
const fs = require('fs');
global.Promise = require('bluebird');

const commonpath = think.getPath('common', '');
/**
 * 获取全局工具
 * @param plugins 工具类型 or mazing 的工具
 * @param dir common的文件夹
 */
global.requireCommon = function (plugins, dir = 'utils') {
  return require(`${commonpath}${dir}/${plugins}`) || null;
};

/**
 * 获取base controller
 */
global.requireBaseController = function () {
  return require(`${commonpath}controller/base`) || null;
};

/**
 * 获取base logic
 */
global.requireBaseLogic = function () {
  return require(`${commonpath}logic/base`) || null;
};

/**
 * 获取全局第三方sdk
 * @param plugins 第三方sdk库名
 * @param modules 厂商名
 */
global.requireThirdparty = function (plugins, modules) {
  return requireCommon(`${plugins}`, `thirdparty/${modules || plugins}`);
};

/**
 * 全局获取srvice
 * @param service service名
 * @param module 所属模块名
 * @param agrs service类初始化参数
 */
global.requireService = function (service, module, ...agrs) {
  const Service = think.service(service, module);
  return new Service(agrs);
};

/**
 * 获取base model
 */
global.requireBaseModel = function () {
  return require(`${commonpath}model/base`) || null;
};

/**
 * 全局错误码模板
 * @param code 错误码
 * @param message 错误提示语句
 */
global.ErrorCode = function (code, message) {
  this.getCode = function () {
    return code;
  };
  this.getMessage = function () {
    return message;
  };
};

/**
 * 全局切换日志频道
 * @param channel 日志频道(建议传当前文件名)
 */
const log4js = requireCommon('log4js', 'utils');
global.getLogger = function (channel = 'console') {
  const category = channel.replace(think.APP_PATH, '').replace('.js', '').trim();
  const tmp = category.split(path.sep).filter(item => !think.isEmpty(item));
  const logger = log4js.getLogger(think.camelCase(tmp.join('.')));
  logger.setLevel(think.config('log_level'));
  return logger;
};

// 自动加载init文件夹里面的文件
const dependDir = path.resolve(`${think.APP_PATH}${path.sep}common${path.sep}init`);
fs.readdirSync(dependDir).filter(v => require(`${dependDir}${path.sep}${v}`));
