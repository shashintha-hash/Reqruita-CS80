import React, { useEffect } from "react";
import "./auth-ui.css";

import bg from "../assets/role-bg.png";
import logo from "../assets/reqruita-logo.png";

export default function RoleSelect({ onPickRole }) {
    // Disable scrolling only on this screen
    useEffect(() => {
        document.body.classList.add("rq-noscr");
        return () => document.body.classList.remove("rq-noscr");
    }, []);

    return (
        <div className="rs-shell">
            <div className="rs-left" style={{ backgroundImage: `url(${bg})` }}>
                <div className="rs-left-content">
                    <h1 className="rs-welcome rs-fade-in">
                        Welcome to <br />
                        Reqruita!
                    </h1>
                </div>
            </div>

            <div className="rs-right">
                <div className="rs-panel rs-fade-in">
                    <div className="rs-logo">
                        <img src={logo} alt="Reqruita" style={{ width: 72, height: 72 }} />
                    </div>

                    <button
                        className="rs-btn rs-btn-primary rs-btn-card"
                        onClick={() => onPickRole("join")}
                    >
                        <span className="rs-btn-label">Join interview</span>
                        <span className="rs-btn-sub">For candidates</span>
                    </button>

                    <div className="rs-or">or</div>

                    <button
                        className="rs-btn rs-btn-card"
                        onClick={() => onPickRole("conduct")}
                    >
                        <span className="rs-btn-label">Conduct interview</span>
                        <span className="rs-btn-sub">For interviewers</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
