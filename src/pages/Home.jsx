import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/Marquee.jsx';
import Intro from '../components/Intro.jsx';
import Services from '../components/Services.jsx';
import Work from '../components/Work.jsx';
import About from '../components/About.jsx';
import Process from '../components/Process.jsx';
import Clients from '../components/Clients.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';
import { projects as localProjects } from '../data/projects.js';
import { services as localServices } from '../data/services.js';
import { TESTIMONIALS } from '../data/site.js';
import { fetchProjects, fetchServices, fetchTestimonials } from '../utils/api.js';

export default function Home() {
  const { ready } = useOutletContext();
  const [projects, setProjects] = useState(localProjects);
  const [services, setServices] = useState(localServices);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);

  useEffect(() => {
    let alive = true;
    Promise.allSettled([fetchProjects(), fetchServices(), fetchTestimonials()]).then(
      ([projectResult, serviceResult, testimonialResult]) => {
        if (!alive) return;
        if (projectResult.status === 'fulfilled' && projectResult.value.data?.length) {
          setProjects(projectResult.value.data);
        }
        if (serviceResult.status === 'fulfilled' && serviceResult.value.data?.length) {
          setServices(serviceResult.value.data);
        }
        if (testimonialResult.status === 'fulfilled' && testimonialResult.value.data?.length) {
          setTestimonials(testimonialResult.value.data);
        }
      },
    );
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <Hero ready={ready} />
      <Marquee />
      <Intro />
      <Services items={services} />
      <Work projects={projects} limit={5} />
      <About compact />
      <Process />
      <Clients />
      <Testimonials items={testimonials} />
      <Contact />
    </>
  );
}
