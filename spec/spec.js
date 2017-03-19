var app = require('../src/show_answer.js');

describe("show_answer", function() {

    it("show_answer()", function() {
        // prepare
        var result;
        //act
        result = app.show_answer('1');
        // assert
        expect(result).toEqual("Вы ошиблись всего одни раз. Это очень хороший результат. Продолжайте изучать латынь, и Вы обязательно достигнете успеха!");
    });

    it("show_answer()", function() {
        // prepare
        var result;
        //act
        result = app.show_answer('0');
        // assert
        expect(result).toEqual("Поздравляем. Вы правильно ответили на все вопросы. ");
    });

    it("show_answer()", function() {
        // prepare
        var result;
        //act
        result = app.show_answer('8');
        // assert
        expect(result).toEqual("У Вас 8 ошибок. Проанализируйти свои ошибки, и попытайтесь пройти тест ещё раз. Продолжайте обучение, и Вы обязательно достигнете успеха!");
    });

    it("show_answer()", function() {
        // prepare
        var result;
        //act
        result = app.show_answer('10');
        // assert
        expect(result).toEqual("У Вас 10 ошибок. Вероятно, Вы только начинаете учитить Латынь? Проанализируйти свои ошибки, и попытайтесь пройти тест ещё раз. Продолжайте обучение, и Вы обязательно достигнете успеха!");
    });


});
