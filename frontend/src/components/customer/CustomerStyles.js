const customerStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Manrope:wght@400;500;600;700;800&display=swap');
  
  :root {
    --primary: #E63946;
    --primary-dark: #C1121F;
    --accent: #2A9D8F;
    --warning: #F4A261;
    --dark: #1D1D1F;
    --gray: #86868B;
    --light-gray: #F5F5F7;
    --white: #FFFFFF;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Manrope', sans-serif;
    background: var(--light-gray);
    color: var(--dark);
    -webkit-font-smoothing: antialiased;
  }
  
  .customer-app {
    min-height: 100vh;
    padding-bottom: 100px;
  }
  
  /* Restaurant Header */
  .restaurant-header {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    padding: 2rem 1.5rem 3rem;
    position: relative;
    overflow: hidden;
  }
  
  @media (max-width: 768px) {
    .restaurant-header {
      padding: 1.5rem 1rem 2rem;
    }
  }
  
  .restaurant-header::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    animation: float 20s infinite ease-in-out;
  }
  
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-30px, 30px); }
  }
  
  .header-content {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .logout-btn {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    font-size: 0.95rem;
  }
  
  .logout-btn:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .user-profile {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(0,0,0,0.15);
    padding: 0.4rem 0.4rem 0.4rem 1rem;
    border-radius: 50px;
  }
  
  .user-greeting {
    font-weight: 700;
    font-size: 0.95rem;
  }
  
  .login-btn {
    background: white;
    color: var(--primary-dark);
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  .login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  }
  
  .restaurant-info {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }
  
  .restaurant-logo {
    width: 70px;
    height: 70px;
    border-radius: 16px;
    object-fit: cover;
    border: 3px solid rgba(255,255,255,0.3);
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  }
  
  .restaurant-details h1 {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 900;
    margin-bottom: 0.25rem;
  }
  
  .restaurant-details p {
    opacity: 0.9;
    font-size: 0.95rem;
  }
  
  .table-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    padding: 0.625rem 1.25rem;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1rem;
    border: 1px solid rgba(255,255,255,0.3);
  }
  
  /* Search Bar */
  .search-section {
    padding: 1.5rem;
    background: white;
    max-width: 1200px;
    margin: -1.5rem auto 0;
    border-radius: 20px 20px 0 0;
    position: relative;
    z-index: 2;
  }
  
  .search-container {
    position: relative;
  }
  
  .search-input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid var(--light-gray);
    border-radius: 14px;
    font-size: 1rem;
    font-family: 'Manrope', sans-serif;
    transition: all 0.3s ease;
    background: var(--light-gray);
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--primary);
    background: white;
    box-shadow: 0 4px 16px rgba(230, 57, 70, 0.15);
  }
  
  .search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--gray);
  }
  
  /* Categories */
  .categories-section {
    padding: 0 1.5rem 1rem;
    background: white;
    max-width: 1200px;
    margin: 0 auto;
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 2px 12px rgba(0,0,0,0.05);
  }
  
  .categories-scroll {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding: 1rem 0;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .categories-scroll::-webkit-scrollbar {
    display: none;
  }
  
  .category-chip {
    flex-shrink: 0;
    padding: 0.75rem 1.25rem;
    min-height: 44px; /* Touch target minimum height */
    background: var(--light-gray);
    border: 2px solid transparent;
    border-radius: 50px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .category-chip:hover {
    background: var(--primary);
    color: white;
    transform: translateY(-2px);
  }
  
  .category-chip.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
  
  /* Menu Items */
  .menu-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
  }
  
  @media (max-width: 768px) {
    .menu-section {
      padding: 1rem;
    }
  }
  
  .menu-grid {
    display: grid;
    gap: 1.25rem;
  }
  
  .menu-item {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    gap: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
  }
  
  .menu-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
  
  .menu-item-image-container {
    position: relative;
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }
  
  .menu-item-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .menu-item-content {
    flex: 1;
    padding: 1rem 1rem 1rem 0;
    display: flex;
    flex-direction: column;
  }
  
  .item-header {
    display: flex;
    align-items: start;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .veg-indicator {
    width: 18px;
    height: 18px;
    border: 2px solid var(--accent);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }
  
  .veg-indicator::after {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
  }
  
  .veg-indicator.non-veg {
    border-color: #D32F2F;
  }
  
  .veg-indicator.non-veg::after {
    background: #D32F2F;
  }
  
  .item-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.25rem;
  }
  
  .item-description {
    color: var(--gray);
    font-size: 0.875rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
    flex: 1;
  }
  
  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .item-price {
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--dark);
  }
  
  .add-button {
    background: var(--primary);
    color: white;
    border: none;
    padding: 0.625rem 1.5rem;
    min-height: 44px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Manrope', sans-serif;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .add-button:hover {
    background: var(--primary-dark);
    transform: scale(1.05);
  }
  
  .add-button:active {
    transform: scale(0.98);
  }
  
  /* Cart Float Button */
  .cart-float {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    background: var(--accent);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    box-shadow: 0 8px 32px rgba(42, 157, 143, 0.4);
    transition: all 0.3s ease;
    z-index: 100;
    min-width: 200px;
    justify-content: space-between;
    animation: slideUp 0.5s ease-out;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  .cart-float:hover {
    transform: translateX(-50%) translateY(-4px);
    box-shadow: 0 12px 40px rgba(42, 157, 143, 0.5);
  }
  
  .cart-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .cart-count {
    background: rgba(255,255,255,0.3);
    padding: 0.25rem 0.625rem;
    border-radius: 20px;
    font-weight: 800;
    font-size: 0.85rem;
  }
  
  .cart-total {
    font-weight: 800;
    font-size: 1.1rem;
  }
  
  /* Cart Modal */
  .cart-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    z-index: 200;
    animation: fadeIn 0.3s ease-out;
    backdrop-filter: blur(4px);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .cart-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-radius: 24px 24px 0 0;
    max-height: 85vh;
    z-index: 201;
    display: flex;
    flex-direction: column;
    animation: slideUpModal 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  @keyframes slideUpModal {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  
  .cart-header {
    padding: 1.5rem;
    border-bottom: 2px solid var(--light-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .cart-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 900;
  }
  
  .close-cart {
    background: var(--light-gray);
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .close-cart:hover {
    background: var(--primary);
    color: white;
    transform: rotate(90deg);
  }
  
  .cart-items-container {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }
  
  .cart-item {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--light-gray);
  }
  
  .cart-item-image {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    object-fit: cover;
  }
  
  .cart-item-details {
    flex: 1;
  }
  
  .cart-item-name {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  .cart-item-price {
    color: var(--gray);
    font-size: 0.9rem;
  }
  
  .quantity-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }
  
  .qty-btn {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: none;
    background: var(--primary);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .qty-btn:hover {
    background: var(--primary-dark);
    transform: scale(1.1);
  }
  
  .quantity {
    font-weight: 700;
    min-width: 24px;
    text-align: center;
  }
  
  .cart-summary {
    padding: 1.5rem;
    background: var(--light-gray);
    border-radius: 16px 16px 0 0;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    font-size: 0.95rem;
  }
  
  .summary-row.total {
    font-size: 1.25rem;
    font-weight: 800;
    padding-top: 1rem;
    margin-top: 1rem;
    border-top: 2px solid var(--dark);
  }
  
  .place-order-btn {
    width: 100%;
    background: var(--accent);
    color: white;
    border: none;
    padding: 1.25rem;
    border-radius: 14px;
    font-weight: 800;
    font-size: 1.1rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: all 0.3s ease;
    font-family: 'Manrope', sans-serif;
  }
  
  .place-order-btn:hover {
    background: #248075;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(42, 157, 143, 0.3);
  }
  
  /* Order Success */
  .order-success-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.3s ease-out;
  }
  
  .success-content {
    background: white;
    padding: 3rem 2rem;
    border-radius: 24px;
    text-align: center;
    max-width: 400px;
    margin: 0 1rem;
    animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  }
  
  @keyframes scaleIn {
    from { transform: scale(0); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  .success-icon {
    width: 80px;
    height: 80px;
    background: var(--accent);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
  }
  
  .success-content h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    color: var(--dark);
  }
  
  .order-number {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--primary);
    margin: 1rem 0;
  }
  
  .success-content p {
    color: var(--gray);
    margin-bottom: 2rem;
  }
  
  .continue-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 1rem 2.5rem;
    border-radius: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Manrope', sans-serif;
    font-size: 1rem;
  }
  
  .continue-btn:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }
  
  .empty-state {
    text-align: center;
    padding: 3rem 1.5rem;
    color: var(--gray);
  }
  
  .empty-state h3 {
    margin-top: 1rem;
    color: var(--dark);
  }
  
  @media (min-width: 768px) {
    .cart-modal {
      left: 50%;
      transform: translateX(-50%);
      max-width: 500px;
      bottom: 2rem;
      border-radius: 24px;
      max-height: 80vh;
    }
    
    .menu-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 767px) {
    .cart-modal {
      height: 90vh; /* Make it more full screen on tiny devices */
      max-height: 90vh;
    }
    .place-order-btn {
      padding: 1rem;
    }
  }

  /* Order Status Tracker */
  .order-tracker-float {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: white;
    border-radius: 16px;
    padding: 0.75rem 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    z-index: 150;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    animation: slideInRight 0.4s ease-out;
    border: 2px solid var(--accent);
    max-width: 220px;
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .order-tracker-float:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.2);
  }

  .tracker-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .tracker-icon.pending {
    background: #FEF3C7;
    color: #D97706;
    animation: pulse 2s infinite;
  }

  .tracker-icon.preparing {
    background: #DBEAFE;
    color: #2563EB;
    animation: pulse 1.5s infinite;
  }

  .tracker-icon.ready {
    background: #D1FAE5;
    color: #059669;
    animation: bounce 1s infinite;
  }

  .tracker-icon.completed {
    background: #D1FAE5;
    color: #059669;
  }

  .tracker-icon.cancelled {
    background: #FEE2E2;
    color: #DC2626;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  .tracker-info {
    flex: 1;
    min-width: 0;
  }

  .tracker-order-id {
    font-size: 0.75rem;
    color: var(--gray);
  }

  .tracker-status {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--dark);
  }

  /* Order Tracker Modal */
  .tracker-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    border-radius: 24px 24px 0 0;
    max-height: 70vh;
    z-index: 201;
    display: flex;
    flex-direction: column;
    animation: slideUpModal 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .tracker-header {
    padding: 1.5rem;
    border-bottom: 2px solid var(--light-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tracker-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 900;
  }

  .tracker-content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }

  .status-timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
  }

  .status-step {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    position: relative;
    padding-bottom: 1.5rem;
  }

  .status-step:last-child {
    padding-bottom: 0;
  }

  .status-step::before {
    content: '';
    position: absolute;
    left: 18px;
    top: 40px;
    bottom: 0;
    width: 2px;
    background: var(--light-gray);
  }

  .status-step:last-child::before {
    display: none;
  }

  .status-step.active::before {
    background: var(--accent);
  }

  .status-step.completed::before {
    background: var(--accent);
  }

  .step-icon {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--light-gray);
    color: var(--gray);
    position: relative;
    z-index: 1;
  }

  .status-step.active .step-icon {
    background: var(--accent);
    color: white;
    animation: pulse 2s infinite;
  }

  .status-step.completed .step-icon {
    background: var(--accent);
    color: white;
  }

  .step-content h4 {
    font-weight: 700;
    font-size: 1rem;
    color: var(--gray);
    margin-bottom: 0.25rem;
  }

  .status-step.active .step-content h4,
  .status-step.completed .step-content h4 {
    color: var(--dark);
  }

  .step-content p {
    font-size: 0.85rem;
    color: var(--gray);
  }

  .tracker-order-details {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 2px solid var(--light-gray);
  }

  .tracker-order-details h4 {
    font-weight: 700;
    margin-bottom: 0.75rem;
  }

  .tracker-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--light-gray);
  }

  .tracker-item:last-child {
    border-bottom: none;
  }

  .dismiss-btn {
    width: 100%;
    background: var(--light-gray);
    color: var(--dark);
    border: none;
    padding: 1rem;
    border-radius: 14px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1.5rem;
    transition: all 0.3s ease;
    font-family: 'Manrope', sans-serif;
  }

  .dismiss-btn:hover {
    background: var(--primary);
    color: white;
  }

  @media (min-width: 768px) {
    .tracker-modal {
      left: 50%;
      transform: translateX(-50%);
      max-width: 450px;
      bottom: 2rem;
      border-radius: 24px;
    }
  }
`;

export default customerStyles;
