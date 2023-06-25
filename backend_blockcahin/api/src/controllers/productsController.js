const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async create(req, res) {
    const { unit, hashTx } = req.body;
    const { id } = req.params;

    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return res.json({ message: "Usuario inesistente" });
      }
      const product = await prisma.product.create({
        data: { userId: user.id, unit, hashTx },
      });
      return res.json(product);
    } catch (error) {
      return res.json({ message: error.message });
    }
  },
};
