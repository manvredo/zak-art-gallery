'use client';
import { useState, useEffect } from 'react';

// Arbeitsplan-Komponente für ZAK Art Gallery
// Kann später mit Supabase verbunden werden für Persistenz

export default function Arbeitsplan() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeBlock, setActiveBlock] = useState(null);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(50 * 60); // 50 Minuten in Sekunden
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  
  // Wochentag ermitteln
  const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  const today = weekdays[currentTime.getDay()];

  // Tagesstruktur
  const dailyBlocks = [
    { id: 'morning', time: '09:00–10:00', name: 'Morgenroutine', desc: 'Kaffee, Zeitung, Tagesplanung', color: 'bg-gray-100' },
    { id: 'core1', time: '10:00–13:00', name: 'KERNZEIT MALEN', desc: 'Hauptbilder bei Tageslicht. 3× Pomodoro.', color: 'bg-blue-100', isCore: true },
    { id: 'lunch', time: '13:00–13:30', name: 'Mittagspause', desc: 'Essen, echte Pause', color: 'bg-green-100' },
    { id: 'core2', time: '13:30–15:30', name: 'KERNZEIT MALEN', desc: 'Weiter an Hauptbildern. 2× Pomodoro.', color: 'bg-blue-100', isCore: true },
    { id: 'nap', time: '15:30–16:30', name: 'Power Nap', desc: '30–60 Min. Ruhe', color: 'bg-purple-100' },
    { id: 'evening', time: '16:30–20:00', name: 'Abendblock', desc: 'Siehe Wochenplan', color: 'bg-orange-100' },
  ];

  // Wochenplan für Abendblock
  const weeklyPlan = {
    'Montag': { task: 'Wochenplanung + Website', desc: 'Woche strukturieren, Website weiterentwickeln' },
    'Dienstag': { task: 'Fotografie', desc: 'Bilder fotografieren mit Strahlern' },
    'Mittwoch': { task: 'Zeichnen', desc: 'Porträts, Studien, Skizzen' },
    'Donnerstag': { task: 'Administration', desc: 'Werksverzeichnis, Nummerierung, Rahmen' },
    'Freitag': { task: 'Website + Upload', desc: 'Fotos bearbeiten, auf Website hochladen' },
    'Samstag': { task: 'Recherche', desc: 'Andere Künstler studieren, Inspiration' },
    'Sonntag': { task: 'Experimentell / Frei', desc: 'Freies Arbeiten, neue Techniken testen' },
  };

  // Monatsziele
  const [monthlyGoals, setMonthlyGoals] = useState([
    { id: 1, text: '4–6 Bilder fertigstellen', done: false },
    { id: 2, text: 'Alle fertigen Bilder fotografieren', done: false },
    { id: 3, text: 'Website aktualisieren', done: false },
    { id: 4, text: 'Mindestens 1 Galerie kontaktieren', done: false },
    { id: 5, text: 'Werksverzeichnis pflegen', done: false },
  ]);

  // Aufgabenbereiche Checkliste
  const [tasks, setTasks] = useState([
    { id: 'paint', category: 'Malen', items: [
      { id: 'p1', text: 'Brüssower See (80×60)', done: false },
      { id: 'p2', text: 'Stettiner Haff (70×50)', done: false },
      { id: 'p3', text: 'Strandszene', done: false },
    ]},
    { id: 'photo', category: 'Fotografie', items: [
      { id: 'ph1', text: 'Strahler-Setup testen', done: false },
      { id: 'ph2', text: 'Äpfel-Stillleben fotografieren', done: false },
      { id: 'ph3', text: 'Nachtbild fotografieren', done: false },
    ]},
    { id: 'web', category: 'Website', items: [
      { id: 'w1', text: 'Neue Bilder hochladen', done: false },
      { id: 'w2', text: 'Arbeitsplan-Seite fertig', done: false },
      { id: 'w3', text: 'Studien-Sektion anlegen', done: false },
    ]},
    { id: 'admin', category: 'Administration', items: [
      { id: 'a1', text: 'Nummerierungssystem festlegen', done: false },
      { id: 'a2', text: 'Alle Bilder inventarisieren', done: false },
      { id: 'a3', text: 'Rahmen sortieren', done: false },
    ]},
  ]);

  // Aktuellen Block ermitteln
  useEffect(() => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const timeNum = hour * 60 + minute;

    if (timeNum >= 540 && timeNum < 600) setActiveBlock('morning');
    else if (timeNum >= 600 && timeNum < 780) setActiveBlock('core1');
    else if (timeNum >= 780 && timeNum < 810) setActiveBlock('lunch');
    else if (timeNum >= 810 && timeNum < 930) setActiveBlock('core2');
    else if (timeNum >= 930 && timeNum < 990) setActiveBlock('nap');
    else if (timeNum >= 990 && timeNum < 1200) setActiveBlock('evening');
    else setActiveBlock(null);
  }, [currentTime]);

  // Uhr aktualisieren
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Pomodoro Timer
  useEffect(() => {
    let interval;
    if (pomodoroActive && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      // Timer abgelaufen
      if (!isBreak) {
        setCompletedPomodoros(c => c + 1);
        setIsBreak(true);
        setPomodoroTime(10 * 60); // 10 Min Pause
        playSound();
      } else {
        setIsBreak(false);
        setPomodoroTime(50 * 60); // 50 Min Arbeit
        playSound();
      }
    }
    return () => clearInterval(interval);
  }, [pomodoroActive, pomodoroTime, isBreak]);

  const playSound = () => {
    // Browser-Notification wenn erlaubt
    if (Notification.permission === 'granted') {
      new Notification(isBreak ? '⏰ Pause vorbei!' : '🍅 Pomodoro fertig! Pause machen.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTask = (categoryId, itemId) => {
    setTasks(tasks.map(cat => 
      cat.id === categoryId 
        ? { ...cat, items: cat.items.map(item => 
            item.id === itemId ? { ...item, done: !item.done } : item
          )}
        : cat
    ));
  };

  const toggleMonthlyGoal = (goalId) => {
    setMonthlyGoals(goals => goals.map(g => 
      g.id === goalId ? { ...g, done: !g.done } : g
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Arbeitsplan Kunstproduktion</h1>
          <div className="flex flex-wrap gap-4 items-center text-gray-600">
            <span className="text-xl">{today}, {currentTime.toLocaleDateString('de-DE')}</span>
            <span className="text-2xl font-mono bg-gray-100 px-3 py-1 rounded">
              {currentTime.toLocaleTimeString('de-DE')}
            </span>
          </div>
        </div>

        {/* Pomodoro Timer */}
        <div className={`rounded-lg shadow-md p-6 mb-6 ${isBreak ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                🍅 Pomodoro Timer {isBreak ? '(PAUSE)' : '(ARBEIT)'}
              </h2>
              <p className="text-gray-600">50 Min arbeiten, 10 Min Pause</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-mono font-bold">
                {formatTime(pomodoroTime)}
              </span>
              <button
                onClick={() => {
                  setPomodoroActive(!pomodoroActive);
                  if (Notification.permission === 'default') {
                    Notification.requestPermission();
                  }
                }}
                className={`px-6 py-3 rounded-lg font-semibold text-white ${
                  pomodoroActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {pomodoroActive ? '⏸ Stop' : '▶ Start'}
              </button>
              <button
                onClick={() => {
                  setPomodoroActive(false);
                  setIsBreak(false);
                  setPomodoroTime(50 * 60);
                }}
                className="px-4 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
              >
                ↺ Reset
              </button>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-green-600">{completedPomodoros}</span>
              <p className="text-sm text-gray-500">Pomodoros heute</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Tagesstruktur */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">📅 Tagesstruktur</h2>
            <div className="space-y-2">
              {dailyBlocks.map(block => (
                <div 
                  key={block.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activeBlock === block.id 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-transparent'
                  } ${block.color}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-sm text-gray-500">{block.time}</span>
                      <h3 className={`font-semibold ${block.isCore ? 'text-blue-700' : ''}`}>
                        {block.name}
                      </h3>
                      <p className="text-sm text-gray-600">{block.desc}</p>
                    </div>
                    {activeBlock === block.id && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">JETZT</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heutiger Abendblock */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">🌙 Heute Abend: {weeklyPlan[today]?.task}</h2>
            <p className="text-gray-600 mb-4">{weeklyPlan[today]?.desc}</p>
            
            <h3 className="font-semibold mb-2">Wochenübersicht:</h3>
            <div className="space-y-1">
              {Object.entries(weeklyPlan).map(([day, plan]) => (
                <div 
                  key={day} 
                  className={`flex justify-between text-sm p-2 rounded ${
                    day === today ? 'bg-orange-100 font-semibold' : ''
                  }`}
                >
                  <span>{day}</span>
                  <span className="text-gray-600">{plan.task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monatsziele */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">🎯 Monatsziele</h2>
            <div className="space-y-2">
              {monthlyGoals.map(goal => (
                <label 
                  key={goal.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={goal.done}
                    onChange={() => toggleMonthlyGoal(goal.id)}
                    className="w-5 h-5 rounded"
                  />
                  <span className={goal.done ? 'line-through text-gray-400' : ''}>
                    {goal.text}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>Fortschritt:</span>
                <span className="font-semibold">
                  {monthlyGoals.filter(g => g.done).length} / {monthlyGoals.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${(monthlyGoals.filter(g => g.done).length / monthlyGoals.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Aufgaben */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">✅ Aufgaben</h2>
            <div className="space-y-4">
              {tasks.map(category => (
                <div key={category.id}>
                  <h3 className="font-semibold text-gray-700 mb-2">{category.category}</h3>
                  <div className="space-y-1 pl-2">
                    {category.items.map(item => (
                      <label 
                        key={item.id}
                        className="flex items-center gap-2 text-sm hover:bg-gray-50 p-1 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => toggleTask(category.id, item.id)}
                          className="w-4 h-4"
                        />
                        <span className={item.done ? 'line-through text-gray-400' : ''}>
                          {item.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Produktivitäts-Zusammenfassung */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">📊 Zusammenfassung</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">~5h</div>
              <div className="text-sm text-gray-600">Malzeit/Tag</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">~3.5h</div>
              <div className="text-sm text-gray-600">Abendarbeit/Tag</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{completedPomodoros}</div>
              <div className="text-sm text-gray-600">Pomodoros heute</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {tasks.reduce((acc, cat) => acc + cat.items.filter(i => i.done).length, 0)}
              </div>
              <div className="text-sm text-gray-600">Aufgaben erledigt</div>
            </div>
          </div>
        </div>

        {/* Nummerierungssystem Info */}
        <div className="bg-yellow-50 rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold mb-2">📝 Werksverzeichnis-System</h2>
          <p className="text-gray-700 mb-2">Empfohlene Nummerierung: <code className="bg-white px-2 py-1 rounded">ZAK-2025-001</code></p>
          <div className="text-sm text-gray-600">
            <p><strong>Format:</strong> ZAK-[Jahr]-[Laufende Nummer]</p>
            <p><strong>Kategorien optional:</strong> LS = Landschaft, SS = Seestück, PT = Porträt, ST = Stillleben</p>
            <p><strong>Beispiel:</strong> ZAK-LS-2025-001 (Landschaft Nr. 1 aus 2025)</p>
          </div>
        </div>

      </div>
    </div>
  );
}