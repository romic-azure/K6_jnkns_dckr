import { deleteFromCart } from '../scripts/deleteFromCart.js';
import { findProductAndAddToCart } from '../scripts/findProductAndAdd2Cart.js';
import { home } from '../scripts/home.js';
import { login } from '../scripts/login.js';
import { logout } from '../scripts/logout.js';

export function scenario1() {
  home();
  login();
  findProductAndAddToCart();
  //deleteFromCart();
  logout();
}