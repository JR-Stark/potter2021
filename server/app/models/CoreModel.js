const client = require('../database');

class CoreModel {
   //_id;
    // _travel_id

    constructor (data) {
       this._id = data.id;
    }

    get id() {
        return this._id ;
    }
    
    set id(value) {
        if (isNaN(parseInt(value,10))) {
            throw Error("L'id du core model doit être un entier");
        }
        this._id = value;
    }

    update(data){
        for(const prop in data){
            this[prop] = data[prop];
        }
    }

    // async save(){ 
    //     const fieldNames = [];
    //     const fieldIndex = [];
    //     const fieldValues = [];
    //     const fieldConcat = [];

    //     let index = 1 ; 

    //     for (let fieldName in this) {
    //         if (fieldName === "_id") {
    //             continue;
    //         }
            
    //         fieldNames.push(`"${fieldName}"`);
    //         fieldValues.push(this[fieldName]);
    //         fieldIndex.push("$" + index);
    //         fieldConcat.push(fieldNames[index-1] + " = " + fieldIndex[index-1]);
    //         index ++;
    //     };        

    //     if (this.id) {
    //         fieldValues.push(this.id);
    //         // console.log(fieldValues);
    //         await client.query(`
    //         UPDATE ${this.constructor.tableName} SET ${fieldConcat.join(", ")} WHERE id = $${fieldNames.length + 1};`
    //         , fieldValues);
    //     }         

    //     else {
    //         await client.query(`
    //         INSERT INTO ${this.constructor.tableName} (${fieldNames.join(", ")})
    //         VALUES (${fieldIndex.join(", ")})
    //         RETURNING id;`
    //         , fieldValues) ;
    //     } 

    // }

    // async save() {

    // }

    // async delete() {
    //     // console.log(`DELETE FROM ${this.constructor.tableName} WHERE id = ${this.id} ;`)
    //     await client.query(`DELETE FROM ${this.constructor.tableName} WHERE id = $1 ;`, [this.id]);
    // }
}

module.exports = CoreModel ;
