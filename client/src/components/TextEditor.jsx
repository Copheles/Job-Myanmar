import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import { Box, FormLabel } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { useState } from "react";
import { useEffect } from "react";
import ShowTextToHtml from "./ShowTextToHtml";
import { SimpleGrid } from "@chakra-ui/react";

const config = {
  useSearch: false,
  spellcheck: false,
  enter: "P",
  defaultMode: "1",
  toolbarAdaptive: false,
  toolbarSticky: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  minHeight: 400,
  minWidth: null,
  buttons:
    "paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,fontsize,|,align,undo,redo",
  editorCssClass: "alic",
  placeHolder: "",
  controls: {
    fontsize: {
      list: [
        "8",
        "9",
        "10",
        "11",
        "12",
        "14",
        "16",
        "18",
        "24",
        "30",
        "36",
        "48",
        "60",
        "72",
        "96",
        "100",
      ],
    },
  },
  style: {
    paddingLeft: "30px",
    background: "#2D3748",
  },
};

const TextEditor = () => {
  const { mode } = useSelector((state) => state.user);
  const [config1, setConfig] = useState(config);
  const [value, setValue] = useState("");

  useEffect(() => {
    const style = {
      paddingLeft: "30px",
      background: mode === "dark" ? "#2D3748" : "white",
    };
    setConfig({ ...config1, style });
  }, [mode])
  
  const editor = useRef(null);
  return (
    <Box>
      <FormLabel mb={5}>Job Description Details</FormLabel>
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap={5} mb={5}>
        <JoditEditor
          config={config1}
          ref={editor}
          onChange={(content) => setValue(content)}
          value={value}
        />
        <ShowTextToHtml value={value} />
      </SimpleGrid>
    </Box>
  );
};

export default TextEditor;
