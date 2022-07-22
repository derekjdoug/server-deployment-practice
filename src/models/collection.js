
class Collection {
  constructor(model, app, route) {
    this.model = model;
    this.route = route;
  }

  async create(req, res) {
    const construct = this.model.build(req.body);
    await construct.save();
    res.status(200).send(construct);
  }

  async readOne(req, res) {
    const read = await this.model.findAll({
      where: {
        id: req.params.id,
      },
    });
    if (read.length > 0) {
      res.status(200).send(read[0]);
    } else {
      res.status(400).send(`Could not find file with id ${req.params.id}`);
    }
  }

  async readMany(req, res) {
    const list = await this.model.findAll();
    res.status(200).send(list);
  }

  async update(req, res) {
    const updateFile = await this.model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send(updateFile);
  }

  async delete(req, res) {
    const deleteFile = await this.model.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (deleteFile.length > 0) {
      res.status(200).send('Error');
    } else {
      res.status(200).send('Item Deleted');
    }
  }
}
