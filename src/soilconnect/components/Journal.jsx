import { useState } from 'react';
import { BookOpen, CheckCircle, Download, Award } from 'lucide-react';

const Journal = () => {
  const [formData, setFormData] = useState({
    visitDate: '',
    farmVisited: 'Green Valley Organic Farm',
    learning: '',
    skills: {
      'Organic Farming': false,
      'Water Management': false,
      'Soil Testing': false,
      'Crop Rotation': false,
      'Pest Control': false
    }
  });

  const [pastJournals] = useState([
    {
      id: 1,
      farm: 'Green Valley Organic Farm',
      date: '2025-10-15',
      learning: 'Learned about traditional organic rice cultivation methods and natural pest control using neem extracts.',
      skills: ['Organic Farming', 'Pest Control'],
      verified: true,
      certificate: true
    },
    {
      id: 2,
      farm: 'Sunrise Sustainable Farm',
      date: '2025-09-20',
      learning: 'Gained hands-on experience with drip irrigation systems and water conservation techniques.',
      skills: ['Water Management', 'Irrigation'],
      verified: true,
      certificate: true
    }
  ]);

  const [certificates] = useState([
    { id: 1, date: 'Oct 15, 2025', farm: 'Green Valley Organic Farm' },
    { id: 2, date: 'Oct 16, 2025', farm: 'Green Valley Organic Farm' },
    { id: 3, date: 'Oct 17, 2025', farm: 'Green Valley Organic Farm' }
  ]);

  const handleSkillChange = (skill) => {
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [skill]: !formData.skills[skill]
      }
    });
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const maxWidthStyle = {
    maxWidth: '1100px',
    margin: '0 auto'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937'
  };

  const headerIconStyle = {
    color: '#6366f1'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const cardTitleStyle = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '24px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '15px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
    marginBottom: '20px'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%23374151\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    paddingRight: '40px'
  };

  const skillsContainerStyle = {
    marginBottom: '24px'
  };

  const skillsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '12px'
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    userSelect: 'none'
  };

  const checkboxStyle = {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const journalItemStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '20px',
    marginBottom: '16px'
  };

  const journalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const journalTitleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '4px'
  };

  const journalDateStyle = {
    fontSize: '14px',
    color: '#6b7280'
  };

  const verifiedBadgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 12px',
    backgroundColor: '#d1fae5',
    color: '#065f46',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '600'
  };

  const journalTextStyle = {
    fontSize: '14px',
    color: '#4b5563',
    lineHeight: '1.6',
    marginBottom: '12px'
  };

  const skillChipsContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '12px'
  };

  const skillChipStyle = {
    padding: '4px 12px',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    borderRadius: '6px',
    fontSize: '13px',
    fontWeight: '500'
  };

  const downloadButtonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'transparent',
    color: '#6366f1',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  };

  const certificatesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px'
  };

  const certificateCardStyle = {
    backgroundColor: '#eef2ff',
    border: '2px solid #c7d2fe',
    borderRadius: '12px',
    padding: '24px'
  };

  const certificateHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  };

  const certificateIconStyle = {
    color: '#6366f1',
    fontSize: '40px'
  };

  const certificateDateStyle = {
    fontSize: '12px',
    color: '#6b7280'
  };

  const certificateTitleStyle = {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '4px'
  };

  const certificateFarmStyle = {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '16px'
  };

  const certificateButtonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background-color 0.2s'
  };

  return (
    <div style={containerStyle}>
      <div style={maxWidthStyle}>
        <div style={headerStyle}>
          <div style={headerIconStyle}>
            <BookOpen size={32} />
          </div>
          Learning Journals & Certificates
        </div>

        {/* Create New Journal Entry */}
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Create New Journal Entry</h2>
          
          <div>
            <label style={labelStyle}>Visit Date</label>
            <input
              type="date"
              style={inputStyle}
              value={formData.visitDate}
              onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
              placeholder="dd-mm-yyyy"
            />
          </div>

          <div>
            <label style={labelStyle}>Farm Visited</label>
            <select
              style={selectStyle}
              value={formData.farmVisited}
              onChange={(e) => setFormData({ ...formData, farmVisited: e.target.value })}
            >
              <option>Green Valley Organic Farm</option>
              <option>Sunrise Sustainable Farm</option>
              <option>Heritage Rice Farm</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>What I Learned</label>
            <textarea
              style={textareaStyle}
              value={formData.learning}
              onChange={(e) => setFormData({ ...formData, learning: e.target.value })}
              placeholder="Describe your key learnings, techniques observed, insights gained..."
            />
          </div>

          <div style={skillsContainerStyle}>
            <label style={labelStyle}>Skills Acquired</label>
            <div style={skillsGridStyle}>
              {Object.keys(formData.skills).map((skill) => (
                <label
                  key={skill}
                  style={checkboxLabelStyle}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                >
                  <input
                    type="checkbox"
                    style={checkboxStyle}
                    checked={formData.skills[skill]}
                    onChange={() => handleSkillChange(skill)}
                  />
                  <span style={{ fontSize: '14px', color: '#374151' }}>{skill}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            style={buttonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
          >
            Save Journal & Request Certificate
          </button>
        </div>

        {/* Past Journal Entries */}
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Past Journal Entries</h2>
          
          {pastJournals.map((journal) => (
            <div key={journal.id} style={journalItemStyle}>
              <div style={journalHeaderStyle}>
                <div>
                  <div style={journalTitleStyle}>{journal.farm}</div>
                  <div style={journalDateStyle}>{journal.date}</div>
                </div>
                {journal.verified && (
                  <div style={verifiedBadgeStyle}>
                    <CheckCircle size={16} />
                    Verified
                  </div>
                )}
              </div>

              <p style={journalTextStyle}>{journal.learning}</p>

              <div style={skillChipsContainerStyle}>
                {journal.skills.map((skill, idx) => (
                  <span key={idx} style={skillChipStyle}>{skill}</span>
                ))}
              </div>

              {journal.certificate && (
                <button
                  style={downloadButtonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <Download size={16} />
                  Download Certificate
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Your Certificates */}
        <div style={cardStyle}>
          <h2 style={cardTitleStyle}>Your Certificates</h2>
          
          <div style={certificatesGridStyle}>
            {certificates.map((cert) => (
              <div key={cert.id} style={certificateCardStyle}>
                <div style={certificateHeaderStyle}>
                  <Award size={40} style={{ color: '#6366f1' }} />
                  <span style={certificateDateStyle}>{cert.date}</span>
                </div>

                <div style={certificateTitleStyle}>Field Experience Certificate</div>
                <div style={certificateFarmStyle}>{cert.farm}</div>

                <button
                  style={certificateButtonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
                >
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;