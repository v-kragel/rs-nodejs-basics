import { readFile } from "fs/promises";

async function readJsonFile(relativePath) {
  const url = new URL(relativePath, import.meta.url);
  const raw = await readFile(url, "utf-8");
  return JSON.parse(raw);
}

export async function loadRandomJson() {
  const aJson = await readJsonFile("../files/a.json");
  const bJson = await readJsonFile("../files/b.json");
  return Math.random() > 0.5 ? aJson : bJson;
}
