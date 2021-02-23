const client = require('../database');
// const CoreModel = require ('../models/CoreModel');
const tableName = 'spell';

class Spell {
    //static tableName = 'spell';

    constructor(data = {}) {
        //super(data);
        for (const prop in data) {
            this[prop] = data[prop];
        }
      }

    static async findAll(callback)  {
        const sql = await client.query(`SELECT * FROM "spell"`);
        return sql.rows;
    }

    static async findOne(spellId)  {
        
        const spell = await client.query(`SELECT * FROM "spell" WHERE "id" = $1`, [spellId]);
        return spell.rows[0];
    }

    

    static async saveSpell(spell) {

        let insertedSpell;

        //if (spell.id) {
            insertedSpell = await client.query (`
          INSERT INTO spell (name, description_courte, description_longue, category)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id;`, [
            spell.name,
            spell.description_courte,
            spell.descritpion_longue,
            spell.category,          
          ]);
     return insertedSpell.rows[0];
    }

      static async updateSpell(data){
           // we decomposed the SQL requeste with the informations we want to insert 
           const sql = `UPDATE spell SET "name" = $1, "description_courte" = $2, "description_longue" = $3, "category" = $4, "updated_at" = now() WHERE "id" = $5 RETURNING "id", "name", "description_courte", "description_longue", "category";`;
           // we will connect to the db with us spell, and we stock the complete request in the data for the return 
           const dataUpdate = await client.query(sql, [data.title, data.description, data.quantity, data.price_ht, data.price_ttc, data.url, data.shop_id, data.category_id, data.id]);
           //dataUpdate.rows[0].message = 'Le produit est bien modifié';
           // We send the new datas 
           return dataUpdate.rows[0];
        
      }

    static async deleteSpell (id) {
      const spellToDelete = await client.query (`
      DELETE FROM spell WHERE id=$1;
      `, [id]);
      return spellToDelete.rows[0];

    }
};

module.exports = Spell;