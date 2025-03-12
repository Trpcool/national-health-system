/**
 * 解析ai流式返回的数据
 */
export function parseAiResponse(decoderText) {
  // 使用正则表达式匹配 content 字段的值
  const contentMatches = [...decoderText.matchAll(/"content":"(.*?)"/g)]
    .map((match) => match[1])
    .join("");
  const contentMatches2 = [...decoderText.matchAll(/"content":"(\{.*?\})"/g)]
    .map((match) => match[1])
    .join("");

  // 提取匹配的内容并拼接
  return contentMatches + contentMatches2;
}
