import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

export default function ShareEditor({ session, username }) {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState("java");

  useEffect(() => {
    if (session) {
      session.on("signal:share-editor", (event) => {
        const sender = JSON.parse(event.from.data).clientData;
        if (sender !== username) {
          editorRef.current.getModel().setValue(event.data);
        }
      });
    }
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    editor.onDidChangeModelContent((e) => {
      if (!e.isFlush) {
        if (session) {
          session
            .signal({
              data: editorRef.current.getModel().getValue(),
              to: [],
              type: "share-editor",
            })
            .catch((error) => console.error(error));
        }
      }
    });
  }

  return (
    <Editor
      language={language}
      width="25rem"
      height="35rem"
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  );
}
