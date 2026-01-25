// electron/preload.cjs
const { contextBridge, ipcRenderer } = require("electron");

/**
 * Expose a safe API to the renderer.
 * You can add more functions here later (events, logs, etc.)
 */
contextBridge.exposeInMainWorld("reqruita", {
    // Keep your existing ping
    ping: () => ipcRenderer.invoke("app:ping"),

    // Interview mode (fullscreen/kiosk lock)
    enterInterviewMode: () => ipcRenderer.invoke("rq:enter-interview-mode"),
    exitInterviewMode: () => ipcRenderer.invoke("rq:exit-interview-mode"),
});
