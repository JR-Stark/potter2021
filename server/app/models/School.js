const client = require('../database');
// const CoreModel = require ('../models/CoreModel');
const tableName = 'school';

class School {
    //static tableName = 'school';

    constructor(data = {}) {
        //super(data);
        for (const prop in data) {
            this[prop] = data[prop];
        }
      }

    static async findAllSchools(callback)  {
        const sql = await client.query(`SELECT * FROM "school" ORDER BY "id" ASC LIMIT 3;`);
        return sql.rows;
    }

    static async findOneSchool(schoolId)  {
        
        const school = await client.query(`SELECT * FROM "school" WHERE "id" = $1`, [schoolId]);
        return school.rows[0];
    }

    //  static async findBySchoolId(schoolId)  {
    //     const sql =  await client.query(`
    //       SELECT * 
    //       FROM "school" 
    //       WHERE school_id = $1`, [schoolId]);
    //      return sql.rows;
    // }
       
    // static async findByCreatedDate(createdAt) {
    //   try{  
    //   const sql =  await client.query(`SELECT * FROM school ORDER BY create_at > now() LIMIT 4;`, [createdAt]);
    //     return sql.rows;
    //   } catch (error) {
    //     console.log(error);
    //     res.status(500).json(error);
    //   }
    // }

    // static async findByShop(shopId) {
    //     const sql =  await client.query(`
    //       SELECT * 
    //       FROM "school" 
    //       WHERE shop_id = $1`, [shopId]);
    //     return sql.rows;
    // }

    static async saveSchool(school) {

        let insertedSchool;

        //if (school.id) {
            insertedSchool = await client.query (`
          INSERT INTO school (title, description, quantity, price_ht, price_ttc, url, shop_id, category_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING id;`, [
            school.title,
            school.description,
            school.quantity,
            school.price_ht,
            school.price_ttc,
            school.url,
            school.shop_id,
            school.category_id           
          ]);
     return insertedSchool.rows[0];
    }

      static async updateSchool(data){
           // we decomposed the SQL requeste with the informations we want to insert 
           const sql = `UPDATE school SET "title" = $1, "description" = $2, "quantity" = $3, "price_ht" = $4, "price_ttc" = $5, "url" = $6, "shop_id" = $7, "category_id" = $8, "updated_at" = now() WHERE "id" = $9 RETURNING "id", "title", "description", "quantity", "price_ht", "price_ttc", "url", "shop_id", "category_id";`;
           // we will connect to the db with us school, and we stock the complete request in the data for the return 
           const dataUpdate = await client.query(sql, [data.title, data.description, data.quantity, data.price_ht, data.price_ttc, data.url, data.shop_id, data.category_id, data.id]);
           //dataUpdate.rows[0].message = 'Le produit est bien modifié';
           // We send the new datas 
           return dataUpdate.rows[0];
        
      }

    static async deleteSchool (id) {
      const schoolToDelete = await client.query (`
      DELETE FROM school WHERE id=$1;
      `, [id]);
      return schoolToDelete.rows[0];

    }
};

module.exports = School;