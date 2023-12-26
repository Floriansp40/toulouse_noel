const request = require('supertest')
const DB = require('../api/db.config')
const app = require('../api/app')

let userId
let token

describe('USER ROUTER', () => {


    afterAll(async () => {
        DB.sequelize.close()
    })

    describe('TRY PUT', () => {
        it('Should return 400 /=> Missing params', async () => {
            const response = await request(app)
                .put('/users')
                .send({
                    nom: 'marcel'
                    // prenom: 'roger'
                })
            expect(response.status).toBe(400)
        })

        it('Should return 409 /=> New user same name', async () => {
            const response = await request(app)
                .put('/users')
                .send({
                    nom: 'marcel',
                    prenom: 'roger',
                    email: 'email@email.com',
                    password: 'unpassword'
                })
            expect(response.status).toBe(409)
        })

        it('Should return 201 /=> New user', async () => {
            const response = await request(app)
                .put('/users')
                .send({
                    nom: 'marcelus',
                    prenom: 'roger',
                    email: 'email@email.com',
                    password: 'unpassword'
                })
            expect(response.status).toBe(201)
            userId = response.body.data.id
        })
    })

    describe('TRY GET', () => {
        it('Should return 200 /=> Get user', async () => {
            const response = await request(app).get(`/users/${userId}`)
            expect(response.status).toBe(200)
        })
    })

    describe('TRY LOGIN', () => {
        it('Shoudl return 200 /=> plus token', async () => {
            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'marcel@roger.com',
                    password: 'roger'
                })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('access_token')
            token = response.body
        })
    })

    describe('TRY PATCH', () => {
        it('Should return 404 /=> Modify bad user', async () => {
            const response = await request(app)
                .patch('/users/100000')
                .set('authorization', 'Bearer '+token.access_token)
                .send({
                    nom: 'marcelllllll'
                })
            expect(response.status).toBe(404)
        })

        it('Should return 200 /=> Modify user', async () => {
            const response = await request(app)
                .patch(`/users/${userId}`)
                .set('authorization', 'Bearer '+token.access_token)
                .send({
                    nom: 'marcelllllll'
                })
            expect(response.status).toBe(200)
        })
    })

    describe('TRY DELETE', () => {
        it('Should return 204', async () => {
            const response = await request(app)
                .delete(`/users/${userId}`)
                .set('authorization', 'Bearer '+token.access_token)
            expect(response.status).toBe(204)
        })
    })
})