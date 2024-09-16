
  // define desired thresholds here
  export const thresholdsSettings = { 
    http_req_failed: [{ threshold: "rate<0.03", abortOnFail: true }],
    http_req_duration: ["p(99)<1000"],
  }

  // define the execution types - smoke, breaking, workload, etc ... 

  export const smokeWorkload = {
    executor: 'shared-iterations',
    iterations: 5,
    vus:1
  } 
  
  export const breakingWorkload = {
    executor: 'ramping-vus',
    stages: [
      { duration: '10s', target: 2 },
      { duration: '30s', target: 3 },
      { duration: '30s', target: 4 },
      // ...
    ],
  } 
  