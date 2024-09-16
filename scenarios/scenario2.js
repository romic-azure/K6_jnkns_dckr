import { home } from '../scripts/home.js';
import { findCategory } from '../scripts/findCategory.js';
import { logout } from '../scripts/logout.js';

export function scenario2() {
  home();
  findCategory();
  logout();
}