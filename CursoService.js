const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "admin",
    database: "CURSOS",
    port: 5432,
});


async function save(curso) {
    try {
        const result = await pool.query(
            `INSERT INTO cursos (nombre,nivel,fecha,duracion) values ('${curso.nombre}',${curso.nivel},'${curso.fecha}',${curso.duracion}) RETURNING *`
        );
        return result.rows;
    } catch (e) {
        return e;
    }
}
async function getAll() {
    try {
        const result = await pool.query(`SELECT id,nombre,nivel, TO_CHAR(fecha, 'YYYY-MM-DD') fecha,duracion  FROM cursos`);
        return result.rows;
    } catch (e) {
        return e;
    }
}

async function deleteOne(id){
    try{
        const result = await pool.query(`DELETE FROM cursos WHERE id = ${id}`);
        return result.rows;
    }catch(e){
        return e;
    }
}
async function update(curso){
    try{
        const result = await pool.query(`UPDATE cursos SET nombre = '${curso.nombre}', nivel = ${curso.nivel}, fecha = '${curso.fecha}', duracion = ${curso.duracion} WHERE id = ${curso.id}`);
        return result.rows;
    }catch(e){
        return e;
    }
}

module.exports = {
    save, getAll,deleteOne,update
};