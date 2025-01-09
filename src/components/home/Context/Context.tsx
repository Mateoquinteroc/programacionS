import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Corrección del nombre de la interfaz
interface Evento {
  id: number;
  type: string;
  date: string;
  month: string;
  hour: string;
  title: string;
  place: string;
  detail: string;
  description: string;
  color: string;
  image: string;
}

// Define los tipos para el contexto
type CardSelectContextType = {
  data: [];
  setData: [];
  isCardDetailOpen: boolean;
  setIsCardDetailOpen: boolean;
  openCardDetail: () => void;
  closeCardDetail: () => void;
  eventSelect: Evento | null;
  setEventSelect: (event: Evento) => void;
  eventoSeleccionado: Evento | null;
  setEventoSeleccionado: (event: Evento) => void;
  currentIndex: number;
  setCurrentIndex: (value: number) => void;
  isCardBaseDetailsOpen: boolean;
  openCardBaseDetails: () => void;
  closeCardBaseDetails: () => void;
  isQrOpen: boolean;
  openQr: () => void;
  closeQr: () => void;
  firstEvent: Evento | null; // Estado para almacenar el primer evento
  setFirstEvent: (event: Evento) => void; // Función para establecer el primer evento
  lastEvent:Evento | null;
  setLastEvent:(event: Evento) => void;
};

type CardSelectProviderProps = {
  children: ReactNode;
};

// Crear el contexto
export const CardSelectContext = createContext<CardSelectContextType | undefined>(undefined);

// Proveedor del contexto
export function CardSelectProvider({ children }: CardSelectProviderProps) {
  const [data, setData] = useState<any>(null);

  // Estados y funciones para abrir/cerrar detalles
  const [isCardDetailOpen, setIsCardDetailOpen] = useState<boolean>(false);
  const openCardDetail = () => setIsCardDetailOpen(true);
  const closeCardDetail = () => setIsCardDetailOpen(false);

  const [isCardBaseDetailsOpen, setIsCardBaseDetailsOpen] = useState<boolean>(false);
  const openCardBaseDetails = () => {
    setIsCardBaseDetailsOpen(true);
    setIsCardDetailOpen(false);
    setIsQrOpen(false);
  };
  const closeCardBaseDetails = () => setIsCardBaseDetailsOpen(false);

  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);
  const openQr = () => {
    setIsQrOpen(true);
    setIsCardDetailOpen(false);
    setIsCardBaseDetailsOpen(false);
  };
  const closeQr = () => setIsQrOpen(false);

  // Estados para el evento seleccionado, el índice actual y el primer evento
  const [eventSelect, setEventSelect] = useState<Evento | null>(null);
  const [eventoSeleccionado, setEventoSeleccionado] = useState<Evento | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [firstEvent, setFirstEvent] = useState<Evento | null>(null); // Estado para el primer evento
  const [lastEvent, setLastEvent] = useState<Evento | null>(null);

  // Efecto para cerrar ventanas después de un tiempo de inactividad
  useEffect(() => {
    if (isQrOpen) {
      const timer = setTimeout(() => {
        closeQr();
      }, 60000);
      return () => clearTimeout(timer);
    } else if (isCardBaseDetailsOpen) {
      const timer = setTimeout(() => {
        closeCardBaseDetails();
      }, 240000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isQrOpen, isCardDetailOpen, isCardBaseDetailsOpen]);

  return (
    <CardSelectContext.Provider
      value={{
        data,
        setData,
        isCardDetailOpen,
        setIsCardDetailOpen,
        openCardDetail,
        closeCardDetail,
        eventSelect,
        setEventSelect,
        firstEvent, // Exponer el primer evento
        setFirstEvent, // Exponer la función para establecer el primer evento
        lastEvent,
        setLastEvent,
        eventoSeleccionado,
        setEventoSeleccionado,
        currentIndex,
        setCurrentIndex,
        isCardBaseDetailsOpen,
        openCardBaseDetails,
        closeCardBaseDetails,
        isQrOpen,
        openQr,
        closeQr,
      }}
    >
      {children}
    </CardSelectContext.Provider>
  );
}

// Hook para usar el contexto
export function useCardSelectContext(): CardSelectContextType {
  const context = useContext(CardSelectContext);
  if (!context) {
    throw new Error("useCardSelectContext debe usarse dentro de un CardSelectProvider");
  }
  return context;
}
