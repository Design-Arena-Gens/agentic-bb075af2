import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import styles from '@/styles/Home.module.css';

const SCENE_DURATION_MS = 9000;
const CANVAS_BASE_WIDTH = 1280;
const CANVAS_BASE_HEIGHT = 720;

const randomChoice = (array) => array[Math.floor(Math.random() * array.length)];
const randomBetween = (min, max) => Math.random() * (max - min) + min;

const sigils = [
  '⛧',
  '☽',
  '✧',
  '☠',
  '☣',
  '☥',
  '⛤',
  '卍',
  '卐',
  '☾'
];

function generateHorrorStory() {
  const protagonists = [
    { name: 'Mara Whitlock', archetype: 'forensic audio archivist' },
    { name: 'Ezra Calder', archetype: 'late-night radio host' },
    { name: 'Juniper Vale', archetype: 'urban explorer' },
    { name: 'Silas Graye', archetype: 'occult historian' },
    { name: 'Rhea Marlow', archetype: 'cryptid documentarian' },
    { name: 'Oren Lorne', archetype: 'abandoned theme park caretaker' }
  ];

  const settings = [
    { place: 'the submerged district of Hollowreach', tone: 'drowned neon gloom' },
    { place: 'the frost-bitten mining town of Vesper Cold', tone: 'sub-zero dread' },
    { place: 'the endless motel corridor named Room ∞', tone: 'echoing liminality' },
    { place: 'the swallowtail forest that devours echoes', tone: 'choking silence' },
    { place: 'the redline subway trapped at 03:33', tone: 'metallic claustrophobia' },
    { place: 'the derelict signal tower on Witchspire Bluff', tone: 'electrical unease' }
  ];

  const entities = [
    { name: 'The Dissonant Choir', motif: 'layered whispers that harmonize in terror' },
    { name: 'The Unremembered Surgeons', motif: 'hands that splice memories into flesh' },
    { name: 'The Cartographer of Veins', motif: 'maps etched beneath translucent skin' },
    { name: 'The Latchkey Brood', motif: 'children who unlock doors that should stay sealed' },
    { name: 'The Pallid Lumen', motif: 'light that stains its witnesses with afterimages' },
    { name: 'The Hungerbound Chapel', motif: 'architecture that expands with each sacrifice' }
  ];

  const relics = [
    'a reel-to-reel tape that records thoughts backwards',
    'a glass reliquary filled with still-screaming air',
    'an algebraic hymn scrawled in static',
    'a violin string spun from a voice the world forgot',
    'a pocketwatch that bleeds minutes',
    'a monochrome tarot whose cards whisper in ultraviolet'
  ];

  const ruptures = [
    'the frequency that unknits the spine of reality',
    'a ritual broadcast that forces listeners to remember future deaths',
    'a mirrorfold that lets hunger travel through reflections',
    'a living diagram that rearranges buildings like organs',
    'an archive of insects that can playback human regrets',
    'a staircase that descends into an echo of the sky'
  ];

  const endings = [
    { verdict: 'The signal completes but loops forever, trapping consciousness in resonance.' },
    { verdict: 'The entity adopts the protagonist’s heartbeat and walks the world in their name.' },
    { verdict: 'The town exhales relief, yet its shadow never realigns with the sun.' },
    { verdict: 'The ritual seals, but every reflective surface now shows the antagonist waiting.' },
    { verdict: 'The story ends for everyone but you; your reflection just blinked twice.' },
    { verdict: 'Silence returns, though it now pulses with your whispered confession.' }
  ];

  const palettes = [
    ['#020204', '#180212', '#68021d', '#f9dcdc'],
    ['#01060f', '#061223', '#273555', '#c7d6ff'],
    ['#050409', '#1f0d24', '#5d0833', '#ffbdc7'],
    ['#040308', '#141414', '#322d44', '#f4f1ff'],
    ['#07060e', '#1a0f25', '#3e213d', '#d79abf'],
    ['#040200', '#20100b', '#4a1e0f', '#f6d6a8']
  ];

  const cadences = [
    'Each beat of the story is a low thrum, pulling the audience deeper.',
    'It trades jump-scares for dread, gripping with a relentless pulse.',
    'Moments of silence are weaponized, sharper than any scream.',
    'Every reveal escalates the stakes, spiraling into beautiful dread.',
    'The pacing mimics a breath held too long, released only in the finale.',
    'It interleaves quiet hauntings with sudden ruptures of horror.'
  ];

  const protagonist = randomChoice(protagonists);
  const setting = randomChoice(settings);
  const entity = randomChoice(entities);
  const relic = randomChoice(relics);
  const rupture = randomChoice(ruptures);
  const ending = randomChoice(endings);
  const cadence = randomChoice(cadences);
  const palette = randomChoice(palettes);

  const titleFragments = [
    `The ${randomChoice(['Hissing', 'Hollow', 'Bleeding', 'Sunken', 'Choking', 'Fractured'])} ${randomChoice(['Signal', 'Choir', 'Corridor', 'Motel', 'Hour', 'Veil'])}`,
    `${randomChoice(['Midnight', 'Vesper', 'Bloodglass', 'Static', 'Silence', 'Depth'])} ${randomChoice(['Broadcast', 'Atlas', 'Liturgy', 'Inheritance', 'Ferryman', 'Devotion'])}`,
    `${randomChoice(['Whispers', 'Echoes', 'Psalms', 'Residues', 'Spectres', 'Marrow'])} of ${randomChoice(['Room ∞', 'Hollowreach', 'Witchspire', 'The Swallowtail', 'The Redline', 'Null Harbor'])}`
  ];

  const title = randomChoice(titleFragments);

  const logline = `${protagonist.name}, a ${protagonist.archetype}, ventures into ${setting.place} to confront ${entity.name.toLowerCase()} before ${rupture}.`;

  const tagline = `When ${entity.name} tunes the night, even silence bleeds.`;

  const scenes = [
    {
      label: 'Inciting Static',
      narrative: `${protagonist.name} answers a forbidden broadcast, following the distortion into ${setting.place}, armed only with ${relic}.`,
      visual: 'A lonely figure bathed in glitching crimson light, descending into flickering corridors.',
      cues: [
        'Flicker neon bloom',
        'Distant radio feedback',
        'Footsteps echo twice'
      ],
      palette: palette
    },
    {
      label: 'Threshold Breach',
      narrative: `The air crystallizes as ${entity.name} manifests, their ${entity.motif}. ${protagonist.name} realizes the signal maps itself across human nerves.`,
      visual: 'Veins glow like subway lines while the entity phases through existence in jagged frames.',
      cues: [
        'Heartbeat low drone',
        'Metallic whispering',
        'Vein-map overlays'
      ],
      palette: palette.slice().reverse()
    },
    {
      label: 'Ritual Crescendo',
      narrative: `With the broadcast set to overwrite reality, ${protagonist.name} rethreads ${rupture}, sacrificing their own memories to jam the frequency.`,
      visual: 'A storm of static runes, faces emerging and dissolving in the interference.',
      cues: [
        'Rising choral dissonance',
        'Signal tear opening',
        'Shadow figures watching'
      ],
      palette: palette
    },
    {
      label: 'Afterimage',
      narrative: `${ending.verdict}`,
      visual: 'Calm night warped by subtle repetitions. Your screen flickers as though someone else is watching.',
      cues: [
        'Lingering hiss',
        'Pulse falls silent',
        'A new heartbeat starts'
      ],
      palette
    }
  ];

  const narration = [
    `Title: ${title}. ${tagline}`,
    ...scenes.map((scene, index) => `Sequence ${index + 1}, ${scene.label}. ${scene.narrative}`),
    cadence
  ];

  return {
    id: cryptoRandomId(),
    title,
    protagonist,
    setting,
    entity,
    relic,
    rupture,
    ending,
    palette,
    logline,
    tagline,
    scenes,
    narration,
    cadence
  };
}

function cryptoRandomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Math.random().toString(16).slice(2)}-${Date.now()}`;
}

function useAudioEngine() {
  const audioContextRef = useRef(null);
  const masterGainRef = useRef(null);
  const cleanupRef = useRef([]);
  const recorderDestinationRef = useRef(null);

  const ensureContext = useCallback(async () => {
    if (typeof window === 'undefined') return null;
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
    }
    if (audioContextRef.current.state === 'suspended') {
      try {
        await audioContextRef.current.resume();
      } catch (error) {
        // ignore
      }
    }
    return audioContextRef.current;
  }, []);

  const stopAmbient = useCallback(() => {
    cleanupRef.current.forEach((cleanup) => cleanup());
    cleanupRef.current = [];
  }, []);

  const startAmbient = useCallback(async () => {
    const context = await ensureContext();
    if (!context) return;
    stopAmbient();

    if (!masterGainRef.current) {
      const masterGain = context.createGain();
      masterGain.gain.setValueAtTime(0.45, context.currentTime);
      masterGain.connect(context.destination);
      masterGainRef.current = masterGain;
    }

    const cleanups = [];
    const master = masterGainRef.current;

    const lowsOsc = context.createOscillator();
    const lowsGain = context.createGain();
    lowsOsc.type = 'sawtooth';
    lowsOsc.frequency.setValueAtTime(randomBetween(36, 54), context.currentTime);
    lowsGain.gain.setValueAtTime(0.06, context.currentTime);
    lowsOsc.connect(lowsGain).connect(master);
    lowsOsc.start();
    cleanups.push(() => {
      try {
        lowsOsc.stop(context.currentTime + 0.05);
      } catch {
        // ignore
      }
      lowsOsc.disconnect();
      lowsGain.disconnect();
    });

    const breathingOsc = context.createOscillator();
    const breathingGain = context.createGain();
    breathingOsc.type = 'sine';
    breathingOsc.frequency.setValueAtTime(0.18, context.currentTime);
    breathingGain.gain.setValueAtTime(0.45, context.currentTime);
    breathingOsc.connect(breathingGain.gain);
    breathingGain.connect(master);
    breathingOsc.start();
    cleanups.push(() => {
      try {
        breathingOsc.stop(context.currentTime + 0.05);
      } catch {
        // ignore
      }
      breathingOsc.disconnect();
      breathingGain.disconnect();
    });

    const noiseBuffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (i % 97 < 12 ? 0.45 : 0.12);
    }
    const noiseSource = context.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;
    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(440, context.currentTime);
    noiseFilter.Q.setValueAtTime(5, context.currentTime);
    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.04, context.currentTime);
    noiseSource.connect(noiseFilter).connect(noiseGain).connect(master);
    noiseSource.start();
    cleanups.push(() => {
      noiseSource.stop();
      noiseSource.disconnect();
      noiseFilter.disconnect();
      noiseGain.disconnect();
    });

    const stingerInterval = setInterval(() => {
      const osc = context.createOscillator();
      const gain = context.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(randomBetween(220, 520), context.currentTime);
      gain.gain.setValueAtTime(0, context.currentTime);
      gain.gain.linearRampToValueAtTime(randomBetween(0.05, 0.1), context.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.2);
      osc.connect(gain).connect(master);
      osc.start();
      osc.stop(context.currentTime + 1.5);
      setTimeout(() => {
        osc.disconnect();
        gain.disconnect();
      }, 1500);
    }, randomBetween(6500, 10500));

    cleanups.push(() => clearInterval(stingerInterval));
    cleanupRef.current = cleanups;
  }, [ensureContext, stopAmbient]);

  const connectRecorderDestination = useCallback(() => {
    const context = audioContextRef.current;
    if (!context || !masterGainRef.current) return null;
    if (recorderDestinationRef.current) return recorderDestinationRef.current;

    const destination = context.createMediaStreamDestination();
    masterGainRef.current.connect(destination);
    recorderDestinationRef.current = destination;
    return destination;
  }, []);

  const disconnectRecorderDestination = useCallback(() => {
    if (recorderDestinationRef.current && masterGainRef.current) {
      try {
        masterGainRef.current.disconnect(recorderDestinationRef.current);
      } catch {
        // ignore
      }
    }
    recorderDestinationRef.current = null;
  }, []);

  const stop = useCallback(() => {
    stopAmbient();
    disconnectRecorderDestination();
  }, [disconnectRecorderDestination, stopAmbient]);

  return {
    ensureContext,
    startAmbient,
    stop,
    connectRecorderDestination,
    disconnectRecorderDestination,
    contextRef: audioContextRef,
    masterGainRef
  };
}

function drawScene(ctx, canvas, story, sceneIndex, progress, elapsed) {
  const { width, height } = canvas;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const scene = story.scenes[sceneIndex];
  const nextScene = story.scenes[(sceneIndex + 1) % story.scenes.length];

  // Background gradient
  const gradient = ctx.createRadialGradient(
    width / 2 + Math.sin(elapsed / 1200) * 80,
    height / 2 + Math.cos(elapsed / 1600) * 120,
    0,
    width / 2,
    height / 2,
    Math.max(width, height)
  );
  const palette = scene.palette;
  palette.forEach((color, index) => {
    gradient.addColorStop(index / Math.max(palette.length - 1, 1), color);
  });
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Overlay moving shapes
  for (let i = 0; i < 8; i += 1) {
    const noiseSeed = Math.sin(elapsed / (500 + i * 77) + i * 33);
    const x = (noiseSeed + 1) * 0.5 * width;
    const y = (Math.cos(elapsed / (600 + i * 55)) + 1) * 0.5 * height;
    const radius = (Math.sin(elapsed / (350 + i * 19)) + 1.4) * 120;
    ctx.globalAlpha = 0.03 + (i % 3) * 0.02;
    ctx.fillStyle = palette[(i + sceneIndex) % palette.length];
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius * 0.65, elapsed / (900 + i * 13), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  // Sigils flicker
  ctx.fillStyle = 'rgba(255, 244, 235, 0.05)';
  ctx.font = `${Math.floor(height * 0.24)}px 'UnifrakturMaguntia', serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const sigilIdx = Math.floor((elapsed / 900) % sigils.length);
  ctx.fillText(sigils[sigilIdx], width / 2, height * 0.55);

  // Title glitch effect
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  const baseTitleSize = Math.floor(height * 0.11);
  ctx.font = `${baseTitleSize}px 'UnifrakturMaguntia', serif`;
  const glitchOffset = Math.sin(elapsed / 120) * 8;
  ctx.fillStyle = 'rgba(255,255,255,0.32)';
  ctx.fillText(story.title, width / 2 + glitchOffset, height * 0.1);
  ctx.fillStyle = 'rgba(255,60,60,0.7)';
  ctx.fillText(story.title, width / 2 - glitchOffset * 0.5, height * 0.1 - 6);
  ctx.fillStyle = 'rgba(241,241,241,0.82)';
  ctx.fillText(story.title, width / 2, height * 0.1);
  ctx.restore();

  // Story logline
  ctx.save();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = `${Math.floor(height * 0.03)}px 'Unna', serif`;
  ctx.fillStyle = 'rgba(215, 210, 210, 0.8)';
  wrapText(ctx, story.logline, width / 2, height * 0.25, width * 0.7, height * 0.04);
  ctx.restore();

  // Scene box
  const boxPadding = 40;
  const boxWidth = width * 0.8;
  const boxHeight = height * 0.38;
  const boxX = (width - boxWidth) / 2;
  const boxY = height * 0.42;
  ctx.fillStyle = 'rgba(3, 3, 3, 0.45)';
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
  ctx.strokeStyle = 'rgba(244, 70, 70, 0.25)';
  ctx.lineWidth = 3;
  ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

  ctx.save();
  ctx.translate(boxX + boxPadding, boxY + boxPadding);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = `${Math.floor(height * 0.04)}px 'Unna', serif`;
  ctx.fillStyle = 'rgba(255, 240, 240, 0.92)';
  ctx.fillText(scene.label, 0, 0);

  ctx.font = `${Math.floor(height * 0.027)}px 'Unna', serif`;
  ctx.fillStyle = 'rgba(230, 229, 233, 0.8)';
  wrapText(ctx, scene.narrative, 0, boxHeight * 0.18, boxWidth - boxPadding * 2, height * 0.038);
  ctx.restore();

  ctx.save();
  ctx.translate(boxX + boxWidth - boxPadding, boxY + boxHeight - boxPadding * 1.5);
  ctx.textAlign = 'right';
  ctx.font = `${Math.floor(height * 0.026)}px 'Unna', serif`;
  ctx.fillStyle = 'rgba(255, 120, 120, 0.82)';
  const cueSpacing = height * 0.034;
  scene.cues.forEach((cue, idx) => {
    ctx.globalAlpha = 0.6 + Math.sin((elapsed / 700) + idx) * 0.25;
    ctx.fillText(`✦ ${cue}`, 0, -idx * cueSpacing);
  });
  ctx.restore();

  // Transition overlay to next scene
  const fadeThreshold = 0.18;
  if (progress > 1 - fadeThreshold) {
    const fadeProgress = (progress - (1 - fadeThreshold)) / fadeThreshold;
    ctx.globalAlpha = fadeProgress * 0.9;
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, 0, width, height);
    ctx.globalAlpha = fadeProgress;
    ctx.fillStyle = 'rgba(210, 40, 40, 0.6)';
    ctx.font = `${Math.floor(height * 0.035)}px 'UnifrakturMaguntia', serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`Next: ${nextScene.label}`, width / 2, height * 0.84);
    ctx.globalAlpha = 1;
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  words.forEach((word, index) => {
    const testLine = `${line}${word} `;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && index > 0) {
      ctx.fillText(line, x, currentY);
      line = `${word} `;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });
  if (line) {
    ctx.fillText(line, x, currentY);
  }
}

function createMediaRecorder(canvas, audioDestination, onStop) {
  const stream = canvas.captureStream(30);
  if (audioDestination) {
    audioDestination.stream.getAudioTracks().forEach((track) => {
      stream.addTrack(track);
    });
  }
  const mimeTypes = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4'
  ];
  let supported = null;
  mimeTypes.every((type) => {
    if (MediaRecorder.isTypeSupported(type)) {
      supported = type;
      return false;
    }
    return true;
  });
  const recorder = new MediaRecorder(stream, supported ? { mimeType: supported, videoBitsPerSecond: 5_000_000 } : undefined);
  const chunks = [];
  recorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };
  recorder.onstop = () => {
    const blob = new Blob(chunks, { type: supported || 'video/webm' });
    onStop(blob);
  };
  return recorder;
}

function useNarrator(voices) {
  const synthesisRef = useRef(null);
  const activeUtteranceRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    synthesisRef.current = window.speechSynthesis;
    return () => {
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  const stopNarration = useCallback(() => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    activeUtteranceRef.current = null;
  }, []);

  const narrate = useCallback(
    async (lines) => {
      if (!synthesisRef.current || !lines?.length) return;
      synthesisRef.current.cancel();

      const preferredVoices = voices.length
        ? voices
        : synthesisRef.current.getVoices();

      const deepVoice =
        preferredVoices.find((voice) =>
          /harsh|bass|dark|male|horror|sinister|zombie|night/i.test(`${voice.name} ${voice.lang}`)
        ) ||
        preferredVoices.find((voice) => /en-US|en-GB/i.test(voice.lang) && voice.name.toLowerCase().includes('male')) ||
        preferredVoices.find((voice) => /en/i.test(voice.lang)) ||
        null;

      const speakLine = (text) =>
        new Promise((resolve) => {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.pitch = 0.45;
          utterance.rate = 0.82;
          utterance.volume = 0.92;
          if (deepVoice) {
            utterance.voice = deepVoice;
          }
          utterance.onend = resolve;
          utterance.onerror = resolve;
          activeUtteranceRef.current = utterance;
          synthesisRef.current.speak(utterance);
        });

      for (const line of lines) {
        // eslint-disable-next-line no-await-in-loop
        await speakLine(line);
      }
      activeUtteranceRef.current = null;
    },
    [voices]
  );

  return {
    narrate,
    stopNarration
  };
}

export default function Home() {
  const [story, setStory] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [voices, setVoices] = useState([]);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const animationStartRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const { startAmbient, stop, ensureContext, connectRecorderDestination, disconnectRecorderDestination, masterGainRef } =
    useAudioEngine();
  const { narrate, stopNarration } = useNarrator(voices);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => {
      const synth = window.speechSynthesis;
      if (!synth) return;
      const availableVoices = synth.getVoices();
      if (availableVoices.length) {
        setVoices(availableVoices);
      }
    };
    handler();
    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', handler);
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.removeEventListener('voiceschanged', handler);
      }
    };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const ratio = CANVAS_BASE_WIDTH / CANVAS_BASE_HEIGHT;
    let width = rect.width;
    let height = rect.height;
    if (width / height > ratio) {
      width = height * ratio;
    } else {
      height = width / ratio;
    }
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);
  }, []);

  useEffect(() => {
    resizeCanvas();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeCanvas);
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
    return undefined;
  }, [resizeCanvas]);

  useEffect(() => {
    if (!story) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    const totalDuration = story.scenes.length * SCENE_DURATION_MS;

    const render = (timestamp) => {
      if (!animationStartRef.current) {
        animationStartRef.current = timestamp;
      }
      const elapsed = (timestamp - animationStartRef.current) % totalDuration;
      const sceneIndex = Math.floor(elapsed / SCENE_DURATION_MS);
      const sceneProgress = (elapsed % SCENE_DURATION_MS) / SCENE_DURATION_MS;
      drawScene(ctx, canvas, story, sceneIndex, sceneProgress, elapsed);
      animationFrame = requestAnimationFrame(render);
    };

    animationFrame = requestAnimationFrame(render);
    animationFrameRef.current = animationFrame;

    return () => {
      cancelAnimationFrame(animationFrame);
      animationStartRef.current = null;
    };
  }, [story]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    stopNarration();
    stop();
    await ensureContext();
    const nextStory = generateHorrorStory();
    setStory(nextStory);
    setRecordedBlob(null);
    setIsGenerating(false);
  }, [ensureContext, stop, stopNarration]);

  const handlePlay = useCallback(async () => {
    if (!story) return;
    await ensureContext();
    await startAmbient();
    setIsNarrating(true);
    await narrate(story.narration);
    setIsNarrating(false);
  }, [ensureContext, narrate, startAmbient, story]);

  const handleStopAudio = useCallback(() => {
    setIsNarrating(false);
    stopNarration();
    stop();
  }, [stop, stopNarration]);

  const handleStartRecording = useCallback(async () => {
    if (!story || isRecording) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    await ensureContext();
    await startAmbient();
    const audioDestination = connectRecorderDestination();
    const recorder = createMediaRecorder(canvas, audioDestination, (blob) => {
      setRecordedBlob(blob);
      setIsRecording(false);
      disconnectRecorderDestination();
    });
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
    recorder.start();
  }, [
    connectRecorderDestination,
    disconnectRecorderDestination,
    ensureContext,
    isRecording,
    startAmbient,
    story
  ]);

  const handleStopRecording = useCallback(() => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;
  }, []);

  const downloadRecording = useCallback(() => {
    if (!recordedBlob) return;
    const url = URL.createObjectURL(recordedBlob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${story?.title?.toLowerCase().replace(/\s+/g, '-') || 'horror-story'}.webm`;
    anchor.click();
    URL.revokeObjectURL(url);
  }, [recordedBlob, story]);

  const storyMeta = useMemo(() => {
    if (!story) return [];
    return [
      { label: 'Setting', value: `${story.setting.place} • ${story.setting.tone}` },
      { label: 'Antagonist', value: `${story.entity.name} — ${story.entity.motif}` },
      { label: 'Relic', value: story.relic },
      { label: 'Rupture', value: story.rupture },
      { label: 'Cadence', value: story.cadence }
    ];
  }, [story]);

  return (
    <>
      <Head>
        <title>Horror Signal Forge</title>
        <meta name="description" content="Generate AI horror story videos with immersive deep-voice narration and dread soundscapes." />
      </Head>
      <div className={styles.page}>
        <main className={styles.main}>
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={styles.stageSection}
          >
            <div className={styles.stage} ref={containerRef}>
              <canvas ref={canvasRef} className={styles.canvas} />
              <div className={styles.overlay}>
                {!story && (
                  <div className={styles.overlayPrompt}>
                    <p>Invoke a narrative to awaken the signal.</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.controls}>
              <button type="button" onClick={handleGenerate} disabled={isGenerating} className={styles.primaryButton}>
                {isGenerating ? 'Summoning...' : story ? 'Conjure Another' : 'Conjure Story'}
              </button>
              <button type="button" onClick={handlePlay} disabled={!story || isNarrating} className={styles.secondaryButton}>
                {isNarrating ? 'Narrating…' : 'Play Deep Voice'}
              </button>
              <button type="button" onClick={handleStopAudio} disabled={!story} className={styles.secondaryButton}>
                Silence Audio
              </button>
              <button
                type="button"
                onClick={handleStartRecording}
                disabled={!story || isRecording}
                className={styles.secondaryButton}
              >
                {isRecording ? 'Recording…' : 'Start Capture'}
              </button>
              <button
                type="button"
                onClick={handleStopRecording}
                disabled={!isRecording}
                className={styles.secondaryButton}
              >
                Stop Capture
              </button>
              <button
                type="button"
                onClick={downloadRecording}
                disabled={!recordedBlob}
                className={styles.primaryButton}
              >
                Download Haunted WebM
              </button>
            </div>
          </motion.section>

          {story && (
            <motion.section
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className={styles.detailSection}
            >
              <div className={styles.storyHeader}>
                <h1>{story.title}</h1>
                <p>{story.tagline}</p>
              </div>
              <div className={styles.metaGrid}>
                {storyMeta.map((meta) => (
                  <div key={meta.label} className={styles.metaCard}>
                    <span>{meta.label}</span>
                    <strong>{meta.value}</strong>
                  </div>
                ))}
              </div>
              <div className={styles.sceneGrid}>
                {story.scenes.map((scene, index) => (
                  <article key={scene.label} className={styles.sceneCard}>
                    <header>
                      <span>Sequence {index + 1}</span>
                      <h2>{scene.label}</h2>
                    </header>
                    <p className={styles.sceneNarrative}>{scene.narrative}</p>
                    <p className={styles.sceneVisual}>{scene.visual}</p>
                    <ul className={styles.cueList}>
                      {scene.cues.map((cue) => (
                        <li key={cue}>{cue}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </motion.section>
          )}
        </main>
      </div>
    </>
  );
}
