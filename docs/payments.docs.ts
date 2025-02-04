/**
 * @swagger
 * tags:
 *   name: payments
 *   description: payments managing API
 * components:
 *   schemas:
 *     payments:
 *       type: object
 *       properties:
 *         payment_id:
 *           type: integer
 *           description: Identificador del pago (session_id)
 *         customer_id:
 *           type: integer
 *           description: Identificador del cliente
 *         amount:
 *           type: integer
 *           description: valor del pago
 *         token:
 *           type: string
 *           description: Token generado para el pago
 *         generated_at:
 *           type: string
 *           description: fecha del pago
 *         status:
 *           type: string
 *           description: estado del paago ("pending, confimed, failed")
 * 
 * /payments/sendPayment:
 *  post:
 *      summary: this endpoint send a payment
 *      security:
 *        - bearerAuth: []
 *      tags: [payments]
 *      requestBody:
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                      document:
 *                        type: string
 *                      phone:
 *                        type: string
 *                      payment:
 *                        type: number
 *      responses:
 *          201:
 *              description: created successful
 *          400:
 *              description: Bad Request
 *          500:
 *              description: internal server error
 * 
 * /payments/confirmPayment:
 *  put:
 *      summary: this endpoint confirm a payment
 *      security:
 *        - bearerAuth: []
 *      tags: [payments]
 *      requestBody:
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   properties:
 *                      document:
 *                        type: string
 *                      phone:
 *                        type: string
 *                      session_id:
 *                        type: number
 *                      token:
 *                        type: string
 *      responses:
 *          201:
 *              description: created successful
 *          400:
 *              description: Bad Request
 *          500:
 *              description: internal server error
 */
