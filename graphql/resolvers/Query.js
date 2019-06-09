module.exports = {
  status (root, args, context) {
    return 'ok'
  },
  mobileDevice (obj, args, context, queryInfo) {
    return {
      security:{}
    };
  },
  policy (root, args, context) {
    return 'FAIL';
  }
};
