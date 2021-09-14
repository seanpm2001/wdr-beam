#!/usr/bin/env node
import wdrBeam from './index';
import {Command} from 'commander';
import * as readlineSync from 'readline-sync';

const packageJson = require('../package.json');
const program = new Command();
const requiredArgs: {
  key: 'filepath' | 'token';
  question: string;
  options?: TODO[];
}[] = [
  {key: 'filepath', question: 'What directory are we uploading for:\n'},
  {
    key: 'token',
    question:
      'Please provide an auth token: (https://web-dev-uploads.web.app/cli)\n',
  },
];

console.log('Starting Web DevRel Beam');

program
  .name(packageJson.name)
  .version(packageJson.version)
  .option('-F, --filepath <string>', 'directory to search in', process.cwd())
  .option(
    '-T, --token <string>',
    'auth token, you can generate one at https://web-dev-uploads.web.app/cli'
  );

program.parse(process.argv);

const options = program.opts() as DCCUploaderArgs;

for (const arg of requiredArgs) {
  while (!options[arg.key]) {
    if (arg.options) {
      const i = readlineSync.keyInSelect(arg.options, arg.question, {
        cancel: false,
      }) as TODO;
      options[arg.key] = arg.options[i];
      console.log('\n');
    } else {
      options[arg.key] = readlineSync.question(arg.question) as TODO;
      console.log('\n');
    }
  }
}

wdrBeam(options);
