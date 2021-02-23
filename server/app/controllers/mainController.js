const mainController = {
  homePage: async (req, res) => {
    res.json("Bienvenue sur PotterWorld");
  },
  contact: async (req, res) => {
    res.json("Contactez-nous");
  }
};

module.exports = mainController;