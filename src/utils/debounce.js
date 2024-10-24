export default function (fun, await) {
  let timer = null;
  const crtThis = this;
  const crtArgs = Array.from(arguments);
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fun.apply(crtThis, crtArgs); //bind是返回一个绑定了this的函数
      timer = null;
    }, await);
  };
}
