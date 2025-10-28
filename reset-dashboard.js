// Script pour réinitialiser le dashboard
localStorage.removeItem('cyberguard_dashboard_data');
console.log('%c✓ Dashboard réinitialisé', 'color: #00ff00; font-weight: bold; font-size: 16px;');
location.reload();
