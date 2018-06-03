var srch;
$(document).ready(function () {
    srch = new Search();
})


function Search() {

    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    function keyUp(e) {
        var search = $(this).val();
        delay(function () {
            if (search.length == 0) {
                return;
            }
            fun(search).then(function (result) {
                var html = "";
                for (var i = 0; i < result.length; i++) {
                    html += "<div class='search-item'>" + result[i] + "</div>";
                }
                $(".search-results").html(html);
                searchResults.show();
            }, function (err) {
                console.error(err);
            });
        }, timeout);
    }

    this.setup = function (element, callback, timeout = 450) {
        // error handling
        var errors = [];
        if (element == null) { errors.push("Element must be supplied."); }
        else if (!$(element).is("input[type=text]")) {
            errors.push("Supplied element is not a textual input.")
        }
        if (callback == null) { errors.push("Callback must be supplied.") }
        if (errors.length > 0) {
            for (var i in errors) {
                console.error(errors[i]);
            }
            return;
        }

        // execution
        var searchResults = $(".search-results");
        searchResults.css('width', $(element).outerWidth() - 2); // -2 for the border width

        $(element).keyup(function (e) {
            var search = $(this).val();
            delay(function () {
                if (search.length == 0) {
                    searchResults.hide();
                    return;
                }
                callback(search).then(function (result) {
                    var html = "";
                    for (var i in result) {
                        html += "<div class='search-item'>" + result[i] + "</div>";
                    }

                    // set location
                    var top = $(element).offset().top + $(element).outerHeight(true) - parseInt($(element).css('margin-bottom')) - $(document).scrollTop();
                    var left = $(element).offset().left + parseInt($(element).css('margin-left')) - $(document).scrollLeft();
                    searchResults.css('top', top);
                    searchResults.css('left', left);

                    searchResults.html(html);
                    searchResults.show();
                }, function (err) {
                    console.error(err);
                });
            }, timeout);
        });

        // remove container on scroll/mouseup events
        $(document).scroll(function () {
            searchResults.hide();
        });
        $(document).mouseup(function (e) {
            if (!searchResults.is(e.target) && searchResults.has(e.target).length === 0) {
                searchResults.hide();
            }
        });

    }

    function setup() {
        $("body").append("<div class='search-results'></div>")
    }

    setup();
}