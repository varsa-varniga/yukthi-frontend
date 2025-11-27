import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, CheckCircle, X, Send } from 'lucide-react';

const farms = [
  {
    id: 1,
    name: "Green Valley Organic Farm",
    location: "Coimbatore, Tamil Nadu",
    rating: 4.8,
    reviews: 15,
    crops: ["Rice", "Turmeric", "Vegetables"],
    badges: ["Organic", "Water-Saving", "Eco-Friendly"],
    available: true,
    verified: true,
    image: "🌾"
  },
  {
    id: 2,
    name: "Sunrise Sustainable Farm",
    location: "Salem, Tamil Nadu",
    rating: 4.9,
    reviews: 89,
    crops: ["Grapes", "Olives", "Herbs"],
    badges: ["Certified Organic", "Sustainable"],
    available: true,
    verified: true,
    image: "🌻"
  },
  {
    id: 3,
    name: "Mountain View Ranch",
    location: "Ooty, Tamil Nadu",
    rating: 4.7,
    reviews: 56,
    crops: ["Apples", "Pears", "Berries"],
    badges: ["Eco-Friendly"],
    available: false,
    verified: false,
    image: "🍎"
  },
  {
    id: 4,
    name: "Coastal Harvest Farm",
    location: "Chennai, Tamil Nadu",
    rating: 4.9,
    reviews: 142,
    crops: ["Strawberries", "Artichokes", "Broccoli"],
    badges: ["Organic", "Water Conservation"],
    available: true,
    verified: true,
    image: "🍓"
  },
  {
    id: 5,
    name: "Desert Bloom Gardens",
    location: "Madurai, Tamil Nadu",
    rating: 4.6,
    reviews: 73,
    crops: ["Dates", "Citrus", "Melons"],
    badges: ["Solar Powered"],
    available: true,
    verified: true,
    image: "🍊"
  },
  {
    id: 6,
    name: "Riverside Organic Co-op",
    location: "Trichy, Tamil Nadu",
    rating: 4.8,
    reviews: 98,
    crops: ["Corn", "Beans", "Squash"],
    badges: ["Certified Organic", "Community Supported"],
    available: false,
    verified: true,
    image: "🌽"
  }
];

const BrowseFarms = () => {
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    duration: 'Half Day (4 hours)',
    purpose: ''
  });

  const handleBooking = (farm) => {
    setSelectedFarm(farm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFarm(null);
    setFormData({ date: '', duration: 'Half Day (4 hours)', purpose: '' });
  };

  const handleSubmit = () => {
    alert(`Visit request sent for ${selectedFarm.name}!\nDate: ${formData.date}\nDuration: ${formData.duration}\nPurpose: ${formData.purpose}`);
    handleCloseModal();
  };

  return (
    <div style={{ 
      padding: '24px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '24px'
      }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '600',
          margin: 0,
          display: 'flex', 
          alignItems: 'center',
          fontFamily: 'Roboto, sans-serif'
        }}>
          <Search style={{ width: '32px', height: '32px', marginRight: '12px', color: '#2e7d32' }} />
          Browse Farms
        </h1>
        <button style={{
          padding: '10px 24px',
          border: '1px solid rgba(0, 0, 0, 0.23)',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          fontSize: '15px',
          fontWeight: '500',
          fontFamily: 'Roboto, sans-serif',
          color: 'rgba(0, 0, 0, 0.87)',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
          e.target.style.borderColor = 'rgba(0, 0, 0, 0.87)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.borderColor = 'rgba(0, 0, 0, 0.23)';
        }}
        >
          <Filter style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          Filters
        </button>
      </div>

      {/* Farm Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
        gap: '24px' 
      }}>
        {farms.map(farm => (
          <div 
            key={farm.id} 
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0px 3px 6px rgba(0,0,0,0.1), 0px 1px 3px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              fontFamily: 'Roboto, sans-serif',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
            onClick={() => handleBooking(farm)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0px 12px 24px rgba(0,0,0,0.15), 0px 8px 16px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0px 3px 6px rgba(0,0,0,0.1), 0px 1px 3px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #66bb6a 0%, #43a047 100%)',
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '80px'
            }}>
              {farm.image}
            </div>

            <div style={{ padding: '16px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between', 
                marginBottom: '8px' 
              }}>
                <h3 style={{ 
                  fontWeight: '500', 
                  fontSize: '20px', 
                  color: 'rgba(0, 0, 0, 0.87)',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {farm.name}
                </h3>
                {farm.verified && (
                  <CheckCircle style={{ 
                    width: '24px', 
                    height: '24px', 
                    color: '#2e7d32', 
                    flexShrink: 0,
                    marginLeft: '8px'
                  }} />
                )}
              </div>

              <p style={{ 
                fontSize: '14px', 
                color: 'rgba(0, 0, 0, 0.6)', 
                marginBottom: '8px', 
                display: 'flex', 
                alignItems: 'center',
                margin: '0 0 12px 0'
              }}>
                <MapPin style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                {farm.location}
              </p>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '16px' 
              }}>
                <Star style={{ 
                  width: '18px', 
                  height: '18px', 
                  color: '#ffa726', 
                  fill: '#ffa726', 
                  marginRight: '6px' 
                }} />
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '700', 
                  color: 'rgba(0, 0, 0, 0.87)',
                  marginRight: '4px'
                }}>
                  {farm.rating}
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  color: 'rgba(0, 0, 0, 0.6)' 
                }}>
                  ({farm.reviews} reviews)
                </span>
              </div>

              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px', 
                marginBottom: '12px' 
              }}>
                {farm.crops.map((crop, idx) => (
                  <span 
                    key={idx} 
                    style={{
                      padding: '4px 12px',
                      backgroundColor: '#e8f5e9',
                      color: '#2e7d32',
                      fontSize: '13px',
                      borderRadius: '16px',
                      fontWeight: '500'
                    }}
                  >
                    {crop}
                  </span>
                ))}
              </div>

              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px', 
                marginBottom: '16px' 
              }}>
                {farm.badges.map((badge, idx) => (
                  <span 
                    key={idx} 
                    style={{
                      padding: '4px 12px',
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      fontSize: '13px',
                      borderRadius: '16px',
                      fontWeight: '500'
                    }}
                  >
                    ✓ {badge}
                  </span>
                ))}
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                paddingTop: '16px', 
                borderTop: '1px solid rgba(0, 0, 0, 0.12)' 
              }}>
                <span style={{
                  padding: '6px 16px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: '500',
                  backgroundColor: farm.available ? '#e8f5e9' : '#f5f5f5',
                  color: farm.available ? '#2e7d32' : 'rgba(0, 0, 0, 0.6)'
                }}>
                  {farm.available ? 'Available' : 'Not Available'}
                </span>
                <button 
                  style={{
                    padding: '8px 22px',
                    backgroundColor: '#2e7d32',
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02857em',
                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
                    transition: 'background-color 0.2s'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBooking(farm);
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#1b5e20'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2e7d32'}
                >
                  Book Visit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedFarm && (
        <>
          {/* Backdrop */}
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleCloseModal}
          >
            {/* Modal */}
            <div 
              style={{
                backgroundColor: 'white',
                borderRadius: '4px',
                maxWidth: '600px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
                fontFamily: 'Roboto, sans-serif'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div style={{
                padding: '24px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <h2 style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: '500',
                  color: 'rgba(0, 0, 0, 0.87)'
                }}>
                  Request Farm Visit
                </h2>
                <button
                  onClick={handleCloseModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <X style={{ width: '24px', height: '24px', color: 'rgba(0, 0, 0, 0.54)' }} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{ padding: '24px' }}>
                {/* Farm Info */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '32px',
                  padding: '16px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px'
                }}>
                  <div style={{ fontSize: '48px' }}>{selectedFarm.image}</div>
                  <div>
                    <h3 style={{
                      margin: '0 0 4px 0',
                      fontSize: '20px',
                      fontWeight: '500',
                      color: 'rgba(0, 0, 0, 0.87)'
                    }}>
                      {selectedFarm.name}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: 'rgba(0, 0, 0, 0.6)'
                    }}>
                      {selectedFarm.location}
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'rgba(0, 0, 0, 0.87)',
                    marginBottom: '8px'
                  }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px 14px',
                      fontSize: '16px',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: '4px',
                      fontFamily: 'Roboto, sans-serif',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'rgba(0, 0, 0, 0.87)',
                    marginBottom: '8px'
                  }}>
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '16px 14px',
                      fontSize: '16px',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: '4px',
                      fontFamily: 'Roboto, sans-serif',
                      backgroundColor: 'white',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option>Half Day (4 hours)</option>
                    <option>Full Day (8 hours)</option>
                    <option>2 Hours</option>
                  </select>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: 'rgba(0, 0, 0, 0.87)',
                    marginBottom: '8px'
                  }}>
                    Purpose of Visit
                  </label>
                  <textarea
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="Describe what you hope to learn from this visit..."
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '16px 14px',
                      fontSize: '16px',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: '4px',
                      fontFamily: 'Roboto, sans-serif',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  justifyContent: 'flex-end'
                }}>
                  <button
                    onClick={handleCloseModal}
                    style={{
                      padding: '10px 22px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02857em',
                      border: '1px solid rgba(0, 0, 0, 0.23)',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      color: 'rgba(0, 0, 0, 0.87)',
                      cursor: 'pointer',
                      fontFamily: 'Roboto, sans-serif'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.04)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{
                      padding: '10px 22px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '0.02857em',
                      border: 'none',
                      borderRadius: '4px',
                      backgroundColor: '#16a34a',
                      color: 'white',
                      cursor: 'pointer',
                      fontFamily: 'Roboto, sans-serif',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#15803d'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#16a34a'}
                  >
                    <Send style={{ width: '18px', height: '18px' }} />
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BrowseFarms;