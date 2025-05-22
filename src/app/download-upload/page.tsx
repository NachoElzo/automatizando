"use client";

import React, { useRef, useState } from "react";
import "../css/download-upload.css";

export default function DownloadUploadPractice() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [downloadMsg, setDownloadMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setUploadMsg("File is too large. Please select a file under 2MB.");
      setUploadedFile(null);
      return;
    }
    setUploadedFile(file);
    setUploadMsg(`Your file "${file.name}" was uploaded!`);
  }

  function handleDownload() {
    // Simulate download by creating a dummy file
    const fileName = "example.txt";
    const blob = new Blob(["This is a sample file for download."], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    setDownloadMsg(`Your file "${fileName}" was downloaded!`);
  }

  return (
    <div className="download-upload-container" style={{ maxWidth: 500, margin: "3rem auto", padding: "2rem", background: "#e7fbe9", borderRadius: "1rem", border: "1.5px solid #22c55e" }}>
      <h1 className="du-title">Download & Upload Practice</h1>
      <p className="du-description" style={{ color: "#15803d", textAlign: "center", marginBottom: "2rem" }}>
        Here you can <b>download</b> a sample file and <b>upload</b> your own file.<br />
        Only files under <b>2MB</b> are accepted for upload.<br />
        After uploading or downloading, you will see a confirmation message with the file name.
      </p>
      {/* Download Section */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <button
          onClick={handleDownload}
          style={{
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.7rem 1.5rem",
            fontWeight: 600,
            fontSize: "1.1rem",
            cursor: "pointer",
            marginBottom: "0.7rem",
          }}
        >
          Download Sample File
        </button>
        {downloadMsg && (
          <div style={{ color: "#15803d", marginTop: "0.5rem", fontWeight: 500 }}>
            {downloadMsg}
          </div>
        )}
      </div>
      {/* Upload Section */}
      <div style={{ textAlign: "center" }}>
        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <button
          onClick={() => inputRef.current?.click()}
          style={{
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            padding: "0.7rem 1.5rem",
            fontWeight: 600,
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
        >
          Upload File
        </button>
        {uploadMsg && (
          <div style={{ color: uploadedFile ? "#15803d" : "#dc2626", marginTop: "0.5rem", fontWeight: 500 }}>
            {uploadMsg}
          </div>
        )}
      </div>
    </div>
  );
}