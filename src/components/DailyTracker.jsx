import React, { useState, useEffect } from 'react';
import UpsellModal from './UpsellModal';

const DailyTracker = () => {
    const [history, setHistory] = useState([]);
    const [selectedData, setSelectedData] = useState({ water: false, vitamins: false, activity: false });
    const [selectedDate, setSelectedDate] = useState('');
    const [todayDateStr, setTodayDateStr] = useState('');
    const [isUpsellOpen, setIsUpsellOpen] = useState(false);
    const isPremium = localStorage.getItem('isPremium') === 'true';

    useEffect(() => {
        // Inicializar fecha actual localmente
        const tzOffset = (new Date()).getTimezoneOffset() * 60000;
        const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().split('T')[0];
        setTodayDateStr(localISOTime);
        
        if (!selectedDate) {
            setSelectedDate(localISOTime);
        }
        
        const storedHistory = JSON.parse(localStorage.getItem('minsa_daily_history') || '[]');
        setHistory(storedHistory);
    }, []);

    useEffect(() => {
        if (!selectedDate) return;
        const storedHistory = JSON.parse(localStorage.getItem('minsa_daily_history') || '[]');
        const currentEntry = storedHistory.find(h => h.date === selectedDate);
        if (currentEntry) {
            setSelectedData(currentEntry);
        } else {
            setSelectedData({ water: false, vitamins: false, activity: false });
        }
    }, [selectedDate, history.length]);

    const handleToggle = (field) => {
        let newHistory = [...history];
        const dateIndex = newHistory.findIndex(h => h.date === selectedDate);

        if (!isPremium && dateIndex < 0 && history.length >= 3) {
            setIsUpsellOpen(true);
            return;
        }

        const updatedData = { ...selectedData, [field]: !selectedData[field] };
        setSelectedData(updatedData);

        if (dateIndex >= 0) {
            newHistory[dateIndex] = { ...updatedData, date: selectedDate };
        } else {
            newHistory.push({ ...updatedData, date: selectedDate });
        }

        setHistory(newHistory);
        localStorage.setItem('minsa_daily_history', JSON.stringify(newHistory));
    };

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        let day = new Date(year, month, 1).getDay();
        return day === 0 ? 6 : day - 1;
    };

    const renderCalendar = () => {
        const todayDate = new Date();
        const year = todayDate.getFullYear();
        const month = todayDate.getMonth();

        const daysInMonth = getDaysInMonth(year, month);
        const firstDayIndex = getFirstDayOfMonth(year, month);

        const days = [];
        const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

        const headerCells = daysOfWeek.map(d => (
            <div key={`header-${d}`} style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--color-primary)', fontSize: '0.9rem', marginBottom: '5px' }}>
                {d}
            </div>
        ));

        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`empty-${i}`} style={{ aspectRatio: '1/1' }}></div>);
        }

        const monthStr = (month + 1).toString().padStart(2, '0');

        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = day.toString().padStart(2, '0');
            const dateStr = `${year}-${monthStr}-${dayStr}`;

            const historyEntry = history.find(h => h.date === dateStr);
            const isClickable = dateStr <= todayDateStr; 
            const isSelected = dateStr === selectedDate;

            let bgColor = '#f8f9fa';
            let textColor = '#aaa';
            let borderStyle = isClickable ? '1px solid #ddd' : '1px solid #eee';

            if (historyEntry) {
                let score = 0;
                if (historyEntry.water) score++;
                if (historyEntry.vitamins) score++;
                if (historyEntry.activity) score++;

                if (score === 3) { bgColor = 'var(--color-success)'; textColor = 'white'; borderStyle = 'none'; }
                else if (score === 2) { bgColor = '#FFC107'; textColor = '#555'; borderStyle = 'none'; }
                else if (score === 1) { bgColor = '#FF5252'; textColor = 'white'; borderStyle = 'none'; }
                else { bgColor = '#e0dbf0'; textColor = '#777'; borderStyle = 'none'; }
            } else if (isClickable) {
                bgColor = '#fafafa';
                textColor = '#888';
            }

            days.push(
                <div 
                    key={dateStr} 
                    title={isClickable ? "Haz clic para editar este día" : dateStr}
                    onClick={() => { if(isClickable) setSelectedDate(dateStr); }}
                    style={{
                        aspectRatio: '1/1',
                        borderRadius: '8px',
                        backgroundColor: bgColor,
                        border: isSelected ? '3px solid var(--color-primary)' : borderStyle,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: textColor,
                        fontWeight: isSelected || historyEntry ? 'bold' : 'normal',
                        fontSize: '0.9rem',
                        boxShadow: historyEntry ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                        cursor: isClickable ? 'pointer' : 'default',
                        transform: isSelected ? 'scale(1.1)' : 'none',
                        transition: 'transform 0.1s'
                    }}
                >
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

    const formatDateForDisplay = (dateStr) => {
        if (!dateStr) return '';
        if (dateStr === todayDateStr) return 'de hoy';
        const [year, month, day] = dateStr.split('-');
        return `del ${day}/${month}`;
    };

    return (
        <div className="daily-tracker-card form-card" style={{ marginTop: '30px', backgroundColor: 'var(--color-bg-lavender)' }}>
            <h2 style={{ color: 'var(--color-primary)', borderBottom: '2px solid white', paddingBottom: '10px' }}>
                📅 Reto Diario {formatDateForDisplay(selectedDate)}
            </h2>
            <p style={{ color: 'var(--color-text-muted)' }}>
                {selectedDate === todayDateStr 
                    ? "Marca tus logros de hoy. Puedes rellenar los días que olvidaste haciendo clic abajo en el calendario."
                    : "Estás editando un día anterior. ¡Ponte al día con tu bienestar!"}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <input
                        type="checkbox"
                        checked={selectedData.water || false}
                        onChange={() => handleToggle('water')}
                        style={{ width: '24px', height: '24px', accentColor: 'var(--color-primary)' }}
                    />
                    💧 2 Litros de Agua
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <input
                        type="checkbox"
                        checked={selectedData.vitamins || false}
                        onChange={() => handleToggle('vitamins')}
                        style={{ width: '24px', height: '24px', accentColor: 'var(--color-primary)' }}
                    />
                    💊 Vitaminas / Suplementos
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', cursor: 'pointer', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', border: selectedData.activity ? '2px solid var(--color-success)' : '1px solid transparent' }}>
                    <input
                        type="checkbox"
                        checked={selectedData.activity || false}
                        onChange={() => handleToggle('activity')}
                        style={{ width: '24px', height: '24px', accentColor: 'var(--color-success)' }}
                    />
                    🏃‍♀️ Actividad Física (Caminar, Yoga, Gym, etc.)
                </label>
            </div>

            <div style={{ marginTop: '30px', borderTop: '2px dashed white', paddingTop: '20px', textAlign: 'center' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.2rem', marginBottom: '5px' }}>
                    Calendario del Mes
                </h3>
                <p style={{ margin: 0, color: '#444', fontSize: '0.85rem' }}>
                    🟢 3 Metas | 🟡 2 Metas | 🔴 1 Meta
                </p>
                <p style={{ margin: '5px 0 0', color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>
                    🖱️ Haz clic en un día pasado para rellenarlo
                </p>

                {renderCalendar()}
            </div>
            
            <UpsellModal 
                isOpen={isUpsellOpen} 
                onClose={() => setIsUpsellOpen(false)} 
                message="Has registrado 3 días en tu calendario, el límite de la versión gratuita."
            />
        </div>
    );
};

export default DailyTracker;
