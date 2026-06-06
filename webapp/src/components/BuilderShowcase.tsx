export function BuilderShowcase() {
  return (
    <section className="section builder-cta" id="build">
      <div className="builder-shell">
        <div className="builder-head reveal">
          <h2>What will you build next?</h2>
        </div>

        <div className="builder-showcase reveal" data-reveal-delay="60">
          <div className="builder-composer">
            <div className="builder-input">
              <div className="builder-prompt-field">
                <div className="builder-intent-row">
                  <span className="builder-intent">
                    <img
                      src="./assests/yuinxLogo_Trans.jpg"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    Yuinx AI
                    <span className="builder-live-dot" aria-hidden="true" />
                  </span>
                </div>

                <div className="builder-action-row" aria-hidden="true">
                  <button
                    type="button"
                    className="builder-action-pill builder-action-pill-accent is-active"
                    data-builder-action="generate"
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 3v18" />
                      <path d="M3 12h18" />
                    </svg>
                    Generate
                  </button>
                  <button
                    type="button"
                    className="builder-action-pill"
                    data-builder-action="add-part"
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                      <rect x="4" y="4" width="16" height="16" rx="4" />
                    </svg>
                    Add Part
                  </button>
                  <button
                    type="button"
                    className="builder-action-pill"
                    data-builder-action="breadboard"
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4" y="6" width="16" height="12" rx="2" />
                      <path d="M8 10h.01" />
                      <path d="M12 10h.01" />
                      <path d="M16 10h.01" />
                      <path d="M8 14h8" />
                    </svg>
                    Breadboard
                  </button>
                  <button
                    type="button"
                    className="builder-action-pill"
                    data-builder-action="schematic"
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M7 7h4v4H7z" />
                      <path d="M13 13h4v4h-4z" />
                      <path d="M11 9h2" />
                      <path d="M9 11v2" />
                      <path d="M15 11v2" />
                      <path d="M11 15h2" />
                    </svg>
                    Schematic
                  </button>
                  <button
                    type="button"
                    className="builder-action-pill"
                    data-builder-action="pcb"
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="5" y="5" width="14" height="14" rx="3" />
                      <path d="M9 3v4" />
                      <path d="M15 3v4" />
                      <path d="M9 17v4" />
                      <path d="M15 17v4" />
                      <path d="M3 9h4" />
                      <path d="M3 15h4" />
                      <path d="M17 9h4" />
                      <path d="M17 15h4" />
                    </svg>
                    PCB
                  </button>
                  <button
                    type="button"
                    className="builder-action-pill"
                    data-builder-action="simulate"
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 14c1.8-4.8 4.8-7.2 9-7.2 1.9 0 3.6.5 5 1.6" />
                      <path d="M19 10.4V6.8h-3.6" />
                      <path d="M19 10c-1.8 4.8-4.8 7.2-9 7.2-1.9 0-3.6-.5-5-1.6" />
                      <path d="M5 13.6v3.6h3.6" />
                    </svg>
                    Simulate
                  </button>
                  <button
                    type="button"
                    className="builder-action-pill"
                    data-builder-action="serial-monitor"
                  >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="4" y="5" width="16" height="12" rx="2" />
                      <path d="M8 20h8" />
                      <path d="M12 17v3" />
                      <path d="M8 9h8" />
                      <path d="M8 12h5" />
                    </svg>
                    Serial
                  </button>
                </div>

                <div className="builder-stage" aria-hidden="true">
                  <div className="builder-stage-panel is-active" data-builder-panel="generate">
                    <div className="builder-stage-generate">
                      <p className="builder-typed" data-builder-typed aria-live="polite" />
                    </div>
                  </div>

                  <div className="builder-stage-panel" data-builder-panel="add-part">
                    <div className="builder-stage-parts">
                      <div className="builder-stage-parts-marquee">
                        <PartsTrack />
                        <PartsTrack />
                      </div>
                    </div>
                  </div>

                  <div className="builder-stage-panel" data-builder-panel="breadboard">
                    <div className="builder-stage-board">
                      <div className="builder-breadboard">
                        <div className="builder-breadboard-rails">
                          <span />
                          <span />
                        </div>
                        <div className="builder-breadboard-main">
                          <div className="builder-breadboard-chip builder-breadboard-chip-uno" />
                          <div className="builder-breadboard-module builder-breadboard-module-sensor">
                            HC-SR04
                          </div>
                          <div className="builder-breadboard-resistor builder-breadboard-resistor-a" />
                          <div className="builder-breadboard-resistor builder-breadboard-resistor-b" />
                          <div className="builder-breadboard-led builder-breadboard-led-a" />
                          <div className="builder-breadboard-led builder-breadboard-led-b" />
                          <div className="builder-breadboard-wire builder-breadboard-wire-a" />
                          <div className="builder-breadboard-wire builder-breadboard-wire-b" />
                          <div className="builder-breadboard-wire builder-breadboard-wire-c" />
                          <div className="builder-breadboard-wire builder-breadboard-wire-d" />
                          <div className="builder-breadboard-wire builder-breadboard-wire-e" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="builder-stage-panel" data-builder-panel="schematic">
                    <div className="builder-stage-schematic">
                      <svg viewBox="0 0 520 180" fill="none" aria-hidden="true">
                        <text x="28" y="54">U1</text>
                        <text x="116" y="54">R1</text>
                        <text x="254" y="54">C1</text>
                        <text x="364" y="46">Q1</text>
                        <text x="454" y="54">LED1</text>
                        <path d="M28 90h78" />
                        <path d="M106 90l14-18 14 36 14-36 14 36 14-36 14 18" />
                        <path d="M190 90h74" />
                        <path d="M264 64v52" />
                        <path d="M282 64v52" />
                        <path d="M282 90h68" />
                        <path d="M350 90c0-20 14-34 34-34s34 14 34 34-14 34-34 34-34-14-34-34Z" />
                        <path d="M384 90h38" />
                        <path d="M422 90h70" />
                        <path d="M60 90v38" />
                        <path d="M46 128h28" />
                        <path d="M50 136h20" />
                        <path d="M54 144h12" />
                        <circle cx="264" cy="90" r="4" fill="currentColor" stroke="none" />
                        <circle cx="282" cy="90" r="4" fill="currentColor" stroke="none" />
                        <circle cx="422" cy="90" r="4" fill="currentColor" stroke="none" />
                      </svg>
                    </div>
                  </div>

                  <div className="builder-stage-panel" data-builder-panel="pcb">
                    <div className="builder-stage-pcb">
                      <div className="builder-pcb">
                        <div className="builder-pcb-chip" />
                        <div className="builder-pcb-silk builder-pcb-silk-a">U1</div>
                        <div className="builder-pcb-silk builder-pcb-silk-b">J1</div>
                        <div className="builder-pcb-silk builder-pcb-silk-c">D1</div>
                        <span className="builder-pcb-pad builder-pcb-pad-a" />
                        <span className="builder-pcb-pad builder-pcb-pad-b" />
                        <span className="builder-pcb-pad builder-pcb-pad-c" />
                        <span className="builder-pcb-pad builder-pcb-pad-d" />
                        <span className="builder-pcb-pad builder-pcb-pad-e" />
                        <span className="builder-pcb-pad builder-pcb-pad-f" />
                        <span className="builder-pcb-trace builder-pcb-trace-a" />
                        <span className="builder-pcb-trace builder-pcb-trace-b" />
                        <span className="builder-pcb-trace builder-pcb-trace-c" />
                        <span className="builder-pcb-trace builder-pcb-trace-d" />
                        <span className="builder-pcb-trace builder-pcb-trace-e" />
                        <span className="builder-pcb-trace builder-pcb-trace-f" />
                        <div className="builder-pcb-vias">
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="builder-stage-panel" data-builder-panel="simulate">
                    <div className="builder-stage-simulate">
                      <div className="builder-stage-sim-controls">
                        <span className="sim-btn sim-btn-run">Run</span>
                        <span className="sim-btn">Pause</span>
                        <span className="sim-readout">5.00 V</span>
                        <span className="sim-readout">0.42 A</span>
                      </div>
                      <div className="builder-stage-sim-stats">
                        <span className="sim-stat sim-stat-live">Node A: HIGH</span>
                        <span className="sim-stat">PWM: 78%</span>
                        <span className="sim-stat">24.8 C</span>
                      </div>
                      <div className="builder-stage-sim-wave">
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="builder-stage-sim-bottom">
                        <div className="builder-stage-sim-flow">
                          <span />
                        </div>
                        <div className="builder-stage-sim-nodes">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="builder-stage-panel" data-builder-panel="serial-monitor">
                    <div className="builder-stage-serial">
                      <div className="builder-stage-serial-head">
                        <span className="serial-port">COM3</span>
                        <span className="serial-baud">9600 baud</span>
                      </div>
                      <div className="builder-stage-serial-screen">
                        <div className="builder-stage-serial-track">
                          <span>&gt; Booting sensor node...</span>
                          <span>&gt; WiFi: connected</span>
                          <span>&gt; Temp: 24.8 C</span>
                          <span>&gt; Moisture: 61%</span>
                          <span>&gt; Pump: OFF</span>
                          <span>&gt; Temp: 24.9 C</span>
                          <span>&gt; Moisture: 60%</span>
                          <span>&gt; Pump: ON</span>
                          <span>&gt; Temp: 24.8 C</span>
                          <span>&gt; Moisture: 61%</span>
                          <span>&gt; Pump: OFF</span>
                          <span>&gt; Temp: 24.9 C</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="builder-send"
                  aria-label="Show next example prompt"
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 12h13" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartsTrack() {
  const parts = [
    { name: 'Arduino Uno', img: './assests/parts/arduino_uno_breadboard.svg' },
    { name: 'Resistor', img: './assests/parts/resistor_breadboard.svg' },
    { name: 'LED', img: './assests/parts/led_breadboard.svg' },
    { name: 'Capacitor', img: './assests/parts/capacitor_breadboard.svg' },
    { name: 'NPN Transistor', img: './assests/parts/transistor_npn_breadboard.svg' },
    { name: 'Inductor', img: './assests/parts/inductor_breadboard.svg' },
    { name: 'RGB LED', img: './assests/parts/rgb_led_breadboard.svg' },
    { name: 'PNP Transistor', img: './assests/parts/transistor_pnp_breadboard.svg' },
  ];

  return (
    <div className="builder-stage-parts-track" aria-hidden="true">
      {parts.map((part) => (
        <div className="builder-part-card" key={part.name}>
          <img src={part.img} alt="" loading="lazy" decoding="async" />
          <span>{part.name}</span>
        </div>
      ))}
    </div>
  );
}
