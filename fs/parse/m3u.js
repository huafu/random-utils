#!/usr/bin/env node
require('../../helpers/exportCallable')(module, (m3uContent) => {
  if (!/^\s*#EXTM3U\s*\n/.test(m3uContent)) throw new TypeError()
  return m3uContent
    .replace('#EXTM3U', '')
    .split('\n#EXTINF:-1,')
    .map(s => s.trim())
    .filter(s => s != '')
    .map(s => s.split('\n'))
    .reduce((o, [base, value]) => {
      let name = base, i = 0
      while (o[name]) name = `${base} (${++i})`
      o[name] = value
      return o
    }, {})
}, {argv: ['file']})
