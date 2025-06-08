import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO, isAfter, differenceInDays } from "date-fns";
import "react-day-picker/dist/style.css";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";

export default function CalendarWithEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [nextCountdown, setNextCountdown] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/page?tipo=1`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
            cache: "no-cache",
          }
        );
        if (!response.ok) {
          throw new Error("Error al cargar los posts");
        }
        const data = await response.json();
        // Solo guardar los datos requeridos en un nuevo array
        const filteredEvents = data
          .filter((item) => item.postTypeId === 1)
          .map((item) => ({
            id: item.id,
            date_Sat: item.start_at,
            date_Eat: item.end_at,
            title: item.title,
            description: item.content,
          }));
        setEvents(filteredEvents);
        console.log("Eventos cargados:", filteredEvents);
        // Próximos eventos por fecha de inicio
        const today = new Date();
        const upcoming = filteredEvents
          .filter((e) => isAfter(parseISO(e.date_Sat), today))
          .sort((a, b) => parseISO(a.date_Sat) - parseISO(b.date_Sat))
          .slice(0, 5);
        setUpcomingEvents(upcoming);
        if (upcoming.length > 0) {
          const next = upcoming[0];
          const daysLeft = differenceInDays(parseISO(next.date_Sat), today);
          setNextCountdown({ ...next, daysLeft });
        } else {
          setNextCountdown(null);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  // Día actual
  const today = new Date();
  const todayKey = format(today, "yyyy-MM-dd");

  // Generar rangos y días especiales de eventos
  const eventRanges = [];
  const eventStartDays = new Set();
  const eventEndDays = new Set();
  const eventDays = new Set();
  const eventMap = new Map();

  events.forEach((ev) => {
    if (ev.date_Sat && ev.date_Eat) {
      let start = parseISO(ev.date_Sat);
      let end = parseISO(ev.date_Eat);

      // Agregar el rango
      eventRanges.push({ from: start, to: end });

      // Marcar inicio y fin
      eventStartDays.add(format(start, "yyyy-MM-dd"));
      eventEndDays.add(format(end, "yyyy-MM-dd"));

      // Agregar todos los días del rango
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = format(new Date(d), "yyyy-MM-dd");
        eventDays.add(key);
        eventMap.set(key, ev);
      }
    } else if (ev.date_Sat) {
      const key = format(parseISO(ev.date_Sat), "yyyy-MM-dd");
      eventDays.add(key);
      eventStartDays.add(key);
      eventMap.set(key, ev);
    }
  });

  // Modificadores para DayPicker
  const modifiers = {
    eventRange: eventRanges,
    eventStart: Array.from(eventStartDays).map((d) => parseISO(d)),
    eventEnd: Array.from(eventEndDays).map((d) => parseISO(d)),
    today: [today],
    eventDay: Array.from(eventDays).map((d) => parseISO(d)),
    todayEvent: eventDays.has(todayKey) ? [today] : [],
  };

  // Clases personalizadas para los modificadores
  const modifiersClassNames = {
    eventRange: "bg-cyan-100 hover:bg-cyan-200 transition-colors",
    eventStart:
      "rounded-l-full bg-cyan-400 text-white hover:bg-cyan-500 transition-colors",
    eventEnd:
      "rounded-r-full bg-cyan-400 text-white hover:bg-cyan-500 transition-colors",
    today:
      "border-2 border-red-500 bg-red-500 text-white rounded-full font-bold",
    todayEvent: "border-2 border-red-500 rounded-full font-bold z-10", // El evento mantendrá su color de fondo
    eventDay:
      "bg-cyan-400 text-white rounded-full hover:bg-cyan-500 transition-colors",
  };

  // Estilos personalizados para el DayPicker
  const dayPickerClassNames = {
    day: "h-10 w-10 text-center relative rounded-full hover:bg-cyan-50 transition-colors",
    selected: "rounded-full bg-cyan-500 text-white font-bold hover:bg-cyan-600",
    disabled: "text-gray-300",
    head_cell: "text-cyan-900 font-semibold",
    caption: "text-cyan-900 font-bold mb-4",
    today: "text-red-500 border-2 border-red-500 rounded-full bg-transparent", // Hoy: solo borde rojo y sin fondo
  };

  // Al hacer click en un día, buscar si hay evento en ese día
  const handleDayClick = (day) => {
    const key = format(day, "yyyy-MM-dd");
    const event = eventMap.get(key);
    if (event) {
      setSelectedEvent(event);
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
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            classNames={dayPickerClassNames}
            className="text-base bg-white p-4 rounded-lg shadow-md"
            showOutsideDays
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
                <li key={event.id}>
                  <span className="font-medium">{event.title}</span> —{" "}
                  {format(parseISO(event.date_Sat), "dd MMMM yyyy")}
                  {event.date_Eat && event.date_Eat !== event.date_Sat && (
                    <span className="text-xs text-gray-500 block ml-4">
                      al {format(parseISO(event.date_Eat), "dd MMMM yyyy")}
                    </span>
                  )}
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
                días para <strong>{nextCountdown.title}</strong>
              </p>
              <p className="text-sm text-gray-700">
                Fecha:{" "}
                {format(parseISO(nextCountdown.date_Sat), "dd MMMM yyyy")}
                {nextCountdown.date_Eat &&
                  nextCountdown.date_Eat !== nextCountdown.date_Sat && (
                    <>
                      {" "}
                      al{" "}
                      {format(parseISO(nextCountdown.date_Eat), "dd MMMM yyyy")}
                    </>
                  )}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de evento seleccionado */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-md z-50">
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-bold mb-2">{selectedEvent.title}</h2>
            <p className="mb-2 text-gray-700">{selectedEvent.description}</p>
            <p className="mb-4 text-sm text-gray-600">
              <span className="font-semibold">Inicio:</span>{" "}
              {format(parseISO(selectedEvent.date_Sat), "dd MMMM yyyy")}
              <br />
              {selectedEvent.date_Eat &&
                selectedEvent.date_Eat !== selectedEvent.date_Sat && (
                  <>
                    <span className="font-semibold">Fin:</span>{" "}
                    {format(parseISO(selectedEvent.date_Eat), "dd MMMM yyyy")}
                  </>
                )}
            </p>
            <div className="flex justify-between gap-2">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setSelectedEvent(null)}
              >
                Cerrar
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => {
                  const title = encodeURIComponent(selectedEvent.title);
                  const details = encodeURIComponent(selectedEvent.description);
                  const formatDate = (dateString) => {
                    const date = new Date(dateString); // Asegurar conversión desde la cadena de fecha
                    return `${date.getUTCFullYear()}${(date.getUTCMonth() + 1)
                      .toString()
                      .padStart(2, "0")}${date
                      .getUTCDate()
                      .toString()
                      .padStart(2, "0")}T${date
                      .getUTCHours()
                      .toString()
                      .padStart(2, "0")}${date
                      .getUTCMinutes()
                      .toString()
                      .padStart(2, "0")}${date
                      .getUTCSeconds()
                      .toString()
                      .padStart(2, "0")}`;
                  };

                  const startDate = formatDate(selectedEvent.date_Sat); // 14 de junio de 2025 a las 00:00 AM
                  const endDate = formatDate(selectedEvent.date_Eat); // 15 de junio de 2025 a las 23:59 PM
                  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}`;
                  console.log("URL de Google Calendar:", googleCalendarUrl);
                  window.open(googleCalendarUrl, "_blank");
                }}
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
