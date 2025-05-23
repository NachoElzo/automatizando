"use client";

import React, { useState } from "react";
import {
  mockCreateUser,
  mockUpdateUser,
  mockPatchUser,
  mockDeleteUser,
} from "../../../apis/api-calls";
import "../css/apis-page.css";

export default function ApiPracticePage() {
  // Loading states for each operation
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

  // Local user list for UI
  const [userList, setUserList] = useState<{ id: number; name: string }[]>([
    { id: 1, name: "Jane Doe" }
  ]);

  const [showUserList, setShowUserList] = useState(false);

  const handleGetUser = async () => {
    setLoadingGet(true);
    setTimeout(() => {
      setLoadingGet(false);
      setShowUserList(true); // Mostrar la lista solo al hacer GET
    }, 500);
  };

  const handleCreateUser = async () => {
    if (!newName) return;
    setShowUserList(false); // Oculta la lista al hacer POST
    setLoadingPost(true);
    setCreated(null);
    const data = await mockCreateUser(newName);
    setCreated(data);
    setUserList(prev => [...prev, data]);
    setLoadingPost(false);
    setNewName("");
  };

  const handleUpdateUser = async () => {
    setShowUserList(false); // Oculta la lista al hacer PUT
    setUpdateError("");
    const id = Number(updateId);
    if (!id || !userList.some(u => u.id === id)) {
      setUpdateError("The user ID does not exist.");
      setUpdated(null);
      return;
    }
    if (!updateName) return;
    setLoadingPut(true);
    setUpdated(null);
    const data = await mockUpdateUser(id, updateName);
    setUpdated(data);
    setUserList(prev =>
      prev.map(u => (u.id === id ? { ...u, name: updateName } : u))
    );
    setLoadingPut(false);
    setUpdateName("");
    setUpdateId("");
  };

  const handlePatchUser = async () => {
    setShowUserList(false); // Oculta la lista al hacer PATCH
    setPatchError("");
    const id = Number(patchId);
    if (!id || !userList.some(u => u.id === id)) {
      setPatchError("The user ID does not exist.");
      setPatched(null);
      return;
    }
    if (!patchName) return;
    setLoadingPatch(true);
    setPatched(null);
    const data = await mockPatchUser(id, patchName);
    setPatched(data);
    setUserList(prev =>
      prev.map(u => (u.id === id ? { ...u, name: patchName } : u))
    );
    setLoadingPatch(false);
    setPatchName("");
    setPatchId("");
  };

  const handleDeleteUser = async () => {
    setShowUserList(false); // Oculta la lista al hacer DELETE
    setDeleteError("");
    const id = Number(deleteId);
    if (!id || !userList.some(u => u.id === id)) {
      setDeleteError("The user ID does not exist.");
      setDeleted(null);
      return;
    }
    setLoadingDelete(true);
    setDeleted(null);
    const data = await mockDeleteUser(id);
    setDeleted(data);
    setUserList(prev => prev.filter(u => u.id !== id));
    setLoadingDelete(false);
    setDeleteId("");
  };

  return (
    <div className="api-container">
      <h1 className="api-title">API Practice (Safe Mock)</h1>
      <p className="api-description">
        <b>Warning!</b> This API practice service is shared by the whole community.<br />
        Please use it responsibly and with caution to avoid overloading the system.<br />
        <b>These requests are mocked</b> and do not affect any real data.<br /></p>
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
          className="api-input id"
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
          className="api-input id"
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
          className="api-input id"
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