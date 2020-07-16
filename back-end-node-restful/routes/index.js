module.exports = (app) => {
    app.get('/',(req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<h1>RESTUful API</h1>
        <p>Projeto desenvolvido no Curso completo de Javascript da HCode na Udemy.com`)
    })
};