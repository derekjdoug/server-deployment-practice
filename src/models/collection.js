class Collection {
  constructor(model, app, route) {
    this.model = model;
    this.router(app, route);
  }

  async create(req, res) {
    const construct = this.model.build(req.body);
    console.log(construct);
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

  router (app, route) {
    app.get(`${route}`, (req, res) => this.readMany(req, res));
    app.post(`${route}`, (req, res) => this.create(req, res));
    app.get(`${route}/:id`, (req, res) => this.readOne(req, res));
    app.delete(`${route}/:id`, (req, res) => this.delete(req, res));
    app.put(`${route}/:id`, (req, res) => this.update(req, res));
  }
}

module.exports = Collection;
