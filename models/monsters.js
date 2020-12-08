const pool = require('../lib/utils/pool.js');

module.exports = class Monster {
    id;
    name;
    scariness;
    description;


    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.scariness = row.scariness;
        this.description = row.description;
    }


    static async insert({ name, scariness, description }) {
        const { rows } = await pool.query(
            'INSERT INTO monsters (name, description, scariness) VALUES ($1, $2, $3) RETURNING *',
            [name, description, scariness]
        );

        return new Monster(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM monsters');

        return rows.map(row => new Monster(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM monsters WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No Monster with id ${id}`);
        return new Monster(rows[0]);
    }

    static async update(id, { name, description, scariness }) {
        const { rows } = await pool.query(
            `UPDATE monsters 
        SET name=$1,
            description=$2,
            scariness=$3
        WHERE id=$4
        RETURNING *
      `,
            [name, description, scariness, id]
        );

        return new Monster(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM monsters WHERE id=$1 RETURNING *',
            [id]
        );

        return new Monster(rows[0]);
    }
};
