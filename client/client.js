const { connection } = require("./database.js");
let prod = {};

prod.all = function (req, res) {
  try {
    connection.query("SELECT * FROM produtos", function (err, results) {
      if (err) {
        console.log("Erro: ", err);
        res.status(500).json({ error: "Erro ao buscar produtos." });
        return;
      }

      res.json(results);
    });
  } catch (e) {
    console.log("Erro: ", e);
    res.status(500).json({ error: "Erro ao buscar os produtos." });
  }
};

prod.end_point = function (req, res){
    try {
    const cod = req.params.cod;
    const sql = "SELECT * FROM produtos where preco_produto = ?;";
    const values = [cod];

    connection.query(sql, values,function (err, results) {
            if (err) {
              console.log("Erro: ", err);
              res.status(500).json({ error: "Erro ao buscar os produtos." });
              return;
            }
      
            res.json(results);
          });

    } catch (e) {
        console.log("Erro: ", e);
        res.status(500).json({ error: "Erro ao buscar os produtos." });
    }
};

prod.create = function (req, res) {
  try {
    const prods = req.body;
    const sql = "INSERT INTO produtos (nome_produto, preco_produto) VALUES (?, ?)";
    const values = [prods.nome_produto, prods.preco_produto];

    connection.query(sql, values, function (err, result) {
      if (err) {
        console.log("Erro: ", err);
        res.status(500).json({ error: "Erro ao criar o produto." });
        return;
      }

      res.json({
        status: "Inserção efetuada com sucesso!",
        result: result,
      });
    });
  } catch (e) {
    console.log("Erro: ", e);
    res.status(500).json({ error: "Erro ao criar o produto." });
  }
};

prod.update = function (req, res) {
  try {
    const cod = req.params.cod;
    const prods = req.body;
    const sql = "UPDATE produtos SET nome_produto = ?, preco_produto = ? WHERE cod_produto = ?";
    const values = [prods.nome_produto, prods.preco_produto, cod];

    connection.query(sql, values, function (err, result) {
      if (err) {
        console.log("Erro: ", err);
        res.status(500).json({ error: "Erro ao atualizar o produto." });
        return;
      }

      res.json({
        status: "Atualização do produto " + prods.nome_produto + " efetuada!",
        result: result,
      });
    });
  } catch (e) {
    console.log("Erro: ", e);
    res.status(500).json({ error: "Erro ao atualizar o produto." });
  }
};

prod.delete = function (req, res) {
  try {
    const cod = req.params.cod;
    const sql = "DELETE FROM produtos WHERE cod_produto = ?";
    connection.query(sql, cod, function (err, result) {
      if (err) {
        console.log("Erro: ", err);
        res.status(500).json({ error: "Erro ao excluir o produto." });
        return;
      }

      res.json({
        status: "Exclusão do produto " + cod + " foi efetuada!",
        result: result,
      });
    });
  } catch (e) {
    console.log("Erro: ", e);
    res.status(500).json({ error: "Erro ao excluir o produto." });
  }
};

module.exports = { prod };
