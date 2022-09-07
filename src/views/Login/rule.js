export const mobileRuler = [
  { required: true, message: '请输入手机号' },
  {
    pattern:
      /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
    message: '手机格式错误'
  }
]

export const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /[0-9]{6}/, message: '验证码格式错误' }
]
