const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async create(req, res) {
    const { id, address } = req.body;
    const user = await prisma.user.create({
      data: { id, address },
    });
    return res.json(user);
  },
};
