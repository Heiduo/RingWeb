import inquirer from 'inquirer'
import { Command, Option } from 'commander'
import { execa } from 'execa'
import envConfig from '../env.config.js'
const { envs, envName = 'VITE_BASE_ENV', options = [], cli } = envConfig

const program = new Command()

options.forEach(opt => {
  program.addOption(new Option(opt).hideHelp())
})
const argv = program.parse(process.argv);
(async function choseBranch() {
  const env = await inquirer.prompt([
    {
      name: 'name',
      type: 'list',
      message: '选择环境:',
      choices: envs
    }
  ])
  if (env) {

    console.log(env)
    const childProcessOptions = [...argv.rawArgs].splice(2)
    console.log()
    console.log('准备编译👴')
    console.log()
    execa(cli, childProcessOptions, {
      stdio: 'inherit',
      env: {
        [envName]: JSON.stringify(envs.find(opt => env.name === opt.name))
      }
    })
  }
})()
