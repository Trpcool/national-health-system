export default function useAiRes() {
  const text = "";
  let index = 0,
    hasDone = false;

  /**
   * 装在ai回答内容流
   */
  function addThunk(thunk, done = false) {
    text += thunk;
    hasDone = done;
  }

  /**
   * 异步获取一个字符
   */
  function getWork() {
    if (done) return;
    return text[index++];
  }

  return {
    addThunk,
    getWork,
  };
}
