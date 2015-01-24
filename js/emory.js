; (function ($, window, document, undefined) {

    'use strict';

    var em;
    var Emory = Emory || {};

    Emory.init = function () {

        em = this;

        em.cache();
        em.bind();
        em.heros();
        em.instagram();
        em.loadEvents();
        em.lovesIE8();

    }; // init()

    Emory.cache = function () {

        em.$doc = $(document);
        em.$win = $(window);
        em.$html = $('html');
        em.$heros = $('.hero, .slide');
        em.$search = $('.search-wrap input');
        em.$searchIcon = $('.fa-search');
        em.$hamburger = $('.hamburger');
        em.$mainNav = $('.nav-top');
        em.$insta = $('#instagram');
        em.$eventsContainer = $('#events');

    }; // cache()

    Emory.heros = function() {
        var setHeight = $(window).height() <= 650 ? $(window).height() : 650; 
        em.$heros.css('height', setHeight);
    }; //hero();

    Emory.instagram = function() {

        $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: "https://api.instagram.com/v1/users/204588517/media/recent?count=1&access_token=566414879.1677ed0.2ba5811957804d2fb89293e3a91b1550",
          success: function(image) {
            em.$insta.find('a').attr('href', image.data[0].link);
            em.$insta.find('img').attr('src', image.data[0].images.standard_resolution.url);
            } 
        });
    }; //instagram();

    Emory.eventTemplate = function(data) {
        var htmlTemplate = '<a href="javascript:void(0)" class="event">
                <div class="event-status hidden-sm"><i class="fa fa-circle"></i></div>
                <div class="event-date hidden-sm"><span class="day">' + data.find('day').text() + '</span><br /><span class="month">'+ data.find('month').text() +'</span></div>
                <div class="event-details">   
                  <h6><i class="fa fa-calendar"></i> '+ data.find('title').text() +'</h6>
                  <p>'+ data.find('date').text() +'</p>
                </div>   
              </a>';
        return htmlTemplate;
    }; //eventTemplate();

    Emory.loadEvents = function() {

        $.ajax({
          url: "./data/events.xml",
          type: "GET",
          dataType: "xml",
          success: function(xml) {    
            $(xml).find('event').each(function(){
                em.$eventsContainer.append(em.eventTemplate($(this)));
            });
          }
        });
    }; //events();

    Emory.lovesIE8 = function() {
        if(Modernizr.inlinesvg === false || Modernizr.svg === false) {
          $('.logo').find('img').attr('src', 'img/logo.png');
          $('.bottom-logo').attr('src', 'img/logo.png');
        }

        if(Modernizr.csstransforms === false) {
          $('body').addClass('everyone-loves-ie');
        }
    }; //lovesIE8();


    Emory.bind = function () {

        em.$doc.on('click', '[data-nav-search]', function (e) {
           e.preventDefault();
           em.$searchIcon.toggleClass('active');
           em.$search.toggleClass('show-me');
        });

         em.$doc.on('click', '[data-nav-trigger]', function (e) {
           e.preventDefault();
           em.$hamburger.toggleClass('active');
           em.$mainNav.toggleClass('show-me');
        });

        em.$win.on('resize', function () {      
            clearTimeout(window.resizedFinished);
            window.resizedFinished = setTimeout(function(){
               em.heros();
            }, 250);
        });

    }; //bind();

    window.Emory = Emory;
    window.Emory.init();

})(jQuery, window, document);