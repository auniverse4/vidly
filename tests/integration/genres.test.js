const request = require('supertest');
const {Genre} = require('../../models/genre');

let server;

describe('/api/genres', ()=>{
    beforeEach(()=>{ server = require('../../index'); })
    afterEach( async ()=>{
        server.close();
        await Genre.remove({});
    });


    describe('GET /', ()=>{
        it('should return all genres', async ()=>{
            const genres = [
                {name: 'genre1'},
                {name: 'genre2'},
            ];

            await Genre.collection.insertMany(genres);

            const res = await request(server).get('/api/genres');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(g => g.name === 'genre1')).toBeTruthy();
            expect(res.body.some(g => g.name === 'genre2')).toBeTruthy();
        });
    });


    describe('GET /:id', ()=>{
        it('should return a genre if valid id is passed', async ()=>{
            const genre = new Genre({ name: 'genre1' });
            await genre.save();

            const res = await request(server).get('/api/genres/' + genre._id)

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', genre.name);
        });
    });
});
