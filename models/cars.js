const pool = require('../lib/utils/pool.js');

module.exports = class Dog {
    id;
    name;
    model;
    description;


    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.model = row.model;
        this.description = row.description;
    }


    static async insert({ name, model, description }) {
        const { rows } = await pool.query(
            'INSERT INTO cars (name, description, model) VALUES ($1, $2, $3) RETURNING *',
            [name, description, model]
        );

        return new Dog(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM cars');

        return rows.map(row => new Dog(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM cars WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No Dog with id ${id}`);
        return new Dog(rows[0]);
    }

    static async update(id, { name, description, model }) {
        const { rows } = await pool.query(
            `UPDATE cars 
        SET name=$1,
            description=$2,
            model=$3
        WHERE id=$4
        RETURNING *
      `,
            [name, description, model, id]
        );

        return new Dog(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM cars WHERE id=$1 RETURNING *',
            [id]
        );

        return new Dog(rows[0]);
    }
};
