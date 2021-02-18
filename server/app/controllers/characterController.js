const Character = require('../models/Character');


const characterController = {
    getCharacterById: async (req, res) => {
        res.json(await Character.findOne(req.params.id));
    },

    getAllCharacters: async (req, res) => {
            res.json(await Character.findAll(req.params));
    },

    getCharactersBySchoolId: async (req, res) => {
        res.json(await Character.findBySchoolId(req.params.id));
    },

    newCharacter: async (req,res) => {
        try{
            const newCharacter = new Character(req.body);
            console.log(req.body);
            console.log(newCharacter);
            const insertedCharacter = await Character.saveCharacter(newCharacter);
            if (insertedCharacter) {
             
                res.json(insertedCharacter);
                
            } else {
                // la ressource en elle-même est trouvée, mais pas la catégorie, c'est ça que reflète le code 404 ici
                res.status(404).json("Le personnage n'a pas été enregistré");
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    error404: (req, res) => {
        res.status(404).json("La page demandée n'existe pas");
    },

    editCharacter: async (req, res) => {
        try{
            const Character = await Character.findOne(req.params.id);
            const CharacterToEdit = new Character(Character);
            for(const prop in req.body) {
                CharacterToEdit[prop] = req.body[prop];
            }
            await Character.updateCharacter(req.body);
            //Character.save();
            res.json(CharacterToEdit);
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }, 

    deleteCharacter: async (req,res)=> {
        const Character = await Character.findOne(req.params.id);
        // console.log(Character.id);
            const CharacterToDelete = new Character(Character);
            await Character.deleteCharacter(req.params.id);
            res.json ('Le personnage a bien été supprimé');
    }
  };
  
  module.exports = characterController;