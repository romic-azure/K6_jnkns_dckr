import { scenario1 } from './scenarios/scenario1.js';
import { scenario2 } from './scenarios/scenario2.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { thresholdsSettings, breakingWorkload, smokeWorkload } from "./config/config.js";

// k6 run main.js -e WORKLOAD=breaking  => to execute from command line when it's needed
export const options = {
  scenarios: {
    my_scenario: 
    __ENV.WORKLOAD === 'breaking' ? breakingWorkload : smokeWorkload
  },
  thresholds: thresholdsSettings
};

export function setup(){
  console.log('---=== Start execution ===--- ' + new Date());
}

export default function () {
  scenario1();
  scenario2();
}

export function teardown(data) {
  console.log('---=== Execution finished ===--- ' + new Date());
}


// create a HTML report 
export function handleSummary(data) {
  return {
  'TestExecReport.html': htmlReport(data, { debug: true }),
  // stdout: textSummary(data, {indent: " ", enableColors: true})
    };
  } 
