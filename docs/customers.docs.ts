/**
 * @swagger
 * tags:
 *   name: customers
 *   description: customers managing API
 * components:
 *   schemas:
 *     customers:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: integer
 *           description: Identificador del cliente
 *         document:
 *           type: string
 *           description: dDocumento del cliente
 *         full_name:
 *           type: string
 *           description: Nombre del cliente
 *         email:
 *           type: string
 *           description: Email del cliente
 *         phone:
 *           type: string
 *           description: Telefono del cliente
 *         registration_date:
 *           type: string
 *           description: Fecha de registro del cliente
 * 
 * /customers/create:
 *  post:
 *      summary: this endpoint send a payment
 *      security:
 *        - bearerAuth: []
 *      tags: [customers]
 *      requestBody:
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                      document:
 *                        type: string
 *                      full_name:
 *                        type: number
 *                      email:
 *                        tupe: string
 *                      phone:
 *                        type: string
 *      responses:
 *          201:
 *              description: created successful
 *          400:
 *              description: Bad Request
 *          500:
 *              description: internal server error
 * 
 */
