import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});
import React, { useRef } from "react";

const config = {
  readonly: false, // all options from https://xdsoft.net/jodit/doc/
  toolbar: true,
  minHeight: 300,
  maxHeight: 500,
  buttons: [
    "source",
    "|",
    "bold",
    "strikethrough",
    "underline",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "left",
    "outdent",
    "indent",
    "|",
    "font",
    "fontsize",
    "brush",
    "lineHeight",
    "paragraph",
    "|",
    "classSpan",
    "file",
    "image",
    "video",
    "table",
    "link",
    "|",
    "align",
    "undo",
    "redo",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "fullsize",
    "print",
    "about",
    "superscript",
    "subscript",
    "brush",
    "selectall",
    "paste",
    "cut",
    "copy",
    "speechRecognize",
    "spellcheck",
    "preview",
    "find",
    "source",
  ],
  buttonsXS: [
    "bold",
    "image",
    "|",
    "brush",
    "paragraph",
    "|",
    "align",
    "|",
    "undo",
    "redo",
    "|",
    "eraser",
    "dots",
  ],
  uploader: {
    insertImageAsBase64URI: true,
    url: "/api/upload",
    format: "json",
    imagesExtensions: ["jpg", "png", "jpeg", "gif"],
    headers: {
      "X-CSRF-TOKEN": "CSFR-Token",
      Authorization: "Bearer <JSON Web Token>",
    },
    process: function (resp: any) {
      return {
        files: resp.data,
      };
    },
  },
};

export default function JoditEditorComponent({
  onChange,
  value,
}: {
  value: string;
  onChange: (joditText: string) => void;
}) {
  const editor = useRef(null);
  const formattedContent = value.replace(/\n/g, "<br>");

  return (
    <div>
      <JoditEditor
        className="-z-[9999px] w-full"
        ref={editor}
        value={value}
        config={config}
        onBlur={onChange}
      />
    </div>
  );
}
