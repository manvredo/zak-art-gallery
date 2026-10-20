'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/app/lib/supabaseClient';
import { ArrowLeft, LogOut, Plus, Trash2 } from 'lucide-react';

// Private work plan: daily structure, weekly evening plan and pomodoro timer
// are fixed here; tasks and monthly goals live in the work_tasks table.

const GOALS_CATEGORY = 'Monatsziele';

const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

// start/end in minutes since midnight, used to highlight the current block
const dailyBlocks = [
  { id: 'morning', time: '09:00–10:00', start: 540, end: 600, name: 'Morgenroutine', desc: 'Kaffee, Zeitung, Tagesplanung', color: 'bg-gray-100' },
  { id: 'core1', time: '10:00–13:00', start: 600, end: 780, name: 'KERNZEIT MALEN', desc: 'Hauptbilder bei Tageslicht. 3× Pomodoro.', color: 'bg-blue-100', isCore: true },
  { id: 'lunch', time: '13:00–13:30', start: 780, end: 810, name: 'Mittagspause', desc: 'Essen, echte Pause', color: 'bg-green-100' },
  { id: 'core2', time: '13:30–15:30', start: 810, end: 930, name: 'KERNZEIT MALEN', desc: 'Weiter an Hauptbildern. 2× Pomodoro.', color: 'bg-blue-100', isCore: true },
  { id: 'nap', time: '15:30–16:30', start: 930, end: 990, name: 'Power Nap', desc: '30–60 Min. Ruhe', color: 'bg-purple-100' },
  { id: 'evening', time: '16:30–20:00', start: 990, end: 1200, name: 'Abendblock', desc: 'Siehe Wochenplan', color: 'bg-orange-100' },
];

const weeklyPlan = {
  'Montag': { task: 'Wochenplanung + Website', desc: 'Woche strukturieren, Website weiterentwickeln' },
  'Dienstag': { task: 'Fotografie', desc: 'Bilder fotografieren mit Strahlern' },
  'Mittwoch': { task: 'Zeichnen', desc: 'Porträts, Studien, Skizzen' },
  'Donnerstag': { task: 'Administration', desc: 'Werksverzeichnis, Nummerierung, Rahmen' },
  'Freitag': { task: 'Website + Upload', desc: 'Fotos bearbeiten, auf Website hochladen' },
  'Samstag': { task: 'Recherche', desc: 'Andere Künstler studieren, Inspiration' },
  'Sonntag': { task: 'Experimentell / Frei', desc: 'Freies Arbeiten, neue Techniken testen' },
};

const WORK_SECONDS = 50 * 60;
const BREAK_SECONDS = 10 * 60;

function notify(text) {
  if (typeof window === 'undefined' || !('Notification' in window)) return;
  if (Notification.permission === 'granted') new Notification(text);
}

function TaskRow({ task, onToggle, onDelete, large }) {
  return (
    <div className="group flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded">
      <label className="flex items-center gap-3 flex-1 cursor-pointer">
        <input
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task)}
          className={large ? 'w-5 h-5 rounded' : 'w-4 h-4'}
        />
        <span className={`${large ? '' : 'text-sm'} ${task.done ? 'line-through text-gray-400' : ''}`}>
          {task.text}
        </span>
      </label>
      <button
        onClick={() => onDelete(task)}
        className="md:opacity-0 md:group-hover:opacity-100 text-gray-400 hover:text-red-600 transition"
        title="Löschen"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

function AddTaskForm({ onAdd, placeholder = 'Neue Aufgabe…' }) {
  const [text, setText] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (await onAdd(text.trim())) setText('');
  };

  return (
    <form onSubmit={submit} className="flex gap-2 mt-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
      <button type="submit" className="px-2 text-gray-500 hover:text-gray-900" title="Hinzufügen">
        <Plus size={18} />
      </button>
    </form>
  );
}

export default function AdminArbeitsplanPage() {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newCategory, setNewCategory] = useState('');

  const [currentTime, setCurrentTime] = useState(new Date());
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(WORK_SECONDS);
  const [isBreak, setIsBreak] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/admin');
        return;
      }
      setAuthLoading(false);
      fetchTasks();
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from('work_tasks')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('id', { ascending: true });

    if (error) {
      console.error('Error:', error);
      setError('Aufgaben konnten nicht geladen werden: ' + error.message);
    } else {
      setTasks(data || []);
    }
    setLoading(false);
  };

  // Uhr
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Pomodoro
  useEffect(() => {
    if (!pomodoroActive) return;
    if (pomodoroTime > 0) {
      const interval = setInterval(() => setPomodoroTime((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (!isBreak) {
      setCompletedPomodoros((c) => c + 1);
      setIsBreak(true);
      setPomodoroTime(BREAK_SECONDS);
      notify('🍅 Pomodoro fertig! Pause machen.');
    } else {
      setIsBreak(false);
      setPomodoroTime(WORK_SECONDS);
      notify('⏰ Pause vorbei!');
    }
  }, [pomodoroActive, pomodoroTime, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTask = async (task) => {
    setTasks((ts) => ts.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)));
    const { error } = await supabase.from('work_tasks').update({ done: !task.done }).eq('id', task.id);
    if (error) {
      setTasks((ts) => ts.map((t) => (t.id === task.id ? { ...t, done: task.done } : t)));
      setError('Speichern fehlgeschlagen: ' + error.message);
    }
  };

  const addTask = async (category, text) => {
    const sortOrder = Math.max(0, ...tasks.filter((t) => t.category === category).map((t) => t.sort_order)) + 1;
    const { data, error } = await supabase
      .from('work_tasks')
      .insert({ category, text, sort_order: sortOrder })
      .select()
      .single();
    if (error) {
      setError('Speichern fehlgeschlagen: ' + error.message);
      return false;
    }
    setTasks((ts) => [...ts, data]);
    return true;
  };

  const deleteTask = async (task) => {
    if (!confirm(`„${task.text}“ löschen?`)) return;
    const { error } = await supabase.from('work_tasks').delete().eq('id', task.id);
    if (error) {
      setError('Löschen fehlgeschlagen: ' + error.message);
      return;
    }
    setTasks((ts) => ts.filter((t) => t.id !== task.id));
  };

  const addCategory = (e) => {
    e.preventDefault();
    const name = newCategory.trim();
    if (!name) return;
    addTask(name, 'Erste Aufgabe').then((ok) => ok && setNewCategory(''));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const today = weekdays[currentTime.getDay()];
  const minutesNow = currentTime.getHours() * 60 + currentTime.getMinutes();
  const activeBlock = dailyBlocks.find((b) => minutesNow >= b.start && minutesNow < b.end)?.id;

  const goals = tasks.filter((t) => t.category === GOALS_CATEGORY);
  const otherTasks = tasks.filter((t) => t.category !== GOALS_CATEGORY);
  // Categories in the order they were first created
  const categories = [...new Set([...otherTasks].sort((a, b) => a.id - b.id).map((t) => t.category))];
  const goalsDone = goals.filter((g) => g.done).length;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <Link href="/admin" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} /> Admin
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <LogOut size={16} /> Logout
          </button>
        </div>

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

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700 flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="ml-4">✕</button>
          </div>
        )}

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
              <span className="text-4xl font-mono font-bold">{formatTime(pomodoroTime)}</span>
              <button
                onClick={() => {
                  setPomodoroActive(!pomodoroActive);
                  if ('Notification' in window && Notification.permission === 'default') {
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
                  setPomodoroTime(WORK_SECONDS);
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
              {dailyBlocks.map((block) => (
                <div
                  key={block.id}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    activeBlock === block.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent'
                  } ${block.color}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-sm text-gray-500">{block.time}</span>
                      <h3 className={`font-semibold ${block.isCore ? 'text-blue-700' : ''}`}>{block.name}</h3>
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
                  className={`flex justify-between text-sm p-2 rounded ${day === today ? 'bg-orange-100 font-semibold' : ''}`}
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
            {loading ? (
              <p className="text-sm text-gray-400">Lädt…</p>
            ) : (
              <>
                <div className="space-y-1">
                  {goals.map((goal) => (
                    <TaskRow key={goal.id} task={goal} onToggle={toggleTask} onDelete={deleteTask} large />
                  ))}
                </div>
                <AddTaskForm onAdd={(text) => addTask(GOALS_CATEGORY, text)} placeholder="Neues Ziel…" />
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Fortschritt:</span>
                    <span className="font-semibold">{goalsDone} / {goals.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${goals.length ? (goalsDone / goals.length) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Aufgaben */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">✅ Aufgaben</h2>
            {loading ? (
              <p className="text-sm text-gray-400">Lädt…</p>
            ) : (
              <div className="space-y-5">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-700 mb-1">{category}</h3>
                    <div className="pl-1">
                      {otherTasks.filter((t) => t.category === category).map((task) => (
                        <TaskRow key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                      ))}
                      <AddTaskForm onAdd={(text) => addTask(category, text)} />
                    </div>
                  </div>
                ))}
                <form onSubmit={addCategory} className="flex gap-2 pt-4 border-t">
                  <input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Neuer Bereich (z. B. Ausstellung)…"
                    className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <button type="submit" className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-800">
                    Bereich anlegen
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

        {/* Zusammenfassung */}
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
                {otherTasks.filter((t) => t.done).length} / {otherTasks.length}
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
