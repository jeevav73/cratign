import About from '../components/About.jsx';
import Process from '../components/Process.jsx';
import Clients from '../components/Clients.jsx';
import Contact from '../components/Contact.jsx';

export default function StudioPage() {
  return (
    <div className="pt-16">
      <About />
      <Process />
      <Clients />
      <Contact />
    </div>
  );
}
