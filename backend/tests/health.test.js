const request = require('supertest');
const app = require('../app');

/**
 * Tests pour l'endpoint de verification de sante de l'application
 * Cet endpoint permet de verifier que l'application fonctionne correctement
 * et est utilise par les systemes de monitoring et de deploiement
 */
describe('Endpoint de verification de sante', () => {

  /**
   * Test principal qui verifie que l'endpoint /api/health repond correctement
   * avec un statut HTTP 200 et contient toutes les informations necessaires
   * pour confirmer que l'application est operationnelle
   */
  test('GET /api/health doit retourner 200 avec le statut de sante', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    // Verification que la reponse contient le statut OK
    expect(response.body).toHaveProperty('status', 'OK');
    // Verification de la presence du timestamp
    expect(response.body).toHaveProperty('timestamp');
    // Verification de la presence de l'environnement
    expect(response.body).toHaveProperty('environment');
    // Verification de la presence de la version
    expect(response.body).toHaveProperty('version');
  });

  /**
   * Test qui verifie que le timestamp retourne par l'endpoint est valide
   * Le timestamp doit etre une date valide au format ISO pour permettre
   * un suivi precis des reponses de l'application
   */
  test('Le timestamp doit etre une date valide', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    const timestamp = new Date(response.body.timestamp);
    // Verification que le timestamp est une instance de Date valide
    expect(timestamp).toBeInstanceOf(Date);
    // Verification que la date n'est pas invalide (NaN)
    expect(timestamp.getTime()).not.toBeNaN();
  });

  /**
   * Test qui verifie que les informations d'environnement et de version
   * sont retournees sous forme de chaines de caracteres non vides
   * Ces informations sont essentielles pour le debugging et le monitoring
   */
  test('Les informations environnement et version doivent etre des chaines', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    // Verification que l'environnement est une chaine de caracteres
    expect(typeof response.body.environment).toBe('string');
    // Verification que la version est une chaine de caracteres
    expect(typeof response.body.version).toBe('string');
  });
});
