import React from 'react';
import ReactDOM from 'react-dom/client';
import WeddingApp from './components/WeddingApp';
import './styles.css';
import './app.css';
const blocked=location.pathname.includes('/admin')||location.pathname.includes('/api/');
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{blocked?<main className="admin-login"><h1>Esta versión no incluye administración.</h1><p>No hay datos de invitados ni recogida de respuestas.</p><a className="button" href={import.meta.env.BASE_URL}>Volver a la invitación</a></main>:<WeddingApp/>}</React.StrictMode>);
if(import.meta.env.PROD&&'serviceWorker' in navigator)window.addEventListener('load',()=>{void navigator.serviceWorker.register(import.meta.env.BASE_URL+'sw.js',{scope:import.meta.env.BASE_URL}).catch(()=>{})},{once:true});
