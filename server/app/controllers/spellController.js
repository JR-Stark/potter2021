const Spell = require('../models/Spell');


const schoolController = {
    getSpellById: async (req, res) => {
        res.json(await Spell.findOneSpell(req.params.id));
    },

    getAllSpells: async (req, res) => {
            res.json(await Spell.findAllSpells(req.params));
    }

};
  
module.exports = schoolController;