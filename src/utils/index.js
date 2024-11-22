export function welcomeTips() {
  const hour = new Date().getHours();
  return hour <= 12
    ? "早上好!"
    : hour <= 14
    ? "中午好!"
    : hour <= 18
    ? "下午好!"
    : "晚上好!";
}

export function removeNullProps(obj) {
  const res = {};
  for (const [key, value] of Object.entries(obj)) {
    // console.log(key,value)
    if (Array.isArray(value)) {
      if (value.length) res[key] = value;
    } else if (value) {
      res[key] = value;
    }
  }
  return res;
}

export function addUint(num) {
  const pattern = /[px | % | em | rem | em | vw | vh]$/;
  if (typeof num === "number" || !pattern.test(num)) {
    return num + "px";
  }
  return num;
}

/**
 *
 * @param {string,number,object} date 传入原始的时间格式
 * @param {string} fmt 格式化后的字符串
 */
export function dateFormate(date, fmt = "yyyy-MM-d") {
  const dateObj = new Date(date);
  fmt = fmt.replace(/y+/, (str) => {
    return dateObj.getFullYear();
  });
  fmt = fmt.replace(/M+/, (str) => {
    return dateObj.getMonth() + 1;
  });
  fmt = fmt.replace(/d+/, (str) => {
    return dateObj.getDate();
  });
  fmt = fmt.replace(/h+/, (str) => {
    return dateObj.getHours();
  });
  fmt = fmt.replace(/m+/, (str) => {
    return dateObj.getMinutes();
  });
  fmt = fmt.replace(/s+/, (str) => {
    return dateObj.getSeconds();
  });
  return fmt;
}

// 根据数据长度生成固定顺序颜色列表
export function createColorList(arrLength) {
  const colorList = [];
  const gap = Math.floor(235 / arrLength);
  let r = 20,
    g = 20,
    b = 20;
  for (let i = 0; i < arrLength; i++) {
    colorList.push(
      `#${parseInt(r).toString(16)}${parseInt(g).toString(16)}${parseInt(
        b
      ).toString(16)}`
    );
    r += gap;
    g += gap;
    b += gap;
  }
  return colorList;
}
