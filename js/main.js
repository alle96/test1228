'use strict';
if (typeof EJ === 'undefined') { $.EJ = new Object(); }

(function($){


// Android Viewport height fix

var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1; //&& ua.indexOf("mobile");
if(isAndroid) {
    document.write('<meta name="viewport" content="width=device-width,height='+window.innerHeight+', initial-scale=1.0">');
}

// URL bar hide
/*window.addEventListener("load", function(){  
       if(document.height <= window.outerHeight)
       {
           document.body.style.height = (window.outerHeight + 50) + 'px';
           setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
       }
       else
       {
           setTimeout( function(){ window.scrollTo(0, 1); }, 0 ); 
       }
   });*/
/*
if(navigator.userAgent.indexOf('iPhone')!=-1 {
	addEventListener("load", function() {
		setTimeout(hideURLbar,0);
	}, false);
}



function hideURLbar() {
	//document.body.style.height = (document.documentElement.clientHeight + 5) + 'px';
	window.scrollTo(0,1);
}

*/


/*
window.addEventListener('load', function(){
    document.body.style.height = (document.documentElement.clientHeight + 5) + 'px';
    window.scrollTo(0, 1);
}, false);
*/


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

})(jQuery);
