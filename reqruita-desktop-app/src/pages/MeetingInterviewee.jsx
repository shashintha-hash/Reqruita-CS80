// src/pages/MeetingInterviewee.jsx
import React, { useEffect, useRef, useState } from "react";
import "./auth-ui.css";

/**
 * Interviewee (Join) Meeting
 * - Enters "interview mode" (fullscreen + kiosk-ish) on mount via preload API
 * - Exits interview mode when leaving / unmounting
 * - Main area: REAL screen share (getDisplayMedia)
 * - Left tile: REAL interviewee camera (getUserMedia)
 * - Right tile: interviewer placeholder (image/box for now)
 * - Footer: Mic/Video toggles + Leave Interview
 *
 * Requires preload exposing:
 * window.reqruita.enterInterviewMode()
 * window.reqruita.exitInterviewMode()
 */

export default function MeetingInterviewee({ session, onLeave }) {
    const shareRef = useRef(null);
    const camRef = useRef(null);

    const [shareStream, setShareStream] = useState(null);
    const [camStream, setCamStream] = useState(null);

    const [micMuted, setMicMuted] = useState(false);
    const [camOff, setCamOff] = useState(false);

    const [error, setError] = useState("");

    // Enter full-screen "locked" mode when candidate joins
    useEffect(() => {
        try {
            window.reqruita?.enterInterviewMode?.();
        } catch (e) {
            // ignore (e.g., running in browser dev without Electron)
        }

        // Safety: always unlock on unmount
        return () => {
            try {
                window.reqruita?.exitInterviewMode?.();
            } catch (e) {
                // ignore
            }
        };
    }, []);

    // Keep meeting non-scroll (panel can scroll internally elsewhere)
    useEffect(() => {
        document.body.classList.add("rq-noscr");
        return () => document.body.classList.remove("rq-noscr");
    }, []);

    // Start camera + screen share when entering meeting
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setError("");

                // Interviewee camera + mic (local)
                const cam = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (!mounted) return;

                setCamStream(cam);
                if (camRef.current) camRef.current.srcObject = cam;

                // Screen share (candidate shares screen)
                const scr = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
                if (!mounted) return;

                setShareStream(scr);
                if (shareRef.current) shareRef.current.srcObject = scr;

                // Detect stop share from browser UI
                const track = scr.getVideoTracks()[0];
                if (track) {
                    track.onended = () => {
                        stopStream(scr);
                        setShareStream(null);
                        if (shareRef.current) shareRef.current.srcObject = null;
                        setError("Screen sharing stopped.");
                    };
                }
            } catch (e) {
                setError("Could not start camera/screen share. Please check permissions.");
            }
        })();

        return () => {
            mounted = false;
            stopStream(camStream);
            stopStream(shareStream);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);