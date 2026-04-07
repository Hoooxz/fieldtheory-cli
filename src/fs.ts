import { access, mkdir, readFile, readdir, writeFile, rename } from 'node:fs/promises';

export async function ensureDir(dirPath: string): Promise<void> {
  await mkdir(dirPath, { recursive: true });
}

export async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function listFiles(dirPath: string): Promise<string[]> {
  try {
    return await readdir(dirPath);
  } catch {
    return [];
  }
}

export async function writeJson(filePath: string, value: unknown): Promise<void> {
  const tmp = filePath + '.tmp';
  await writeFile(tmp, JSON.stringify(value, null, 2), 'utf8');
  await rename(tmp, filePath);
}

export async function readJson<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

export async function writeJsonLines(filePath: string, rows: unknown[]): Promise<void> {
  const tmp = filePath + '.tmp';
  const content = rows.map((row) => JSON.stringify(row)).join('\n') + (rows.length ? '\n' : '');
  await writeFile(tmp, content, 'utf8');
  await rename(tmp, filePath);
}

export async function readJsonLines<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await readFile(filePath, 'utf8');
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => JSON.parse(line) as T);
  } catch {
    return [];
  }
}
