import { mkdir, readFile, writeFile, unlink, readdir, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const defaultMediaDirectory = fileURLToPath(
  new URL("../../../.local/media/", import.meta.url),
);
export function createLocalImageStorage(directory = defaultMediaDirectory) {
  const root = resolve(directory);
  function path(key) {
    if (!/^[0-9a-f-]{36}\.webp$/.test(key)) throw new Error("Invalid storage key");
    return resolve(root, key);
  }
  return {
    async write(key, data) {
      await mkdir(root, { recursive: true });
      await writeFile(path(key), data, { flag: "wx", mode: 0o600 });
    },
    async read(key) {
      try {
        return await readFile(path(key));
      } catch (error) {
        if (error.code === "ENOENT") return null;
        throw error;
      }
    },
    async remove(key) {
      try {
        await unlink(path(key));
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
      }
    },
    async oldKeys(before) {
      let names;
      try {
        names = await readdir(root);
      } catch (error) {
        if (error.code === "ENOENT") return [];
        throw error;
      }
      const result = [];
      for (const key of names) {
        if (!/^[0-9a-f-]{36}\.webp$/.test(key)) continue;
        try {
          if ((await stat(path(key))).mtime < before) result.push(key);
        } catch (error) {
          if (error.code !== "ENOENT") throw error;
        }
      }
      return result;
    },
  };
}
