const { connection } = require("./database.js");
let prod = {};

prod.all = function (req, res){
    try{
        let prods =  connection.query("SELECT * FROM produtos;");
        res.send(prods);
    } catch(e){
        console.log("Erro......", e)
    }
}

prod.create = function (req, res) {
    try {
        let prods = req.body;
        let sql = "INSERT INTO produtos (cod_produto, nome_produto, preco_produto) VALUES (?,?,?);";
        let values = [prods.cod_produto, prods.nome_produto, prods.preco_produto];
        let result = connection.query(sql, values);
        res.send({
            status:"Inserção efetuada com sucesso!",
            result: result
        })
    } catch (e) {
        console.log("Erro:..........", e);
    }
}

prod.update = function (req, res) {
    try {
        let cod = req.params.cod;
        let prods = req.body;
        let sql = "UPDATE produtos SET nome_produto=?, preco_produto=? WHERE cod_produto=?;";
        let values = [prods.nome_produto, prods.preco_produto, cod];
        let result = connection.query(sql, values);
        res.send({
            status:"Atualização do produto " + prods.nome_produto + " efetuada!",
            result: result
        })
    } catch (e) {
        console.log("Erro:..........", e)
    }
}

prod.delete = function (req, res) {
    try {
        let cod = req.params.cod;
        let sql = "DELETE FROM produtos WHERE cod_produto=?;";
        let result = connection.query(sql, cod);
        res.send({
            status:"Exclusão do produto " + cod + " foi efetuada!",
            result: result
        })
    } catch (e) {
        console.log("Erro:..........", e)

    }
}

module.exports = { prod };