// src/pages/ResumeUpload.jsx
import React, { useState } from "react";
import api from "../api";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose file");
    try {
      const fd = new FormData();
      fd.append("resume", file);
      await api.post("/resume/upload", fd, { headers:{ "Content-Type": "multipart/form-data" }});
      alert("Uploaded");
    } catch (e) { console.error(e); alert("Upload failed"); }
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-2">
        <input type="file" className="form-control" onChange={e=>setFile(e.target.files[0])}/>
      </div>
      <button className="btn btn-primary">Upload</button>
    </form>
  );
}
