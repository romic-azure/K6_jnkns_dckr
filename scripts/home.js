import http from "k6/http";
import { Trend } from "k6/metrics";
import { group, sleep, check } from "k6";
import { BASE_URL } from '../utils/utils.js';

const homeLatency = new Trend("pageHome_GroupDuration");

export function home() {
    // console.log(' ---=== This is the home() function call ===--- ');

    group('Go to Home page', function () {
        let res = http.get(`${BASE_URL}`);

        check(res, {
            'Home page status - 200': r => r.status === 200,
          });

        // add duration property to metric
        homeLatency.add(res.timings.duration);

        sleep(Math.random() * 4 + 1);
    
      });
    
  }