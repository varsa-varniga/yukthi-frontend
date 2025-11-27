import { useState } from 'react';
import { Calendar, MapPin, CheckCircle, XCircle, BookOpen, Star } from 'lucide-react';

const Bookings = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      farmName: 'Green Valley Organic Farm',
      location: 'Coimbatore, Tamil Nadu',
      learner: 'Priya Sharma',
      visitDate: '2025-11-20',
      duration: 'Full Day',
      purpose: 'Learn about organic rice cultivation methods',
      status: 'pending',
      icon: '🌾'
    },
    {
      id: 2,
      farmName: 'Sunrise Sustainable Farm',
      location: 'Salem, Tamil Nadu',
      learner: 'Arun Kumar',
      visitDate: '2025-11-18',
      duration: 'Half Day',
      purpose: 'Study sustainable cotton farming practices',
      status: 'approved',
      icon: '🌻'
    }
  ]);

  const handleApprove = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
  };

  const handleDecline = (id) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'declined' } : req
    ));
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    fontSize: '32px',
    fontWeight: '700',
    color: '#1f2937'
  };

  const iconWrapperStyle = {
    color: '#9333ea'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    maxWidth: '900px',
    margin: '0 auto 24px'
  };

  const topSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  };

  const farmInfoStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start'
  };

  const farmIconStyle = {
    fontSize: '48px',
    flexShrink: 0
  };

  const farmDetailsStyle = {
    flex: 1
  };

  const farmNameStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '8px'
  };

  const locationStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: '#6b7280',
    fontSize: '15px',
    marginBottom: '12px'
  };

  const learnerStyle = {
    color: '#4b5563',
    fontSize: '15px'
  };

  const learnerLabelStyle = {
    fontWeight: '600'
  };

  const statusBadgeStyle = (status) => ({
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    backgroundColor: status === 'pending' ? '#fef3c7' : 
                    status === 'approved' ? '#d1fae5' : '#fee2e2',
    color: status === 'pending' ? '#92400e' : 
           status === 'approved' ? '#065f46' : '#991b1b'
  });

  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginBottom: '24px'
  };

  const detailItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const detailLabelStyle = {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '500'
  };

  const detailValueStyle = {
    color: '#1f2937',
    fontSize: '18px',
    fontWeight: '600'
  };

  const purposeSectionStyle = {
    backgroundColor: '#dbe2f1d5',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '24px'
  };

  const purposeLabelStyle = {
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px'
  };

  const purposeTextStyle = {
    color: '#1f2937',
    fontSize: '15px',
    lineHeight: '1.6'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '16px'
  };

  const buttonBaseStyle = {
    flex: 1,
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  };

  const approveButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#22c55e',
    color: 'white'
  };

  const declineButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#ef4444',
    color: 'white'
  };

  const actionButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#3b82f6',
    color: 'white'
  };

  const reviewButtonStyle = {
    ...buttonBaseStyle,
    backgroundColor: '#a855f7',
    color: 'white'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={iconWrapperStyle}>
          <Calendar size={36} />
        </div>
        Visit Requests
      </div>

      {requests.map(request => (
        <div key={request.id} style={cardStyle}>
          <div style={topSectionStyle}>
            <div style={farmInfoStyle}>
              <div style={farmIconStyle}>{request.icon}</div>
              <div style={farmDetailsStyle}>
                <h2 style={farmNameStyle}>{request.farmName}</h2>
                <div style={locationStyle}>
                  <MapPin size={16} />
                  {request.location}
                </div>
                <p style={learnerStyle}>
                  <span style={learnerLabelStyle}>Learner:</span> {request.learner}
                </p>
              </div>
            </div>
            <div style={statusBadgeStyle(request.status)}>
              {request.status}
            </div>
          </div>

          <div style={detailsGridStyle}>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Visit Date</span>
              <span style={detailValueStyle}>{request.visitDate}</span>
            </div>
            <div style={detailItemStyle}>
              <span style={detailLabelStyle}>Duration</span>
              <span style={detailValueStyle}>{request.duration}</span>
            </div>
          </div>

          <div style={purposeSectionStyle}>
            <div style={purposeLabelStyle}>Purpose of Visit:</div>
            <div style={purposeTextStyle}>{request.purpose}</div>
          </div>

          <div style={buttonContainerStyle}>
            {request.status === 'pending' ? (
              <>
                <button 
                  style={approveButtonStyle}
                  onClick={() => handleApprove(request.id)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
                >
                  <CheckCircle size={20} />
                  Approve
                </button>
                <button 
                  style={declineButtonStyle}
                  onClick={() => handleDecline(request.id)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
                >
                  <XCircle size={20} />
                  Decline
                </button>
              </>
            ) : (
              <>
                <button 
                  style={actionButtonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  <BookOpen size={20} />
                  Add Learning Journal
                </button>
                <button 
                  style={reviewButtonStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#9333ea'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#a855f7'}
                >
                  <Star size={20} />
                  Leave Review
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookings;