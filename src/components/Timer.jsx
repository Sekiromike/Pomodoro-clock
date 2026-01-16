import React from 'react';

const Timer = ({ timeLeft, duration, isFocusMode }) => {
    // Calculate progress
    // total seconds vs current seconds
    // But for now, we'll just take progress as a prop or calculate it here
    // Let's assume timeLeft is in seconds.

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const radius = 140;
    const circumference = 2 * Math.PI * radius;
    // progress: 1 = full, 0 = empty.
    // We want it to decrease as time goes down? Or fill up?
    // Usually depleting is good for "time left".
    const progress = timeLeft / duration;
    const dashoffset = circumference * (1 - progress);

    return (
        <div className="timer-container">
            <svg className="progress-ring" width="320" height="320">
                <circle
                    className="progress-ring__circle-bg"
                    stroke="var(--text-secondary)"
                    strokeWidth="4"
                    fill="transparent"
                    r={radius}
                    cx="160"
                    cy="160"
                    opacity="0.2"
                />
                <circle
                    className="progress-ring__circle"
                    stroke="var(--accent-color)"
                    strokeWidth="6"
                    fill="transparent"
                    r={radius}
                    cx="160"
                    cy="160"
                    style={{
                        strokeDasharray: `${circumference} ${circumference}`,
                        strokeDashoffset: dashoffset,
                        transition: 'stroke-dashoffset 1s linear'
                    }}
                />
            </svg>
            <div className="time-display">
                <h1>{formattedTime}</h1>
                <p>{isFocusMode ? 'FOCUS' : 'BREAK'}</p>
            </div>
        </div>
    );
};

export default Timer;
