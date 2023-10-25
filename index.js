import { execSync, exec } from "child_process"
import {promisify} from 'util'
import fs from 'fs'

const execPro = promisify(exec)

function getCmdNames(cmdHelpStr) {
  // Split the input text into lines and find the lines after "Commands:"
  const lines = cmdHelpStr.split('\n')

  let cmdIndex = lines.indexOf('Commands:')
  if (cmdIndex === -1) return []

  const commandLines = lines.slice(cmdIndex + 1)

  // Extract the first word of each line
  let commandNames = commandLines
    .filter(line => /^\s\s\w/.test(line))
    .map(line=>line.trim().split(' ')[0])
    .filter(name => name !== '') // Filter out empty strings
  
  // CMDs are in order we defined them
  // But help is added last, this move it to the front
  commandNames.unshift(commandNames.pop())

  //console.log(commandNames)
  return commandNames
}

function formatCmd(name, cmdStr, depth) {
  let usageStart = cmdStr.indexOf('\nUsage:')
  let out = ''
    out += `\n<h${depth+2}>${name}</h${depth+2}>\n`
    out += `\n${cmdStr
      .substring(0, usageStart)
      .replaceAll(/\n\t./g, '\n- ')
      .replaceAll(/\n[^-]/g, '\n\n<br/>')
    }\n`
    out += `\n\`\`\`${cmdStr.substring(usageStart)}\`\`\`\n`
  return out
}

async function recursiveDocs(commandNames, depth=0, parents=[]) {
  let docObj = {}
  for (let cmd of commandNames) {
    if (cmd==='help') continue;

    let formattedCMD = `spacetime help ${cmd==='help' ? '' : [...parents, cmd].join(' ')}`

    let cmdRes = await execPro(formattedCMD)
    let subCmdNames = getCmdNames(cmdRes.stdout) || []

    docObj[cmd] = {
      content: cmdRes.stdout,
      subCmdNames,
      //formattedCMD,
      formatted: formatCmd(cmd, cmdRes.stdout, depth),
      subCmds: subCmdNames.length ? await recursiveDocs(subCmdNames, depth+1, [...parents, cmd]) : {},
      depth
    }

  }

  return docObj
}


function createFile(content) {
  if (process.argv.includes('build')) {
    fs.writeFile('docs.md', content, 'utf8', (err) => {
      if (err) console.error('Error writing the edited content to the file:', err)
      console.log('File edited successfully.');
    })
    return
  } 

  fs.mkdir('dev', { recursive: true }, (err) => {})
  fs.writeFile('dev/docs.md', content, 'utf8', (err) => {
    if (err) console.error('Error writing the edited content to the file:', err)
    console.log('File edited successfully.');
  })
}

function generateDetails(command) {
  let output = ''
  output += command.formatted

  if (Object.keys(command.subCmds).length) {
    output += `\n<details><summary>Sub Commands</summary>\n`
    for (const subCommand of Object.values(command.subCmds)) {
      output += generateDetails(subCommand);
    }
    output += `</details>`;
  }

  return output;
}

!(async () => {
  // Get top level cmds
  let res = execSync('spacetime help').toString()
  let cmdNameArr = getCmdNames(res)
  //console.log(cmdNameArr)

  let cmdObj = await recursiveDocs(cmdNameArr)

  
  // format cmdObj to content
  let content = ''
  for (let [k, v] of Object.entries(cmdObj)) {
    content += generateDetails(v)
  }
  
  createFile(content) 
})()
