import React, { useState } from 'react';

const FarmProfile = () => {
  const [badges, setBadges] = useState({
    organic: true,
    waterSaving: true,
    ecoFriendly: true,
    zeroPesticide: false
  });

  const handleBadgeChange = (badge) => {
    setBadges({ ...badges, [badge]: !badges[badge] });
  };

  const styles = {
    container: {
      padding: '16px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    },
    card: {
      maxWidth: '896px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      padding: '32px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '32px'
    },
    headerIcon: {
      width: '32px',
      height: '32px',
      color: '#22c55e',
      marginRight: '12px'
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#111827',
      margin: 0
    },
    formSection: {
      marginBottom: '32px'
    },
    fieldGroup: {
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    uploadBox: {
      border: '2px dashed #d1d5db',
      borderRadius: '8px',
      padding: '48px',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: 'white',
      transition: 'all 0.2s'
    },
    uploadIcon: {
      width: '48px',
      height: '48px',
      color: '#9ca3af',
      margin: '0 auto 12px'
    },
    uploadText: {
      fontSize: '14px',
      color: '#4b5563',
      marginBottom: '4px'
    },
    uploadSubtext: {
      fontSize: '12px',
      color: '#6b7280'
    },
    verificationCard: {
      backgroundColor: '#f0fdf4',
      border: '1px solid #bbf7d0',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px'
    },
    verificationContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    verificationLeft: {
      display: 'flex',
      alignItems: 'center'
    },
    verificationIcon: {
      width: '24px',
      height: '24px',
      color: '#22c55e',
      marginRight: '8px'
    },
    verificationTitle: {
      fontWeight: 'bold',
      color: '#111827',
      fontSize: '16px',
      margin: 0
    },
    verificationText: {
      fontSize: '14px',
      color: '#4b5563',
      marginTop: '4px'
    },
    badge: {
      backgroundColor: '#22c55e',
      color: 'white',
      padding: '6px 16px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: 'bold',
      border: 'none'
    },
    sectionCard: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px'
    },
    sectionTitle: {
      fontWeight: 'bold',
      color: '#111827',
      marginBottom: '16px',
      fontSize: '16px'
    },
    checkboxContainer: {
      marginBottom: '12px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      marginRight: '12px',
      cursor: 'pointer',
      accentColor: '#9333ea'
    },
    checkboxText: {
      fontSize: '14px',
      color: '#374151'
    },
    mapHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px'
    },
    mapIcon: {
      width: '24px',
      height: '24px',
      color: '#ef4444',
      marginRight: '8px'
    },
    mapPreview: {
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      height: '192px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    },
    mapText: {
      fontSize: '14px',
      color: '#4b5563'
    },
    mapButton: {
      width: '100%',
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '32px'
    },
    cancelButton: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      backgroundColor: 'white',
      color: '#374151',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    },
    saveButton: {
      padding: '12px 24px',
      borderRadius: '8px',
      backgroundColor: '#22c55e',
      color: 'white',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <svg style={styles.headerIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h1 style={styles.title}>Farm Profile & Verification</h1>
        </div>

        {/* Form Section */}
        <div style={styles.formSection}>
          {/* Farm Name */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Farm Name</label>
            <input
              type="text"
              placeholder="Green Valley Organic Farm"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#22c55e';
                e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Location */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Location</label>
            <input
              type="text"
              placeholder="Coimbatore, Tamil Nadu"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#22c55e';
                e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Crops Grown */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Crops Grown</label>
            <input
              type="text"
              placeholder="Rice, Turmeric, Vegetables"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#22c55e';
                e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Average Yield */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Average Yield (tons/acre)</label>
            <input
              type="number"
              placeholder="2.5"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#22c55e';
                e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Farm Photos */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Farm Photos</label>
            <div 
              style={styles.uploadBox}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#22c55e';
                e.currentTarget.style.backgroundColor = '#f0fdf4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <svg style={styles.uploadIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p style={styles.uploadText}>Click to upload or drag and drop</p>
              <p style={styles.uploadSubtext}>PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div style={styles.verificationCard}>
          <div style={styles.verificationContent}>
            <div style={styles.verificationLeft}>
              <svg style={styles.verificationIcon} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 style={styles.verificationTitle}>Verification Status</h3>
                <p style={styles.verificationText}>Your farm is verified</p>
              </div>
            </div>
            <span style={styles.badge}>VERIFIED</span>
          </div>
        </div>

        {/* Sustainability Badges */}
        <div style={styles.sectionCard}>
          <h3 style={styles.sectionTitle}>Sustainability Badges</h3>
          <div style={styles.checkboxContainer}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={badges.organic}
                onChange={() => handleBadgeChange('organic')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Organic Certified</span>
            </label>
          </div>
          <div style={styles.checkboxContainer}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={badges.waterSaving}
                onChange={() => handleBadgeChange('waterSaving')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Water-Saving Practices</span>
            </label>
          </div>
          <div style={styles.checkboxContainer}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={badges.ecoFriendly}
                onChange={() => handleBadgeChange('ecoFriendly')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Eco-Friendly Methods</span>
            </label>
          </div>
          <div style={styles.checkboxContainer}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={badges.zeroPesticide}
                onChange={() => handleBadgeChange('zeroPesticide')}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>Zero Pesticide</span>
            </label>
          </div>
        </div>

        {/* GPS Location */}
        <div style={styles.sectionCard}>
          <div style={styles.mapHeader}>
            <svg style={styles.mapIcon} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <h3 style={styles.sectionTitle}>GPS Location</h3>
          </div>
          <div style={styles.mapPreview}>
            <p style={styles.mapText}>Map Preview: 11.0168°N, 76.9558°E</p>
          </div>
          <button
            style={styles.mapButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Set Location on Map
          </button>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonContainer}>
          <button
            style={styles.cancelButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
          <button
            style={styles.saveButton}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#16a34a'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#22c55e'}
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmProfile;