const reset = () => {
  const html = document.querySelector("html");
  const width = html.getBoundingClientRect().width;
  const fontSize = width / 128; //2028 / 128 = 15.625px (原始设计尺寸)
  document.documentElement.style.fontSize = fontSize + "px";
};
reset();
