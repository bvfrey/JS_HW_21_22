
// dist.js

$( function() {

    var $flag = 0; //0 - tooltips off; 1 - tooltips on
    var button_text;


// Функция для работы с табами
    $(".tab").click(function(){

        var clicked_tab = $(this).index(); //to find correct tab and tab content
        $(".tab").each(function() {
            if ($(this).index() === clicked_tab) {
                $(this).addClass("active");
            } else {
                $(this).removeClass("active");
            }
        });
        $(".tab-pane").each(function() {
            if ($(this).index() === clicked_tab) {
                $(this).addClass("in active");
            } else {
                $(this).removeClass("in active");
            }
        });
    });

// Функции, показывающие/убирающие подсказки
    $("#help").click(function(){
        $(".my_tooltip").fadeToggle();
        button_text = ($flag == "0") ? "Убрать подсказки" : "Показать подсказки";
        $(this).text(button_text);
        $flag = !$flag;
    });

    $(".my_input").hover(function(){
        if ($flag == "0") {
            $(this).next().fadeToggle();
        }
    });
});
;
// main.js
$( function() {
    $(".menu").click(function(){
        let pages = [
            {
                page_class: ".page_1",
                menu_id: "#p1",
            },
            {
                page_class: ".page_2",
                menu_id: "#p2",
            },
            {
                page_class: ".page_3",
                menu_id: "#p3",
            },
            {
                page_class: ".page_4",
                menu_id: "#p4",
            },
            {
                page_class: ".page_5",
                menu_id: "#p5",
            },
        ];

        let clicked_tab = $(this).index()*1;
        let my_page = pages[clicked_tab].page_class;
        let my_menu = pages[clicked_tab].menu_id;

        $(".menu").removeClass("active");
        $(my_menu).addClass("active");

        $(".page").css("display","none");
        $(my_page).css("display","block");
    });
});
;// test.js 'use strict;'


$(function(){

    var html = $('#test').html();
    const Q_TITLE = "<h2>Тест на знание латинских крылатых выражений</h2>";
    var questionary = JSON.parse(localStorage.getItem('my_questionary'));
    var wrongs = [];
    var content = tmpl(html, {
        data: questionary
    });
    $('.test-plaseholder').append(Q_TITLE);
    $('.test-plaseholder').append(content);

    $("#check_results").bind('click', getResults);
    $("#showCorrectAnswers").bind('click', showCorrectAnswers);
    $("#close").bind('click', refreshPage);



    function getResults(e) {
        let tmp_counter = 0;
        let placeValue = 1;
        $("#check_results").unbind('click', getResults);
        $("#check_results").bind('click', refreshPage);


        for (let i = 0; i < questionary.length; i++) {
            questionary[i].actualResult = 0;
            placeValue = 1;
            for (let j = 0; j < questionary[i].answers.length; j++) {
                questionary[i].actualResult += $(".answer").eq(tmp_counter).prop("checked")*placeValue;
                tmp_counter += 1;
                placeValue += 1;
            }
        }
        checkResults();
        $('#myModal').modal('show');
        var result = show_answer(wrongs.length);
        $("#result").text(result);
    }

    function checkResults(e) {
        let wrongs_counter = 0;

        for (let i = 0; i < questionary.length; i++) {
            if (questionary[i].actualResult != (questionary[i].correct_answer*1)) {
                wrongs[wrongs_counter] = i;
                wrongs_counter += 1;
            }
        }

    }

    // function showAnswer(number_of_mistakes) {
    //     switch (true) {
    //         case (number_of_mistakes == 0):
    //             return("Поздравляем. Вы правильно ответили на все вопросы. ");
    //             break;
    //         case (number_of_mistakes == 1):
    //             return("Вы ошиблись всего одни раз. Это очень хороший результат. Продолжайте изучать латынь, и Вы обязательно достигнете успеха!");
    //             break;
    //         case (number_of_mistakes < 5):
    //             return("У Вас всего " + number_of_mistakes + " ошибки. Это очень хороший результат. Продолжайте изучать латынь, и Вы обязательно достигнете успеха!");
    //             break;
    //         case (number_of_mistakes < 10):
    //             return("У Вас " + number_of_mistakes + " ошибок. Проанализируйти свои ошибки, и попытайтесь пройти тест ещё раз. Продолжайте обучение, и Вы обязательно достигнете успеха!");
    //             break;
    //         default:
    //             return("У Вас " + number_of_mistakes + " ошибок. Вероятно, Вы только начинаете учитить Латынь? Проанализируйти свои ошибки, и попытайтесь пройти тест ещё раз. Продолжайте обучение, и Вы обязательно достигнете успеха!");
    //             break;
    //     }
    // }

    function showCorrectAnswers(e) {
        var tmp_counter = 0;

        for (let i = 0; i < questionary.length; i++) {
            for (let j = 0; j < questionary[i].answers.length; j++) {
                if (questionary[i].correct_answer == (j+1)) {
                    $(".answer").eq(tmp_counter).parent().css({
                        "color": "rgb(93, 164, 67)",
                        "font-weight": "600"
                    })
                    $(".answer").eq(tmp_counter).attr("checked","checked");
                } else {
                    if (questionary[i].actualResult == (j+1)) {
                        $(".answer").eq(tmp_counter).parent().css({
                            "color": "rgb(190, 59, 55)",
                            "text-decoration": "line-through",
                        })
                    }
                }
                tmp_counter++;
            }
        }
        $("#myModal").modal('hide');
        $("#check_results").text("Пройти тест ещё раз");
        $("body").animate({"scrollTop":0},"slow");
    }

    function refreshPage(e) {
        for (let i = 0; i < questionary.length; i++) {
                questionary[i].actualResult = 0;
        }
        $('.test-plaseholder').html("").append(content);
        $("#check_results").unbind('click', refreshPage);
        $("#check_results").text(" Готово ");
        $("#check_results").bind('click', getResults);
        $("body").animate({"scrollTop":0},"slow");
    }
});
