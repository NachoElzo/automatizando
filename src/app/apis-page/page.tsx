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
  const [newPassword, setNewPassword] = useState("");
  const [created, setCreated] = useState<{ id: number; name: string } | null>(null);
  const [createdToken, setCreatedToken] = useState<string | null>(null);

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

  const [userToken, setUserToken] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [tokenErrorPut, setTokenErrorPut] = useState("");
  const [tokenErrorPatch, setTokenErrorPatch] = useState("");
  const [tokenErrorDelete, setTokenErrorDelete] = useState("");
  const [passwordErrorPut, setPasswordErrorPut] = useState("");
  const [passwordErrorPatch, setPasswordErrorPatch] = useState("");
  const [passwordErrorDelete, setPasswordErrorDelete] = useState("");

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
    if (!newName || !newPassword) return;
    setShowUserList(false);
    setLoadingPost(true);
    setCreated(null);
    setCreatedToken(null);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, password: newPassword }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setCreated(null);
        alert("Too many requests. Please wait a moment.");
      } else {
        setCreated(data.user);
        setCreatedToken(data.token);
      }
    } finally {
      setLoadingPost(false);
      setNewName("");
      setNewPassword("");
    }
  };

  // PUT
  const handleUpdateUser = async () => {
    setShowUserList(false);
    setUpdateError("");
    setTokenErrorPut("");
    setPasswordErrorPut("");
    const id = Number(updateId);
    if (!userToken) {
      setTokenErrorPut("You must provide the user token.");
      return;
    }
    if (!userPassword) {
      setPasswordErrorPut("You must provide the user password.");
      return;
    }
    if (!id) return;
    if (!updateName) return;
    setLoadingPut(true);
    setUpdated(null);
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": userToken,
          "x-user-password": userPassword,
        },
        body: JSON.stringify({ id, name: updateName }),
      });
      const data = await res.json();
      if (res.status === 401) {
        if (data.error?.toLowerCase().includes("password")) setPasswordErrorPut("Invalid or missing password.");
        else setTokenErrorPut("Invalid or missing token.");
      }
      else if (res.status === 404) setUpdateError("The user ID does not exist.");
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
    setTokenErrorPatch("");
    setPasswordErrorPatch("");
    const id = Number(patchId);
    if (!userToken) {
      setTokenErrorPatch("You must provide the user token.");
      return;
    }
    if (!userPassword) {
      setPasswordErrorPatch("You must provide the user password.");
      return;
    }
    if (!id) return;
    if (!patchName) return;
    setLoadingPatch(true);
    setPatched(null);
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": userToken,
          "x-user-password": userPassword,
        },
        body: JSON.stringify({ id, name: patchName }),
      });
      const data = await res.json();
      if (res.status === 401) {
        if (data.error?.toLowerCase().includes("password")) setPasswordErrorPatch("Invalid or missing password.");
        else setTokenErrorPatch("Invalid or missing token.");
      }
      else if (res.status === 404) setPatchError("The user ID does not exist.");
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
    setTokenErrorDelete("");
    setPasswordErrorDelete("");
    const id = Number(deleteId);
    if (!userToken) {
      setTokenErrorDelete("You must provide the user token.");
      return;
    }
    if (!userPassword) {
      setPasswordErrorDelete("You must provide the user password.");
      return;
    }
    if (!id) return;
    setLoadingDelete(true);
    setDeleted(null);
    try {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-user-token": userToken,
          "x-user-password": userPassword,
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.status === 401) {
        if (data.error?.toLowerCase().includes("password")) setPasswordErrorDelete("Invalid or missing password.");
        else setTokenErrorDelete("Invalid or missing token.");
      }
      else if (res.status === 404) setDeleteError("The user ID does not exist.");
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
        <input
          type="password"
          placeholder="New user password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="api-input"
        />
        <button onClick={handleCreateUser} disabled={loadingPost || !newName || !newPassword} className="api-btn post">
          {loadingPost ? "Loading..." : "POST User"}
        </button>
        {created && (
          <div className="api-result created">
            <b>Created:</b> {created.name} (ID: {created.id})
          </div>
        )}
        {createdToken && (
          <div style={{ color: "#2563eb", marginTop: "0.5rem", fontWeight: 600 }}>
            token: {createdToken}
          </div>
        )}
      </div>
      {/* TOKEN & PASSWORD INPUT FOR PUT/PATCH/DELETE */}
      <div className="api-section" style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <label style={{ color: "#2563eb", fontWeight: 600, marginBottom: 4 }}>
          You must provide the user token to perform PUT, PATCH, or DELETE requests:
        </label>
        <input
          type="text"
          placeholder="User token"
          value={userToken}
          onChange={e => setUserToken(e.target.value)}
          className="api-input"
          style={{ marginBottom: 8, width: 320, maxWidth: "100%" }}
        />
        <label style={{ color: "#2563eb", fontWeight: 600, marginBottom: 4 }}>
          You must provide the user password to perform PUT, PATCH, or DELETE requests:
        </label>
        <input
          type="password"
          placeholder="User password"
          value={userPassword}
          onChange={e => setUserPassword(e.target.value)}
          className="api-input"
          style={{ marginBottom: 8, width: 320, maxWidth: "100%" }}
        />
      </div>
      {/* PUT section */}
      <div className="api-section">
        <input
          type="number"
          placeholder="User ID"
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
        {tokenErrorPut && (
          <div className="api-error">{tokenErrorPut}</div>
        )}
        {passwordErrorPut && (
          <div className="api-error">{passwordErrorPut}</div>
        )}
        {updateError && (
          <>
            <div className="api-error">{updateError}</div>
            <div className="api-error">You must provide the user token.</div>
            <div className="api-error">You must provide the user password.</div>
          </>
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
          placeholder="User ID"
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
        {tokenErrorPatch && (
          <div className="api-error">{tokenErrorPatch}</div>
        )}
        {passwordErrorPatch && (
          <div className="api-error">{passwordErrorPatch}</div>
        )}
        {patchError && (
          <>
            <div className="api-error">{patchError}</div>
            <div className="api-error">You must provide the user token.</div>
            <div className="api-error">You must provide the user password.</div>
          </>
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
          placeholder="User ID"
          value={deleteId}
          onChange={e => setDeleteId(e.target.value)}
          className="api-input id no-spinner"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <button onClick={handleDeleteUser} disabled={loadingDelete || !deleteId} className="api-btn delete">
          {loadingDelete ? "Loading..." : "DELETE User"}
        </button>
        {tokenErrorDelete && (
          <div className="api-error">{tokenErrorDelete}</div>
        )}
        {passwordErrorDelete && (
          <div className="api-error">{passwordErrorDelete}</div>
        )}
        {deleteError && (
          <>
            <div className="api-error">{deleteError}</div>
            <div className="api-error">You must provide the user token.</div>
            <div className="api-error">You must provide the user password.</div>
          </>
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