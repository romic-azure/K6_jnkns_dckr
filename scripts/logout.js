import http from "k6/http";
import { Trend } from "k6/metrics";
import { group, sleep, check } from "k6";
import { BASE_URL } from '../utils/utils.js';

const logoutLatency = new Trend("pageLogout_GroupDuration");

export function logout() {
// console.log(' ---=== This is the logout() function call ===--- ');
  
group('Go to Logout page', function () {
  let res = http.get(`${BASE_URL}index.php?route=account/logout`);

  check(res, {
      'Logout page status - 200': r => r.status === 200,
  });

  // add duration property to metric
  logoutLatency.add(res.timings.duration);
  
  sleep(Math.random() * 4 + 1);
      
  });
}