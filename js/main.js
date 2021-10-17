"use strict"

// document.addEventListener('load', function () {

    // HEADER-SCROLLED
    const header = document.querySelector('.header');

    function scrolledHeader() {
        let threshold = window.scrollY > 50;
        if(threshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', scrolledHeader);

    // BURGER
    const menuBurger = header.querySelector('.menu__burger');
    const menuBody = header.querySelector('.menu__body');
    const burgerSvg = header.querySelector('.menu__burger-svg');
    const body = document.querySelector('body');

    menuBurger.addEventListener('click', function () {
        header.classList.toggle('active');
        menuBurger.classList.toggle('active');
        menuBody.classList.toggle('active');
        burgerSvg.classList.toggle('active');
        body.classList.toggle('fixed');
    })


    //SCROLL-PAGE
    header.addEventListener('click', function (event) {
        if(event.target.classList.contains('menu__link')) {
            event.preventDefault();
            if(this.classList.contains('active')) {
                menuBurger.click();
            }
            let id = event.target.getAttribute('href');
            let elem = offset(document.querySelector(id)).top;

            window.scrollTo({
                top: elem - 90,
                behavior: "smooth"
            });
        }
    })


    //OFFSET
    function offset (el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {top: rect.top + scrollTop, left: rect.left +scrollLeft}
    }


    //PARALLAX
    const parallaxBlocks = document.querySelectorAll('.parallax');

    if(parallaxBlocks.length > 0) {
        
        window.addEventListener('scroll', parallaxAnim);
        
        function parallaxAnim () {
        let scrolled = window.scrollY;

        parallaxBlocks.forEach((parallaxBlock) => {
            let initY = offset(parallaxBlock).top;
            let height = parallaxBlock.offsetHeight;
            let speed = parallaxBlock.dataset.speed;
            let view = parallaxBlock.dataset.view;
            if(window.innerWidth <= 992) {
                speed -= 1;
                view = 0;
            }
            let visible = isInViewport(parallaxBlock);
            
            if(visible) {
                let diff = scrolled - initY
                let ratio = Math.round((diff / height) * 100);
                parallaxBlock.style.backgroundPosition = 'center ' + parseInt((ratio * speed - view)) + 'px';
            }
        })
        }

        // Check if the element is in the viewport.
        function isInViewport(node) {
            let rect = node.getBoundingClientRect()
            return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
            )
        }
    }






    // CHANGE NUMBERS ON SCROLL
    const achievementsBlock = document.querySelector('.achievements');
    const numbers = document.querySelectorAll('.numbers');
        
    if(numbers.length > 0) {
        window.addEventListener('scroll', animNumOnScroll);
        window.addEventListener('resize', animNumOnScroll);

        function animNumOnScroll() {
            numbers.forEach(number => {
                let start = +number.innerHTML, end = +number.dataset.max;
                let numberHeight = achievementsBlock.offsetHeight;
                let numberOffset = offset(achievementsBlock).top;
                let animStart = 1.4;

                let numberPoint = window.innerHeight - numberHeight / animStart;
                if (numberHeight > window.innerHeight) {
                    numberPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if((pageYOffset > numberOffset - numberPoint)) {
                    window.removeEventListener('scroll', animNumOnScroll);	
                    window.removeEventListener('resize', animNumOnScroll);
                    number.closest('._opacity').classList.add('show');

                    let interval = setInterval(function() {
                        start += +number.dataset.calc;
                            number.innerHTML = start;
                        if(start == end) {
                            clearInterval(interval);
                        }
                    }, +number.dataset.speed);
                }
            });
        };
    }




    //TABS
    const tabs = document.querySelectorAll('.tabs__link');
    const tabsBlocks = document.querySelectorAll('.tabs__gallery');

    if(tabs.length > 0) {
        tabs.forEach((tab) => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                const id = e.target.getAttribute('href').replace(/#/, '');

                if(!tab.classList.contains('active')) {
                    tabs.forEach((tab) => {
                        tab.classList.remove('active');
                    });
                    tabsBlocks.forEach((block) => {
                        block.classList.remove('active');
                    });

                    tab.classList.add('active');
                    document.getElementById(id).classList.add('active');
                }
                    
            });
        });
    }

    tabs[0].click();


    // BUTTON-UP
	const buttonUp = document.querySelector('#button-up');

    function buttonShow() {
        let threshold = window.scrollY > 700;
        if(threshold) {
            buttonUp.classList.add('show');
        } else {
            buttonUp.classList.remove('show');
        }
    }
    function buttonScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.addEventListener('scroll', buttonShow);
    buttonUp.addEventListener('click', buttonScrollTop);




    //SWIPER
    new Swiper('.main-slider__swiper', {

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        slidesPerView: 1,
        initialSlide: 0,
        loop: true,
        loopedSlides: 2,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        speed: 2000,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            992: {
                slidesPerView: 1,
            },
        },
    });



    const swiperComments = new Swiper('.reviews__slider', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 3,
        initialSlide: 0,
        loop: true,
        centeredSlides: true,
        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        // },
        speed: 2000,
        slideToClickedSlide: true,
        //Адаптивность
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 3,
            },
        },
    });



    //Останавливаем автопрокрутку при наведении мыши
    const reviewsSliderBlock = document.querySelector('.reviews__slider');
    const commentsBlock = document.querySelector('.reviews__comments');

    reviewsSliderBlock.addEventListener('mouseleave', autoplayStart);
    commentsBlock.addEventListener('mouseleave', autoplayStart);
    reviewsSliderBlock.addEventListener('mouseenter', autoplayStop);
    commentsBlock.addEventListener('mouseenter', autoplayStop);

    function autoplayStart() {
        swiperComments.params.autoplay.disableOnInteraction = 'false';
        swiperComments.params.autoplay.delay = 2000;
        swiperComments.autoplay.start();
    }
    function autoplayStop() {
        swiperComments.autoplay.stop();
    }


    //Выводим соотвествующий комментарий при переключении слайда
    swiperComments.on('slideChangeTransitionStart', addComment);

    function addComment () {
        const reviewsSlides = document.querySelectorAll('.reviews__slide');
        const comments = commentsBlock.querySelectorAll('.reviews__block-hidden');

        reviewsSlides.forEach((reviewsSlide) => {
            if(reviewsSlide.classList.contains('swiper-slide-active')) {
                comments.forEach((elem) => {
                    elem.classList.remove('active');
                })
                let comment = document.querySelector(reviewsSlide.dataset.number);
                comment.classList.add('active');
            }
        });
    }
    addComment();


// });




document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('#form');
    form.addEventListener('submit', formSend);

    async function formSend(event) {
        event.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if(error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData,
            });
            if(response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('_sending');
            } else {
                alert('Ошибка');
                form.classList.remove('_sending');
            }



        } else {
            alert('Required fields');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._required');

        formReq.forEach((inputReq) => {
            formRemoveError(inputReq);

            if(inputReq.classList.contains('._email')) {
                if(emailTest(inputReq)) {
                    formAddError(inputReq);
                    error++;
                }
            } else if(inputReq.value === '') {
                formAddError(inputReq);
                error++;
            }

        }) 

        return error;
    }


    function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	function emailTest(input) {
		return !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value));
	}





});










































// numbers.forEach(number => {

//     let numberTop = number.getBoundingClientRect().top,
//         start = +number.innerHTML, end = +number.dataset.max;

//     window.addEventListener('scroll', onScroll);
//     window.addEventListener('resize', onScroll);

//     function onScroll() {
//         if(window.pageYOffset > (numberTop - window.innerHeight / 1.4)) {

//             console.log(window.pageYOffset);
//             console.log(window.innerHeight);
//             console.log(numberTop);
//             this.removeEventListener('scroll', onScroll);	
//             this.removeEventListener('resize', onScroll);
//             number.closest('.achievements__inner').style.opacity = '1';

//             let interval = setInterval(function() {
//                 start += +number.dataset.calc;
//                     number.innerHTML = start;
//                 if(start == end) {
//                     clearInterval(interval);
//                 }
//             }, +number.dataset.speed);
//     }
//     }
// });

