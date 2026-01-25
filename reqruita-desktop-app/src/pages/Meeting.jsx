import React, { useEffect, useRef, useState } from "react";

export default function Meeting({ role, onEnd }) {
    const [camStream, setCamStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null);
    const camRef = useRef(null);
    const screenRef = useRef(null);

    const [error, setError] = useState("");

    useEffect(() => {
        // For MVP re-request 
        // pass streams from DeviceCheck and reuse them.
        (async () => {
            try {
                const cam = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setCamStream(cam);
                if (camRef.current) camRef.current.srcObject = cam;

                const scr = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
                setScreenStream(scr);
                if (screenRef.current) screenRef.current.srcObject = scr;

                const track = scr.getVideoTracks()[0];
                if (track) {
                    track.onended = () => {
                        setError("Screen sharing stopped");
                    };
                }
            } catch (e) {
                setError("Could not start meeting streams. Please check permissions.");
            }
        })();

        return () => {
            stopStream(camStream);
            stopStream(screenStream);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function endSession() {
        stopStream(camStream);
        stopStream(screenStream);
        onEnd();
    }

    return (
        <div>
            <h2 style={{ margin: 0 }}>Meeting Session</h2>
            <p style={{ opacity: 0.85 }}>
                MVP meeting page (local streams only). Role: <b>{role}</b>
            </p>

            {error && <div style={{ marginTop: 10, color: "#ff9b9b" }}>{error}</div>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
                <Box title="Camera + Mic (local)">
                    <video ref={camRef} autoPlay playsInline muted style={videoStyle} />
                </Box>

                <Box title="Screen Share (local)">
                    <video ref={screenRef} autoPlay playsInline muted style={videoStyle} />
                </Box>
            </div>

            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
                <button onClick={endSession} style={endBtn}>End Session</button>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.8 }}>
                Next step after this: add “focus change detection” + send events to backend.
            </div>
        </div>
    );
}