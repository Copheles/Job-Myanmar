import {
  Box,
  FormLabel,
  SimpleGrid,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Control, Controller } from "react-hook-form";
import JoditEditor, { IJoditEditorProps } from "jodit-react";
import ShowTextToHtml from "./ShowTextToHtml";

const defaultConfig: IJoditEditorProps["config"] = {
  readonly: false,
  showTooltip: true,
  showBrowserColorPicker: false,
  statusbar: false,
  removeButtons: [
    "file",
    "image",
    "video",
    "print",
    "spellcheck",
    "table",
    "link",
    "speechRecognize",
    "colorPicker",
    "eraser",
    "brush",
    
  ],
  
  height: 400,
  enter: "p",
  defaultMode: 1,
  // buttons:
  //   "paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,fontsize,preview,align,undo,redo",
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
  },
};

interface RichTextEditorProps {
  value?: string;
  control: Control<any>;
  name: string;
  descriptionText: string;
}

export default function RichTextEditor({
  value,
  control,
  name,
  descriptionText
}: RichTextEditorProps) {
  const { colorMode } = useColorMode();
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    const style = {
      paddingLeft: "30px",
      background: colorMode === "dark" ? "#2D3748" : "#CBD5E0",
    };
    setConfig((prevConfig) => ({ ...prevConfig, style }));
  }, [colorMode]);

  return (
    <Box mt={5}>
      <FormLabel mb={5}>Job Description Details</FormLabel>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5} mb={5}>
        <Controller
          name={name}
          control={control}
          defaultValue={value || ""}
          rules={{}}
          render={({ field }) => (
            <Box>
              <JoditEditor
                ref={field.ref}
                config={config}
                value={field.value}
                onBlur={field.onBlur}
                onChange={(content) => field.onChange(content)}
              />
            </Box>
          )}
        />
        <ShowTextToHtml value={descriptionText || ''} />
      </SimpleGrid>
    </Box>
  );
}
