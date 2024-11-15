import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/css/css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import { Controlled as CodeMirror } from "react-codemirror2";
import IconArrowCollapseRight from "./icons/extend";
import IconArrowCollapseLeft from "./icons/collapse";
import Modal from "react-modal";

export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange,
    theme,
    accept,
    handleSetEditorCode,
  } = props;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [open, setOpen] = useState(true);

  const PREFIX = "codepen-clone-";
  const prefixedKey = PREFIX + language;

  const handleResetCode = () => {
    if (value !== "") {
      localStorage.setItem(prefixedKey, "");
      onChange("");
      closeModal();
    }
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    if (value !== "") {
      setIsOpen(true);
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [fileName, setFileName] = useState("No file chosen");
  // const [content, setContent] = useState("");

  const handleUploadFile = (e) => {
    // const allowedTypes = ["text/html", "text/javascript", "text/css"];
    // const message = allowedTypes[file.type] || "Unknown file type";
    const file = e?.target?.files[0];
    const fileType = e?.target?.files[0].type;

    const allowedLanguages = {
      "text/html": ".html",
      "text/css": ".css",
      "text/javascript": ".js",
    };
    // console.log(allowedLanguages[fileType]);
    // console.log(accept);
    // console.log(allowedLanguages[fileType] !== accept);

    if (allowedLanguages[fileType] !== accept) {
      // if (!allowedLanguages.includes(file.type)) {
      alert("Invalid file type. Please upload a valid text file.");
      return;
    } else {
      const reader = new FileReader();
      let fileContent = "";

      reader.onload = (event) => {
        fileContent = event.target.result;
        handleSetEditorCode(language, fileContent);
      };
      reader.readAsText(file);
    }
  };
  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    <div className={`editor-Container ${open === true ? " " : "collapased"} `}>
      {/* title */}

      <div className="editor-title">
        <div>{displayName}</div>
        <div className="editor-btns">
          <button className="btn editor-reset-btn" onClick={openModal}>
            Reset
          </button>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h6 ref={(_subtitle) => (subtitle = _subtitle)}>
              Sure you want to reset {`${displayName}`} Code ?
            </h6>
            <div className="modal-btn-container">
              <button
                className="btn editor-modal-reset-btn"
                onClick={handleResetCode}
              >
                Reset
              </button>
              <button
                className="btn editor-modal-cancel-btn"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </Modal>
          {open === true ? (
            <IconArrowCollapseLeft
              className="btn editor-collapse-btn"
              onClick={() => setOpen((open) => !open)}
            >
              icon
            </IconArrowCollapseLeft>
          ) : (
            <IconArrowCollapseRight
              className="btn editor-collapse-btn"
              onClick={() => setOpen((open) => !open)}
            >
              icon
            </IconArrowCollapseRight>
          )}
        </div>
      </div>

      {/* actuall edit space */}
      <CodeMirror
        className="code-mirror-wrapper"
        onBeforeChange={handleChange}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: theme,
        }}
      ></CodeMirror>
      <div className="editor-upload-file">
        <label
          htmlFor={`uploadFile-${language}`}
          className="editor-choose-file"
        >
          Choose File
        </label>
        <input
          accept={accept}
          onChange={(e, language) => handleUploadFile(e, language)}
          type="file"
          style={{ display: "none" }}
          id={`uploadFile-${language}`}
        />
        {/* <span style={fileNameStyle}>{fileName}</span> */}
      </div>
      {/* <button onClick={openModal}>Download {displayName}</button> */}
      {/* {modalIsOpen && (
        <ModalCompo modalIsOpen={modalIsOpen} closeModal={closeModal} />
      )} */}
    </div>
  );
}
