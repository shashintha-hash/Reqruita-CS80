---
description: instructions on how to start the Reqruita application (backend and frontend)
---

To run the full application, you need to start both the backend servers and the desktop application.

### 1. Start the Backend Servers
Open a terminal in the `backend` directory and run:
```powershell
cd backend
npm run dev
```
> [!NOTE]
> This command uses `concurrently` to start both the **main server** (port 3001) and the **auth server** (port 3002).

### 2. Start the Desktop Application
Open a **separate** terminal in the `reqruita-desktop-app` directory and run:
```powershell
cd reqruita-desktop-app
npm run dev
```
> [!IMPORTANT]
> Ensure the backend is running first so that the application can authenticate and join meetings successfully.

### 3. (Optional) Run Chat Verification
To verify the chat system independently, you can run:
```powershell
cd backend
node verify_chat_realtime.js
```
