import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import { Box, FormLabel } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { useEffect } from "react";
import ShowTextToHtml from "./ShowTextToHtml";
import { SimpleGrid } from "@chakra-ui/react";
import { changeJobDescription } from "../redux/features/job/jobSlice";

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


const RichTextEditor = ({  value }) => {
  const { mode } = useSelector((state) => state.user);
  const [config1, setConfig] = useState(config);

  const dispatch = useDispatch()

  useEffect(() => {
    const style = {
      paddingLeft: "30px",
      background: mode === "dark" ? "#2D3748" : "#fed7d7",
    };
    setConfig({ ...config1, style });
  }, [mode]);

  const editor = useRef(null);
  
  return (
    <Box mt={5}>
      <FormLabel mb={5}>Job Description Details</FormLabel>
      <SimpleGrid columns={{ base: 1, xl: 2 }} gap={5} mb={5}>
        <JoditEditor
          as="input"

          config={config1}
          ref={editor}
          onChange={(content) => dispatch(changeJobDescription(content))}
          value={value}
        />
        <ShowTextToHtml value={value} />
      </SimpleGrid>
    </Box>
  );
};

export default RichTextEditor;
