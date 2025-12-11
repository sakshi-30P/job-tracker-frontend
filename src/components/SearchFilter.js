// src/components/SearchFilter.js
import React from "react";

export default function SearchFilter({ search, setSearch }){
  return (
    <div className="mb-3">
      <div className="row g-2">
        <div className="col-md-4">
          <input className="form-control" placeholder="Job title" value={search.title} onChange={e=>setSearch({...search, title:e.target.value})}/>
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Company / description" value={search.text} onChange={e=>setSearch({...search, text:e.target.value})}/>
        </div>
        <div className="col-md-4">
          <input className="form-control" placeholder="Location" value={search.location} onChange={e=>setSearch({...search, location:e.target.value})}/>
        </div>
      </div>
    </div>
  );
}
