'use strict';
if (typeof EJ === 'undefined') { $.EJ = new Object(); }

(function($){

    // video button
    var button = $('#play>img');
    var button2 = $('#play2>img');
    $('#video_box, #video_box2').mouseenter(function(){
        button.css('opacity','1');
        button2.css('opacity','1');
    });
    $('#video_box, #video_box2').mouseleave(function(){
        button.css('opacity','0');
        button2.css('opacity','0');
    });

    // mobile video button
    // $('#video01_m')[0].pause();
    // var video = document.getElementById('video01_m');
    // video.on('click',function(){
    //     document.play();}
    // ,false);


    /* swiper (vertical) */
    var swiper1 = new Swiper('.swiper-container', {
        // pagination: '.swiper-pagination',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        mousewheelControl: true,
        speed:500,

        /* video */
        onSlideChangeEnd: function(s) {

            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                $('#video01')[0].play();
                $('#video02')[0].pause();
            } else {
                $('#video01')[0].pause();
            }

            if ( s.activeIndex == 0 ) {
                $('#video02')[0].play();
            }else {
                $('#video02')[0].pause();
            }

            $('*').removeClass('on');
            if ( s.activeIndex == 0 ) {
                $('#c1, #c1_m').addClass('on');
            } else if ( s.activeIndex == 1 ) {
                $('#c2, #c2_m').addClass('on');
            } else if ( s.activeIndex == 2 ) {
                $('#c3, #c3_m').addClass('on');
            } else if ( s.activeIndex == 3 ) {
                $('#c4, #c4_m').addClass('on');
            } else if ( s.activeIndex == 4 ) {
                $('#c5, #c5_m').addClass('on');
            }
        }
    });

    /* swiper (horizontal) */
    var swiper = new Swiper('.swiper-x', {
        pagination: '.move_pager',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        centeredSlides: true,
        speed:500,

        onSlideChangeEnd: function(s) {
            if ( s.activeIndex == 0 ) {
                $('#video01')[0].play();
            }else {
                $('#video01')[0].pause();
            }

            if ( s.activeIndex == 1 ) {
                $('#video02')[0].play();
            }else {
                $('#video02')[0].pause();
            }
        }
    });

    /* desktop */
    $('#c1, #c1_m').addClass('on');

    $('.nav>.inner>li').each(function(idx){
        $(this).click(function(ev) {
            ev.preventDefault();
            $('*').removeClass('on');
            $(this).addClass('on');
            swiper1.slideTo(idx, 1000, false);
            return false;

            if ( idx = 0 ) {
                $('#video01')[0].play();
            } else {
                $('#video01')[0].pause();
            }
        });
    });

    /* mobile */
    $('.m_nav>.inner>li').each(function(ide){
        $(this).click(function(ev) {
            ev.preventDefault();
            $('*').removeClass('on');
            $(this).addClass('on');
            swiper1.slideTo(ide, 1000, false);
            $('.m_hide_menu').css('display', 'none');
            return false;
        });
    });

    /* 띠용 상담신청 바로가기 */
    $('#go_counsel, #go_counsel2').click(function(ev){
        ev.preventDefault();
        $('*').removeClass('on');
        $('#c5').addClass('on');
        swiper1.slideTo(4, 2000, false);
        return false;
    });

    /* 메뉴오픈 */
    $('.open_menu>a>img').on('click', function(){
        var $menu = $('.m_hide_menu');

        if($menu.css('display') == 'none'){
            $menu.slideDown('fast');
        }else if ($menu.css('display') == 'block') {
            $menu.slideUp('fast');
        }
    });

    /* sticky nav (mobile) */
    var ejOffset = $( '.m_menu_area' ).offset();
    $( window ).scroll( function() {
        if ( $( document ).scrollTop() > ejOffset.top ) {
            $( '.m_menu_area' ).addClass( 'fixed' );
        }
        else {
            $( '.m_menu_area' ).removeClass( 'fixed' );
        }
    });

    // modal
    var dialog = new BootstrapDialog({
        message: function(dialogRef){
            var msg = $(".msg");
            var $message = $('<div class='+'msg'+'><p>상담 신청이 완료되었습니다 :)</p></div>');
            var $button = $('<button class="btn btn-primary btn-md btn-block">확인</button>');
            $button.on('click', {dialogRef: dialogRef}, function(event){
                event.data.dialogRef.close();
            });
            $message.prepend("<img src="+"imgs/logo.png"+">");
            $message.append($button);

            return $message;
        },
        closable: false
    });

    $('.btn_goConsult > .btn').each(function(index){
        $(this).on("click", function(ev){
            ev.preventDefault();
            dialog.realize();
            dialog.getModalHeader().hide();
            dialog.getModalFooter().hide();
            dialog.getModalBody().css({'background-color': '#fff' , 'border': '5px solid #fc322c'});
            dialog.getModalBody().css('color', '#777');
            dialog.open();
        });
    });


























 
    
    
    // get access to the necessary elements in the DOM that we'll need to interact with:
var modalTrigger = document.getElementsByClassName( 'modal-trigger' ); // the triggers
var siteWrapper = document.getElementsByClassName( 'site' ); // the site wrappers
var siteContainer = document.getElementsByClassName( 'site__container' ); // the site containers
var btnClose = document.getElementsByClassName( 'btn--close' ) // the close buttons

// create a variable to hold our target data-rel value
var targetDataRel;

// add the necessary event listeners to each individual element

// the modal triggers need to open the modals, so assign them the openModal function
for( var i = 0; i < modalTrigger.length; i++ ) {
  modalTrigger[i].addEventListener( 'click', openModal );
}

// the site wrappers need to be a way to close the modals, so assign them the closeModal function
for( var i = 0; i < siteWrapper.length; i++ ) {
  siteWrapper[i].addEventListener( 'click', closeModal );
}

// since we have the site wrappers set up to close the modals, we need to have the site containers set to PREVENT that functionality when they're clicked inside of, since they will have links in them that the user will need to be able to click
for( var i = 0; i < siteContainer.length; i++ ) {
  siteContainer[i].addEventListener( 'click', stopProp );
}

// the close buttons will need to close the modals, so assign them the closeModal function
for( var i = 0; i < btnClose.length; i++ ) {
  btnClose[i].addEventListener( 'click', closeModal );
}

// our function to check through each modal and open the appropriate one, based on matching data-rel attribute values
function openModal() {
  // set a variable to hold the data-rel value that we are looking for, which will be the value assigned to the individual modal trigger that we clicked on
  targetDataRel = this.getAttribute('data-rel');
  
  // iterate through each site wrapper and check its data-rel value against the target data-rel that we just declared above
  for( var i = 0; i < siteWrapper.length; i++ ) {
    // if the site wrapper that we're currently on does indeed have the matching data-rel value that we're looking for...
    if( siteWrapper[i].getAttribute('data-rel') == targetDataRel ) {
      // then set its display to block to make it show up on the page!
      siteWrapper[i].style.display = "block";
    }
    // otherwise, we'll do nothing
  }
}

// our function to close the modal that is open
function closeModal() {
  // iterate through each site wrapper..
  for( var i = 0; i < siteWrapper.length; i++ ) {
    // if its display is not set to "none"...
    if( siteWrapper[i].style.display != "none" ) {
      // set it to none (thus closing it)!
      siteWrapper[i].style.display = "none";
    }
    // otherwise, we'll do nothing
  }
}

// our function to stop the propagation of our closeModal call from the siteWrapper(s)
// you can learn more about stopPropagation, preventDefault, and event propagation in general at https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation and the links contained therein
function stopProp( event ) {
  event.stopPropagation();
}
    
    
    
    
    <div class="wrapper wrapper--main">
  
  <!-- collection of triggers for the modal windows (don't need to be anchor elements since they aren't actually linking to anything) -->
  <span class="modal-trigger" data-rel="site-1">
    Site One
  </span>
  <span class="modal-trigger" data-rel="site-2">
    Site Two
  </span>
  <span class="modal-trigger" data-rel="site-3">
    Site Three
  </span>
  <span class="modal-trigger" data-rel="site-4">
    Site Four
  </span>
  <span class="modal-trigger" data-rel="site-5">
    Site Five
  </span>
  <span class="modal-trigger" data-rel="site-6">
    Site Six
  </span>
  
  <!-- uncomment the paragraphs below if you want to get an example of the 'position: fixed' chosen for the site wrappers (it will allow the site to scroll but the modal will not move or lose its full-page display) -->
  <!--<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus lacus, dignissim eu ex a, ultricies lacinia dolor. Etiam at diam tristique, sodales metus nec, tincidunt nunc. Nullam vitae pulvinar augue, nec ornare tellus. Nunc sed ipsum non magna pretium consectetur non in metus. Praesent consectetur, felis id suscipit lacinia, quam tellus tincidunt dui, vitae pretium sapien quam efficitur magna. Nulla sollicitudin in quam ut aliquam. Vestibulum ultrices ante sed nisi mattis ornare in nec leo. Curabitur quis nisl nec leo pretium congue eget vitae libero. Suspendisse dictum scelerisque nisl condimentum vulputate. Quisque placerat viverra leo, sit amet mattis ipsum sollicitudin sit amet. Pellentesque eleifend velit dapibus iaculis sollicitudin. Donec porta ut ipsum vel scelerisque. Nunc eu porttitor turpis. Morbi interdum, massa nec aliquet imperdiet, nisi erat imperdiet massa, nec vestibulum lorem sem scelerisque enim. Vivamus fringilla commodo consectetur. Vestibulum quis libero lectus.
  </p>
  <p>
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris lacus diam, imperdiet non tellus at, dictum vehicula libero. Mauris nisl massa, semper eget ipsum a, pharetra placerat risus. Morbi congue, eros quis facilisis venenatis, neque dolor fringilla odio, at tristique leo nisi vitae purus. Suspendisse mollis facilisis tempus. Nunc rhoncus tellus porta ligula aliquam ultricies. Nulla ornare eleifend dui, et aliquet nisl commodo at. Aenean vitae massa eget ligula posuere finibus. Nunc suscipit, ante eget laoreet dictum, nisl nisi egestas tortor, eget faucibus magna felis porttitor magna. Nulla nulla diam, viverra in augue blandit, fringilla euismod arcu. Curabitur elementum ligula enim, ut condimentum libero viverra quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu porttitor nunc. Nunc consectetur mi vel tempor blandit.
  </p>
  <p>
    Sed non neque massa. Mauris accumsan urna id leo lacinia, quis pharetra nunc tincidunt. Maecenas mattis faucibus orci, at scelerisque est placerat vitae. Nullam gravida ligula placerat dapibus congue. Curabitur vitae imperdiet nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris eu felis ultrices, consectetur mi quis, tristique ipsum. Vivamus ullamcorper est sit amet efficitur scelerisque. In hac habitasse platea dictumst. Sed vulputate dignissim arcu eu malesuada. Sed orci sem, sollicitudin nec felis quis, volutpat consequat massa. Donec ut purus ut leo luctus scelerisque vel in dolor.
  </p>
  <p>
    In sed lectus tortor. Nullam nisi dui, faucibus at risus ac, fermentum bibendum risus. Cras porttitor augue sed nisi mattis accumsan. In hac habitasse platea dictumst. Sed et ullamcorper lectus. Ut tellus ligula, finibus eget finibus eu, cursus ut tortor. Aliquam eget tortor blandit, imperdiet tellus sit amet, varius nulla. Morbi quis tincidunt ante. Fusce eu ligula dolor. Cras vitae nulla finibus libero vestibulum semper. Donec sed nulla tellus.
  </p>
  <p>
    Vivamus sed varius nulla, quis sagittis lectus. Nulla facilisi. Aenean dolor ipsum, vestibulum sit amet pulvinar ut, eleifend eu purus. Suspendisse felis lectus, mattis a erat a, facilisis vulputate erat. Cras rhoncus, mi vitae scelerisque dapibus, libero lacus suscipit elit, vel lobortis metus nulla vel nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
  </p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam risus lacus, dignissim eu ex a, ultricies lacinia dolor. Etiam at diam tristique, sodales metus nec, tincidunt nunc. Nullam vitae pulvinar augue, nec ornare tellus. Nunc sed ipsum non magna pretium consectetur non in metus. Praesent consectetur, felis id suscipit lacinia, quam tellus tincidunt dui, vitae pretium sapien quam efficitur magna. Nulla sollicitudin in quam ut aliquam. Vestibulum ultrices ante sed nisi mattis ornare in nec leo. Curabitur quis nisl nec leo pretium congue eget vitae libero. Suspendisse dictum scelerisque nisl condimentum vulputate. Quisque placerat viverra leo, sit amet mattis ipsum sollicitudin sit amet. Pellentesque eleifend velit dapibus iaculis sollicitudin. Donec porta ut ipsum vel scelerisque. Nunc eu porttitor turpis. Morbi interdum, massa nec aliquet imperdiet, nisi erat imperdiet massa, nec vestibulum lorem sem scelerisque enim. Vivamus fringilla commodo consectetur. Vestibulum quis libero lectus.
  </p>
  <p>
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris lacus diam, imperdiet non tellus at, dictum vehicula libero. Mauris nisl massa, semper eget ipsum a, pharetra placerat risus. Morbi congue, eros quis facilisis venenatis, neque dolor fringilla odio, at tristique leo nisi vitae purus. Suspendisse mollis facilisis tempus. Nunc rhoncus tellus porta ligula aliquam ultricies. Nulla ornare eleifend dui, et aliquet nisl commodo at. Aenean vitae massa eget ligula posuere finibus. Nunc suscipit, ante eget laoreet dictum, nisl nisi egestas tortor, eget faucibus magna felis porttitor magna. Nulla nulla diam, viverra in augue blandit, fringilla euismod arcu. Curabitur elementum ligula enim, ut condimentum libero viverra quis. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu porttitor nunc. Nunc consectetur mi vel tempor blandit.
  </p>
  <p>
    Sed non neque massa. Mauris accumsan urna id leo lacinia, quis pharetra nunc tincidunt. Maecenas mattis faucibus orci, at scelerisque est placerat vitae. Nullam gravida ligula placerat dapibus congue. Curabitur vitae imperdiet nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris eu felis ultrices, consectetur mi quis, tristique ipsum. Vivamus ullamcorper est sit amet efficitur scelerisque. In hac habitasse platea dictumst. Sed vulputate dignissim arcu eu malesuada. Sed orci sem, sollicitudin nec felis quis, volutpat consequat massa. Donec ut purus ut leo luctus scelerisque vel in dolor.
  </p>
  <p>
    In sed lectus tortor. Nullam nisi dui, faucibus at risus ac, fermentum bibendum risus. Cras porttitor augue sed nisi mattis accumsan. In hac habitasse platea dictumst. Sed et ullamcorper lectus. Ut tellus ligula, finibus eget finibus eu, cursus ut tortor. Aliquam eget tortor blandit, imperdiet tellus sit amet, varius nulla. Morbi quis tincidunt ante. Fusce eu ligula dolor. Cras vitae nulla finibus libero vestibulum semper. Donec sed nulla tellus.
  </p>
  <p>
    Vivamus sed varius nulla, quis sagittis lectus. Nulla facilisi. Aenean dolor ipsum, vestibulum sit amet pulvinar ut, eleifend eu purus. Suspendisse felis lectus, mattis a erat a, facilisis vulputate erat. Cras rhoncus, mi vitae scelerisque dapibus, libero lacus suscipit elit, vel lobortis metus nulla vel nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
  </p>-->
  
  <!-- collection of modal windows that will display when their related link is clicked (related via the 'data-rel' attribute) -->
  <div class="site" data-rel="site-1"><!-- exterior wrapper to act as the semi-transparent background and one method of closing the modals  -->
    <div class="site__container"><!-- interior container to act as the vessel to hold all of the content -->
      <span class="btn btn--close">X</span><!-- another way to close the modals (for usability purposes) -->
      <img class="site__img" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=site%20one&w=150&h=150">
      <p class="site__blurb">Here is some information about Site One.</p>
      <a class="site__link" href="#">Site One</a><!-- these would link to the individual pages to learn more about each project -->
    </div>
  </div>
  <div class="site" data-rel="site-2">
    <div class="site__container">
      <span class="btn btn--close">X</span>
      <img class="site__img" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=site%20two&w=150&h=150">
      <p class="site__blurb">Here is some information about Site Two.</p>
      <a class="site__link" href="#">Site Two</a>
    </div>
  </div>
  <div class="site" data-rel="site-3">
    <div class="site__container">
      <span class="btn btn--close">X</span>
      <img class="site__img" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=site%20three&w=150&h=150">
      <p class="site__blurb">Here is some information about Site Three.</p>
      <a class="site__link" href="#">Site Three</a>
    </div>
  </div>
  <div class="site" data-rel="site-4">
    <div class="site__container">
      <span class="btn btn--close">X</span>
      <img class="site__img" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=site%20four&w=150&h=150">
      <p class="site__blurb">Here is some information about Site Four.</p>
      <a class="site__link" href="#">Site Four</a>
    </div>
  </div>
  <div class="site" data-rel="site-5">
    <div class="site__container">
      <span class="btn btn--close">X</span>
      <img class="site__img" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=site%20five&w=150&h=150">
      <p class="site__blurb">Here is some information about Site Five.</p>
      <a class="site__link" href="#">Site Five</a>
    </div>
  </div>
  <div class="site" data-rel="site-6">
    <div class="site__container">
      <span class="btn btn--close">X</span>
      <img class="site__img" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=site%20six&w=150&h=150">
      <p class="site__blurb">Here is some information about Site Six.</p>
      <a class="site__link" href="#">Site Six</a>
    </div>
  </div>
  
</div><!-- end of .wrapper.wrapper--main -->



    
    
    
})(jQuery);
