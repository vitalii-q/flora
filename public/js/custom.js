// ==================================================
// Project Name  :  Strom E-Commerce
// File          :  JS Base
// Version       :  1.0.0
// Last change   :  -- ----- ----
// Author        :  -------------
// Developer     :  Rakibul Islam Dewan
// ==================================================




(function($) {
  "use strict";





  // mobile menu - start
  // --------------------------------------------------
  $(document).ready(function () {
    // $("#sidebar").mCustomScrollbar({
    //   theme: "minimal"
    // });

    $('#dismiss, .overlay').on('click', function () {
      // hide sidebar
      $('#sidebar').removeClass('active');
      // hide overlay
      $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
      // open sidebar
      $('#sidebar').addClass('active');
      // fade in the overlay
      $('.overlay').addClass('active');
      // $('.collapse.in').toggleClass('in');
      // $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  });
  // mobile menu - end
  // --------------------------------------------------





  // wishlist-sidebar - start
  // --------------------------------------------------
  $(document).ready(function () {
    // $("#sidebar").mCustomScrollbar({
    //   theme: "minimal"
    // });

    $('.dismiss, .overlay').on('click', function () {
      // hide sidebar
      $('#wishlist-sidebar').removeClass('active');
      // hide overlay
      $('.overlay').removeClass('active');
    });

    $('.wishlist-sidebar-btn').on('click', function () {
      // open sidebar
      $('#wishlist-sidebar').addClass('active');
      // fade in the overlay
      $('.overlay').addClass('active');
      // $('.collapse.in').toggleClass('in');
      // $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  });
  // cart-sidebar - end
  // --------------------------------------------------





  // cart-sidebar - start
  // --------------------------------------------------
  $(document).ready(function () {
    // $("#sidebar").mCustomScrollbar({
    //   theme: "minimal"
    // });

    $('.dismiss, .overlay').on('click', function () {
      // hide sidebar
      $('#cart-sidebar').removeClass('active');
      // hide overlay
      $('.overlay').removeClass('active');
    });

    $('.cart-sidebar-btn').on('click', function () {
      // open sidebar
      $('#cart-sidebar').addClass('active');
      // fade in the overlay
      $('.overlay').addClass('active');
      // $('.collapse.in').toggleClass('in');
      // $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
  });
  // cart-sidebar - end
  // --------------------------------------------------




  
  // search box - start
  // --------------------------------------------------
  $('.toggle-overlay').on('click', function() {
    $('.search-body').toggleClass('search-open');
  });
  // search box - end
  // --------------------------------------------------





  // slider-section - start
  // --------------------------------------------------
  $('#slider-section').slick({
    speed: 500,
    fade: true,
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    cssEase: 'linear',
    autoplaySpeed: 3000,
  });
  // slider-section - end
  // --------------------------------------------------





  // furniture-slider - start
  // --------------------------------------------------
  $('#furniture-slider').owlCarousel({
    items:1,
    margin:0,
    nav:false,
    loop:true,
    autoplay:true,
    smartSpeed:450
  });
  // furniture-slider - end
  // --------------------------------------------------





  // jewellry-carousel - start
  // --------------------------------------------------
  $('#jewellry-carousel').owlCarousel({
    items:1,
    margin:0,
    loop:true,
    nav:false,
  });
  // jewellry-carousel - end
  // --------------------------------------------------





  // onsale-product-carousel (home-digital-1) - start
  // --------------------------------------------------
  $('#onsale-product-carousel').owlCarousel({
    items:1,
    nav:true,
    margin:10,
    loop:true,
    dots:false,
    autoplay:true,
    smartSpeed:450
  });
  // onsale-product-carousel (home-digital-1) - end
  // --------------------------------------------------





  // brand-logo-carousel (home-digital-1) - start
  // --------------------------------------------------
  $('#brand-logo-carousel').owlCarousel({
    items:4,
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    autoplay:true,
    smartSpeed:1000,
    responsive:{
      0:{
        items:1,
      },
      600:{
        items:3,
      },
      1000:{
        items:4,
      },
      1920:{
        items:4,
      }
    }
  });
  // brand-logo-carousel (home-digital-1) - end
  // --------------------------------------------------





  // deal-product-carousel (home-digital-2) - start
  // --------------------------------------------------
  $('#deal-product-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1,
      },
      360:{
        items:1,
      },
      600:{
        items:1,
      },
      700:{
        items:2,
      },
      1000:{
        items:3,
      },
      1920:{
        items:3,
      }
    }
  });
  // deal-product-carousel (home-digital-2) - end
  // --------------------------------------------------





  // food-deal-carousel (home-food-2) - start
  // --------------------------------------------------
  $('#food-deal-carousel').owlCarousel({
    items:2,
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1,
      },
      360:{
        items:1,
      },
      600:{
        items:1,
      },
      700:{
        items:2,
      },
      1000:{
        items:2,
      }
    }
  });
  // food-deal-carousel (home-food-2) - end
  // --------------------------------------------------





  // electronics-device-carousel (home-digital-2) - start
  // --------------------------------------------------
  $('#electronics-device-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1,
      },
      360:{
        items:1,
      },
      600:{
        items:1,
      },
      700:{
        items:2,
      },
      1000:{
        items:3,
      },
      1920:{
        items:3,
      }
    }
  })
  // electronics-device-carousel (home-digital-2) - end
  // --------------------------------------------------





  // masonry-layout - start
  // --------------------------------------------------
  var $grid = $('.grid').imagesLoaded( function() {
    $grid.masonry({
      percentPosition: true,
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer'
    }); 
  });
  // masonry-layout - end
  // --------------------------------------------------





  // blog-carousel (home-digital-2) - start
  // --------------------------------------------------
  $('#blog-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1,
      },
      600:{
        items:2,
      },
      1000:{
        items:3,
      },
      1920:{
        items:3,
      }
    }
  })
  // blog-carousel (home-digital-2) - end
  // --------------------------------------------------





  // sidebar-testimonial-carousel (home-food-1) - start
  // --------------------------------------------------
  $('#sidebar-testimonial-carousel').owlCarousel({
    items:1,
    loop:true,
    margin:10,
    nav:false
  });
  // sidebar-testimonial-carousel (home-food-1) - end
  // --------------------------------------------------





  // healthy-food-carousel (home-food-1) - start
  // --------------------------------------------------
  $('#healthy-food-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1,
      },
      360:{
        items:1,
      },
      600:{
        items:2,
      },
      700:{
        items:3,
      },
      1000:{
        items:3,
      }
    }
  });
  // healthy-food-carousel (home-food-1) - end
  // --------------------------------------------------





  // icecream-carousel (home-food-2) - start
  // --------------------------------------------------
  $('#all-icecream-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:10,
    dots: false,
    responsive:{
      0:{
        items:1,
      },
      360:{
        items:1,
      },
      700:{
        items:3,
      },
      1000:{
        items:2,
      },
      1100:{
        items:3,
      },
      1920:{
        items:3,
      }
    }
  });
  $('#ice-cream-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:10,
    dots: false,
    responsive:{
      0:{
        items:1,
      },
      360:{
        items:1,
      },
      700:{
        items:3,
      },
      1000:{
        items:2,
      },
      1100:{
        items:3,
      },
      1920:{
        items:3,
      }
    }
  });
  $('#coffee-creamers-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:10,
    dots: false,
    responsive:{
      0:{
        items:1,
      },
      360:{
        items:1,
      },
      700:{
        items:3,
      },
      1000:{
        items:2,
      },
      1100:{
        items:3,
      },
      1920:{
        items:3,
      }
    }
  });
  $('#heavy-creams-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:10,
    dots: false,
    responsive:{
      0:{
        items:1,
      },
      360:{
        items:1,
      },
      700:{
        items:3,
      },
      1000:{
        items:2,
      },
      1100:{
        items:3,
      },
      1920:{
        items:3,
      }
    }
  });
  // icecream-carousel (home-food-2) - end
  // --------------------------------------------------





  // product details - start
  // --------------------------------------------------
  $(".slider-for").slick({
    fade: true,
    arrows: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: ".slider-nav"
  });
  $(".slider-nav").slick({
    dots: false,
    slidesToShow: 3,
    centerMode: true,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: ".slider-for"
  });
  // product details - end
  // --------------------------------------------------





  // new-furniture-carousel (home-furniture-1) - start
  // --------------------------------------------------
  $('#new-furniture-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:10,
    dots:false
  });
  // new-furniture-carousel (home-furniture-1) - end
  // --------------------------------------------------





  // top-rated-furniture-carousel (home-furniture-1) - start
  // --------------------------------------------------
  $('#top-rated-furniture-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:10,
    dots:false
  });
  // top-rated-furniture-carousel (home-furniture-1) - end
  // --------------------------------------------------





  // promotion-banner-carousel (jewellry-banner-1) - start
  // --------------------------------------------------
  $('#jewellry-banner-carousel').owlCarousel({
    items:1,
    nav:true,
    margin:0,
    loop:true,
    dots:false
  });
  // promotion-banner-carousel (jewellry-banner-1) - end
  // --------------------------------------------------





  // jewellry-bestseller-carousel - start
  // --------------------------------------------------
  $('#jewellry-bestseller-carousel').owlCarousel({
    items:4,
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1
      },
      300:{
        items:1
      },
      600:{
        items:3
      },
      800:{
        items:3
      },
      1000:{
        items:4
      },
      1920:{
        items:4
      }
    }
  });
  // jewellry-bestseller-carousel - end
  // --------------------------------------------------





  // testimonial-carousel - start
  // --------------------------------------------------
  $('#testimonial-carousel').owlCarousel({
    items:1,
    nav:false,
    margin:10,
    loop:true,
    dots:true,
    autoplay:true,
    smartSpeed:1000
  });
  // testimonial-carousel - end
  // --------------------------------------------------





  // sidebar-bestseller-carousel - start
  // --------------------------------------------------
  $('#sidebar-bestseller-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:10,
    dots:false
  });
  // sidebar-bestseller-carousel - end
  // --------------------------------------------------





  // jewellry-deals-carousel - start
  // --------------------------------------------------
  $('#jewellry-deals-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:10,
    dots:false
  });
  // jewellry-deals-carousel - end
  // --------------------------------------------------





  // hot-shoes-carousel - start
  // --------------------------------------------------
  $('#hot-shoes-carousel').owlCarousel({
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      1000:{
        items:2
      }
    }
  });
  // hot-shoes-carousel - end
  // --------------------------------------------------





  // shoes-bestseller-carousel - start
  // --------------------------------------------------
  $('#shoes-bestseller-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:10,
    dots:false
  });
  // shoes-bestseller-carousel - end
  // --------------------------------------------------





  // shoes-bestseller-carousel - start
  // --------------------------------------------------
  $('.slider-items-container').slick({
    fade: true,
    arrows: false,
    slidesToShow: 1,
    autoplay: false,
    slidesToScroll: 1,
    asNavFor: '.slider-items-nav'
  });
  $('.slider-items-nav').slick({
    dots: false,
    arrows: false,
    slidesToShow: 3,
    centerMode: true,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: '.slider-items-container'

  });
  // shoes-bestseller-carousel - end
  // --------------------------------------------------





  // mens-shoes-carousel / womens-shoes-carousel - start
  // --------------------------------------------------
  $('#mens-shoes-carousel , #womens-shoes-carousel').owlCarousel({
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      1000:{
        items:2
      }
    }
  });
  // mens-shoes-carousel / womens-shoes-carousel - end
  // --------------------------------------------------





  // womens-sunglass-carousel / mens-sunglass-carousel - start
  // --------------------------------------------------
  $('#womens-sunglass-carousel , #mens-sunglass-carousel').owlCarousel({
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:1
      },
      1000:{
        items:1
      },
      1200:{
        items:2
      },
      1920:{
        items:2
      }
    }
  });
  // womens-sunglass-carousel / mens-sunglass-carousel - end
  // --------------------------------------------------





  // tools-category-carousel - start
  // --------------------------------------------------
  $('#tools-category-carousel').owlCarousel({
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      1000:{
        items:3
      },
      1920:{
        items:4
      }
    }
  });
  // tools-category-carousel - end
  // --------------------------------------------------





  // power-tools-carousel - start
  // --------------------------------------------------
  $('#power-tools-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:30,
    dots:false
  });
  // power-tools-carousel - end
  // --------------------------------------------------





  // new-arrivals-carousel (home tools 1) - start
  // --------------------------------------------------
  $('#new-arrivals-carousel , #onsale-carousel').owlCarousel({
    items:3,
    nav:true,
    loop:true,
    margin:30,
    dots:false,
    responsive:{
      0:{
        items:1
      },
      600:{
        items:2
      },
      800:{
        items:2
      },
      1000:{
        items:3
      },
      1920:{
        items:3
      }
    }
  });
  // new-arrivals-carousel (home tools 1) - end
  // --------------------------------------------------





  // tools-2-deals-carousel (home tools 2) - start
  // --------------------------------------------------
  $('#tools-2-deals-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:10,
    dots:false,
    autoplay:true,
    smartSpeed:1000
  });
  // tools-2-deals-carousel (home tools 2) - end
  // --------------------------------------------------





  // top-rated-watches-carousel (home watches 1) - start
  // --------------------------------------------------
  $('#top-rated-watches-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:10,
    dots:false
  });
  // top-rated-watches-carousel (home watches 1) - end
  // --------------------------------------------------





  // sidebar-blog-carousel - start
  // --------------------------------------------------
  $('#sidebar-blog-carousel').owlCarousel({
    items:1,
    nav:true,
    loop:true,
    margin:10,
    dots:false
  });
  // sidebar-blog-carousel - end
  // --------------------------------------------------





  // back to top - start
  // --------------------------------------------------
  $(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
      $('.backtotop:hidden').stop(true, true).fadeIn();
    } else {
      $('.backtotop').stop(true, true).fadeOut();
    }
  });
  $(function() {
    $(".scroll").click(function() {
      $("html,body").animate({
        scrollTop: $(".thetop").offset().top
      }, "slow");
      return false
    })
  });
  // back to top - end
  // --------------------------------------------------




  
  // preloader - start
  // --------------------------------------------------
  $(window).on('load', function(){
    $('#preloader').fadeOut('slow',function(){$(this).remove();});
  });
  // preloader - end
  // --------------------------------------------------




  
  // header-section - Start
  // --------------------------------------------------
  var mainHeader = $('.auto-hide-header'),
  secondaryNavigation = $('.cd-secondary-nav'),
    //this applies only if secondary nav is below intro section
    belowNavHeroContent = $('.sub-nav-hero'),
    headerHeight = mainHeader.height();

    //set scrolling variables
    var scrolling = false,
    previousTop = 0,
    currentTop = 0,
    scrollDelta = 10,
    scrollOffset = 150;

    $(window).on('scroll', function(){
      if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame)
        ? setTimeout(autoHideHeader, 250)
        : requestAnimationFrame(autoHideHeader);
      }
    });

    $(window).on('resize', function(){
      headerHeight = mainHeader.height();
    });

    function autoHideHeader() {
      var currentTop = $(window).scrollTop();

      ( belowNavHeroContent.length > 0 ) 
      ? checkStickyNavigation(currentTop) // secondary navigation below intro
      : checkSimpleNavigation(currentTop);

      previousTop = currentTop;
      scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
    //there's no secondary nav or secondary nav is below primary nav
    if (previousTop - currentTop > scrollDelta) {
        //if scrolling up...
        mainHeader.removeClass('is-hidden');
      } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        //if scrolling down...
        mainHeader.addClass('is-hidden');
      }
    }

    function checkStickyNavigation(currentTop) {
    //secondary nav below intro section - sticky secondary nav
    var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
    
    if (previousTop >= currentTop ) {
        //if scrolling up... 
        if( currentTop < secondaryNavOffsetTop ) {
          //secondary nav is not fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('fixed slide-up');
          belowNavHeroContent.removeClass('secondary-nav-fixed');
        } else if( previousTop - currentTop > scrollDelta ) {
          //secondary nav is fixed
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
          belowNavHeroContent.addClass('secondary-nav-fixed');
        }
        
      } else {
        //if scrolling down...  
        if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
          //hide primary nav
          mainHeader.addClass('is-hidden');
          secondaryNavigation.addClass('fixed slide-up');
          belowNavHeroContent.addClass('secondary-nav-fixed');
        } else if( currentTop > secondaryNavOffsetTop ) {
          //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
          mainHeader.removeClass('is-hidden');
          secondaryNavigation.addClass('fixed').removeClass('slide-up');
          belowNavHeroContent.addClass('secondary-nav-fixed');
        }

      }
    };
  // header-section - end
  // --------------------------------------------------




  
  // sticky menu - start
  // --------------------------------------------------
  var headerId = $(".sticky-header-section , .scrolltop-fixed-header-section");
  $(window).on('scroll' , function() {
    var amountScrolled = $(window).scrollTop();
    if ($(this).scrollTop() > 250) {
      headerId.removeClass("not-stuck");
      headerId.addClass("stuck");
    } else {
      headerId.removeClass("stuck");
      headerId.addClass("not-stuck");
    }
  });
  // sticky menu - end
  // --------------------------------------------------





  // google map - start
  // --------------------------------------------------
  function isMobile() { 
    return ('ontouchstart' in document.documentElement);
  }

  function init_gmap() {
    if ( typeof google == 'undefined' ) return;
    var options = {
      center: [1.2960841, 103.8458455],
      zoom: 14,
      styles: [
      {elementType: 'geometry', stylers: [{color: '#eaeaea'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#ffffff'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '$pure-black'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#61605e'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#cbe99f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#98786d'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#39c2f8'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#fedd96'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#eeca83'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#965c28'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#fef5b6'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f1e0ca'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#a1cafe'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '$pure-black'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#ffffff'}]
      }
      ],
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
      },
      navigationControl: true,
      scrollwheel: false,
      streetViewControl: true,
    }

    if (isMobile()) {
      options.draggable = false;
    }

    $('#google-map').gmap3({
      map: {
        options: options
      },
      marker: {
        latLng: [1.2960841, 103.8458455],
        // options: { icon: 'assets/img/map.png' }
      }
    });
  }
  init_gmap();
  // google map - end
  // --------------------------------------------------




  
})(jQuery);