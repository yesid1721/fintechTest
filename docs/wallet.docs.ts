/**
 * @swagger
 * tags:
 *   name: wallet
 *   description: wallets managing API
 * components:
 *   schemas:
 *     wallet:
 *       type: object
 *       properties:
 *         wallet_id:
 *           type: integer
 *           description: Identificador del la billetera
 *         customer_id:
 *           type: integer
 *           description: Identificador del cliente
 *         balance:
 *           type: integer
 *           description: Saldo en la billetera
 *         last_update:
 *           type: string
 *           description: Ultima fecha de actualización
 * 
 * /wallet/checkBalance:
 *  get:
 *      summary: este endpoint consulta el saldo y guarda la fecha de consulta
 *      security:
 *        - bearerAuth: []
 *      tags: [wallet]
 *      parameters:
 *          - in: query
 *            name: document
 *            schema:
 *              type: string 
 *            required: true
 *          - in: query
 *            name: phone
 *            schema:
 *              type: string 
 *            required: true
 *      responses:
 *          201:
 *              description: created successful
 *          400:
 *              description: Bad Request
 *          500:
 *              description: internal server error
 * 
 * /wallet/recharge:
 *  put:
 *      summary: this endpoint confirm a payment
 *      security:
 *        - bearerAuth: []
 *      tags: [wallet]
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
 *                      amount:
 *                        type: number
 *      responses:
 *          201:
 *              description: created successful
 *          400:
 *              description: Bad Request
 *          500:
 *              description: internal server error
 * 
 */
