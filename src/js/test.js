// test.js 'use strict;'


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
