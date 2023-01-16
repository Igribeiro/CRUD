const express = require("express");
const servidor = express();
const NeDB = require("nedb");
const db = new NeDB({
    filename: "produtos.db",
    autoload: true,
});

servidor.use(express.json());
servidor.use(express.urlencoded({extended: true}));


servidor.get("/produtos", (req, res) => {
  db.find({}).exec((erro, dados) => {
    if (erro) {
      console.error(erro)
    } else {
        res.status(200).json(dados);
    }
  });

});

servidor.post("/produtos", (req, res) => {

  db.insert(req.body, (erro, novoProduto) => {
    if (erro) {
      console.error(erro);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(novoProduto);
    }
  });

});

servidor.put("/produtos/:id", (req, res) => {

  db.update({_id: req.params.id}, req.body, (erro) => {
    if (erro) {
      console.error(erro);
    } else {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({
        mensagem: `Produto atualizado com sucesso ${req.params.id}`,
      });
    }
  });
});

servidor.get("/produtos/:id", (req, res) => {
  db.findOne({_id: req.params.id}).exec((erro, dados) => {
    if (erro) {
      console.error(erro)
    } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(dados);
    }
  });

});

servidor.delete("/produtos/:id", (req, res) => {
  db.remove({_id: req.params.id}, {}, (erro, registrosRemovidos) => {
    if (erro) {
      console.error(erro)
    } else {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({registrosRemovidos});
    }
  });

});

servidor.listen(4000, () => {
    console.log("O servidor ja está trabalhando");
});