$(function () {

    $("#form-id").submit(function (event) {
        event.preventDefault();
        var $form = $(this),
        /*
         nameVal = $("#name").val(),
         emailVal = $("#email").val(),
         selectVal = $form.find( "input[name='select']" ).val(),
         checkbox1Val = $("#first-checkbox").attr('checked'),
         checkbox2Val = $("#second-checkbox").attr('checked'),*/

            url = $form.attr("action");
        var posting = $.post(url, $("#form-id").serialize());

        /* var posting = $.post( url, { name: nameVal, email: emailVal, select: selectVal, checkbox1: checkbox1Val, checkbox2: checkbox2Val } );*/

        posting.done(function () {
            $('#yes').show();
            $('#not').hide();

        });
        posting.fail(function () {
            $('#yes').hide();
            $('#not').show();
        });
    });

    /* select*/
    $('#cd-dropdown').dropdown({
        gutter: 5,
        stack: false,
        delay: 100,
        slidingIn: 100
    });

    /* checkbox*/
    $.replace = function (el) {
        var base = this;
        base.$el = $(el);
        var input = $('<span>');
        input.addClass('view-checkbox');
        input.insertAfter(base.$el);
        base.$el.hide();

        input.click(function () {
            var isChecked = false;
            input.toggleClass('view-checkbox-checked');
            isChecked = input.hasClass('view-checkbox-checked');
            base.$el.attr('checked', isChecked);
        });

    };
    $.fn.replace = function () {
        return this.each(function () {
            (new $.replace(this));
        });
    };

    $("#first-checkbox").replace();
    $("#second-checkbox").replace();

    /* radio*/
    $.replaceRadio = function (el) {
        var base2 = this;
        base2.$el = $(el);
        var input2 = $('<span>');
        input2.addClass('view-radio');
        input2.insertAfter(base2.$el);
        base2.$el.hide();

        input2.click(function () {
            var isSelected = false;
            var select = document.getElementsByClassName('view-radio-selected');

            for (var i = 0; i < select.length; i++) {
                select[i].setAttribute('class', 'view-radio');
            }

            input2.toggleClass('view-radio-selected');
            isSelected = input2.hasClass('view-radio-selected');
            /*base2.$el.attr('selected', isSelected);*/
        });

    };
    $.fn.replaceRadio = function () {
        return this.each(function () {
            (new $.replaceRadio(this));
        });
    };

    $("#first-radio").replaceRadio();
    $("#second-radio").replaceRadio();
    $("#third-radio").replaceRadio();

    /* button*/
    $("#button").click(function () {
        var name = $('#name').val();
        var email = $('#email').val();
        var check = $('#first-checkbox').attr('checked');
        /* var radioFirst = $('first-radio').attr('selected');
         var radioSecond = $('second-radio').attr('selected');
         var radioThird = $('third-radio').attr('selected');
         alert(radioFirst + " " + radioSecond + " " +radioThird);*/
        var radio = document.getElementsByClassName("view-radio-selected");

        /*var select = document.getElementsByName('cd-dropdown').value;*/

        if (name && email && check && radio.length) {
            $.ajax({
                type: "POST",
                url: url,
                data: {"name": name},
                cache: false,
                success: function (e) {
                    if (e) {
                        $('#yes').show();
                        $('#not').hide();
                        $('#name').value = "";
                        $('#email').value = "";
                    }
                }
            });
        }
        else {
            $('#not').show();
            $('#yes').hide();
        }
    });
});


