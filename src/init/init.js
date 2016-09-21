const path = require('path')
const chalk = require('chalk')
const yeoman = require('yeoman-environment')
const TerminalAdapter = require('yeoman-environment/lib/adapter.js')

/**
 * Create Silent TerminalAdapter
 * suppress 'create' output generated by yeoman
 */
class SilentTerminalAdapter extends TerminalAdapter {
  constructor() {
    super()
    this.log.create = function() {}
  }
}

/**
 * Initialize a standard weex project
 * @param {String} project name
 * @param {String} config file path
 */
function init(projectName, configFile) {
  console.log(` => ${chalk.blue('Initialize a new Weex app')} (${chalk.cyan(projectName)})`)

  const env = yeoman.createEnv(null, null, new SilentTerminalAdapter())

  env.register(
    require.resolve(path.join(__dirname, '../../generator')),
    'weex:app'
  )

  // TODO: get generator configs from configFile
  const args = []

  const generator = env.create('weex:app', { args })
  generator.destinationRoot(projectName)
  generator.run()
}

module.exports = init
