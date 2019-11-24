const Canvas = require("../models/Canvas");
const Topic = require("../models/Topic");

module.exports = {
  async loadAllCanvas(req, res) {
    const [rows, _] = await Canvas.getAll();
    return res.json(rows);
  },
  async loadCanvasWithTopics(req, res) {
    const [canvases, _] = await Canvas.getById(req.params.id);
    const [topics, meta] = await Topic.getAll(req.params.id);
    const result = {
      canvas: canvases[0],
      topics: topics
    }
    return res.json(result);
  },
  async loadCanvas(req, res) {
    const [rows, _] = await Canvas.getById(req.params.id);
    if (rows.length === 0) {
      return res.send(206, { error: "No canvas found" });
    }
    return res.json(rows);
  }
};
