import { SelectEvent } from "app/db/schema";

export const colorByType: Record<SelectEvent["type"], string> = {
  concierto: "#f7aa24ff",
  exposicion: "#ec6e25ff",
  taller: "#e73944",
  foro: "#cd1532ff",
  congreso: "#472d52",
  jornadasAcademicas: "#2d3b73ff",
  varios:"#1843ce",
};

export const locationTranslations: Record<SelectEvent['location'],string>={
    auditorio:'Auditorio',maker:'Maker',oculo:'Óculo',sala_alterna:'Sala alterna',sala_principal:'Sala de exposiciones',cafe_cultural:'Cafe cultural',sala_capacitaciones:'Sala de capacitaciones',vestibulo_piso1:'vestibulo primer piso',vestibulo_piso2:'vestibulo segundo piso',vestibulo_piso3:'vestibulo tercer piso',vestibulo_piso4:'vestibulo cuarto piso',auditorio_aire:'Auditorio al aire libre'
}
