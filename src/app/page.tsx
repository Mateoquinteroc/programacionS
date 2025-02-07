
import { Fondo } from "app/components/home";
import { PrincipalCard } from "app/components/home/PrincipalCard";
import { FooterCard } from "app/components/home/FooterCard/FooterCard"
import { getEvents } from "app/db/queries";
import { endOfWeek, startOfWeek } from "date-fns";
import { Home } from "app/components/home/Home";


const now = new Date()
const from = startOfWeek(now,{weekStartsOn: 1})
const to = endOfWeek(now,{weekStartsOn: 1})

export default async function HomePage() {
  const events = await getEvents(from, to)
  return (
      <main>
        <Fondo />
        <PrincipalCard from={from} to={to} />
        <Home events={events} isAdminMode={false} from={from} to={to} />
        <FooterCard />
        
      </main>
  );
}


