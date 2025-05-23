"use client";

import React, { useState } from "react";
import "../css/apis-page.css";

export default function ApiPracticePage() {
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingPut, setLoadingPut] = useState(false);
  const [loadingPatch, setLoadingPatch] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [newName, setNewName] = useState("");
  const [created, setCreated] = useState<{ id: number; name: string } | null>(null);
  const [updated, setUpdated] = useState<{ id: number; name: string } | null>(null);
  const [patched, setPatched] = useState<{ id: number; name: string } | null>(null);
  const [deleted, setDeleted] = useState<{ success: boolean; id: number } | null>(null);

  const [updateName, setUpdateName] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateError, setUpdateError] = useState("");

  const [patchName, setPatchName] = useState("");
  const [patchId, setPatchId] = useState("");
  const [patchError, setPatchError] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const [userList, setUserList] = useState<{ id: number; name: string }[]>([]);
  const [showUserList, setShowUserList] = useState(false);

  // GET
  const handleGetUser = async () => {
    setLoadingGet(true);
    setShowUserList(false);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setUserList(data);
      setShowUserList(true);
    } catch {
      setUserList([]);
      setShowUserList(false);
    }
    setLoadingGet(false);
  };

  // POST
  const handleCreateUser = async () => {
    if (!newName) return;
    setShowUserList(false);
    setLoadingPost(true);
    setCreated(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setCreated(null);
        alert("Too many requests. Please wait a moment.");
      } else {
        setCreated(data);
      }
    } finally {
      setLoadingPost(false);
      setNewName("");
    }
  };

  // PUT
  const handleUpdateUser = async () => {
    setShowUserList(false);
    setUpdateError("");
    const id = Number(updateId);
    if (!id) return;
    if (!updateName) return;
    setLoadingPut(true);
    setUpdated(null);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: updateName }),
      });
      const data = await res.json();
      if (res.status === 404) setUpdateError("The user ID does not exist.");
      else if (res.status === 429) alert("Too many requests. Please wait a moment.");
      else setUpdated(data);
    } finally {
      setLoadingPut(false);
      setUpdateName("");
      setUpdateId("");
    }
  };

  // PATCH
  const handlePatchUser = async () => {
    setShowUserList(false);
    setPatchError("");
    const id = Number(patchId);
    if (!id) return;
    if (!patchName) return;
    setLoadingPatch(true);
    setPatched(null);
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: patchName }),
      });
      const data = await res.json();
      if (res.status === 404) setPatchError("The user ID does not exist.");
      else if (res.status === 429) alert("Too many requests. Please wait a moment.");
      else setPatched(data);
    } finally {
      setLoadingPatch(false);
      setPatchName("");
      setPatchId("");
    }
  };

  // DELETE
  const handleDeleteUser = async () => {
    setShowUserList(false);
    setDeleteError("");
    const id = Number(deleteId);
    if (!id) return;
    setLoadingDelete(true);
    setDeleted(null);
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.status === 404) setDeleteError("The user ID does not exist.");
      else if (res.status === 429) alert("Too many requests. Please wait a moment.");
      else setDeleted(data);
    } finally {
      setLoadingDelete(false);
      setDeleteId("");
    }
  };

  return (
    <div className="api-container">
      <h1 className="api-title">API Practice</h1>
      <p className="api-description">
        <b>Warning!</b> This API practice service is shared by the whole community.<br />
        Please use it responsibly and with caution to avoid overloading the system.<br />
        <b>These requests are mocked</b> and do not affect any real data.<br />
        Remember: it is for learning and testing purposes only—do not abuse requests!
      </p>
      <div className="api-section">
        <button onClick={handleGetUser} disabled={loadingGet} className="api-btn get">
          {loadingGet ? "Loading..." : "GET Users"}
        </button>
        {showUserList && (
          <div className="api-user-list">
            <b>User List:</b>
            <ul>
              {userList.map(u => (
                <li key={u.id}>
                  {u.name} (ID: {u.id})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="api-section">
        <input
          type="text"
          placeholder="New user name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          className="api-input"
        />
        <button onClick={handleCreateUser} disabled={loadingPost || !newName} className="api-btn post">
          {loadingPost ? "Loading..." : "POST User"}
        </button>
        {created && (
          <div className="api-result created">
            <b>Created:</b> {created.name} (ID: {created.id})
          </div>
        )}
      </div>
      {/* PUT section */}
      <div className="api-section">
        <input
          type="number"
          placeholder="User ID to update"
          value={updateId}
          onChange={e => setUpdateId(e.target.value)}
          className="api-input id no-spinner"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input
          type="text"
          placeholder="Update user name"
          value={updateName}
          onChange={e => setUpdateName(e.target.value)}
          className="api-input"
        />
        <button onClick={handleUpdateUser} disabled={loadingPut || !updateName || !updateId} className="api-btn put">
          {loadingPut ? "Loading..." : "PUT User"}
        </button>
        {updateError && (
          <div className="api-error">
            {updateError}
          </div>
        )}
        {updated && (
          <div className="api-result updated">
            <b>Updated:</b> {updated.name} (ID: {updated.id})
          </div>
        )}
      </div>
      {/* PATCH section */}
      <div className="api-section">
        <input
          type="number"
          placeholder="User ID to patch"
          value={patchId}
          onChange={e => setPatchId(e.target.value)}
          className="api-input id no-spinner"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input
          type="text"
          placeholder="Patch user name"
          value={patchName}
          onChange={e => setPatchName(e.target.value)}
          className="api-input"
        />
        <button onClick={handlePatchUser} disabled={loadingPatch || !patchName || !patchId} className="api-btn patch">
          {loadingPatch ? "Loading..." : "PATCH User"}
        </button>
        {patchError && (
          <div className="api-error">
            {patchError}
          </div>
        )}
        {patched && (
          <div className="api-result patched">
            <b>Patched:</b> {patched.name} (ID: {patched.id})
          </div>
        )}
      </div>
      {/* DELETE section */}
      <div className="api-section">
        <input
          type="number"
          placeholder="User ID to delete"
          value={deleteId}
          onChange={e => setDeleteId(e.target.value)}
          className="api-input id no-spinner"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <button onClick={handleDeleteUser} disabled={loadingDelete || !deleteId} className="api-btn delete">
          {loadingDelete ? "Loading..." : "DELETE User"}
        </button>
        {deleteError && (
          <div className="api-error">
            {deleteError}
          </div>
        )}
        {deleted && (
          <div className={`api-result ${deleted.success ? "deleted" : "error"}`}>
            {deleted.success ? (
              <span>
                <b>Deleted user with ID:</b> {deleted.id}
              </span>
            ) : (
              <span>Delete failed</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}