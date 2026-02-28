const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');
  
  :root {
    --primary: #6366F1;
    --primary-dark: #4F46E5;
    --success: #10B981;
    --warning: #F59E0B;
    --danger: #EF4444;
    --dark: #0F172A;
    --gray: #64748B;
    --light: #F8FAFC;
    --border: #E2E8F0;
    --sidebar-width: 280px;
  }
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body { font-family: 'Inter', sans-serif; background: var(--light); color: var(--dark); }
  
  .admin-dashboard { display: flex; min-height: 100vh; }
  
  /* Sidebar */
  .sidebar {
    width: var(--sidebar-width);
    background: var(--dark);
    color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    z-index: 100;
  }
  
  .sidebar-header { padding: 2rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
  
  .logo {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1.75rem;
    font-weight: 900;
    background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .sidebar-nav { flex: 1; padding: 1.5rem 0; overflow-y: auto; }
  
  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    color: rgba(255,255,255,0.7);
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: 0.95rem;
    border-left: 3px solid transparent;
  }
  
  .nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
  
  .nav-item.active { background: rgba(99, 102, 241, 0.1); color: var(--primary); border-left-color: var(--primary); }
  
  .sidebar-footer { padding: 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); }
  
  .logout-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: none;
    border-radius: 10px;
    color: #FCA5A5;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
  }
  
  .logout-btn:hover { background: rgba(239, 68, 68, 0.2); }
  
  /* Main Content */
  .main-content { flex: 1; margin-left: var(--sidebar-width); padding: 2rem; }
  
  /* Top Bar */
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    background: white;
    padding: 1.5rem 2rem;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }
  
  .page-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; color: var(--dark); }
  
  .top-bar-actions { display: flex; gap: 1rem; align-items: center; }
  
  .icon-button {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: none;
    background: var(--light);
    color: var(--gray);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .icon-button:hover { background: var(--primary); color: white; transform: translateY(-2px); }
  
  .notification-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--danger);
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.15rem 0.4rem;
    border-radius: 10px;
    min-width: 18px;
    text-align: center;
  }
  
  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .stat-card {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .stat-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: var(--primary); }
  
  .stat-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; }
  
  .stat-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
  
  .stat-icon.orders { background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); color: white; }
  .stat-icon.revenue { background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; }
  .stat-icon.users { background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); color: white; }
  .stat-icon.menu { background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); color: white; }
  
  .stat-label { color: var(--gray); font-size: 0.9rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 0.5rem; }
  .stat-value { font-size: 2.25rem; font-weight: 800; color: var(--dark); }
  
  .stat-change { display: inline-flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; font-weight: 600; padding: 0.25rem 0.625rem; border-radius: 6px; margin-top: 0.5rem; }
  .stat-change.positive { background: #D1FAE5; color: #065F46; }
  .stat-change.negative { background: #FEE2E2; color: #991B1B; }
  
  /* Content Section */
  .content-section { background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); margin-bottom: 2rem; }
  
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
  
  .section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--dark); }
  
  .action-button {
    padding: 0.75rem 1.5rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Inter', sans-serif;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  
  .action-button:hover { background: var(--primary-dark); transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); }
  .action-button.secondary { background: var(--light); color: var(--gray); }
  .action-button.secondary:hover { background: var(--border); color: var(--dark); }
  
  /* Search Bar */
  .search-bar { position: relative; flex: 1; max-width: 400px; }
  
  .search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    border: 2px solid var(--border);
    border-radius: 10px;
    font-size: 0.95rem;
    font-family: 'Inter', sans-serif;
    transition: all 0.3s ease;
  }
  
  .search-input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1); }
  
  .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray); }
  
  /* Table */
  .data-table { width: 100%; border-collapse: separate; border-spacing: 0; }
  .data-table thead { background: var(--light); }
  .data-table th { padding: 1rem; text-align: left; font-weight: 700; color: var(--gray); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid var(--border); }
  .data-table td { padding: 1.25rem 1rem; border-bottom: 1px solid var(--border); color: var(--dark); font-size: 0.95rem; }
  .data-table tbody tr { transition: all 0.2s ease; }
  .data-table tbody tr:hover { background: var(--light); }
  
  .status-badge { display: inline-block; padding: 0.375rem 0.875rem; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; }
  .status-badge.completed { background: #D1FAE5; color: #065F46; }
  .status-badge.preparing { background: #DBEAFE; color: #1E40AF; }
  .status-badge.ready { background: #FEF3C7; color: #92400E; }
  .status-badge.received { background: #E0F2FE; color: #0369A1; }
  .status-badge.cancelled { background: #FEE2E2; color: #991B1B; }
  .status-badge.active { background: #D1FAE5; color: #065F46; }
  .status-badge.inactive { background: #FEE2E2; color: #991B1B; }
  
  .availability-toggle { width: 48px; height: 24px; background: var(--border); border-radius: 12px; position: relative; cursor: pointer; transition: all 0.3s ease; }
  .availability-toggle.active { background: var(--success); }
  .availability-toggle::after { content: ''; position: absolute; width: 18px; height: 18px; background: white; border-radius: 50%; top: 3px; left: 3px; transition: all 0.3s ease; }
  .availability-toggle.active::after { left: 27px; }
  
  .action-buttons { display: flex; gap: 0.5rem; }
  
  .table-action-btn { padding: 0.5rem; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s ease; background: var(--light); color: var(--gray); }
  .table-action-btn:hover { transform: translateY(-2px); }
  .table-action-btn.edit:hover { background: var(--primary); color: white; }
  .table-action-btn.delete:hover { background: var(--danger); color: white; }
  .table-action-btn.view:hover { background: var(--success); color: white; }
  
  .empty-state { text-align: center; padding: 4rem 2rem; color: var(--gray); }
  .empty-state h3 { margin-top: 1rem; color: var(--dark); }
  
  @media (max-width: 1200px) {
    .sidebar { transform: translateX(-100%); }
    .main-content { margin-left: 0; }
  }
  
  @media (max-width: 768px) {
    .main-content { padding: 1rem; }
    .stats-grid { grid-template-columns: 1fr; }
    .top-bar { flex-direction: column; gap: 1rem; align-items: start; }
    .data-table { font-size: 0.85rem; }
    .data-table th, .data-table td { padding: 0.75rem 0.5rem; }
  }
`;

export default adminStyles;
