import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";

interface ILanguage {
  name: string;
  code: string;
}

const languages: ILanguage[] = [
  { name: "Text", code: "plaintext" },
  { name: "Python", code: "python" },
  { name: "C", code: "c" },
  { name: "Java", code: "java" },
  { name: "C++", code: "cpp" },
  { name: "C#", code: "csharp" },
  { name: "Javascript", code: "javascript" },
  { name: "SQL", code: "sql" },
  { name: "PHP", code: "php" },
  { name: "HTML", code: "html" },
  { name: "CSS", code: "css" },
  { name: "Scss", code: "scss" },
  { name: "JSON", code: "json" },
  { name: "Markdown", code: "markdown" },
];

interface IProps {
  session: any;
  username: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setInChat: React.Dispatch<React.SetStateAction<boolean>>;
  editorRef: React.MutableRefObject<any>;
}

export default function ShareEditor({
  session,
  username,
  setMessage,
  setInChat,
  editorRef,
}: IProps) {
  const timeout = useRef<any>(null);
  const [language, setLanguage] = useState<string>("plaintext");
  const [readOnly, setReadOnly] = useState<boolean>(false);
  const [editorName, setEditorName] = useState<string>("");

  useEffect(() => {
    if (session) {
      session.on("signal:share-editor", (event: any) => {
        const sender = JSON.parse(event.from.data).clientData;
        if (sender !== username) {
          const model = editorRef.current.getModel();
          if (model) {
            model.setValue(event.data);
          }
          blockEditing(sender);
        }
      });
      session.on("signal:editor-language", (event: any) => {
        const sender = JSON.parse(event.from.data).clientData;
        if (sender !== username) {
          setLanguage(event.data);
          blockEditing(sender);
        }
      });
    }
  }, []);

  const blockEditing = (sender: string) => {
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

  const onChangeLanguage: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newLanguage = e.target.value;

    if (session) {
      session
        .signal({
          data: newLanguage,
          to: [],
          type: "editor-language",
        })
        .catch((error: Error) => console.error(error));
    }
    setLanguage(newLanguage);
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent((e: any) => {
      if (!e.isFlush) {
        if (session) {
          session
            .signal({
              data: editorRef.current.getModel().getValue(),
              to: [],
              type: "share-editor",
            })
            .catch((error: Error) => console.error(error));
        }
      }
    });
  };

  const exportToChat = () => {
    setMessage(`\`\`\`${language}\n${editorRef.current.getModel().getValue()}\n\`\`\``);
    setInChat(true);
  };

  return (
    <EditorContainer>
      <MenuBar>
        <LanguageSelect onChange={onChangeLanguage} value={language}>
          {languages.map((l) => (
            <LanguageOption value={l.code} key={l.code}>
              {l.name}
            </LanguageOption>
          ))}
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
