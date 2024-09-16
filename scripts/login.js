import { group, sleep, check } from 'k6';
import http from 'k6/http';
import { Trend } from "k6/metrics";
import { BASE_URL, csvData, makeUniqueRandom } from '../utils/utils.js';

const loginLatency = new Trend("pageLogin_GroupDuration");

export function login() {
   // console.log(' ---=== This is the login() function call ===--- ');
  
  group('Go to Login page', function () {
  // Pick a random number to be used in selecting a random user as a POST payload
  const rand = Math.floor(Math.random() * csvData.length);
  //const rand = makeUniqueRandom(csvData.length); 

   // Log in with the randomly selected user (email & password)
   const res = http.post(`${BASE_URL}index.php?route=account/account`, 
         {email: csvData[rand].email, password: csvData[rand].password });

   const isSuccessfulLogged = check(res, {
     'Login succeeded, status - 200': res => res.status === 200,
     //'The correct page is displayed': () => res.body.includes('My Account'),
   });

   if (!isSuccessfulLogged) {
       console.log(`Unable to log in, something wrong - \n Status -> ${res.status} `);
     return;
   }
  
   loginLatency.add(res.timings.duration); // add duration property to metric
  
    sleep(Math.random() * 4 + 1);
  });
}