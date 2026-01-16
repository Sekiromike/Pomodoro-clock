import React from 'react';

const Controls = ({ isActive, onToggle, onReset }) => {
    return (
        <div className="controls">
            <button onClick={onToggle}>
                {isActive ? 'PAUSE' : 'START'}
            </button>
            {/* Optional: Show reset only when paused or always? Keeping it minimal. */}
            {/* Maybe a smaller secondary button or just a shortcut */}
        </div>
    );
};

export default Controls;
