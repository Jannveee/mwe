import Section from '../layout/Section';
import AudienceCard from '../AudienceCard';
import { AUDIENCES } from '../../data/offerContent';
import { useIntake } from '../../features/intake/IntakeContext';
import ConnectModal from '../../features/intake/ConnectModal';
import { useState } from 'react';

export default function Offer() {
  const { dispatch } = useIntake();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCtaClick = (role) => {
    dispatch({ type: 'SET_ROLE', payload: role });
    setModalOpen(true);
  };

  return (
    <Section id="offer" title="What We Offer">
      <div className="audience-grid">
        {AUDIENCES.map((a) => (
          <AudienceCard key={a.role} {...a} onCtaClick={handleCtaClick} />
        ))}
      </div>
      {modalOpen && <ConnectModal onClose={() => setModalOpen(false)} />}
    </Section>
  );
}