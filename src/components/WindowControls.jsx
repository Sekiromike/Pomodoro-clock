import React from 'react';

const WindowControls = () => {
    const handleMinimize = () => {
        if (window.electronAPI) {
            window.electronAPI.minimize();
        }
    };

    const handleClose = () => {
        if (window.electronAPI) {
            window.electronAPI.close();
        }
    };

    const handleFullscreen = () => {
        if (window.electronAPI) {
            window.electronAPI.toggleFullscreen();
        }
    };

    return (
        <div className="window-controls">
            <button onClick={handleMinimize} className="control-btn minimize" aria-label="Minimize">─</button>
            <button onClick={handleFullscreen} className="control-btn fullscreen" aria-label="Fullscreen">□</button>
            <button onClick={handleClose} className="control-btn close" aria-label="Close">✕</button>
        </div>
    );
};

export default WindowControls;
