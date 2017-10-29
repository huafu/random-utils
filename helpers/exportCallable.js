const fs = require('fs')

module.exports = (module, helper, options = {}) {
  if (options.name) module.exports[name] = helper
  else module.exports = helper
  if (require.main === module) {
    let args = process.argv.slice(2)
    if (options.argv) args = parseArgs(args, options.argv)
    helper.apply(module, args)
  }
}

module.exports.parseArg = function parseArg (index, value, config) {
  switch (config.type) {
    case 'file': return fs.readFileSync(value, config.options)
  }
  return value
}

module.exports.parseArgs = function parseArgs (args, config) {
  return args.map((val, i) => {
    let conf = config[i]
    if (typeof conf === 'string') conf = {type: conf}
    val = parseArg(i, val, conf)
    return val
  })
}
