import React, { useState, useEffect } from 'react';

const DailyTracker = () => {
    const [history, setHistory] = useState([]);
    const [todayData, setTodayData] = useState({ water: false, vitamins: false, activity: false });
    const [todayStr, setTodayStr] = useState('');

    useEffect(() => {
        // Get local date string YYYY-MM-DD
        const tzOffset = (new Date()).getTimezoneOffset() * 60000;
        const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
        setTodayStr(localISOTime);

        const storedHistory = JSON.parse(localStorage.getItem('minsa_daily_history') || '[]');
        setHistory(storedHistory);

        const todayEntry = storedHistory.find(h => h.date === localISOTime);
        if (todayEntry) {
            setTodayData(todayEntry);
        } else {
            setTodayData({ water: false, vitamins: false, activity: false });
        }
    }, []);

    const handleToggle = (field) => {
        const updatedToday = { ...todayData, [field]: !todayData[field] };
        setTodayData(updatedToday);

        // Save to history
        let newHistory = [...history];
        const todayIndex = newHistory.findIndex(h => h.date === todayStr);

        if (todayIndex >= 0) {
            newHistory[todayIndex] = { ...updatedToday, date: todayStr };
        } else {
            newHistory.push({ ...updatedToday, date: todayStr });
        }

        setHistory(newHistory);
        localStorage.setItem('minsa_daily_history', JSON.stringify(newHistory));
    };

    // Check how many days of physical activity they've done in recorded history
    const activityDays = history.filter(h => h.activity).length;

    // Funciones del Calendario Real
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1; // Adaptar a Lunes=0, Domingo=6
    };

    const renderCalendar = () => {
        const todayDate = new Date();
        const year = todayDate.getFullYear();
        const month = todayDate.getMonth();

        const daysInMonth = getDaysInMonth(year, month);
        const firstDayIndex = getFirstDayOfMonth(year, month);

        const days = [];
        const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

        // Cabeceras de la semana
        const headerCells = daysOfWeek.map(d => (
            <div key={`header-${d}`} style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '5px' }}>
                {d}
            </div>
        ));

        // Espacios vacíos al principio del mes
        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`empty-${i}`} style={{ aspectRatio: '1/1' }}></div>);
        }

        const monthStr = (month + 1).toString().padStart(2, '0');

        // Días reales del mes
        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = day.toString().padStart(2, '0');
            const dateStr = `${year}-${monthStr}-${dayStr}`;

            // Buscar si hay historial para este día
            const historyEntry = history.find(h => h.date === dateStr);

            let bgColor = '#f8f9fa'; // Día futuro o pasado sin registro
            let textColor = '#aaa';
            let borderStyle = '1px solid #eee';

            if (historyEntry) {
                // Calcular puntaje del día (0 a 3 metas cumplidas)
                let score = 0;
                if (historyEntry.water) score++;
                if (historyEntry.vitamins) score++;
                if (historyEntry.activity) score++;

                if (score === 3) {
                    bgColor = 'var(--color-success)'; // Verde
                    textColor = 'white';
                    borderStyle = 'none';
                } else if (score === 2) {
                    bgColor = '#FFC107'; // Amarillo
                    textColor = '#555';
                    borderStyle = 'none';
                } else if (score === 1) {
                    bgColor = '#FF5252'; // Rojo
                    textColor = 'white';
                    borderStyle = 'none';
                } else {
                    bgColor = '#e0dbf0'; // Gris si lo marcó pero con 0 metas
                    textColor = '#777';
                    borderStyle = 'none';
                }
            } else if (dateStr < todayStr) {
                // Día pasado sin registro
                bgColor = '#fafafa';
                textColor = '#ccc';
            }

            const isToday = dateStr === todayStr;

            days.push(
                <div key={dateStr} title={dateStr} style={{
                    aspectRatio: '1/1',
                    borderRadius: '8px',
                    backgroundColor: bgColor,
                    border: isToday ? '3px solid var(--color-primary)' : borderStyle,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: textColor,
                    fontWeight: isToday || historyEntry ? 'bold' : 'normal',
                    fontSize: '0.9rem',
                    boxShadow: historyEntry ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                }}>
                    {day}
                </div>
            );
        }

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginTop: '15px', maxWidth: '400px', margin: '15px auto 0' }}>
                {headerCells}
                {days}
            </div>
        );
    };

    return (
        <div className="daily-tracker-card form-card" style={{ marginTop: '30px', backgroundColor: 'var(--color-bg-lavender)' }}>
            <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid white', paddingBottom: '10px' }}>
                📅 Mi Reto Diario
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
                Marca tus logros de hoy para mantener un embarazo activo y saludable. Se guarda automáticamente en tu calendario mensual.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <input
                        type="checkbox"
                        checked={todayData.water}
                        onChange={() => handleToggle('water')}
                        style={{ width: '24px', height: '24px', accentColor: 'var(--color-primary)' }}
                    />
                    💧 2 Litros de Agua
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <input
                        type="checkbox"
                        checked={todayData.vitamins}
                        onChange={() => handleToggle('vitamins')}
                        style={{ width: '24px', height: '24px', accentColor: 'var(--color-primary)' }}
                    />
                    💊 Vitaminas / Suplementos
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: todayData.activity ? '2px solid var(--color-success)' : '1px solid transparent' }}>
                    <input
                        type="checkbox"
                        checked={todayData.activity}
                        onChange={() => handleToggle('activity')}
                        style={{ width: '24px', height: '24px', accentColor: 'var(--color-success)' }}
                    />
                    🏃‍♀️ Actividad Física (Caminar, Yoga, Gym, etc.)
                </label>
            </div>

            {todayData.activity && todayData.water && todayData.vitamins && (
                <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                    🎉 ¡Día Perfecto, Súper Mamá! Has cumplido tus 3 metas hoy. 🎉
                </div>
            )}

            {history.length > 0 && (
                <div style={{ marginTop: '30px', borderTop: '2px dashed white', paddingTop: '20px', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '5px' }}>
                        Calendario del Mes
                    </h3>
                    <p style={{ margin: 0, color: '#444', fontSize: '0.85rem' }}>
                        🟢 3 Metas | 🟡 2 Metas | 🔴 1 Meta
                    </p>

                    {renderCalendar()}
                </div>
            )}
        </div>
    );
};

export default DailyTracker;
