// src/pages/MeetingInterviewer.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./auth-ui.css";

/**
 * MeetingInterviewer.jsx
 * - Right panel toggles: Participants / Chat / Notes
 * - Notes has Remarks/Details toggle
 * - Main stage shrinks when right panel opens, tiles keep same size
 *
 * NOTE:
 * - This is MVP UI + local state (no backend)
 * - Interviewee video/share are placeholders 
 */

export default function MeetingInterviewer({ session, onEnd }) {
    const videoRef = useRef(null);

    // Streams / devices
    const [devices, setDevices] = useState({ mics: [], cams: [] });
    const [selectedMicId, setSelectedMicId] = useState("");
    const [selectedCamId, setSelectedCamId] = useState("");
    const [micMuted, setMicMuted] = useState(false);
    const [camOff, setCamOff] = useState(false);
    const [camStream, setCamStream] = useState(null);
    const [error, setError] = useState("");

    // Right panel: null | "participants" | "chat" | "notes"
    const [panel, setPanel] = useState(null);

    // Chat
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([
        { id: 1, who: "them", name: "Interviewee", text: "Hi! Can you hear me okay?", time: "09:12" },
        { id: 2, who: "me", name: "You", text: "Yes, loud and clear. Let’s start.", time: "09:12" },
    ]);

    // Notes
    const [notesTab, setNotesTab] = useState("remarks"); // remarks | details
    const [remarks, setRemarks] = useState("");

    // Participants (demo data)
    const [interviewing] = useState([
        { id: "p1", name: "Mas Rover" },
        { id: "p2", name: "Robert Nachino" },
    ]);

    const [waiting, setWaiting] = useState([
        { id: "w1", name: "Elaina Kurama" },
        { id: "w2", name: "Navia Fon" },
        { id: "w3", name: "Jack Bron" },
        { id: "w4", name: "Raiden" },
    ]);

    const [completed, setCompleted] = useState([
        { id: "c1", name: "Aether" },
        { id: "c2", name: "Ananta" },
        { id: "c3", name: "Brian Sumo" },
        { id: "c4", name: "Mavuika" },
    ]);

    const micLabel = useMemo(() => {
        const d = devices.mics.find((x) => x.deviceId === selectedMicId);
        return d?.label || "Microphone";
    }, [devices.mics, selectedMicId]);

    const camLabel = useMemo(() => {
        const d = devices.cams.find((x) => x.deviceId === selectedCamId);
        return d?.label || "Camera";
    }, [devices.cams, selectedCamId]);

    // Keep meeting non-scroll (right panel will scroll internally)
    useEffect(() => {
        document.body.classList.add("rq-noscr");
        return () => document.body.classList.remove("rq-noscr");
    }, []);

    // Start camera+mic once so labels appear on Windows
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                if (!mounted) return;

                setCamStream(stream);
                if (videoRef.current) videoRef.current.srcObject = stream;

                const list = await navigator.mediaDevices.enumerateDevices();
                const mics = list.filter((d) => d.kind === "audioinput");
                const cams = list.filter((d) => d.kind === "videoinput");
                setDevices({ mics, cams });

                if (mics[0]?.deviceId) setSelectedMicId(mics[0].deviceId);
                if (cams[0]?.deviceId) setSelectedCamId(cams[0].deviceId);
            } catch (e) {
                setError("Could not access camera/microphone. Please check permissions.");
            }
        })();

        return () => {
            mounted = false;
            stopStream(camStream);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Apply toggles to current stream
    useEffect(() => {
        if (!camStream) return;
        setTracksEnabled(camStream, "audio", !micMuted);
    }, [micMuted, camStream]);

    useEffect(() => {
        if (!camStream) return;
        setTracksEnabled(camStream, "video", !camOff);
    }, [camOff, camStream]);

    function toggleMic() {
        setMicMuted((v) => !v);
    }

    function toggleCam() {
        setCamOff((v) => !v);
    }

    function endInterview() {
        stopStream(camStream);
        onEnd?.();
    }

    function togglePanel(next) {
        setPanel((cur) => (cur === next ? null : next));
    }

    // Waiting room actions
    function acceptCandidate(id) {
        const person = waiting.find((x) => x.id === id);
        if (!person) return;
        setWaiting((arr) => arr.filter((x) => x.id !== id));
        setCompleted((arr) => [person, ...arr]);
    }

    function rejectCandidate(id) {
        setWaiting((arr) => arr.filter((x) => x.id !== id));
    }

    // Chat send
    function sendMessage() {
        const text = chatInput.trim();
        if (!text) return;

        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        setMessages((m) => [...m, { id: Date.now(), who: "me", name: "You", text, time }]);
        setChatInput("");
    }