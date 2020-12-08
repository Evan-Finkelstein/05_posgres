const pool = require('../lib/utils/pool.js');

module.exports = class Cloud {
    id;
    size;
    type;
    description;


    constructor(row) {
        this.id = row.id;
        this.size = row.size;
        this.type = row.type;
        this.description = row.description;
    }


    static async insert({ size, type, description }) {
        const { rows } = await pool.query(
            'INSERT INTO clouds (size, description, type) VALUES ($1, $2, $3) RETURNING *',
            [size, description, type]
        );

        return new Cloud(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query('SELECT * FROM clouds');

        return rows.map(row => new Cloud(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM clouds WHERE id=$1',
            [id]
        );

        if (!rows[0]) throw new Error(`No Cloud with id ${id}`);
        return new Cloud(rows[0]);
    }

    static async update(id, { size, description, type }) {
        const { rows } = await pool.query(
            `UPDATE clouds 
        SET size=$1,
            description=$2,
            type=$3
        WHERE id=$4
        RETURNING *
      `,
            [size, description, type, id]
        );

        return new Cloud(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query(
            'DELETE FROM clouds WHERE id=$1 RETURNING *',
            [id]
        );

        return new Cloud(rows[0]);
    }
};
