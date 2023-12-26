const request = require('supertest')
const DB = require('../api/db.config')


describe('MAIN ROUTER', () => {

    afterAll( async () => {
        DB.sequelize.close()
    })    

    describe('POPULATE DATABASE', () => {
        it('Should return ?', async () => {
            const response = await DB.sequelize.sync({alter: true})
            expect(response).toHaveProperty('models')
        })

        it("Should nothing I'm tired about Docker and React", async () => {
            const response = await DB.User.create({
                nom:'marcel',
                prenom: 'roger',
                email: 'marcel@roger.com',
                password: 'roger'
            })
        })
    })
})