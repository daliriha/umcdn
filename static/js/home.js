/*
 * JavaScript file for the Home page
 */

// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function () {
    'use strict';

    // Return the API
    return {
        'read': function () {
            let ajax_options = {
                type: 'GET',
                url: '/api/library',
                accepts: 'application/json',
                dataType: 'json'
            };
            return $.ajax(ajax_options);
        },

        'get_categories': function () {
            let ajax_options = {
                type: 'GET',
                url: '/api/category',
                accepts: 'application/json',
                dataType: 'json'
            };
            return $.ajax(ajax_options);
        },

        'get_versions': function (category) {
        console.log(category)
            let ajax_options = {
                type: 'GET',
                url: `/api/category/${category}/versions`,
                accepts: 'application/json',
                dataType: 'json'
            };
            return $.ajax(ajax_options);
        },

        'library_search': function (category,version) {
        console.log(category)
            let ajax_options = {
                type: 'GET',
                url: `/api/library/${category}/${version}`,
                accepts: 'application/json',
                dataType: 'json'
            };
            return $.ajax(ajax_options);
        }



    };
}());


// Create the view instance
ns.view = (function () {
    'use strict';

    // Return the API
    return {

        build_category_select: function (data) {
            var $category_select = $(".search-area .category");
            let source = $('#category-select-template').html(),
                template = Handlebars.compile(source),
                html;

            // Create the HTML from the template and notes
            html = template({categories: data});
            console.log(data)

            // Append the rows to the table tbody
            $category_select.append(html);
        },

        build_versions_select: function (data) {
            var $versions_select = $(".search-area .versions");
            let source = $('#versions-select-template').html(),
                template = Handlebars.compile(source),
                html;

            // Create the HTML from the template and notes
            html = template({versions: data});

            // Append the rows to the table tbody
            $versions_select.html('').append(html);
        },

        build_table: function (data) {
            var $table = $(".content table");
            let source = $('#table-template').html(),
                template = Handlebars.compile(source),
                html;

            // Create the HTML from the template and notes
            html = template({libraries: data});

            // Append the rows to the table tbody
            $table.find('tbody').empty().append(html);
        },
        error: function (error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function () {
                $('.error').fadeOut();
            }, 2000)
        }
    };
}());


// Create the controller instance
ns.controller = (function (m, v) {
    'use strict';

    let model = m,
        view = v;

    // Get the note data from the model after the controller is done initializing
    setTimeout(function () {

        // Attach event handlers to the promise returned by model.read()
       /* model.read()
            .done(function (data) {
                view.build_table(data);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                error_handler(xhr, textStatus, errorThrown);
            });*/

        model.get_categories()
            .done(function (data) {
                view.build_category_select(data);
                model.get_versions($("#category-select").val()).
                done(function (data) {
                    view.build_versions_select(data);
                    $('#search-btn').trigger('click');
                })


            })
            .fail(function (xhr, textStatus, errorThrown) {
                error_handler(xhr, textStatus, errorThrown);
            });

        $(document).on('change', '#category-select', function (e) {
            model.get_versions($(this).val())
            .done(function (data) {
                view.build_versions_select(data);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                error_handler(xhr, textStatus, errorThrown);
            });
        });

        $('#search-btn').on('click', function (e) {
        console.log('clicked me')
            var category = $("#category-select").val();
            var version = $("#version-select").val();
            model.library_search(category, version)
            .done(function (data) {
                view.build_table(data);
            })
            .fail(function (xhr, textStatus, errorThrown) {
                error_handler(xhr, textStatus, errorThrown);
            });
        });




    }, 100);

    // generic error handler
    function error_handler(xhr, textStatus, errorThrown) {
        let error_msg = `${textStatus}: ${errorThrown} - ${xhr.responseJSON.detail}`;

        view.error(error_msg);
        console.log(error_msg);
    }


}(ns.model, ns.view));