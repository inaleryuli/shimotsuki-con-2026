function indent(markup, spaces) {
  const padding = ' '.repeat(spaces);
  return markup
    .split('\n')
    .map(line => (line ? padding + line : ''))
    .join('\n');
}

module.exports = { indent };
