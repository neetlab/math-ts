#!/usr/bin/env node
import repl, { REPLServer, writer } from 'repl';
import os from 'os';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import * as math from '../index';
import { Tex } from '../_interfaces';

type TexLike = Tex | number | BigInt;

const hasToTexString = (data: any): data is Tex => {
  return 'toTexString' in data;
}

const isTex = (data: unknown): data is TexLike => {
  if (typeof data === 'number') return true;
  if (typeof data === 'bigint') return true;
  if (hasToTexString(data)) return true;
  return false;
}

const toTex = (data: TexLike): string => {
  if (typeof data === 'number') return data.toString();
  if (data instanceof BigInt) return data.toString();
  return data.toTexString();
}

const formatTex = (content: unknown, outfile: string) => {
  return `\\documentclass[convert={ghostscript,outfile=${outfile}}]{standalone}
\\usepackage{xcolor}
\\begin{document}
\\pagecolor{black}
\\color{white}
${content}
\\end{document}`;
}

const makeTex = (content: string) => {
  const name = Date.now().toString();
  const tmp = os.tmpdir();
  const src = path.join(tmp, name + '.tex');
  const png = path.join(tmp, name + '.png');
  writeFileSync(src, formatTex(content, png), 'utf-8');
  execSync(`cd ${tmp} && pdflatex -shell-escape ${src} > /dev/null`, { maxBuffer: Infinity });
  return png;
}

const printEscapeImage = (path: string) => {
  return `\u001B]1337;File=inline=1:` + readFileSync(path, 'base64') + '\u0007';
}

const isTexArray = (array: unknown[]): array is TexLike[] => {
  return array.every((item): boolean => {
    if (Array.isArray(item)) return isTexArray(item);
    if (isTex(item)) return true;
    return false;
  });
}

const compileTexArray = (array: TexLike[]): string => {
  const inner = array
    .map((item) => {
      if (Array.isArray(item)) return compileTexArray(item);
      return toTex(item);
    })
    .join(',');
  
  return '\\{' + inner + '\\}';
}

function texWriter(this: REPLServer, output: unknown) {
  if (Array.isArray(output) && isTexArray(output)) {
    return printEscapeImage(makeTex('$' + compileTexArray(output) + '$'));
  }

  if (isTex(output)) {
    return printEscapeImage(makeTex(toTex(output)));
  }

  return writer.bind(this)(output);
}

const session = repl.start({
  writer: texWriter,
});

Object.entries(math).forEach(([k, v]) => {
  session.context[k] = v;
});
