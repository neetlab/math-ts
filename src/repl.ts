#!/usr/bin/env node
import repl, { REPLServer, writer } from 'repl';
import os from 'os';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import * as math from './index';

const TEX_PATTERN = /\$(.+?)\$/;

const isTex = (data: unknown) => {
  if (typeof data === 'number') return true;
  if (typeof data === 'bigint') return true;
  if (typeof data === 'string' && TEX_PATTERN.test(data)) return true;
  return false;
}

const formatTex = (content: string, outfile: string) => {
  return `
    \\documentclass[convert={ghostscript,outfile=${outfile}}]{standalone}
    \\usepackage{xcolor}
    \\begin{document}
    \\pagecolor{black}
    \\color{white}
    \\scriptsize
    \$${content}\$
    \\end{document}
  `;
}

const makeTex = (content: string) => {
  const name = Date.now().toString();
  const tmp = os.tmpdir();
  const src = path.join(tmp, name + '.tex');
  const png = path.join(tmp, name + '.png');
  writeFileSync(src, formatTex(content, png), 'utf-8');
  execSync(`cd ${tmp} && pdflatex -shell-escape ${src} > /dev/null`);
  return png;
}

const printEscapeImage = (path: string) => {
  return `\u001B]1337;File=inline=1:` + readFileSync(path, 'base64') + '\u0007';
}

function texWriter(this: REPLServer, output: string) {
  if (isTex(output)) {
    return printEscapeImage(makeTex(output));
  }

  return writer.bind(this)(output);
}

const session = repl.start({
  prompt: 'λ ',
  writer: texWriter,
});

Object.entries(math).forEach(([k, v]) => {
  session.context[k] = v;
});
