export type WeddingPhoto = { src: string; alt: string; caption: string; position?: string; srcSet?: string };
const couple: WeddingPhoto = {src:'/photos/nuria-jonatan.webp',srcSet:'/photos/nuria-jonatan-640.webp 640w, /photos/nuria-jonatan.webp 1200w',alt:'Nuria y Jonatan abrazados en la playa',caption:'Nuestro camino juntos',position:'50% 35%'};
const palace: WeddingPhoto = {src:'/photos/palacio.webp',alt:'Fachada del Palacio de la Ochava y su fuente al atardecer',caption:'El palacio y sus jardines',position:'50% 48%'};
const room: WeddingPhoto = {src:'/photos/habitacion.webp',alt:'Habitación del alojamiento con cama doble',caption:'Un lugar para descansar'};
const church: WeddingPhoto = {src:'/photos/iglesia.webp',alt:'Iglesia de la ceremonia, fotografía facilitada por Nuria y Jonatan',caption:'Donde comienza nuestro gran día'};
/** Datos conservados. Completar solo con información confirmada por la pareja. */
export const wedding = {
  name: 'Jonatan', partnerName: 'Nuria', // Se conservan las claves; names define el orden de presentación.
  names: 'Nuria & Jonatan', initials: 'N&J',
  month: 'Noviembre', dateISO: '2027-11-20T17:00:00+01:00' as string | null,
  church: {name:'Parroquia de la Asunción de Nuestra Señora.' as string|null,address:'Plaza del Sol, s/n, 28813 Torres de la Alameda, Madrid.' as string|null,time:'17:00 h' as string|null,mapsUrl:'https://www.google.com/maps/search/?api=1&query=Parroquia+de+la+Asunci%C3%B3n+de+Nuestra+Se%C3%B1ora+Plaza+del+Sol+Torres+de+la+Alameda+Madrid' as string|null},
  venue: {name:'Palacio de la Ochava',address:null as string|null,time:null as string|null,mapsUrl:'https://www.google.com/maps/search/?api=1&query=Palacio+de+la+Ochava'},
  lodging: {checkIn:null as string|null,checkOut:null as string|null,conditions:null as string|null},
  transport:null as string|null,
  photos: {couple:[couple],church:[church],venue:[palace],lodging:[room,palace]},
};
export const weddingDate = () => wedding.dateISO && Number.isFinite(Date.parse(wedding.dateISO)) ? new Intl.DateTimeFormat('es-ES',{dateStyle:'full',timeZone:'Europe/Madrid'}).format(new Date(wedding.dateISO)) : `${wedding.month} · Fecha por confirmar`;
export const pending = (value:string|null) => value || 'Pendiente de confirmar';


// GitHub Pages project path; only the authorized real photographs are included.
for(const photo of new Set(Object.values(wedding.photos).flat())){
 photo.src=import.meta.env.BASE_URL+photo.src.replace(/^\//,'');
 if(photo.srcSet)photo.srcSet=photo.srcSet.replaceAll('/photos/',import.meta.env.BASE_URL+'photos/');
}
