import React from 'react';

const Settings = ({ durations, setDurations, soundEnabled, setSoundEnabled, onClose }) => {
    // Local state for inputs to allow empty strings during typing
    const [focusInput, setFocusInput] = React.useState(durations.focus / 60);
    const [breakInput, setBreakInput] = React.useState(durations.shortBreak / 60);

    // Sync local state if props change
    React.useEffect(() => {
        setFocusInput(durations.focus / 60);
        setBreakInput(durations.shortBreak / 60);
    }, [durations]);

    const handleFocusChange = (e) => {
        const val = e.target.value;
        setFocusInput(val);
        const num = parseFloat(val);
        // Only update global state if valid number > 0
        if (!isNaN(num) && num > 0) {
            setDurations({ ...durations, focus: num * 60 });
        }
    };

    const handleBreakChange = (e) => {
        const val = e.target.value;
        setBreakInput(val);
        const num = parseFloat(val);
        // Only update global state if valid number > 0
        if (!isNaN(num) && num > 0) {
            setDurations({ ...durations, shortBreak: num * 60 });
        }
    };

    return (
        <div className="settings-overlay">
            <div className="settings-modal">
                <h2>Settings</h2>

                <div className="setting-group">
                    <label>Focus (min)</label>
                    <input
                        type="number"
                        value={focusInput}
                        onChange={handleFocusChange}
                    />
                </div>

                <div className="setting-group">
                    <label>Break (min)</label>
                    <input
                        type="number"
                        value={breakInput}
                        onChange={handleBreakChange}
                    />
                </div>

                <div className="setting-group">
                    <label>Ambient Sound</label>
                    <select
                        value={soundEnabled ? 'brown' : 'none'}
                        onChange={(e) => setSoundEnabled(e.target.value === 'brown')}
                        style={{ background: '#333', color: 'white', border: 'none', padding: '5px', borderRadius: '4px' }}
                    >
                        <option value="none">Silent</option>
                        <option value="brown">Brown Noise</option>
                    </select>
                </div>

                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Settings;
