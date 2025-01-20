import { Home } from "app/components/home/Home";
import { SelectEvent } from "app/db/schema";

export default function PanelDias({
  events,
  isAdminMode,
  from,
  to,
}: {
  events: SelectEvent[];
  isAdminMode: boolean;
  from: Date;
  to: Date;
}) {
  return (
    <div>
      {/* Pasamos eventos, rango de fechas y estado de administración */}
      <Home events={events} isAdminMode={isAdminMode} from={from} to={to} />
    </div>
  );
}
