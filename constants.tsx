import { CaseFile, LogEntry, PhilosophyEntry, Project, SkillGroup, Education } from './types';

export const SYSTEM_ID = "SD_CORE_v2.4.0";

export const PERSONAL_INFO = {
  name: "SAI_DESHMUKH",
  handle: "SD_ARCH",
  role: "SYSTEMS_ARCHITECT",
  email: "saideshmukh717@gmail.com",
  linkedin: "linkedin.com/in/SaiDeshmukh717",
  github: "github.com/SaiDeshmukh717",
  location: "GUJARAT_IN",
  objective: "ENGINEERING_RESILIENT_DATA_SYSTEMS",
  summary: "Final-year Computer Engineering student focusing on distributed architectures and time-series inference. Specialization in high-availability pipelines and local-first data persistence. Expert in Python-based analytical stacks and raw socket communication.",
  status: {
    state: "STABLE",
    uptime: "99.99%",
    load: "0.42",
    kernel: "V2.4.0-STABLE",
    last_update: "2024.03.25"
  },
  stack: ["PYTHON", "C++", "SQL", "JAVA", "SCIKIT-LEARN", "PANDAS", "SOCKETS"]
};

export const SKILLS: SkillGroup[] = [
  {
    category: "DATA_ENGINEERING",
    items: ["Pandas", "NumPy", "Time-Series Normalization", "Feature Extraction", "LSTM Inference"]
  },
  {
    category: "SYSTEM_LEVEL",
    items: ["Socket Programming", "TCP/IP Stack", "Multithreading", "Memory Mapping", "Linux Internal Arch"]
  },
  {
    category: "CORE_STACK",
    items: ["Python", "Java", "C++", "PostgreSQL", "Shell Scripting", "Modular Architecture"]
  },
  {
    category: "WORKFLOW",
    items: ["Git/GitHub", "Docker Engine", "CI/CD Protocols", "Unit Testing", "API Orchestration"]
  }
];

export const CASE_FILES: CaseFile[] = [
  {
    id: "CF_001_TSLA",
    title: "TSLA_INFERENCE_ENGINE",
    objective: "Quantify market volatility signals via non-stationary data normalization protocols.",
    constraints: [
      "Sub-10ms inference latency requirement for edge deployment.",
      "Non-stationary signal noise compensation.",
      "Zero external internet dependency for processing loop."
    ],
    architecture: "RAW_FEED -> WINDOWED_NORMALIZER -> FEATURE_ENGINEERING -> LSTM_CORE -> VISUAL_LOG.",
    tradeoffs: [
      "Efficiency: Opted for optimized LSTM over Transformers for local resource conservation.",
      "Stability: Implemented fixed 90-cycle lookback to prevent memory bloat."
    ],
    metrics: "85.4% directional accuracy; 4.2ms avg inference latency.",
    failures: "Initial ARIMA implementation failed on high-freq spikes; moved to neural architecture.",
    stack: ["PYTHON", "NUMPY", "PANDAS", "PYTORCH"]
  },
  {
    id: "CF_002_SOC",
    title: "DISTRIBUTED_SOCKET_BACKBONE",
    objective: "Establish zero-packet-loss communication infrastructure across isolated LAN nodes.",
    constraints: [
      "Immutable local-first persistence layers.",
      "Concurrency handling for 10+ high-freq input nodes.",
      "Raw TCP stream management without library abstraction."
    ],
    architecture: "TCP_HANDLER -> CIRCULAR_BUFFER -> STATE_SYNCHRONIZER -> PERSISTENCE_LAYER (MAPPED_FILES).",
    tradeoffs: [
      "Reliability: TCP selected over UDP to ensure absolute log integrity.",
      "Performance: Flat-file JSON mapping used for instant state reconstruction."
    ],
    metrics: "0% packet loss over 1M stress cycles; 2ms peer-to-peer relay time.",
    failures: "Early threading model caused deadlocks on peak load; implemented non-blocking I/O.",
    stack: ["PYTHON", "SOCKETS", "THREADING", "OS_LIB"]
  }
];

export const PROJECTS: Project[] = [
  {
    type: "DATA_ANALYSIS",
    title: "PREDICTIVE_MARKET_VISUALIZER",
    techStack: ["PYTHON", "MATPLOTLIB", "PANDAS"],
    description: [
      "Visualized windowed moving averages and signal volatility.",
      "Implemented real-time data ingestion for local CSV feeds.",
      "Optimized rendering pipeline for high-freq updates."
    ]
  },
  {
    type: "SECURITY_PROTOCOL",
    title: "LAN_AUTHENTICATION_NODE",
    techStack: ["C++", "SOCKETS", "SHA256"],
    description: [
      "Engineered local-only device verification module.",
      "Implemented symmetric key rotation for peer-to-peer handshakes.",
      "Zero-latency overhead for verified node communication."
    ]
  }
];

export const BUILD_LOG: LogEntry[] = [
  {
    date: "2024.03.25",
    title: "STORAGE_HANDLER_OPTIMIZATION",
    status: "iteration",
    content: "Migrated from standard file I/O to memory-mapped files. I/O latency reduced by 42%."
  },
  {
    date: "2024.03.10",
    title: "SIGNAL_PROCESSING_RESEARCH",
    status: "research",
    content: "Integrated Fast Fourier Transforms (FFT) for noise filtration in non-stationary market feeds."
  },
  {
    date: "2024.02.15",
    title: "LAN_HANDSHAKE_DEPLOYMENT",
    status: "deploy",
    content: "Deployed v1.2 of the node-sync handshake. Local-first cluster identity established."
  }
];

export const PHILOSOPHY: PhilosophyEntry[] = [
  {
    title: "COMPLEXITY_DEBT",
    statement: "Abstraction is a loan. Only pay it when repetition becomes more expensive than architecture maintenance."
  },
  {
    title: "LOG_CONSISTENCY",
    statement: "System state must be reconstructible from logs. If it is not logged, it did not happen."
  },
  {
    title: "LOCAL_FIRST_MANTRA",
    statement: "External dependencies are failure points. Systems must operate in isolation by default."
  }
];

export const EDUCATION: Education = {
  institution: "SIGMA_INSTITUTE_OF_ENGINEERING",
  degree: "B_TECH",
  major: "COMPUTER_ENGINEERING",
  location: "GUJARAT_IN",
  graduation: "2025"
};

export const RELEVANT_COURSEWORK = [
  "ADVANCED_ALGORITHMS",
  "OPERATING_SYSTEMS",
  "DATABASE_DESIGN",
  "NETWORK_PROTOCOLS",
  "NEURAL_NETWORKS",
  "DISTRIBUTED_COMPUTING"
];