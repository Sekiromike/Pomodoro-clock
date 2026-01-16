import React, { useState, useEffect, useRef } from 'react';
import Timer from './components/Timer';
import Controls from './components/Controls';
import Settings from './components/Settings';
import { NoiseGenerator } from './utils/NoiseGenerator';

function App() {
    const [isActive, setIsActive] = useState(false);
    const [isFocusMode, setIsFocusMode] = useState(true);

    // Durations in seconds. 25 min = 1500, 5 min = 300
    const [durations, setDurations] = useState({
        focus: 25 * 60,
        shortBreak: 5 * 60,
    });

    const [timeLeft, setTimeLeft] = useState(durations.focus);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    const noiseGen = useRef(new NoiseGenerator());

    // Update timeLeft when durations change and we are in that mode & not active (or just reset)
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(isFocusMode ? durations.focus : durations.shortBreak);
        }
    }, [durations, isFocusMode, isActive]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Timer finished
            setIsActive(false);
            // Play sound / notification here
            if (soundEnabled) {
                // Play placeholder sound or beep
                const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
                audio.play().catch(e => console.log('Audio play failed', e));
            }

            const notificationMessage = isFocusMode ? "Focus session complete. Take a break." : "Break over. Ready to focus?";
            new Notification("Zen Focus Timer", { body: notificationMessage });

            // Auto-switch mode
            setIsFocusMode(!isFocusMode);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, isFocusMode, soundEnabled]);

    // Handle Ambient Noise
    useEffect(() => {
        if (isActive && isFocusMode && soundEnabled) {
            noiseGen.current.play();
        } else {
            noiseGen.current.stop();
        }
        // Cleanup on unmount
        return () => noiseGen.current.stop();
    }, [isActive, isFocusMode, soundEnabled]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(isFocusMode ? durations.focus : durations.shortBreak);
    };

    return (
        <div className={`app-container ${isFocusMode ? 'mode-focus' : 'mode-break'}`}>
            {/* Settings Gear */}
            <div
                className="settings-icon"
                onClick={() => setShowSettings(true)}
                style={{ position: 'absolute', bottom: 20, left: 20, cursor: 'pointer', opacity: 0.5, zIndex: 10 }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>

            <main className="main-content">
                <Timer
                    timeLeft={timeLeft}
                    duration={isFocusMode ? durations.focus : durations.shortBreak}
                    isFocusMode={isFocusMode}
                />
                <Controls
                    isActive={isActive}
                    onToggle={toggleTimer}
                    onReset={resetTimer}
                />
            </main>

            {showSettings && (
                <Settings
                    durations={durations}
                    setDurations={setDurations}
                    soundEnabled={soundEnabled}
                    setSoundEnabled={setSoundEnabled}
                    onClose={() => setShowSettings(false)}
                />
            )}
        </div>
    )
}

export default App
