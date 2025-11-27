import { useState } from 'react';
import { Award, TrendingUp, Medal } from 'lucide-react';

const Rewards = () => {
  const [farmTokens] = useState({
    total: 450,
    earned: 45,
    rates: [
      { text: '20 tokens per visit hosted', icon: '🏠' },
      { text: '10 tokens per 5-star review', icon: '⭐' },
      { text: '5 tokens per badge earned', icon: '🏆' }
    ]
  });

  const [carbonCredits] = useState({
    total: 120,
    earned: 20,
    impact: [
      { text: '15 credits per organic visit', icon: '🌱' },
      { text: '10 credits per water-saving demo', icon: '💧' },
      { text: '25 credits per sustainability badge', icon: '♻️' }
    ]
  });

  const [leaderboard] = useState([
    { id: 1, name: 'Ravi Kumar', rank: 1, tokens: 890, medal: '🥇' },
    { id: 2, name: 'Lakshmi Devi', rank: 2, tokens: 750, medal: '🥈' },
    { id: 3, name: 'Murugan Pillai', rank: 3, tokens: 680, medal: '🥉' },
    { id: 4, name: 'Priya Sharma', rank: 4, tokens: 450, medal: '⭐' },
    { id: 5, name: 'Arun Kumar', rank: 5, tokens: 320, medal: '⭐' }
  ]);

  const [badges] = useState([
    { id: 1, name: 'Top Mentor', icon: '👑', unlocked: true },
    { id: 2, name: 'Organic Pioneer', icon: '🌱', unlocked: true },
    { id: 3, name: 'Water Saver', icon: '💧', unlocked: true },
    { id: 4, name: 'Model Farm', icon: '🏆', unlocked: false },
    { id: 5, name: 'Field Expert', icon: '📚', unlocked: true },
    { id: 6, name: 'Star Learner', icon: '⭐', unlocked: false },
    { id: 7, name: 'Sustainability Hero', icon: '🌍', unlocked: false },
    { id: 8, name: 'Community Leader', icon: '🤝', unlocked: true }
  ]);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '30px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '28px',
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937'
  };

  const headerIconStyle = {
    color: '#f59e0b'
  };

  const maxWidthContainerStyle = {
    maxWidth: '1100px',
    margin: '0 auto'
  };

  // Two column grid for tokens and credits
  const rewardsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px',
    marginBottom: '32px'
  };

  // FarmTokens Card - Medium Size
  const farmTokensCardStyle = {
    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #f97316 100%)',
    borderRadius: '16px',
    padding: '28px',
    color: 'white',
    boxShadow: '0 8px 20px rgba(251, 191, 36, 0.25)',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const cardTitleStyle = {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '4px',
    opacity: 0.95
  };

  const cardIconStyle = {
    opacity: 0.9
  };

  const largeNumberStyle = {
    fontSize: '48px',
    fontWeight: '700',
    lineHeight: '1',
    marginBottom: '6px'
  };

  const earnedTextStyle = {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: '18px'
  };

  const ratesBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '10px',
    padding: '14px',
    backdropFilter: 'blur(10px)'
  };

  const ratesHeaderStyle = {
    fontSize: '12px',
    fontWeight: '600',
    marginBottom: '10px',
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const rateItemStyle = {
    fontSize: '13px',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    opacity: 0.95
  };

  // Carbon Credits Card - Medium Size
  const carbonCreditsCardStyle = {
    background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
    borderRadius: '16px',
    padding: '28px',
    color: 'white',
    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)',
    position: 'relative',
    overflow: 'hidden'
  };

  // Leaderboard
  const leaderboardSectionStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '22px',
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: '20px'
  };

  const sectionIconStyle = {
    color: '#10b981'
  };

  const leaderItemStyle = (rank) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderRadius: '12px',
    marginBottom: '12px',
    backgroundColor: rank === 1 ? '#f0fdf4' : '#f9fafb',
    border: rank === 1 ? '2px solid #10b981' : '1px solid #e5e7eb',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  });

  const leaderLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  };

  const medalStyle = {
    fontSize: '28px'
  };

  const leaderInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  };

  const leaderNameStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937'
  };

  const leaderRankStyle = {
    fontSize: '13px',
    color: '#6b7280'
  };

  const leaderRightStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  };

  const tokensNumberStyle = (rank) => ({
    fontSize: '20px',
    fontWeight: '700',
    color: rank === 1 ? '#10b981' : '#1f2937'
  });

  const tokensLabelStyle = {
    fontSize: '11px',
    color: '#6b7280'
  };

  // Badges - 4 rows x 2 columns
  const badgesSectionStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '28px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
  };

  const badgeGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  };

  const badgeCardStyle = (unlocked) => ({
    backgroundColor: unlocked ? '#fffbeb' : '#f3f4f6',
    border: unlocked ? '3px solid #fbbf24' : '2px solid #e5e7eb',
    borderRadius: '14px',
    padding: '24px',
    textAlign: 'center',
    transition: 'all 0.3s',
    cursor: unlocked ? 'pointer' : 'default',
    opacity: unlocked ? 1 : 0.6
  });

  const badgeIconStyle = {
    fontSize: '40px',
    marginBottom: '12px',
    filter: 'grayscale(0%)'
  };

  const badgeIconLockedStyle = {
    fontSize: '40px',
    marginBottom: '12px',
    filter: 'grayscale(100%)',
    opacity: 0.5
  };

  const badgeNameStyle = (unlocked) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: unlocked ? '#1f2937' : '#9ca3af',
    marginBottom: '4px'
  });

  const badgeStatusStyle = {
    fontSize: '12px',
    color: '#9ca3af',
    fontWeight: '500'
  };

  return (
    <div style={containerStyle}>
      <div style={maxWidthContainerStyle}>
        <div style={headerStyle}>
          <div style={headerIconStyle}>
            <Award size={32} />
          </div>
          Rewards & Incentives
        </div>

        {/* FarmTokens and Carbon Credits - Side by Side */}
        <div style={rewardsGridStyle}>
          {/* FarmTokens Card */}
          <div style={farmTokensCardStyle}>
            <div style={cardHeaderStyle}>
              <div>
                <div style={cardTitleStyle}>FarmTokens</div>
              </div>
              <div style={cardIconStyle}>
                <Award size={32} />
              </div>
            </div>
            <div style={largeNumberStyle}>{farmTokens.total}</div>
            <div style={earnedTextStyle}>+{farmTokens.earned} earned this month</div>
            <div style={ratesBoxStyle}>
              <div style={ratesHeaderStyle}>Earning Rate:</div>
              {farmTokens.rates.map((rate, index) => (
                <div key={index} style={rateItemStyle}>
                  <span>{rate.icon}</span>
                  <span>{rate.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Carbon Credits Card */}
          <div style={carbonCreditsCardStyle}>
            <div style={cardHeaderStyle}>
              <div>
                <div style={cardTitleStyle}>Carbon Credits</div>
              </div>
              <div style={cardIconStyle}>
                <TrendingUp size={32} />
              </div>
            </div>
            <div style={largeNumberStyle}>{carbonCredits.total}</div>
            <div style={earnedTextStyle}>+{carbonCredits.earned} earned this month</div>
            <div style={ratesBoxStyle}>
              <div style={ratesHeaderStyle}>Eco Impact:</div>
              {carbonCredits.impact.map((item, index) => (
                <div key={index} style={rateItemStyle}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div style={leaderboardSectionStyle}>
          <div style={sectionHeaderStyle}>
            <div style={sectionIconStyle}>
              <TrendingUp size={24} />
            </div>
            Seasonal Leaderboard
          </div>
          {leaderboard.map((leader) => (
            <div 
              key={leader.id} 
              style={leaderItemStyle(leader.rank)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
            >
              <div style={leaderLeftStyle}>
                <div style={medalStyle}>{leader.medal}</div>
                <div style={leaderInfoStyle}>
                  <div style={leaderNameStyle}>{leader.name}</div>
                  <div style={leaderRankStyle}>Rank #{leader.rank}</div>
                </div>
              </div>
              <div style={leaderRightStyle}>
                <div style={tokensNumberStyle(leader.rank)}>{leader.tokens}</div>
                <div style={tokensLabelStyle}>FarmTokens</div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges - 4 rows x 2 columns */}
        <div style={badgesSectionStyle}>
          <div style={sectionHeaderStyle}>
            <div style={{ color: '#a855f7' }}>
              <Medal size={24} />
            </div>
            Badge Collection
          </div>
          <div style={badgeGridStyle}>
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                style={badgeCardStyle(badge.unlocked)}
                onMouseEnter={(e) => {
                  if (badge.unlocked) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(251, 191, 36, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (badge.unlocked) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={badge.unlocked ? badgeIconStyle : badgeIconLockedStyle}>
                  {badge.icon}
                </div>
                <div style={badgeNameStyle(badge.unlocked)}>{badge.name}</div>
                {!badge.unlocked && <div style={badgeStatusStyle}>Locked</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;