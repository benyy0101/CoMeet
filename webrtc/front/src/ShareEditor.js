import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";

export default function ShareEditor({ session, username, setMessage, setInChat }) {
  const editorRef = useRef(null);
  const timeout = useRef(null);
  const [language, setLanguage] = useState("java");
  const [readOnly, setReadOnly] = useState(false);
  const [editorName, setEditorName] = useState("");

  useEffect(() => {
    if (session) {
      session.on("signal:share-editor", (event) => {
        const sender = JSON.parse(event.from.data).clientData;
        if (sender !== username) {
          editorRef.current.getModel().setValue(event.data);
          blockEditing(sender);
        }
      });
      session.on("signal:editor-language", (event) => {
        const sender = JSON.parse(event.from.data).clientData;
        if (sender !== username) {
          setLanguage(event.data);
          blockEditing(sender);
        }
      });
    }
  }, []);

  const blockEditing = (sender) => {
    setReadOnly(true);
    setEditorName(sender);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setReadOnly(false);
      setEditorName("");
      timeout.current = null;
    }, 2000);
  };

  const onChangeLanguage = (e) => {
    const newLanguage = e.target.value;

    if (session) {
      session
        .signal({
          data: newLanguage,
          to: [],
          type: "editor-language",
        })
        .catch((error) => console.error(error));
    }
    setLanguage(newLanguage);
  };

  const handleEditorDidMount = (editor, monaco) => {
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
  };

  const exportToChat = () => {
    setMessage(`\`\`\`\n${editorRef.current.getModel().getValue()}\n\`\`\``);
    setInChat(true);
  };

  return (
    <EditorContainer>
      <MenuBar>
        <LanguageSelect onChange={onChangeLanguage} value={language}>
          <LanguageOption value={"java"}>Java</LanguageOption>
          <LanguageOption value={"javascript"}>Javascript</LanguageOption>
          <LanguageOption value={"python"}>Python</LanguageOption>
          <LanguageOption value={"c"}>C</LanguageOption>
        </LanguageSelect>
        <ExportButton onClick={exportToChat}>채팅으로 내보내기</ExportButton>
      </MenuBar>
      <Editor
        language={language}
        theme="vs-dark"
        options={{
          automaticLayout: true,
          lineNumbersMinChars: 4,
          lineDecorationsWidth: 2,
          padding: { top: 10 },
          readOnly,
        }}
        onMount={handleEditorDidMount}
      />
      {editorName !== "" && (
        <EditingMessageContainer>{`${editorName}님이 편집중입니다...`}</EditingMessageContainer>
      )}
    </EditorContainer>
  );
}

const EditorContainer = tw.div`
w-full
h-1
flex-grow-[1]
overflow-hidden
relative
`;

const MenuBar = tw.div`
w-full
h-10
flex
`;

const LanguageSelect = tw.select`
w-40
h-10
text-slate-300
bg-slate-700
text-center
border-slate-900
border-[1px]
focus:outline-none
`;

const LanguageOption = tw.option``;

const ExportButton = tw.button`
w-full
bg-slate-700
cursor-pointer
border-slate-900
border-[1px]
`;

const EditingMessageContainer = tw.div`
absolute
bg-gradient-to-t
from-slate-200/30
to-transparent
right-0
bottom-0
w-full
h-10
flex
items-center
px-4
font-thin
text-sm
`;
