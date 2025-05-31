import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO, differenceInDays, isAfter } from "date-fns";
import "react-day-picker/dist/style.css";

export default function CalendarWithEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [nextCountdown, setNextCountdown] = useState(null);

  useEffect(() => {
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

    const commemorativeEvents = [
      {
        date: "2025-05-15",
        title: "Día del Maestro",
        description: "Celebración del Día del Maestro.",
      },
      {
        date: "2025-05-12",
        title: "Día de la Madre",
        description: "Día de la Madre (segundo domingo de mayo).",
      },
      {
        date: "2025-06-15",
        title: "Día del Padre",
        description: "Día del Padre (tercer domingo de junio).",
      },
    ];

    const allEvents = [...fakeEvents, ...commemorativeEvents].sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    setEvents(allEvents);

    const today = new Date();
    const upcoming = allEvents
      .filter((e) => isAfter(parseISO(e.date), today))
      .slice(0, 5); // Próximos 5 eventos
    setUpcomingEvents(upcoming);

    if (upcoming.length > 0) {
      const next = upcoming[0];
      const daysLeft = differenceInDays(parseISO(next.date), today);
      setNextCountdown({ ...next, daysLeft });
    }
  }, []);

  const eventMap = Object.fromEntries(events.map((e) => [e.date, e]));
  const eventDates = events.map((e) => parseISO(e.date));

  const handleDayClick = (day) => {
    const key = format(day, "yyyy-MM-dd");
    if (eventMap[key]) {
      setSelectedEvent({ date: key, ...eventMap[key] });
    } else {
      setSelectedEvent(null);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Calendario de Eventos
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Calendario a la izquierda */}
        <div className="md:w-1/2 flex justify-center">
          <DayPicker
            mode="single"
            onDayClick={handleDayClick}
            modifiers={{ hasEvent: eventDates }}
            modifiersClassNames={{
              hasEvent: "bg-blue-500 text-white font-semibold rounded-full",
            }}
            className="text-base"
          />
        </div>

        {/* Contenido adicional a la derecha */}
        <div className="md:w-1/2 space-y-6">
          {/* Próximos eventos */}
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">
              Próximos eventos destacados
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {upcomingEvents.map((event) => (
                <li key={event.date}>
                  <span className="font-medium">{event.title}</span> —{" "}
                  {format(parseISO(event.date), "dd MMMM yyyy")}
                </li>
              ))}
              {upcomingEvents.length === 0 && (
                <p className="text-sm text-gray-500">
                  No hay eventos próximos.
                </p>
              )}
            </ul>
          </div>

          {/* Contador regresivo */}
          {nextCountdown && (
            <div className="bg-blue-100 p-4 rounded shadow text-blue-900">
              <h2 className="text-xl font-semibold mb-2">
                ⏳ Cuenta regresiva
              </h2>
              <p className="text-lg font-medium">
                Faltan{" "}
                <span className="font-bold text-blue-700">
                  {nextCountdown.daysLeft}
                </span>{" "}
                días para <strong>{nextCountdown.title}</strong>.
              </p>
              <p className="text-sm text-gray-700">
                Fecha: {format(parseISO(nextCountdown.date), "dd MMMM yyyy")}
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50">
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm">
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
