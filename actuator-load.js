import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  stages: [
    { duration: "1m", target: 10},
    { duration: "20m", target: 500},
    { duration: "5m", target: 0} 
  ],
};

export default function () {
  const url = `https://load-load-workshop.apps.ocp.nuup.rocks/actuator/health`;

  // Realizar la solicitud GET y verificar el estado de la respuesta
  const res = http.get(url);
  check(res, {
    'status is 200': (r) => r.status === 200
  });

  sleep(1);
}