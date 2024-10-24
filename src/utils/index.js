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


export function removeNullProps(obj){
  const res = {};
  console.log(Object.entries(obj))
  for (const[key,value] of Object.entries(obj)) {
    // console.log(key,value)
      if(Array.isArray(value)){
        if(value.length)res[key] = value;
      }else if(value){
        res[key] = value;
      }
  }
  return res;
}