import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CalendarWithEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //  Simulación de carga de datos desde una API
  useEffect(() => {
    // Aquí podrías hacer un fetch a tu API real
    /*
    async function fetchEvents() {
      const res = await fetch('/api/eventos');
      const data = await res.json();
      setEvents(data);
    }
    fetchEvents();
    */

    //  Datos falsos de ejemplo por mientras
    const fakeEvents = [
      {
        date: "2025-05-27",
        title: "Evento de Bienvenida",
        description: "Reunión de inicio de mes con el equipo de trabajo.",
      },
      {
        date: "2025-06-02",
        title: "Lanzamiento de Producto",
        description: "Presentación oficial del nuevo producto.",
      },
      {
        date: "2025-06-15",
        title: "Revisión Mensual",
        description: "Análisis de métricas y avances.",
      },
    ];

    setEvents(fakeEvents);
  }, []);

  //  Crear mapa para búsquedas rápidas y fechas para marcar
  const eventDates = events.map((e) => new Date(e.date));
  const eventMap = Object.fromEntries(events.map((e) => [e.date, e]));

  //  Detectar clic en fecha
  const handleDayClick = (day) => {
    const key = day.toISOString().split("T")[0];
    if (eventMap[key]) {
      setSelectedEvent({ date: key, ...eventMap[key] });
    } else {
      setSelectedEvent(null);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Calendario de Eventos</h1>

      <DayPicker
        onDayClick={handleDayClick}
        modifiers={{
          hasEvent: eventDates,
        }}
        modifiersClassNames={{
          hasEvent: "bg-blue-500 text-white font-semibold rounded-full",
        }}
      />

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50">
          <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="mb-4">{selectedEvent.description}</p>
            <div className="flex justify-between gap-2">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setSelectedEvent(null)}
              >
                Cerrar
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setSelectedEvent(null)}
              >
                Añadir a mi calendario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
