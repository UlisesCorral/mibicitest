const request = require('supertest');
const app = require('../index.js'); 

describe('Station Routes', () => {
  it('GET /stations should return status 200 and a valid response when stations are found', async () => {
    const response = await request(app)
      .get('/api/stations/stations')
      .query({ latitude: 20.666378, longitude: -103.34882, radius: 1000 }); // Coordenadas que coinciden con al menos una estación
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data.stations)).toBe(true); // Modificado para reflejar la estructura real de la respuesta
    expect(response.body.data.stations.length).toBeGreaterThan(0);
  });

  it('GET /stations should return status 400 when the station wasnt found', async () => {
    const response = await request(app)
      .get('/api/stations/stations')
      .query({ latitude: 0, longitude: 0, radius: 500 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error', "The station wasn't found");
    expect(response.body).toHaveProperty('data', null);
  });

  // Agrega más pruebas según sea necesario para cubrir diferentes casos de uso y escenarios
});
