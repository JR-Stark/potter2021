const client = require('../database');
// const CoreModel = require ('../models/CoreModel');
const tableName = 'character';

class Character {
    //static tableName = 'character';

    constructor(data = {}) {
        //super(data);
        for (const prop in data) {
            this[prop] = data[prop];
        }
      }

    static async findAll(callback)  {
        const sql = await client.query(`SELECT * FROM "character"`);
        return sql.rows;
    }

    static async findOne(characterId)  {
        
        const character = await client.query(`SELECT * FROM "character" WHERE "id" = $1`, [characterId]);
        return character.rows[0];
    }

     static async findBySchoolId(schoolId)  {
        const sql =  await client.query(`
          SELECT * 
          FROM "character" 
          WHERE school_id = $1`, [schoolId]);
         return sql.rows;
    }
       
    static async findByCreatedDate(createdAt) {
      try{  
      const sql =  await client.query(`SELECT * FROM character ORDER BY create_at > now() LIMIT 4;`, [createdAt]);
        return sql.rows;
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }

    // static async findByShop(shopId) {
    //     const sql =  await client.query(`
    //       SELECT * 
    //       FROM "character" 
    //       WHERE shop_id = $1`, [shopId]);
    //     return sql.rows;
    // }

    static async saveCharacter(character) {

        let insertedCharacter;

        //if (character.id) {
            insertedCharacter = await client.query (`
          INSERT INTO character (title, description, quantity, price_ht, price_ttc, url, shop_id, category_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id;`, [
            character.title,
            character.description,
            character.quantity,
            character.price_ht,
            character.price_ttc,
            character.url,
            character.shop_id,
            character.category_id           
          ]);
     return insertedCharacter.rows[0];
    }

      static async updateCharacter(data){
           // we decomposed the SQL requeste with the informations we want to insert 
           const sql = `UPDATE character SET "title" = $1, "description" = $2, "quantity" = $3, "price_ht" = $4, "price_ttc" = $5, "url" = $6, "shop_id" = $7, "category_id" = $8, "updated_at" = now() WHERE "id" = $9 RETURNING "id", "title", "description", "quantity", "price_ht", "price_ttc", "url", "shop_id", "category_id";`;
           // we will connect to the db with us character, and we stock the complete request in the data for the return 
           const dataUpdate = await client.query(sql, [data.title, data.description, data.quantity, data.price_ht, data.price_ttc, data.url, data.shop_id, data.category_id, data.id]);
           //dataUpdate.rows[0].message = 'Le produit est bien modifié';
           // We send the new datas 
           return dataUpdate.rows[0];
        
      }

    static async deleteCharacter (id) {
      const characterToDelete = await client.query (`
      DELETE FROM character WHERE id=$1;
      `, [id]);
      return characterToDelete.rows[0];

    }
};

module.exports = Character;