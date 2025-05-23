"use client";

import React, { useState, useRef, useEffect } from "react";
import "../css/apis-page.css";

export default function ApiPracticePage() {
  const [loading, setLoading] = useState(false);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingPut, setLoadingPut] = useState(false);
  const [loadingPatch, setLoadingPatch] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [lastResult, setLastResult] = useState<React.ReactNode>(null);

  const [updateName, setUpdateName] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [patchName, setPatchName] = useState("");
  const [patchId, setPatchId] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const [userToken, setUserToken] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [tokenErrorPut, setTokenErrorPut] = useState("");
  const [tokenErrorPatch, setTokenErrorPatch] = useState("");
  const [tokenErrorDelete, setTokenErrorDelete] = useState("");
  const [passwordErrorPut, setPasswordErrorPut] = useState("");
  const [passwordErrorPatch, setPasswordErrorPatch] = useState("");
  const [passwordErrorDelete, setPasswordErrorDelete] = useState("");

  const getRequestId = useRef(0);

  type User = {
    id: number;
    name: string;
    password?: string;
    token?: string;
    [key: string]: string | number | undefined;
  };
  const [userList, setUserList] = useState<User[]>([]);
  const [showUserList, setShowUserList] = useState(false);
  const [emptyList, setEmptyList] = useState(false);
  const [columns, setColumns] = useState(["id", "name", "password", "token"]);

  const [showFullPopup, setShowFullPopup] = useState(false);

  // GET
  const handleGetUser = async () => {
    setLoading(true);
    setLoadingGet(true);
    setLastResult(null);
    setEmptyList(false);

    const currentRequest = ++getRequestId.current;

    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        if (res.status === 429) {
          setLastResult(<div className="api-error">Too many requests. Please wait a moment.</div>);
        }
        setLoadingGet(false);
        setLoading(false);
        return;
      }
      const data = await res.json();

      if (currentRequest !== getRequestId.current) return;

      if (!data || data.length === 0) {
        setUserList([]);
        setShowUserList(false);
        setEmptyList(true);
        setLastResult(null);
      } else {
        setUserList(data);
        setShowUserList(true);
        setEmptyList(false);
        setLastResult(null);
        if (data.length > 0) {
          const keys = Object.keys(data[0]);
          setColumns([
            "id",
            "name",
            ...(keys.includes("password") ? ["password"] : []),
            ...(keys.includes("token") ? ["token"] : []),
          ]);
        }
      }
    } catch {
      if (currentRequest !== getRequestId.current) return;
      setUserList([]);
      setShowUserList(false);
      setEmptyList(true);
      setLastResult(null);
    }
    setLoadingGet(false);
    setLoading(false);
  };

  // POST
  const handleCreateUser = async () => {
    if (!newName || !newPassword) return;
    if (newName.length > 15 || newPassword.length > 15) {
      setLastResult(<div className="api-error">Username and password must be 15 characters or less.</div>);
      return;
    }
    if (userList.length >= 20) {
      setShowFullPopup(true);
      return;
    }
    setLastResult(null);
    setEmptyList(false);
    try {
      setLoadingPost(true);
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, password: newPassword }),
      });
      const data = await res.json();
      if (res.status === 429) {
        alert("Too many requests. Please wait a moment.");
      } else {
        setLastResult(
          <div className="user-credentials-label" style={{ fontSize: "0.93rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
            <span>
              <b>ID:</b> {data.user.id}
            </span>
            <span>
              <b>User:</b> {data.user.name}
            </span>
            <span>
              <b>password:</b> {data.user.password}
            </span>
            <span>
              <b>token:</b> {data.user.token}
            </span>
          </div>
        );
      }
    } finally {
      setLoadingPost(false);
      setNewName("");
      setNewPassword("");
    }
  };

  // PUT
  const handleUpdateUser = async () => {
    setLastResult(null);
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
        setLastResult(null);
      }
      else if (res.status === 404) {
        setLastResult(<div className="api-error">The user ID does not exist.</div>);
      }
      else if (res.status === 429) alert("Too many requests. Please wait a moment.");
      else {
        setLastResult(
          <div className="api-result updated">
            <b>Updated:</b> {data.name} (ID: {data.id})
          </div>
        );
        // NO actualizar userList ni showUserList aquí
      }
    } finally {
      setLoadingPut(false);
      setUpdateName("");
      setUpdateId("");
    }
  };

  // PATCH
  const handlePatchUser = async () => {
    setLastResult(null);
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
    if (patchName.length > 15) {
      setLastResult(<div className="api-error">Username must be 15 characters or less.</div>);
      return;
    }
    setLoadingPatch(true);
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
        setLastResult(null);
      }
      else if (res.status === 404) {
        setLastResult(<div className="api-error">The user ID does not exist.</div>);
      }
      else if (res.status === 429) alert("Too many requests. Please wait a moment.");
      else {
        setLastResult(
          <div className="api-result patched">
            <b>Patched:</b> {data.name} (ID: {data.id})
          </div>
        );
        // NO actualizar userList ni showUserList aquí
      }
    } finally {
      setLoadingPatch(false);
      setPatchName("");
      setPatchId("");
    }
  };

  // DELETE
  const handleDeleteUser = async () => {
    setLastResult(null);
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
        setLastResult(null);
      }
      else if (res.status === 404) {
        setLastResult(<div className="api-error">The user ID does not exist.</div>);
      }
      else if (res.status === 429) alert("Too many requests. Please wait a moment.");
      else {
        setLastResult(
          <div className="api-result deleted">
            <b>Deleted user with ID:</b> {data.id}
          </div>
        );
        // NO actualizar userList ni showUserList aquí
      }
    } finally {
      setLoadingDelete(false);
      setDeleteId("");
    }
  };

  const handleClear = () => {
    setShowUserList(false);
    setUserList([]);
    setEmptyList(false);
    setLastResult(null);
    setTokenErrorPut("");
    setTokenErrorPatch("");
    setTokenErrorDelete("");
    setPasswordErrorPut("");
    setPasswordErrorPatch("");
    setPasswordErrorDelete("");
  };

  // --- LOGIN MODULE STATE ---
  const [loginUser, setLoginUser] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginToken, setLoginToken] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Limpiar error al cambiar campos
  useEffect(() => {
    setLoginError("");
  }, [loginUser, loginPassword, loginToken]);

  // --- LOGIN HANDLER ---
  const handleLogin = async () => {
    setLoginError("");
    if (!loginUser || !loginPassword || !loginToken) {
      setLoginError("All fields are required.");
      return;
    }
    if (
      loginUser.length > 15 ||
      loginPassword.length > 15 ||
      loginToken.length > 15
    ) {
      setLoginError("Each field must be 15 characters or less.");
      return;
    }
    setLoginLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: true,
          name: loginUser,
          password: loginPassword,
          token: loginToken,
        }),
      });
      const data = await res.json();

      if (res.ok && data && data.user) {
        // Save credentials to localStorage and cookies
        if (typeof window !== "undefined") {
          localStorage.setItem("api-demo-user", loginUser);
          localStorage.setItem("api-demo-token", loginToken);
          localStorage.setItem("api-demo-password", loginPassword);
          document.cookie = `api-demo-user=${loginUser}; path=/`;
          document.cookie = `api-demo-token=${loginToken}; path=/`;
          document.cookie = `api-demo-password=${loginPassword}; path=/`;
        }
        // Limpiar los campos de login
        setLoginUser("");
        setLoginPassword("");
        setLoginToken("");
        // Redirigir a la página de bienvenida en una ventana pequeña
        if (typeof window !== "undefined") {
          const width = Math.round(window.screen.width * 0.3);
          const height = 420;
          const left = Math.round(window.screen.width * 0.35);
          const top = Math.round(window.screen.height * 0.15);
          window.open(
            "/apis-page/welcome?username=" + encodeURIComponent(data.user.name),
            "automation-welcome",
            `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`
          );
        }
      } else if (data && data.error) {
        setLoginError(data.error);
      } else {
        setLoginError("Invalid credentials or user not found.");
      }
    } catch {
      setLoginError("Network or server error.");
    }
    setLoginLoading(false);
  };

  // --- RENDER ---
  return (
    <div className="api-container">
      {/* POPUP MODAL */}
      {showFullPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <div className="popup-warning">The table is full</div>
            <div className="popup-message">
              You can only have 20 users in the table.<br />
              Please delete one to add another.
            </div>
            <button
              className="popup-btn"
              onClick={() => setShowFullPopup(false)}
            >
              Accept
            </button>
          </div>
        </div>
      )}
      <h1 className="api-title">API Practice</h1>
      <p className="api-description">
        <b>Warning!</b> This API practice service is shared by the whole community.<br />
        Please use it responsibly and with caution to avoid overloading the system.<br />
        <b>These requests are mocked</b> and do not affect any real data.<br />
        Remember: it is for learning and testing purposes only—do not abuse requests!
      </p>
      <div className="api-section api-section-row">
        <button onClick={handleGetUser} disabled={loading || loadingGet} className="api-btn get">
          {loadingGet ? "Loading..." : "GET Users"}
        </button>
        <button onClick={handleClear} disabled={loading} className="api-btn clear">
          CLEAR
        </button>
      </div>
      {/* User list grid */}
      {emptyList && !lastResult && (
        <div className="api-error api-center">USER TABLE IS EMPTY</div>
      )}
      {showUserList && userList.length > 0 && (
        <div className="api-user-list-grid">
          <table>
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col}>{col === "id" ? "User ID" : col === "name" ? "User Name" : col.charAt(0).toUpperCase() + col.slice(1)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userList.map(u => (
                <tr key={u.id}>
                  {columns.map(col => (
                    <td key={col}>{u[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="api-section">
        <input
          type="text"
          placeholder="New user name"
          value={newName}
          onChange={e => setNewName(e.target.value.slice(0, 15))}
          className="api-input"
          maxLength={15}
        />
        <input
          type="text"
          placeholder="New user password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value.slice(0, 15))}
          className="api-input"
          maxLength={15}
        />
        <button onClick={handleCreateUser} disabled={loading || loadingPost || !newName || !newPassword} className="api-btn post">
          {loadingPost ? "Loading..." : "POST User"}
        </button>
        {/* USER RESULT */}
        {lastResult}
      </div>
      {/* TOKEN & PASSWORD INPUT FOR PUT/PATCH/DELETE */}
      <div className="api-section api-section-col">
        <label className="api-helper-label-red">
          You must provide the user password and token to perform PUT, PATCH, or DELETE requests:
        </label>
        <input
          type="text"
          placeholder="User password"
          value={userPassword}
          onChange={e => setUserPassword(e.target.value.slice(0, 15))}
          className="api-input"
          maxLength={15}
        />
        <input
          type="text"
          placeholder="User token"
          value={userToken}
          onChange={e => setUserToken(e.target.value.slice(0, 15))}
          className="api-input"
          maxLength={15}
        />
      </div>
      {/* PUT */}
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
          onChange={e => setUpdateName(e.target.value.slice(0, 15))}
          className="api-input"
          maxLength={15}
        />
        <button onClick={handleUpdateUser} disabled={loading || loadingPut || !updateName || !updateId} className="api-btn put">
          {loadingPut ? "Loading..." : "PUT User"}
        </button>
        {tokenErrorPut && <div className="api-error">{tokenErrorPut}</div>}
        {passwordErrorPut && <div className="api-error">{passwordErrorPut}</div>}
      </div>
      {/* PATCH */}
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
          onChange={e => setPatchName(e.target.value.slice(0, 15))}
          className="api-input"
          maxLength={15}
        />
        <button onClick={handlePatchUser} disabled={loading || loadingPatch || !patchName || !patchId} className="api-btn patch">
          {loadingPatch ? "Loading..." : "PATCH User"}
        </button>
        {tokenErrorPatch && <div className="api-error">{tokenErrorPatch}</div>}
        {passwordErrorPatch && <div className="api-error">{passwordErrorPatch}</div>}
      </div>
      {/* DELETE */}
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
        <button onClick={handleDeleteUser} disabled={loading || loadingDelete || !deleteId} className="api-btn delete">
          {loadingDelete ? "Loading..." : "DELETE User"}
        </button>
        {tokenErrorDelete && <div className="api-error">{tokenErrorDelete}</div>}
        {passwordErrorDelete && <div className="api-error">{passwordErrorDelete}</div>}
      </div>

      {/* LOGIN MODULE */}
      <div className="api-login-module" style={{ marginTop: "4rem" }}>
        <h2 className="api-title">Login with API User</h2>
        <p className="api-description">
          <b>How to log in:</b> Enter the <b>User Name</b>, <b>Password</b>, and <b>Token</b> of a user you created above.<br />
          All fields are required and must be 15 characters or less.<br />
          On success, your credentials will be saved in local storage and cookies for testing.
        </p>
        <div className="api-section">
          <input
            type="text"
            placeholder="User name"
            value={loginUser}
            onChange={e => setLoginUser(e.target.value.slice(0, 15))}
            className="api-input"
            maxLength={15}
            autoComplete="username"
          />
          <input
            type="text"
            placeholder="Password"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value.slice(0, 15))}
            className="api-input"
            maxLength={15}
            autoComplete="current-password"
          />
          <input
            type="text"
            placeholder="Token"
            value={loginToken}
            onChange={e => setLoginToken(e.target.value.slice(0, 15))}
            className="api-input"
            maxLength={15}
            autoComplete="off"
          />
          <button
            onClick={handleLogin}
            disabled={loginLoading || !loginUser || !loginPassword || !loginToken}
            className="api-btn post"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </div>
        {loginError && <div className="api-error">{loginError}</div>}
      </div>
    </div>
  );
}