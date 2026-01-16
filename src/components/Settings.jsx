import React from 'react';

const Settings = ({ durations, setDurations, soundEnabled, setSoundEnabled, onClose }) => {
    return (
        <div className="settings-overlay">
            <div className="settings-modal">
                <h2>Settings</h2>

                <div className="setting-group">
                    <label>Focus (min)</label>
                    <input
                        type="number"
                        value={durations.focus / 60}
                        onChange={(e) => setDurations({ ...durations, focus: e.target.value * 60 })}
                    />
                </div>

                <div className="setting-group">
                    <label>Break (min)</label>
                    <input
                        type="number"
                        value={durations.shortBreak / 60}
                        onChange={(e) => setDurations({ ...durations, shortBreak: e.target.value * 60 })}
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
