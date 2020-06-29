/**
 * Uma função anônima pode ser chamada logo após ser criada, como no exemplo abaixo
 */
(function (x1, x2, operador){
    //Eval é uma função nativa que realiza operações em string
    return eval(`${x1} ${operador} ${x2}`)
})(3, 4, '*')