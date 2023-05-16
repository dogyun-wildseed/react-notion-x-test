import { NotionAPI } from "notion-client";
import express from "express";
import cors from "cors";

// https://wildseed.notion.site/CoDo-APIs-webhooks-2ffccabe2c8d498c90fed0e5913cecdc
const notion = new NotionAPI();

const getNotionData = async (): Promise<any> => {
  const recordMap = await notion.getPage("067dd719a912471ea9a3ac10710e7fdf");
  return recordMap;
};

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  const recordMap = await notion.getPage(
    "Test-Notion-CoDo-APIs-webhooks-68e86831f0304196a76e3a4cd3d0f275"
  );
  console.log("🚀 ~ app.get ~ recordMap:", recordMap);
  res.json(recordMap);
});

app.listen(5100, () => {
  console.log("listen to 5100");
});
