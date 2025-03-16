/**
 * 解析ai流式返回的数据
 */
export function parseAiResponse(decoderText) {
  // 使用正则表达式匹配 content 字段的值
  const contentMatches = [
    ...decoderText.matchAll(/"content":"(.*?)","content_type"/g),
  ]
    .map((match) => match[1])
    .join("");

  if (contentMatches.match(/msg_type/g)) {
    return "---tip-words-gap---"; //内容与提示词结束标志
  }
  // 提取匹配的内容并拼接
  return contentMatches; // + contentMatches2;
}
