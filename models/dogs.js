const pool = require('../lib/utils/pool.js');

module.exports = class Dog {
    id;
    name;
    breed;
    description;


    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.breed = row.breed;
        this.description = row.description;
    }


    static async insert({ name, breed, description }) {
        const { rows } = await pool.query(
            'INSERT INTO dogs (name, description, breed) VALUES ($1, $2, $3) RETURNING *',
            [name, description, breed]
        );

        return new Dog(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM dogs');

        return rows.map(row => new Dog(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM dogs WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No Dog with id ${id}`);
        return new Dog(rows[0]);
    }

    static async update(id, { name, description, breed }) {
        const { rows } = await pool.query(
            `UPDATE dogs 
        SET name=$1,
            description=$2,
            breed=$3
        WHERE id=$4
        RETURNING *
      `,
            [name, description, breed, id]
        );

        return new Dog(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM dogs WHERE id=$1 RETURNING *',
            [id]
        );

        return new Dog(rows[0]);
    }
};