import { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import _ from "lodash";
function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("javascript", "");

  const [srcDoc, setSrcDoc] = useState("");

  const stateSetters = {
    xml: setHtml,
    css: setCss,
    js: setJavascript,
  };

  const handleSetEditorCode = (language, value) => {
    console.log("value", language);

    const setState = stateSetters[language];
    console.log(setState);

    if (setState) {
      setState(value);
    } else {
      console.warn(`ERRRR Unsupported language: ${language}`);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `<html><body>${html}</body><style>${css}</style><script>${javascript}</script></html>`
      );
    }, 250);
    return () => clearTimeout(timeOut);
  }, [html, css, javascript]);

  /* theme logics */
  const [theme, setTheme] = useState("material");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="editor-theme-dropdown">
        <div className="custom-arrow">
          {isFocused ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <path fill="#ffffff" d="M0 7l5-5 5 5H0z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 10 10"
            >
              <path fill="#ffffff" d="M0 3l5 5 5-5H0z" />
            </svg>
          )}
        </div>
      </div>
      <div className="pane top-pane">
        <Editor
          accept=".html"
          handleSetEditorCode={handleSetEditorCode}
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          theme={theme}
        />
        <Editor
          accept=".css"
          handleSetEditorCode={handleSetEditorCode}
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          theme={theme}
        />
        <Editor
          accept=".js"
          handleSetEditorCode={handleSetEditorCode}
          language="js"
          displayName="JavaScript"
          value={javascript}
          onChange={setJavascript}
          theme={theme}
        />
      </div>
      <div className="pane bottom-pane">
        <iframe
          title="ouput"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          srcDoc={srcDoc}
        />
      </div>
    </>
  );
}

export default App;
