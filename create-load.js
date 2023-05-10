import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  vus: 200,
  duration: '30s',
};

export default function () {
  // Generar datos aleatorios para los campos del objeto JSON
  const nombre = `Producto-${Math.floor(Math.random() * 1000000)}`;
  const descripcion = `Descripción-${Math.floor(Math.random() * 1000000)}`;
  const precio = (Math.random() * 1000).toFixed(2);

  // Crear el objeto JSON para la petición POST
  const payload = JSON.stringify({
    nombre: nombre,
    descripcion: descripcion,
    precio: precio,
  });

  // Definir los parámetros de la petición, incluyendo los encabezados
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const url = 'https://load-load-workshop.apps.ocp.nuup.rocks/api/articulos/';
  const response = http.post(url, payload, params);

  check(response, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
