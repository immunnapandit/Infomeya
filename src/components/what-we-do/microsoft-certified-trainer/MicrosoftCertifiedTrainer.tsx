import Breadcrumb from '../../../common/Breadcrumb';
import { CheckCircle2, GraduationCap } from 'lucide-react';

const trainers = [
  {
    name: 'Dr Umesh Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Umesh.jpg',
    expertise: 'Microsoft Cloud, Dynamics 365 architecture, and enterprise learning delivery',
    bio: 'Coaches professionals and enterprise teams through Microsoft learning paths, certification preparation, and practical classroom scenarios.',
    focusAreas: ['Cloud readiness', 'Dynamics 365 architecture', 'Enterprise workshops']
  },
  {
    name: 'Atul Verma',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Atul.jpg',
    expertise: 'Business Central On-Premises administration, finance, inventory, setup, and upgrade readiness',
    bio: 'Leads practical Business Central On-Premises sessions covering setup, administration, upgrades, and ERP process confidence for SMB and partner teams.',
    focusAreas: ['On-premises setup', 'Administration readiness', 'ERP process mapping']
  },
  {
    name: 'Saroj Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Saroj.jpg',
    expertise: 'Microsoft functional consulting, process workshops, user enablement, and learner mentoring',
    bio: 'Helps learners connect functional concepts with real scenarios, guided workshops, and Microsoft certification preparation.',
    focusAreas: ['Functional discovery', 'User adoption', 'Scenario workshops']
  },
  {
    name: 'Sangeeta Verma',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Sangeeta.jpg',
    expertise: 'Dynamics 365 CRM, Finance and Operations workflows, customer engagement, and ERP process alignment',
    bio: 'Guides teams through customer engagement, finance, and operations concepts while linking CRM workflows to broader ERP process understanding.',
    focusAreas: ['CRM workflows', 'Finance and operations', 'Role-based enablement']
  },
  {
    name: 'Amit Pandit',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Amit%20Pandit.jpg',
    expertise: 'Dynamics 365 Supply Chain Management consulting for procurement, inventory, warehouse, planning, and production',
    bio: 'Teaches supply chain processes through functional consulting practices, hands-on examples, and real Dynamics 365 SCM business scenarios.',
    focusAreas: ['Procurement and sourcing', 'Inventory and warehouse', 'Planning and production']
  },
  {
    name: 'Anshika Gupta',
    title: 'Microsoft Certified Trainer',
    image: '/assets/img/team/Anshika Gupta.png',
    expertise: 'Dynamics 365 Finance and Operations development with X++, extensions, data entities, integrations, and deployment practices',
    bio: 'Runs developer-focused training on X++, extensions, data entities, debugging, integrations, and deployment-ready customization patterns.',
    focusAreas: ['X++ development', 'Extensions and models', 'Data entities and integration']
  }
];

export default function MicrosoftCertifiedTrainer() {
  return (
    <main className="mct-trainer-list-page">
      <Breadcrumb title="Microsoft Certified Trainers" subtitle="Certified Microsoft learning experts" />

      <section className="mct-trainer-directory">
        <div className="container">
          <div className="mct-trainer-section-head">
            <span>Trainer Directory</span>
            <h2>Microsoft Certified Trainers for practical enablement</h2>
            <p>Meet trainers who combine certification knowledge, delivery experience, and real project context to help learners build job-ready confidence.</p>
          </div>

          <div className="mct-trainer-grid">
            {trainers.map((trainer, index) => (
              <article key={trainer.name} className="mct-trainer-card">
                <div className="mct-trainer-card__topline">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <CheckCircle2 size={18} aria-hidden="true" />
                </div>

                <div className="mct-trainer-card__header">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="mct-trainer-card__photo"
                  />

                  <div>
                    <h3>{trainer.name}</h3>
                    <p>{trainer.title}</p>
                  </div>
                </div>

                <div className="mct-trainer-card__expertise">
                  <GraduationCap size={18} aria-hidden="true" />
                  <span>{trainer.expertise}</span>
                </div>

                <ul className="mct-trainer-card__focus" aria-label={`${trainer.name} focus areas`}>
                  {trainer.focusAreas.map((area) => (
                    <li key={area}>{area}</li>
                  ))}
                </ul>

                <p className="mct-trainer-card__bio">{trainer.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}



