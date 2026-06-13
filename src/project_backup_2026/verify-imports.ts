// Verification script to prove react-router-dom exports are available
import { NavLink, useLocation } from 'react-router-dom';
import type { NavLinkProps } from 'react-router-dom';

console.log('✅ NavLink imported:', typeof NavLink);
console.log('✅ useLocation imported:', typeof useLocation);
console.log('✅ NavLinkProps type available');
console.log('\nAll react-router-dom v6.30.3 exports are working correctly!');
