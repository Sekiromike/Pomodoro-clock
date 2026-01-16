// Simple Brown Noise Generator using Web Audio API
export class NoiseGenerator {
    constructor() {
        this.ctx = null;
        this.node = null;
        this.gainNode = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    play() {
        if (!this.ctx) this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        if (this.node) return; // Already playing

        const bufferSize = 4096;
        this.node = this.ctx.createScriptProcessor(bufferSize, 1, 1);

        this.node.onaudioprocess = (e) => {
            const output = e.outputBuffer.getChannelData(0);
            let lastOut = 0;
            for (let i = 0; i < bufferSize; i++) {
                const white = Math.random() * 2 - 1;
                output[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = output[i];
                output[i] *= 3.5; // (roughly) compensate for gain
            }
        };

        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = 0.05; // Low volume for ambient
        this.node.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);
    }

    stop() {
        if (this.node) {
            this.node.disconnect();
            this.node = null;
        }
        if (this.gainNode) {
            this.gainNode.disconnect();
            this.gainNode = null;
        }
    }

    setVolume(value) {
        if (this.gainNode) this.gainNode.gain.value = value;
    }
}
