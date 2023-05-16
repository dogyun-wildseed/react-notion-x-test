import _ from "lodash";
// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

import { Code } from "react-notion-x/build/third-party/code";
import { Collection } from "react-notion-x/build/third-party/collection";
import { Equation } from "react-notion-x/build/third-party/equation";
import { Modal } from "react-notion-x/build/third-party/modal";
import { Pdf } from "react-notion-x/build/third-party/pdf";
import { NotionRenderer } from "react-notion-x";
import React, { useEffect, useState } from "react";
interface NotionTestProps {}

const NotionTest: React.FC<NotionTestProps> = () => {
  const [recordMap, setRecordMap] = useState<any>();
  console.log("🚀 ~ recordMap:", recordMap);
  useEffect(() => {
    const init = async () => {
      setRecordMap(
        await fetch("http://localhost:5100").then((res) => res.json())
      );
    };
    init();
  }, []);

  if (!recordMap) {
    return null;
  }
  const keys = Object.keys(recordMap.block);
  const foundDividerIndex = keys.findIndex((key: any) => {
    return recordMap.block[key]?.value?.type === "divider";
  });
  console.log("🚀 ~ keys.length:", keys.length);

  const content = recordMap.block[keys[0]].value.content;

  const firstPageRecordMap = _.cloneDeep(recordMap);
  firstPageRecordMap.block[keys[0]].value.content = content.slice(
    0,
    foundDividerIndex - 1
  );

  const secondPageRecordMap = _.cloneDeep(recordMap);
  secondPageRecordMap.block[keys[0]].value.content =
    content.slice(foundDividerIndex);
  return (
    <>
      <NotionRenderer
        recordMap={firstPageRecordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
        }}
      />
      {/* <NotionRenderer
        recordMap={firstPageRecordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
        }}
      /> */}
      <h1>here is break point</h1>
      <NotionRenderer
        recordMap={secondPageRecordMap}
        components={{
          Code,
          Collection,
          Equation,
          Modal,
          Pdf,
        }}
      />
    </>
  );
};

export default NotionTest;
