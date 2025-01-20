import { PrincipalCard } from "app/components/home/PrincipalCard";
import { Fondo } from "app/components/home";
import { startOfWeek, endOfWeek } from "date-fns";

const now = new Date()
const from = startOfWeek(now,{weekStartsOn: 1})
const to = endOfWeek(now,{weekStartsOn: 1})

export function PanelAdminServer() {

  return (
    <div>
      <Fondo />
      <PrincipalCard from={from} to={to} />
    </div>
  );
}
