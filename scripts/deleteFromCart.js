import http from "k6/http";
import { Trend } from "k6/metrics";
import { group, sleep, check } from "k6";
import { BASE_URL } from '../utils/utils.js';

const deleteFromCartLatency = new Trend("pageDeleteFromCart_GroupDuration");


export function deleteFromCart() {
    // console.log(' ---=== This is the deleteFromCart() function call ===--- ');

    // const regex = /(cart.remove('\d+')/;

    group('Delete From Cart page', function () {

      let res1 = http.get(`${BASE_URL}index.php?route=checkout/cart`);
      check(res1, {
          'Delete From Cart page status - 200': r => r.status === 200,
          //"Body contains What would you ...": response => response.body.includes("What would you like to do next?")
        });

      //const regex = /(cart.remove('\d+')/;
      const removeFromCart = res1.body.match(regex)[0];
      console.log('Regex for remove from Cart values: ' + removeFromCart); 
 
      let res = http.post(`${BASE_URL}index.php?route=checkout/cart/add`, { key: 5384, } );
        check(res, {
            'Delete From Cart page status - 200': r => r.status === 200,
        });

      let response = http.get(`${BASE_URL}index.php?route=checkout/cart`);
        check(response, {
            'Delete From Cart page status - 200': r => r.status === 200,
            //"Body contains What would you ...": response => response.body.includes("What would you like to do next?")
          });

        deleteFromCartLatency.add(res.timings.duration); // add duration property to metric

        sleep(Math.random() * 4 + 1);
    
      });
    
}