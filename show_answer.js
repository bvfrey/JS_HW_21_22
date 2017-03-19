
function show_answer(number_of_mistakes) {
    switch (true) {
        case (number_of_mistakes == 0):
            return("Поздравляем. Вы правильно ответили на все вопросы. ");
            break;
        case (number_of_mistakes == 1):
            return("Вы ошиблись всего одни раз. Это очень хороший результат. Продолжайте изучать латынь, и Вы обязательно достигнете успеха!");
            break;
        case (number_of_mistakes < 5):
            return("У Вас всего " + number_of_mistakes + " ошибки. Это очень хороший результат. Продолжайте изучать латынь, и Вы обязательно достигнете успеха!");
            break;
        case (number_of_mistakes < 10):
            return("У Вас " + number_of_mistakes + " ошибок. Проанализируйти свои ошибки, и попытайтесь пройти тест ещё раз. Продолжайте обучение, и Вы обязательно достигнете успеха!");
            break;
        default:
            return("У Вас " + number_of_mistakes + " ошибок. Вероятно, Вы только начинаете учитить Латынь? Проанализируйти свои ошибки, и попытайтесь пройти тест ещё раз. Продолжайте обучение, и Вы обязательно достигнете успеха!");
            break;
    }
}

module.exports.show_answer = show_answer;
