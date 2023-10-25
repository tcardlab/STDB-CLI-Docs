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
    out += `\n<h${depth+1}>${name}:</h${depth+1}>\n`
    out += `\n${cmdStr.substring(0, usageStart)}\n`
    out += `\n\`\`\`${cmdStr.substring(usageStart)}\`\`\`\n`
  return out
}

async function recursiveDocs(commandNames, depth=0, parents=[]) {
  let docObj = {}
  for (let cmd of commandNames) {
    if (cmd==='help') continue;

    let formattedCMD = `spacetime help ${cmd==='help' ? '' : [...parents, cmd].join(' ')}`
    console.log(formattedCMD, parents, cmd)

    let cmdRes = execPro(formattedCMD)
    docObj[cmd] = cmdRes
    cmdRes.then(async (v) => {
      let subCmdNames = getCmdNames(v.stdout) || []
      //console.log('Sub:', subCmdNames)
      //console.log(depth, cmd, subCmdNames)
      //console.log( formatCmd(cmd, v.stdout, depth) )

      docObj[cmd]={
        content: v.stdout,
        subCmdNames,
        formatted: formatCmd(cmd, v.stdout, depth),
        subCmds: subCmdNames.length ? await recursiveDocs(subCmdNames, depth+1, [...parents, cmd]) : [],
        depth
      }
    })
  }
  // top level cmds resolve b4 children, so we have an issue
  await Promise.all(Object.values(docObj))
  return docObj
}


function createFile(content) {
  fs.mkdir('dist')
  fs.writeFile('dist/docs', content, 'utf8', (err) => {
    if (err) console.error('Error writing the edited content to the file:', err)
    console.log('File edited successfully.');
  })
}

!(async () => {
  // Get top level cmds
  let res = execSync('spacetime help').toString()
  let cmdNameArr = getCmdNames(res)
  console.log(cmdNameArr)

  let cmdObj = await recursiveDocs(cmdNameArr)
  console.log(cmdObj)

  // format cmdObj to content
  // ...
  //createFile(content) 
})()
