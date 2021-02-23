const School = require('../models/School');


const schoolController = {
    getSchoolById: async (req, res) => {
        res.json(await School.findOneSchool(req.params.id));
    },

    getAllSchools: async (req, res) => {
            res.json(await School.findAllSchools(req.params));
    }

};
  
module.exports = schoolController;