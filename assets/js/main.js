/*-------------------------------------------*\
   index.js

   1.0 Declaration of constants
   - body
   - doc
   - win
   - root
   - pageWrapper
   - pageLoader
   - navigation
   - navigationMobile
   - sizes
   - wow

   1.1 Handler for changing scroll position and screen size
   - resize handler
   - scroll handler

   1.2 Declaration of general functions
   - Alert Messages
   - Jquery Video Modal
   - Likes Toggle
   - Hide Page Loader
   - Sticky Sidebar
   - Hide Page Loader
   - Scroll Top Button
   - Page Progress Bar
   - Particles
   - Isotope Grid
   - Tilt Init
   - Social Links Label
   - Navigation Language Toggle
   - Counters
   - Typed Text
   - Progress Bars
   - Accordion
   - Magnific Popup
   - Google Map Init
   - Navigation Validate
   - Grid Fixed Height

   1.3 Create of general classes
   - Hero Slider Shape [Interface]
   - Hero Slider Full Width [Interface]
   - Hero Slider Multiple [Interface]
   - Hero Slider Parallax [Interface]
   - Hero Slider Carousel [Interface]
   - Hero Scene Image Hover Gallery [Interface]
   - Testimonials Slider type 1 [Interface]
   - Testimonials Slider type 2 [Interface]
   - Testimonials Slider type 3 [Interface]
   - Testimonials Slider type 4 [Interface]
   - Team Slider type 1 [Interface]
   - Team Slider type 2 [Interface]
   - Posts Slider type 1 [Interface]
   - Posts Slider type 2 [Interface]
   - Posts Slider type 3 [Interface]
   - Posts Slider type 4 [Interface]
   - Navigation type 1 [Interface]
   - Navigation type 2 [Interface]
   - Navigation type 3 [Interface]
   - Navigation type mobile [Interface]
   - Tabs [Interface]

   1.4 Create of general interfaces

   1.5 Initializing of general functions / classes
   - before page loading
   - after page loading
\*-------------------------------------------*/
jQuery(document).ready(function ($) {
    'use strict';

    /* 1.0 Declaration of constants */

    // - body
    const body = $('body');

    // - doc
    const doc = $(document);

    // - win
    const win = $(window);

    // - root
    const root = document.querySelector(':root');

    // - pageWrapper
    const pageWrapper = $('.page-wrapper');

    // - pageLoader
    const pageLoader = $('.page-loader');

    // - navigation
    const navigation = $('.navigation');

    // - navigationMobile
    const navigationMobile = $('.navigation-mobile');

    // - sizes
    const sizes = {
        w: $(window).innerWidth(),
        h: $(window).innerHeight(),
        offsetY: win.pageYOffset,
    };

    // - wow
    const wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true,
        scrollContainer: null,
        resetAnimation: true,
    });


    /* 1.1 Handler for changing scroll position and screen size */

    // - resize handler
    win.resize(() => {
        sizes.w = win.innerWidth();
        sizes.h = win.innerHeight();
    });

    // - scroll handler
    win.scroll(() => {
        sizes.offsetY = win.pageYOffset;
    });

    /* 1.2 Declaration of general functions */

    /* - Alert Messages
    *
    * Includes a message alert click handler that deletes the message
    * and creates a hide animation
    *
    *  */
    const alertMessagesInit = () => {
        $('.alert-message').find('.close-btn').on('click', function () {
            let target = $(this).parent();
            TweenMax.to(target, 0.5, {
                opacity: 0,
                pointerEvents: 'none',
                transform: 'scale(1.05)',
                ease: Expo.easeInOut,
                onComplete: () => {
                    target.remove();
                }
            })
        });
    };

    /* - Jquery Video Modal
    *
    * Includes a handler for videos that are called when you click
    * on the video toggle
    *
    *  */
    const modalVideoInit = () => {
        $(".js-modal-btn").modalVideo();
    };

    /* - Likes Toggle
    *
    * Includes a click handler on the like button, which switches
    * its state (active / inactive)
    *
    *
    *  */
    const likesToggleInit = () => {
        $('.likes-wrapper').on('click', function () {
            $(this).toggleClass('active-button');
        });
    };

    /* - Hide Page Loader
    *
    * Includes a handler for hiding the page loader after all the
    * content on the page is completely ready
    *
    *  */
    const pageLoaderHideInit = () => {
        let loaderInner = pageLoader.find('.loader-inner-wrapper');
        TweenMax.to(loaderInner, 0.4, {
            opacity: 0,
            transform: 'translateY(-50px)',
            pointerEvents: 'none',
            ease: Power3.easeInOut,
            onComplete: () => {
                pageLoader.addClass('loader-hide');
            }
        })
    };

    /* - Sticky Sidebar
     *
     * Includes initialization of a sticky sidebar
     *
     *  */
    const stickySidebarInit = () => {
        if (sizes.w > 1024) {
            let sidebar = $('.sidebar-sticky').stickySidebar({
                topSpacing: 50,
                bottomSpacing: 50,
                containerSelector: '.content-sticky',
            });
        }
    };

    /* - Hide Page Loader
    *
    *  Includes an ajax request handler after activating the contact form
    *
    *  */
    const ajaxContactFormInit = () => {
        let form = $('#ajax-contact'),
            formMessages = $('#form-messages');
        $(form).on('submit', function (event) {
            event.preventDefault();
            let formData = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            }).done(function (response) {
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');
                $(formMessages).text(response);
                $('#name').val('');
                $('#email').val('');
                $('#phone').val('');
                $('#message').val('');
            }).fail(function (data) {
                $(formMessages).removeClass('success');
                $(formMessages).addClass('error');
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        });
        let formFront = $('#ajax-contact-front');
        $(formFront).on('submit', function (event) {
            event.preventDefault();
            let formData = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: $(formFront).attr('action'),
                data: formData
            }).done(function (response) {
                $('#email').val('');
            }).fail(function (data) {

            });
        });
    };

    /* - Scroll Top Button
    *
    * Includes a handler for the appearance of the scroll button up,
    * as well as a click handler for this button, which creates a
    * smooth scroll animation
    *
    *  */
    const scrollTopButtonInit = () => {
        let scrollTopButton = $('.page-scroll-button-wrapper .scroll-button-top'),
            scrollTrigger = true,
            showAnimation = () => {
                TweenMax.to(scrollTopButton, 0.3, {
                    transform: 'translateY(0)',
                    opacity: 1,
                    pointerEvents: 'auto',
                    ease: Power2.easeInOut,
                }).play();
            }, hideAnimation = () => {
                TweenMax.to(scrollTopButton, 0.3, {
                    transform: 'translateY(25px)',
                    opacity: 0,
                    pointerEvents: 'none',
                    ease: Power2.easeInOut,
                }).play();
            };
        win.on('scroll', () => {
            if (win.scrollTop() > (doc.height() / 3) && scrollTrigger) {
                showAnimation();
                scrollTrigger = false;
            }
            if (win.scrollTop() <= (doc.height() / 3) && !scrollTrigger) {
                hideAnimation();
                scrollTrigger = true;
            }
        });
        scrollTopButton.on('click', function () {
            TweenMax.to(win, 1, {
                scrollTo: 0,
                ease: Power2.easeInOut,
            }).play();
        });
    };

    /* - Page Progress Bar
    *
    * Includes a progress bar handler that is filled when the
    * page is scrolled
    *
    *  */
    const pageProgressBarInit = () => {
        let progressBar = $('.progress-bar-page');
        if ($(progressBar).length) {
            let getMax = function () {
                return doc.height() - $(window).height();
            };
            let getValue = function () {
                return win.scrollTop();
            };
            let max = getMax(),
                value, width;
            let getWidth = function () {
                value = getValue();
                width = (value / max) * 100;
                width = width + '%';
                return width;
            };
            let setWidth = function () {
                progressBar.css({
                    width: getWidth()
                });
            };
            doc.on('scroll', setWidth);
            win.on('resize', function () {
                max = getMax();
                setWidth();
            });
        }
    };

    /* - Particles
    *
    * Includes a handler of particles, and a set of presets
    *
    *  */
    const particlesInit = () => {
        let particlesBg = $('#particles-bg');
        if (particlesBg.hasClass('preset-1')) {
            const preset1 = {
                "particles": {
                    "number": {
                        "value": 200,
                        "density": {
                            "enable": false,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        }
                    },
                    "opacity": {
                        "value": 0.8,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 2,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": false,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            };
            particlesJS('particles-bg', preset1);
        } else if (particlesBg.hasClass('preset-2')) {
            const preset2 = {
                "particles": {
                    "number": {
                        "value": 150,
                        "density": {
                            "enable": false,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 1,
                            "color": "#ffffff"
                        },
                        "square": {
                            "nb_sides": 2
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 2,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 120,
                        "color": "#ffffff",
                        "opacity": 0.3,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": false,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": false,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 120,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 200,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            };
            particlesJS('particles-bg', preset2);
        } else if (particlesBg.hasClass('preset-3')) {
            const preset3 = {};
            particlesJS('particles-bg', preset3);
        } else if (particlesBg.hasClass('preset-4')) {
        } else if (particlesBg.hasClass('preset-5')) {
        } else if (particlesBg.hasClass('preset-6')) {
        }
    };

    /* - Isotope Grid
    *
    * Includes initialization of the grid isotope and groups
    * of buttons that filter the grid, there is also a grid item
    * counter
    *
    *  */
    const isotopeGridInit = () => {
        let isotopeGridWrapper = $('.isotope-grid-wrapper'),
            buttonsGridCounters = $('.buttons-group');
        $(isotopeGridWrapper).each(function () {
            let isotopeGrid = $(this).find('.isotope-grid'),
                buttonsGroup = $(this).find('.buttons-group'),
                buttons = buttonsGroup.find('button');
            isotopeGrid.isotope({
                itemSelector: '.grid-item',
                layoutMode: 'masonry',
            });
            buttonsGroup.on('click', 'button', function () {
                $(buttons).removeClass('active-button');
                $(this).addClass('active-button');
                let filter_value = $(this).attr('data-filter');
                isotopeGrid.isotope({
                    filter: filter_value,
                });
            });
        });
        $(buttonsGridCounters).each(function () {
            let countAll = $(this).closest('.isotope-grid-wrapper').find('.grid-item').length;
            $($(this).find('button')).each(function () {
                if ($(this).data('filter') === '*') {
                    $(this).append('<span class="count-items">' + countAll + '</span>');
                } else {
                    $(this).append('<span class="count-items">' + $($(this).data('filter')).length + '</span>');
                }
            });
        });
    };

    /* - Tilt Init
    *
    * Includes a tilt effect initialization
    *
    *  */
    const tiltInit = () => {
        let tiltWrapper = $('.tilt-wrapper');
        if ($(tiltWrapper).length) {
            $(tiltWrapper).each(function () {
                let $this = $(this);
                $this.tilt({
                    maxTilt: $this.data('tilt-value'),
                    perspective: $this.data('tilt-perspective'),
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    scale: $this.data('tilt-scale'),
                    speed: $this.data('tilt-speed'),
                    transition: true,
                    disableAxis: null,
                    reset: true,
                    maxGlare: 0.05
                });
            });
        }
    };

    /* - Social Links Label
    *
    * Includes a handler that handles mouse hovering over a label
    * that is hiding and social networks appear.
    *
    *  */
    const socialLinksLabelInit = () => {
        let socialListWrapper = $('.social-links-label'),
            socialList = socialListWrapper.find('.social-list'),
            metaPart = socialListWrapper.find('.meta-part');

        metaPart.on('mouseenter', function () {
            TweenMax.staggerTo(socialList.children(), 0.5, {
                transform: 'translateY(0)',
                opacity: 1,
                pointerEvents: 'auto',
                ease: Power3.easeInOut
            }, 0.05);
            TweenMax.to($(this), 0.3, {
                y: -30,
                opacity: 0,
                pointerEvents: 'none',
                ease: Power3.easeInOut
            });
        }).on('mouseleave', function () {

        });
        socialListWrapper.on('mouseenter', function () {

        }).on('mouseleave', function () {
            TweenMax.staggerTo(socialList.children(), 0.3, {
                transform: 'translateY(20px)',
                opacity: 0,
                pointerEvents: 'none',
                ease: Power3.easeInOut
            }, 0.05);
            TweenMax.to(metaPart, 0.5, {
                y: 0,
                opacity: 1,
                pointerEvents: 'auto',
                ease: Power3.easeInOut
            });
        });
    };

    /* - Navigation Language Toggle
    *
    * Includes a language switch handler that appears when you
    * hover over it
    *
    *  */
    const navigationLanguageToggleInit = () => {
        let languageToggle = $('.language-toggle');
        languageToggle.on('mouseenter', function () {
            TweenMax.to($(this).find('.sub-menu'), 0.25, {
                transform: 'translateY(0)',
                opacity: 1,
                pointerEvents: 'auto',
                ease: Elastic,
            }).play();
        }).on('mouseleave', function () {
            TweenMax.to($(this).find('.sub-menu'), 0.25, {
                transform: 'translateY(10px)',
                opacity: 0,
                pointerEvents: 'none',
                ease: Elastic,
            }).play();
        });
    };

    /* - Counters
    *
    * Includes a counter handler that starts the animation when
    * the user scrolls to the counter section
    *
    *  */
    const countersInit = () => {
        let counter = $('.counter');
        $(counter).each(function () {
            let counterConfig = {score: 0},
                animationDuration = Number($(this).data('animation-duration'));
            $(this).waypoint(() => {
                if (!$(this).hasClass('finished-count')) {
                    $(this).addClass('finished-count');
                    let updateHandler = () => {
                            $(this).text(counterConfig.score);
                        },
                        counter = () => {
                            TweenMax.to(counterConfig, animationDuration, {
                                score: $(this).data('counter-value'),
                                roundProps: "score",
                                onUpdate: updateHandler,
                                ease: Linear.easeInOut,
                            }).play();
                        };
                    counter();
                }
            }, {
                offset: '85%'
            });
        });
    };

    /* - Typed Text
    *
    * Includes a typed text handler that contains a set of data
    * attributes that are printed and changed one after another
    *
    *  */
    const typedTextInit = () => {
        let fancyText = $('.typed-text');
        fancyText.each(function () {
            let typed = new Typed($(fancyText).get($(this).index()), {
                strings: [$(this).data('type-word-1'), $(this).data('type-word-2'), $(this).data('type-word-3')],
                typeSpeed: $(this).data('type-speed'),
                backSpeed: $(this).data('back-speed'),
                loop: true,
            });
        });
    };

    /* - Progress Bars
    *
    * Includes a progress bar handler that activates the fill
    * animation when user scrolls to the section with progress bars
    *
    *  */
    const progressBarsInit = () => {
        let progressBars = '.progress-bar';
        for (let i = 0; $(progressBars).length > i; i++) {
            let bar = new ProgressBar.Line($(progressBars).get(i), {
                strokeWidth: $(progressBars + ':eq(' + [i] + ')').data('bar-stroke-width'),
                easing: 'easeInOut',
                duration: $(progressBars + ':eq(' + [i] + ')').data('bar-duration'),
                color: $(progressBars + ':eq(' + [i] + ')').data('bar-color'),
                trailColor: $(progressBars + ':eq(' + [i] + ')').data('bar-trail-color'),
                trailWidth: 1,
                svgStyle: {width: '100%', height: $(progressBars + ':eq(' + [i] + ')').data('bar-height')},
                step: (state, bar) => {
                    bar.setText(Math.round(bar.value() * 100) + ' %');
                }
            });
            bar.animate($(progressBars + ':eq(' + [i] + ')').data('bar-progress'));
        }
    };

    /* - Accordion
    *
    * Includes an accordion handler that opens on click
    *
    *  */
    const accordionInit = () => {
        let accordions = $('.accordion');

        $(accordions).each(function () {
            let accordionItem = $(this).find('.accordion-item'),
                accordionHeader = $(accordionItem).find('.item-header'),
                openItem = (item) => {
                    TweenMax.to(item, 0.5, {
                        minHeight: `${item.find('.body-content').outerHeight(true)}px`,
                        opacity: 1,
                        ease: Power3.ease
                    });
                }, closeItem = (item) => {
                    TweenMax.to(item, 0.5, {
                        minHeight: 0,
                        height: 0,
                        opacity: 0,
                        ease: Power3.ease
                    });
                };

            accordionHeader.on('click', function () {
                closeItem($(accordionHeader).not($(this)).parent().find('.item-body'));
                openItem($(this).parent().find('.item-body'));
                accordionItem.removeClass('accordion-arrow-active');
                $(this).parent().addClass('accordion-arrow-active');
            });
        });
    };

    /* - Magnific Popup
    *
    * Includes a initialization of the popup gallery
    *
    *  */
    const magnificPopupInit = () => {
        $('.image-gallery').magnificPopup({
            delegate: '.gallery-item',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-custom-arrow mfp-arrow mfp-arrow-%dir%"><i class="icofont-long-arrow-right"></i></button>'
            },
            image: {
                titleSrc: 'title'
            },
            mainClass: 'mfp-fade',
            type: 'image'
        });
    };

    /* - Navigation Validate
    *
    * Includes a handler for different types of navigation.
    * Handler creates padding from the top of page depending
    * on the height of the navigation bar
    *
    *  */
    const navigationValidateInit = () => {
        root.style.setProperty('--navigation-mobile-offset', '100px');
        if (navigation.hasClass('navigation-type-1')) {
            root.style.setProperty('--navigation-offset', '100px');
        } else if (navigation.hasClass('navigation-type-2')) {
            root.style.setProperty('--navigation-offset', '100px');
        } else if (navigation.hasClass('navigation-type-3')) {
            root.style.setProperty('--navigation-offset', '100px');
        }
    };

    /* - Grid Fixed Height
    *
    * Includes a grid item handler that makes their height equal
    * to the width, creating squares
    *
    *  */
    const gridFixHeightInit = () => {
        let grid = $('.grid-fix-height');
        if (grid.length) {
            let items = grid.find('.grid-item'),
                itemSize = () => {
                    items.css('height', `${items.outerWidth()}px`);
                };
            itemSize();
            win.resize(() => {
                itemSize();
            });
        }
    };

    /* 1.3 Declaration of general classes */

    // - Hero Slider Shape [Interface]
    class HERO_SLIDER_SHAPE {
        constructor() {
            this.slider = $('.hero-slider-shape');
            this.slide = this.slider.find('.slide');
            this.length = this.slide.length;
            this.counter = this.slider.find('.counter-slider');
            this.navigation = this.slider.find('.slider-navigation');
            this.upButton = this.navigation.find('.up-button');
            this.button = this.navigation.find('.button');
            this.downButton = this.slider.find('.down-button');
            this.current = this.counter.find('.current');
            this.max = this.counter.find('.max');
            this.divider = this.counter.find('.divider');
            this.pagination = this.counter.find('.pagination');
            this.partWidth = this.divider.outerWidth() / this.length;
            this.startWidth = this.partWidth;
        }

        _checkActive() {
            this.button.removeClass('disable-button');
            if ($(this.slider).find('.active-slide').index() === 0) {
                this.upButton.addClass('disable-button');
            }
            if ($(this.slider).find('.active-slide').index() + 1 === this.length) {
                this.downButton.addClass('disable-button');
            }
        }

        _upAnimation() {
            TweenMax.to(this.slider.find('.active-slide'), 0.7, {
                transform: 'translateY(100%)',
                ease: Power3.easeInOut,
                onStart: () => {
                    this.button.css('pointer-events', 'none');
                },
                onComplete: () => {
                    this.button.css('pointer-events', 'auto');
                }
            });
            TweenMax.to(this.slider.find('.active-slide').prev(), 0.7, {
                transform: 'translateY(0)',
                ease: Power3.easeInOut
            });
            $(this.slider).find('.active-slide').prev().addClass('active-slide');
            $(this.slider).find('.active-slide').next().removeClass('active-slide');
        }

        _downAnimation() {
            TweenMax.to(this.slider.find('.active-slide'), 0.7, {
                transform: 'translateY(-100%)',
                ease: Power3.easeInOut,
                onStart: () => {
                    this.button.css('pointer-events', 'none');
                },
                onComplete: () => {
                    this.button.css('pointer-events', 'auto');
                }
            });
            TweenMax.to(this.slider.find('.active-slide').next(), 0.7, {
                transform: 'translateY(0)',
                ease: Power3.easeInOut
            });
            $(this.slider).find('.active-slide').next().addClass('active-slide');
            $(this.slider).find('.active-slide').prev().removeClass('active-slide');
        }

        _handler() {
            this.max.append(this.slide.length);
            this._checkActive();
            this.upButton.on('click', () => {
                this._upAnimation();
                this._checkActive();
                this._set_counter();
                this.startWidth -= this.partWidth;
                this._progress(this.startWidth);
            });
            this.downButton.on('click', () => {
                this._downAnimation();
                this._checkActive();
                this._set_counter();
                this.startWidth += this.partWidth;
                this._progress(this.startWidth);
            });
        }

        _set_counter() {
            TweenMax.to(this.current, 0.15, {
                opacity: 0.3,
                transform: 'translateY(10px)',
                ease: Expo.ease,
                onComplete: () => {
                    TweenMax.to(this.current, 0.07, {
                        opacity: 1,
                        transform: 'translateY(0)',
                        ease: Expo.ease,
                    });
                    this.current.text('');
                    this.current.append($(this.slider).find('.active-slide').index() + 1);
                }
            });
        }

        _progress(width) {
            TweenMax.to(this.pagination, 0.4, {
                width: `${width}px`,
                ease: Expo.ease
            });
        }

        init() {
            this.current.append($(this.slider).find('.active-slide').index() + 1);
            this._handler();
            this._progress(this.startWidth);
        }
    }

    // - Hero Slider Full Width [Interface]
    class HERO_SLIDER_FULL_WIDTH {
        constructor() {
            this.slider = $('.hero-full-width-slider');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.hero-full-width-slider .swiper-container';
            this.swiperPagination = '.hero-full-width-slider .swiper-pagination';
            this.slideImage = this.slider.find('.background-image');
            this.slideImageInner = this.slideImage.find('.inner-image');
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                slidesPerView: 3,
                speed: 600,
                centeredSlides: true,
                grabCursor: true,
                pagination: {
                    el: this.swiperPagination,
                    clickable: true,
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 1,
                    },
                },
            });
            swiper.on('slideChange', () => {
                $('.active-image').removeClass('active-image');
                $(this.slideImageInner[swiper.activeIndex]).addClass('active-image');
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Hero Slider Multiple [Interface]
    class HERO_SLIDER_MULTIPLE {
        constructor() {
            this.slider = $('.hero-slider-multiple');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.hero-slider-multiple .swiper-container';
            this.swiperNavigationNext = '.hero-slider-multiple .swiper-button-custom-next';
            this.swiperNavigationPrev = '.hero-slider-multiple .swiper-button-custom-prev';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                slidesPerView: 5,
                speed: 300,
                spaceBetween: 30,
                loop: true,
                grabCursor: true,
                breakpoints: {
                    1600: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 1,
                    }
                },
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Hero Slider Parallax [Interface]
    class HERO_SLIDER_PARALLAX {
        constructor() {
            this.slider = $('.hero-slider-parallax');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.hero-slider-parallax .swiper-container';
            this.swiperNavigationNext = '.hero-slider-parallax .swiper-button-custom-next';
            this.swiperNavigationPrev = '.hero-slider-parallax .swiper-button-custom-prev';
            this.swiperPagination = '.hero-slider-parallax .swiper-pagination-count';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                slidesPerView: 1,
                speed: 600,
                direction: 'vertical',
                loop: true,
                grabCursor: true,
                pagination: {
                    el: this.swiperPagination,
                    type: 'fraction',
                },
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Hero Slider Carousel [Interface]
    class HERO_SPLIT_CAROUSEL {
        constructor() {
            this.carousel = $('.hero-split-carousel');
            this.slide = this.carousel.find('.slide');
            this.navigation = this.carousel.find('.carousel-navigation');
            this.scrollButton = this.navigation.find('.scroll-button');
            this.scrollUpButton = this.navigation.find('.scroll-up');
            this.scrollDownButton = this.navigation.find('.scroll-down');
            this.length = this.slide.length;
        }

        _checkActive() {
            this.scrollButton.removeClass('disable-button');
            if ($(this.carousel).find('.active-slide').index() === 0) {
                this.scrollUpButton.addClass('disable-button');
            }
            if ($(this.carousel).find('.active-slide').index() + 1 === this.length) {
                this.scrollDownButton.addClass('disable-button');
            }
        }

        _scrollUpAnimation() {
            let transformValues = new Array(2),
                resize = () => {
                    if (sizes.w >= 1025) {
                        transformValues[0] = 'translateY(100%)';
                        transformValues[1] = 'translateY(0)';
                    } else {
                        transformValues[0] = 'translateX(100%)';
                        transformValues[1] = 'translateX(0)';
                    }
                };
            resize();
            win.resize(() => {
                resize();
            });
            TweenMax.staggerTo($(this.carousel).find('.active-slide').children(), 0.8, {
                transform: transformValues[0],
                ease: Power3.easeInOut,
                onStart: () => {
                    this.scrollButton.css('pointer-events', 'none');
                },
                onComplete: () => {
                    this.scrollButton.css('pointer-events', 'auto');
                }
            }, 0.04);
            TweenMax.staggerTo($(this.carousel).find('.active-slide').prev().children(), 0.8, {
                transform: transformValues[1],
                ease: Power3.easeInOut
            }, 0.04);
            $(this.carousel).find('.active-slide').prev().addClass('active-slide');
            $(this.carousel).find('.active-slide').next().removeClass('active-slide');
            this._checkActive();
        }

        _scrollDownAnimation() {
            let transformValues = new Array(2),
                resize = () => {
                    if (sizes.w >= 1025) {
                        transformValues[0] = 'translateY(-100%)';
                        transformValues[1] = 'translateY(0)';
                    } else {
                        transformValues[0] = 'translateX(-100%)';
                        transformValues[1] = 'translateX(0)';
                    }
                };
            resize();
            win.resize(() => {
                resize();
            });
            TweenMax.staggerTo($(this.carousel).find('.active-slide').children(), 0.8, {
                transform: transformValues[0],
                ease: Power3.easeInOut,
                onStart: () => {
                    this.scrollButton.css('pointer-events', 'none');
                },
                onComplete: () => {
                    this.scrollButton.css('pointer-events', 'auto');
                }
            }, 0.04);
            TweenMax.staggerTo($(this.carousel).find('.active-slide').next().children(), 0.8, {
                transform: transformValues[1],
                ease: Power3.easeInOut
            }, 0.04);
            $(this.carousel).find('.active-slide').next().addClass('active-slide');
            $(this.carousel).find('.active-slide').prev().removeClass('active-slide');
            this._checkActive();
        }

        _carouselHandler() {
            $(this.slide[0]).addClass('active-slide');
            this._checkActive();
            this.scrollDownButton.on('click', () => {
                this._scrollDownAnimation();
            });
            this.scrollUpButton.on('click', () => {
                this._scrollUpAnimation();
            });
            let tabletTrigger = false,
                computerTrigger = false;
            if (sizes.w >= 1025) {
                computerTrigger = true;
            } else {
                tabletTrigger = true;
            }
            let resize = () => {
                if (sizes.w >= 1025 && tabletTrigger) {
                    for (let i = 0; i < $(this.carousel).find('.active-slide').index(); i++) {
                        TweenMax.staggerTo($(this.slide[i]).children(), 0, {
                            transform: 'translateY(-100%) translateX(0)',
                        }, 0);
                    }
                    tabletTrigger = false;
                    computerTrigger = true;
                }
                if (sizes.w < 1025 && computerTrigger) {
                    for (let i = 0; i < $(this.carousel).find('.active-slide').index(); i++) {
                        TweenMax.staggerTo($(this.slide[i]).children(), 0, {
                            transform: 'translateY(0) translateX(-100%)',
                        }, 0);
                    }
                    computerTrigger = false;
                    tabletTrigger = true;
                }
            };
            win.resize(() => {
                resize();
            });
        }

        init() {
            this._carouselHandler();
        }
    }

    // - Hero Scene Image Hover Gallery [Interface]
    class HERO_SCENE_IMAGE_HOVER_GALLERY {
        constructor() {
            this.scene = $('.hero-image-hover-gallery');
            this.sceneImage = this.scene.find('.image-wrapper');
            this.sceneImageInner = this.sceneImage.find('.inner-image');
            this.imagesLinks = this.scene.find('.images-links').children();
        }

        _imageHover() {
            let images = this.sceneImageInner,
                links = this.imagesLinks,
                timer;
            links.children().on('mouseenter', function () {
                let index = $(this).parent().index();
                links.not($(this).parent()).addClass('disable-link');
                timer = setTimeout(() => {
                    images.not($(images[index])).removeClass('active-image');
                    $(images[index]).addClass('active-image');
                }, 500);
            }).on('mouseleave', function () {
                links.removeClass('disable-link');
                clearTimeout(timer);
            });
        }

        init() {
            this._imageHover();
        }
    }

    // - Testimonials Slider type 1 [Interface]
    class TESTIMONIALS_SLIDER_1 {
        constructor() {
            this.slider = $('.testimonials-slider-type-1');
            this.slidesWrapper = this.slider.find('.slides-wrapper');
            this.slide = this.slider.find('.slide');
            this.length = this.slide.length;
            this.navigation = this.slider.find('.slider-navigation');
            this.button = this.navigation.find('.slider-button');
            this.buttonUp = this.navigation.find('.slider-button-up');
            this.buttonDown = this.navigation.find('.slider-button-down');
            this.slideIndex = 1;
        }

        _rescale(index) {
            this.button.removeClass('disable-button');
            TweenMax.to($(this.slide).not($(this.slide[index])), 0.6, {
                transform: 'scale(0.9)',
                className: '-=active-slide',
                pointerEvents: 'none',
                opacity: 0.6,
                ease: Power3.easeInOut
            });
            TweenMax.to($(this.slide[index]), 0.6, {
                transform: 'scale(1)',
                className: '+=active-slide',
                pointerEvents: 'auto',
                opacity: 1,
                ease: Power3.easeInOut
            });
        }

        _downAnimation() {
            this.button.css('pointer-events', 'none');
            TweenMax.to(this.slidesWrapper, 0.6, {
                y: '-=265',
                ease: Power3.easeInOut,
                onComplete: () => {
                    this.button.css('pointer-events', 'auto');
                }
            });
            this.slideIndex++;
            this._rescale(this.slideIndex);
            if (this.slideIndex === this.length - 1) {
                this.buttonDown.addClass('disable-button');
            }
        }

        _upAnimation() {
            this.button.css('pointer-events', 'none');
            TweenMax.to(this.slidesWrapper, 0.6, {
                y: '+=265',
                ease: Power3.easeInOut,
                onComplete: () => {
                    this.button.css('pointer-events', 'auto');
                }
            });
            this.slideIndex--;
            this._rescale(this.slideIndex);
            if (this.slideIndex === 0) {
                this.buttonUp.addClass('disable-button');
            }
        }

        _handler() {
            this.buttonUp.on('click', () => {
                if (this.slideIndex > 0) {
                    this._upAnimation();
                }
            });
            this.buttonDown.on('click', () => {
                if (this.slideIndex < this.length - 1) {
                    this._downAnimation();
                }
            });
        }

        init() {
            this._rescale(this.slideIndex);
            this._handler();
        }
    }

    // - Testimonials Slider type 2 [Interface]
    class TESTIMONIALS_SLIDER_2 {
        constructor() {
            this.slider = $('.testimonials-slider-type-2');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.testimonials-slider-type-2 .swiper-container';
            this.swiperNavigationNext = '.testimonials-slider-type-2 .swiper-button-custom-next';
            this.swiperNavigationPrev = '.testimonials-slider-type-2 .swiper-button-custom-prev';
            this.swiperPagination = '.testimonials-slider-type-2 .swiper-pagination';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                slidesPerView: 3,
                spaceBetween: 30,
                speed: 600,
                loop: true,
                grabCursor: true,
                pagination: {
                    el: this.swiperPagination,
                    clickable: true,
                },
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 1,
                    }
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Testimonials Slider type 3 [Interface]
    class TESTIMONIALS_SLIDER_3 {
        constructor() {
            this.slider = $('.testimonials-slider-type-3');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.testimonials-slider-type-3 .swiper-container';
            this.swiperPagination = '.testimonials-slider-type-3 .swiper-pagination';
            this.swiperNavigationNext = '.testimonials-slider-type-3 .swiper-button-custom-next';
            this.swiperNavigationPrev = '.testimonials-slider-type-3 .swiper-button-custom-prev';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                slidesPerView: 3,
                spaceBetween: 30,
                speed: 500,
                loop: true,
                grabCursor: true,
                pagination: {
                    el: this.swiperPagination,
                    clickable: true,
                },
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 1,
                    }
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Testimonials Slider type 4 [Interface]
    class TESTIMONIALS_SLIDER_4 {
        constructor() {
            this.slider = $('.testimonials-slider-type-4');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.testimonials-slider-type-4 .swiper-container';
            this.swiperNavigationNext = '.testimonials-slider-type-4 .swiper-button-custom-next';
            this.swiperNavigationPrev = '.testimonials-slider-type-4 .swiper-button-custom-prev';
            this.swiperPagination = '.testimonials-slider-type-4 .swiper-pagination-count';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                centeredSlides: true,
                slidesPerView: 1,
                speed: 250,
                loop: true,
                grabCursor: true,
                pagination: {
                    el: this.swiperPagination,
                    type: 'fraction',
                },
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Team Slider type 1 [Interface]
    class TEAM_SLIDER_1 {
        constructor() {
            this.slider = $('.team-member-slider-type-1');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.team-member-slider-type-1 .swiper-container';
            this.swiperPagination = '.team-member-slider-type-1 .swiper-pagination';
            this.swiperNavigationNext = '.team-member-slider-type-1 .swiper-button-custom-next';
            this.swiperNavigationPrev = '.team-member-slider-type-1 .swiper-button-custom-prev';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 30,
                speed: 200,
                loop: true,
                grabCursor: true,
                pagination: {
                    el: this.swiperPagination,
                    clickable: true,
                },
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
                breakpoints: {
                    1440: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 1,
                    }
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Team Slider type 2 [Interface]
    class TEAM_SLIDER_2 {
        constructor() {
            this.slider = $('.team-member-slider-type-2');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.team-member-slider-type-2 .swiper-container';
            this.swiperPagination = '.team-member-slider-type-2 .swiper-pagination';
            this.swiperNavigationNext = '.team-member-slider-type-2 .swiper-button-custom-next';
            this.swiperNavigationPrev = '.team-member-slider-type-2 .swiper-button-custom-prev';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                slidesPerView: 3,
                spaceBetween: 30,
                speed: 400,
                loop: true,
                grabCursor: true,
                pagination: {
                    el: this.swiperPagination,
                    clickable: true,
                },
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 1,
                    }
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Posts Slider type 1 [Interface]
    class POSTS_SLIDER_TYPE_1 {
        constructor() {
            this.slider = $('.posts-slider-type-1');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.posts-slider-type-1 .swiper-container';
            this.swiperPagination = '.posts-slider-type-1 .swiper-pagination';
            this.swiperNavigationNext = '.posts-slider-type-1 .swiper-button-custom-next';
            this.swiperNavigationPrev = '.posts-slider-type-1 .swiper-button-custom-prev';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                slidesPerView: 4,
                spaceBetween: 30,
                speed: 250,
                loop: true,
                grabCursor: true,
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
                pagination: {
                    el: this.swiperPagination,
                    clickable: true,
                },
                breakpoints: {
                    1440: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 1,
                    }
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Posts Slider type 2 [Interface]
    class POSTS_SLIDER_TYPE_2 {
        constructor() {
            this.slider = $('.posts-slider-type-2');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.posts-slider-type-2 .swiper-container';
            this.swiperPagination = '.posts-slider-type-2 .swiper-pagination';
            this.swiperNavigationNext = '.posts-slider-type-2 .swiper-button-custom-next';
            this.swiperNavigationPrev = '.posts-slider-type-2 .swiper-button-custom-prev';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                speed: 500,
                loop: true,
                effect: 'fade',
                grabCursor: true,
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
                pagination: {
                    el: this.swiperPagination,
                    clickable: true,
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Posts Slider type 3 [Interface]
    class POSTS_SLIDER_TYPE_3 {
        constructor() {
            this.slider = $('.posts-slider-type-3');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.posts-slider-type-3 .swiper-container';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                speed: 300,
                slidesPerView: 3,
                spaceBetween: 30,
                loop: true,
                grabCursor: true,
                breakpoints: {
                    1024: {
                        slidesPerView: 2,
                    },
                    576: {
                        slidesPerView: 1,
                    }
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Posts Slider type 4 [Interface]
    class POSTS_SLIDER_TYPE_4 {
        constructor() {
            this.slider = $('.posts-slider-type-4');
            this.slide = this.slider.find('.swiper-slide');
            this.swiperContainer = '.posts-slider-type-4 .swiper-container';
            this.swiperPagination = '.posts-slider-type-4 .swiper-pagination';
            this.swiperNavigationNext = '.posts-slider-type-4 .swiper-button-custom-next';
            this.swiperNavigationPrev = '.posts-slider-type-4 .swiper-button-custom-prev';
        }

        _swiperSlider() {
            let swiper = new Swiper(this.swiperContainer, {
                speed: 300,
                slidesPerView: 4,
                spaceBetween: 30,
                loop: true,
                grabCursor: true,
                navigation: {
                    nextEl: this.swiperNavigationNext,
                    prevEl: this.swiperNavigationPrev,
                },
                pagination: {
                    el: this.swiperPagination,
                    clickable: true,
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 2,
                    },
                    576: {
                        slidesPerView: 1,
                    }
                },
            });
        }

        init() {
            this._swiperSlider();
        }
    }

    // - Navigation type 1 [Interface]
    class NAVIGATION_TYPE_1 {
        constructor() {
            this.navigation = $('.navigation-type-1');
            this.navigationToggle = this.navigation.find('.menu-toggle-wrapper');
            this.navigationToggleClose = this.navigation.find('.menu-panel-close-wrapper');
            this.navigationPanel = this.navigation.find('.navigation-panel');
            this.menuList = this.navigation.find('.menu-list');
            this.menuItemHasChildren = this.navigation.find('.menu-item-has-children');
            this.menuItemCurrent = this.navigation.find('.current-menu-item');
            this.menuImage = this.navigation.find('.menu-image');
            this.menuList.children('.menu-item').addClass('menu-item-parent');
            this.menuParent = $('.menu-item-parent');
            this.subMenu = this.menuList.find('.sub-menu');
            this.searchToggle = this.navigation.find('.search-toggle');
            this.searchCloseToggle = this.navigation.find('.search-form-close');
            this.searchForm = this.navigation.find('.search-form');
        }

        _subMenu() {
            let animItems = (items) => {
                    TweenMax.staggerTo(items, 0.35, {
                        transform: 'translateY(0)',
                        opacity: 1,
                        pointerEvents: 'auto',
                        ease: Power3.ease,
                    }, 0.06);
                },
                hideItems = (items) => {
                    TweenMax.staggerTo(items, 0.35, {
                        transform: 'translateY(-50px)',
                        opacity: 0,
                        pointerEvents: 'none',
                        ease: Power3.ease,
                    }, 0.06);
                };
            $(this.menuList.children('.menu-item-has-children')).each(function () {
                let childrenCount = $(this).find('.menu-item').length;
                if (childrenCount > 0) {
                    $(this).children('a').append('<span class="children-count">' + childrenCount + '</span>');
                }
            });
            this.menuParent.on('mouseenter', function () {
                animItems($(this).find('.active-list').addClass('active-list-secondary').children('.menu-item').children('a'));
            }).on('mouseleave', function () {
                $(this).closest('.menu-item-parent').find('.sub-menu').removeClass('active-list-secondary');
                hideItems($(this).find('.active-list').children('.menu-item').children('a'));
            });
            this.menuItemHasChildren.children('a').addClass('menu-item-has-children-link');
            this.menuParent.children('.sub-menu').addClass('active-list').children('.menu-item-has-children').children('.sub-menu').prepend(`<li class="menu-item menu-item-back"><a><i class="icofont-long-arrow-left"></i><span>${this.navigation.find('.menu-list-wrapper').data('back-link')}</span></a></li>`);
            this.menuList.addClass('active-list');
            this.menuParent.find('.menu-item-has-children').children('a').on('click', function (e) {
                e.preventDefault();
                let $this = $(this),
                    activeList = $this.closest('.menu-item-parent').find('.active-list');
                activeList.removeClass('active-list');
                $this.parent().children('.sub-menu').addClass('active-list');
                hideItems(activeList.children().children('a'));
                animItems($this.closest('.menu-item-parent').find('.active-list').children().children('a'));
            });
            this.subMenu.find('.menu-item-back').children('a').on('click', function (e) {
                e.preventDefault();
                let $this = $(this),
                    activeList = $this.closest('.menu-item-parent').find('.active-list');
                hideItems(activeList.children().children('a'));
                activeList.removeClass('active-list');
                $(this).closest('.sub-menu').parent().parent().addClass('active-list');
                animItems($this.closest('.menu-item-parent').find('.active-list').children().children('a'));
            });
        }

        _menuItemImage() {
            let menuImage = this.menuImage;
            $(this.menuParent).each(function () {
                let currentImage = $(this).data('menu-image');
                menuImage.append('<div class="slide" style="background-image: url(' + currentImage + ')"></div>');
            });
            let slides = menuImage.children('.slide'),
                index,
                oldIndex;
            if (this.menuItemCurrent.hasClass('menu-item-parent')) {
                index = $(this.menuItemCurrent).index();
            } else {
                index = $(this.menuItemCurrent).closest('.menu-item-parent').index();
            }
            $(slides[index]).addClass('active-slide');
            this.menuParent.on('mouseenter', function () {
                if ($(this).index() !== index) {
                    index = $(this).index();
                    $(slides).removeClass('active-slide');
                    $(slides[index]).addClass('active-slide');
                }
            }).on('mouseleave', function () {

            });
        }

        _menuAppear() {
            let animationHide = () => {
                    TweenMax.staggerTo($(this.menuParent.children('a')), 0.5, {
                        opacity: 0,
                        y: -30,
                        pointerEvents: 'none',
                        ease: Expo.easeInOut,
                        onStart: () => {
                            $(this.menuParent.children('a')).css('transition', 'unset');
                        }
                    }, 0.06);
                    TweenMax.to($(this.menuImage), 0.8, {
                        transform: 'translateX(100%)',
                        ease: Expo.easeInOut
                    });
                    TweenMax.to($(this.menuImage), 0.8, {
                        transform: 'translateX(100%)',
                        ease: Expo.easeInOut
                    });
                    TweenMax.to($(this.navigationToggleClose), 0.8, {
                        opacity: 0,
                        transform: 'translateY(50px)',
                        pointerEvents: 'auto',
                        ease: Expo.easeInOut
                    });
                },
                animationShow = () => {
                    TweenMax.staggerTo($(this.menuParent.children('a')), 0.5, {
                        opacity: 1,
                        y: 0,
                        pointerEvents: 'auto',
                        ease: Expo.easeInOut,
                    }, 0.06, () => {
                        $(this.menuParent.children('a')).css('transition', 'all .3s ease-in');
                    });
                    TweenMax.to($(this.menuImage), 0.8, {
                        transform: 'translateX(0)',
                        ease: Expo.easeInOut
                    });
                    TweenMax.to($(this.navigationToggleClose), 0.8, {
                        opacity: 1,
                        transform: 'translateY(0)',
                        pointerEvents: 'auto',
                        ease: Expo.easeInOut
                    });
                };
            animationHide();
            this.navigationToggle.on('click', () => {
                TweenMax.to(this.navigationPanel, 0.6, {
                    opacity: 1,
                    pointerEvents: 'auto',
                    ease: Expo.easeInOut
                });
                animationShow();
            });
            this.navigationToggleClose.on('click', () => {
                animationHide();
                TweenMax.to(this.navigationPanel, 0.6, {
                    delay: 0.5,
                    opacity: 0,
                    pointerEvents: 'none',
                    ease: Expo.easeInOut
                });
            });
        }

        _searchForm() {
            this.searchToggle.on('click', () => {
                TweenMax.to(this.searchForm, 0.6, {
                    transform: 'translateY(0)',
                    ease: Expo.easeInOut
                }).play();
            });
            this.searchCloseToggle.on('click', () => {
                TweenMax.to(this.searchForm, 0.6, {
                    transform: 'translateY(-100%)',
                    ease: Expo.easeInOut
                }).play();
            });
            $(doc).keyup((e) => {
                if (e.key === "Escape") {
                    TweenMax.to(this.searchForm, 0.6, {
                        transform: 'translateY(-100%)',
                        ease: Expo.easeInOut
                    }).play();
                }
            });
        }

        init() {
            this._subMenu();
            this._menuAppear();
            this._menuItemImage();
            this._searchForm();
        }
    }

    // - Navigation type 2 [Interface]
    class NAVIGATION_TYPE_2 {
        constructor() {
            this.navigation = $('.navigation-type-2');
            this.menuList = this.navigation.find('.menu-list');
            this.itemsHasChildren = this.navigation.find('.menu-item-has-children');
            this.itemsHasMegamenu = this.navigation.find('.menu-item-has-megamenu');
            this.searchToggle = this.navigation.find('.search-toggle');
            this.searchCloseToggle = this.navigation.find('.search-form-close');
            this.searchForm = this.navigation.find('.search-form');
        }

        _subMenu() {
            this.itemsHasChildren.children('a').addClass('menu-item-has-children-link');
            $(this.itemsHasMegamenu).each(function () {
                let height = $(this).children('.sub-menu').outerHeight(true),
                    width = 100 / $(this).children('.sub-menu').children('.menu-item').length;
                $(this).children('.sub-menu').children('.menu-item').css({
                    'width': width + '%',
                    'min-width': width + '%',
                    'height': height + 'px'
                });
            });
            this.itemsHasChildren.on('mouseenter', function () {
                let subMenu = $(this).children('.sub-menu');
                TweenMax.to(subMenu, 0.25, {
                    transform: 'translateY(0)',
                    opacity: 1,
                    pointerEvents: 'auto',
                    className: "+=active-sub-menu",
                    ease: Elastic,
                }).play();
            }).on('mouseleave', function () {
                let subMenu = $(this).children('.sub-menu');
                TweenMax.to(subMenu, 0.25, {
                    transform: 'translateY(10px)',
                    opacity: 0,
                    pointerEvents: 'none',
                    className: "-=active-sub-menu",
                    ease: Elastic,
                }).play();
            });
        }

        _searchForm() {
            this.searchToggle.on('click', () => {
                TweenMax.to(this.searchForm, 0.6, {
                    transform: 'translateY(0)',
                    ease: Expo.easeInOut
                }).play();
            });
            this.searchCloseToggle.on('click', () => {
                TweenMax.to(this.searchForm, 0.6, {
                    transform: 'translateY(-100%)',
                    ease: Expo.easeInOut
                }).play();
            });
            $(doc).keyup((e) => {
                if (e.key === "Escape") {
                    TweenMax.to(this.searchForm, 0.6, {
                        transform: 'translateY(-100%)',
                        ease: Expo.easeInOut
                    }).play();
                }
            });
        }

        init() {
            this._subMenu();
            this._searchForm();
        }
    }

    // - Navigation type 3 [Interface]
    class NAVIGATION_TYPE_3 {
        constructor() {
            this.navigation = $('.navigation-type-3');
            this.navigationToggle = this.navigation.find('.menu-toggle-wrapper');
            this.navigationToggleClose = this.navigation.find('.menu-panel-close-wrapper');
            this.navigationPanel = this.navigation.find('.navigation-panel');
            this.menuList = this.navigation.find('.menu-list');
            this.menuItemHasChildren = this.navigation.find('.menu-item-has-children');
            this.menuItemCurrent = this.navigation.find('.current-menu-item');
            this.menuList.children('.menu-item').addClass('menu-item-parent');
            this.menuParent = this.menuList.find('.menu-item-parent');
            this.subMenu = this.menuList.find('.sub-menu');
            this.searchForm = this.navigation.find('.search-form');
            this.searchFormToggle = this.navigation.find('.search-toggle-wrapper');
            this.searchFormWrapper = this.searchForm.find('.form-wrapper');
            this.searchFormToggleClose = this.searchForm.find('.form-close-wrapper');
        }

        _subMenu() {
            this.menuItemHasChildren.children('a').addClass('menu-item-has-children-link');
            $(this.menuParent).each(function () {
                $(this).children('a').append('<span class="menu-item-subtitle">' + $(this).data('menu-subtitle') + '</span>');
            });
            this.subMenu.prepend(`<li class="menu-item menu-item-back"><a><i class="icofont-long-arrow-left"></i><span>${this.navigation.find('.menu-list-wrapper').data('back-link')}</span></a></li>`);
            this.menuList.addClass('active-list');
            let navigation = this.navigation,
                animItems = (items) => {
                    TweenMax.staggerTo(items, 0.45, {
                        transform: 'translateY(0)',
                        opacity: 1,
                        pointerEvents: 'auto',
                        ease: Power3.easeInOut
                    }, 0.06);
                },
                hideItems = (items) => {
                    TweenMax.staggerTo(items, 0.45, {
                        transform: 'translateY(-30px)',
                        opacity: 0,
                        pointerEvents: 'none',
                        ease: Power3.easeInOut
                    }, 0.06);
                };
            this.menuItemHasChildren.children('a').on('click', function (e) {
                e.preventDefault();
                let $this = $(this),
                    activeList = navigation.find('.active-list');
                activeList.removeClass('active-list');
                $this.parent().children('.sub-menu').addClass('active-list');
                hideItems(activeList.children().children('a'));
                animItems(navigation.find('.active-list').children().children('a'));
            });
            this.subMenu.find('.menu-item-back').children('a').on('click', function (e) {
                e.preventDefault();
                let $this = $(this),
                    activeList = navigation.find('.active-list');
                hideItems(activeList.children().children('a'));
                activeList.removeClass('active-list');
                $(this).closest('.sub-menu').parent().parent().addClass('active-list');
                animItems(navigation.find('.active-list').children().children('a'));
            });
        }

        _menuAppear() {
            let animationHide = () => {
                    this.menuList.removeClass('active-menu');
                    TweenMax.staggerTo($(this.navigation).find('.active-list').children().children('a'), 0.5, {
                        opacity: 0,
                        transform: 'translateY(-30px)',
                        pointerEvents: 'none',
                        ease: Power3.easeInOut
                    }, 0.06);
                    TweenMax.to($(this.navigationToggleClose), 0.8, {
                        opacity: 0,
                        transform: 'translateY(25px)',
                        pointerEvents: 'auto',
                        ease: Expo.easeInOut
                    });
                },
                animationShow = () => {
                    this.menuList.addClass('active-menu');
                    TweenMax.staggerTo($(this.navigation).find('.active-list').children().children('a'), 0.5, {
                        opacity: 1,
                        transform: 'translateY(0)',
                        pointerEvents: 'auto',
                        ease: Power3.easeInOut
                    }, 0.06);
                    TweenMax.to($(this.navigationToggleClose), 0.8, {
                        opacity: 1,
                        transform: 'translateY(0)',
                        pointerEvents: 'auto',
                        ease: Expo.easeInOut
                    });
                };
            this.navigationToggle.on('click', () => {
                TweenMax.to(this.navigationPanel, 0.6, {
                    opacity: 1,
                    pointerEvents: 'auto',
                    ease: Expo.easeInOut
                });
                animationShow();
            });
            this.navigationToggleClose.on('click', () => {
                animationHide();
                TweenMax.to(this.navigationPanel, 0.6, {
                    delay: 0.5,
                    opacity: 0,
                    pointerEvents: 'none',
                    ease: Expo.easeInOut
                });
            });
        }

        _searchForm() {
            let animationHide = () => {
                    TweenMax.to($(this.searchFormToggleClose), 0.6, {
                        opacity: 0,
                        transform: 'translateY(25px)',
                        pointerEvents: 'none',
                        ease: Expo.easeInOut
                    });
                    TweenMax.to($(this.searchFormWrapper), 0.6, {
                        delay: 0.15,
                        opacity: 0,
                        transform: 'translateY(40px)',
                        pointerEvents: 'none',
                        ease: Expo.easeInOut
                    });
                },
                animationShow = () => {
                    TweenMax.to($(this.searchFormToggleClose), 0.6, {
                        opacity: 1,
                        transform: 'translateY(0)',
                        pointerEvents: 'auto',
                        ease: Expo.easeInOut
                    });
                    TweenMax.to($(this.searchFormWrapper), 0.6, {
                        delay: 0.15,
                        opacity: 1,
                        transform: 'translateY(0)',
                        pointerEvents: 'auto',
                        ease: Expo.easeInOut
                    });
                };
            this.searchFormToggle.on('click', () => {
                animationShow();
                TweenMax.to(this.searchForm, 0.6, {
                    opacity: 1,
                    pointerEvents: 'auto',
                    ease: Expo.easeInOut
                });
            });
            this.searchFormToggleClose.on('click', () => {
                animationHide();
                TweenMax.to(this.searchForm, 0.6, {
                    delay: 0.5,
                    opacity: 0,
                    pointerEvents: 'none',
                    ease: Expo.easeInOut
                });
            });
        }

        init() {
            this._subMenu();
            this._menuAppear();
            this._searchForm();
        }
    }

    // - Navigation type mobile [Interface]
    class NAV_TYPE_MOBILE {
        constructor() {
            this.navigation = navigationMobile;
            this.menuList = this.navigation.find('.menu-list');
            this.subMenus = this.navigation.find('.sub-menu');
            this.itemsHasChildren = this.navigation.find('.menu-item-has-children,.menu-item-object-category');
            this.toggle = this.navigation.find('.menu-toggle');
            this.toggleClose = this.navigation.find('.menu-toggle-close');
            this.menuPanel = this.navigation.find('.menu-list-wrapper');
            this.searchToggle = this.navigation.find('.search-form-toggle');
            this.searchCloseToggle = this.navigation.find('.search-form-close');
            this.searchFormWrapper = this.navigation.find('.search-form-wrapper');
        }

        _searchForm() {
            this.searchToggle.on('click', () => {
                TweenMax.to(this.searchFormWrapper, 0.8, {
                    transform: 'translateY(0)',
                    ease: Expo.easeInOut
                }).play();
            });
            this.searchCloseToggle.on('click', () => {
                TweenMax.to(this.searchFormWrapper, 0.8, {
                    transform: 'translateY(-100%)',
                    ease: Expo.easeInOut
                }).play();
            });
        }

        _subMenu() {
            this.itemsHasChildren.children('a').addClass('menu-item-has-children-link');
            this.subMenus.prepend(`<li class="menu-item menu-item-back"><a><i class="icofont-long-arrow-left"></i><span>${this.navigation.find('.menu-list-wrapper').data('back-link')}</span></a></li>`);
            this.menuList.addClass('active-list');
            let navigation = this.navigation,
                menuItemBack = navigation.find('.menu-item-back'),
                animItems = (items) => {
                    TweenMax.staggerTo(items, 0.4, {
                        transform: 'translateX(0)',
                        opacity: 1,
                        pointerEvents: 'auto',
                        ease: Power3.ease
                    }, 0.08);
                },
                hideItems = (items) => {
                    TweenMax.staggerTo(items, 0.4, {
                        transform: 'translateX(-50px)',
                        opacity: 0,
                        pointerEvents: 'none',
                        ease: Power3.ease,
                    }, 0.08);
                },
                animPanel = TweenMax.to(this.menuPanel, 0.8, {
                    scale: 1,
                    opacity: 1,
                    pointerEvents: 'auto',
                    ease: Expo.easeInOut,
                }).reverse();
            this.toggle.on('click', () => {
                $(this.toggle).addClass('active-toggle');
                animPanel.play();
                TweenMax.to(body, 0, {
                    delay: 0.5,
                    onComplete: () => {
                        if (navigation.find('.active-list').hasClass('category-sub-menu')) {
                            animItems(navigation.find('.active-list').find('.post'));
                        } else {
                            animItems(navigation.find('.active-list').children().children('a'));
                        }
                    }
                });
            });
            this.toggleClose.on('click', () => {
                $(this.toggle).removeClass('active-toggle');
                TweenMax.to(body, 0, {
                    delay: 0.3,
                    onComplete: () => {
                        animPanel.reverse();
                    }
                });
                if (navigation.find('.active-list').hasClass('category-sub-menu')) {
                    hideItems(navigation.find('.active-list').find('.post'));
                } else {
                    hideItems(navigation.find('.active-list').children().children('a'));
                }
            });
            this.itemsHasChildren.children('a').on('click', function (e) {
                e.preventDefault();
                let $this = $(this);
                hideItems(navigation.find('.active-list').children().children('a'));
                navigation.find('.active-list').removeClass('active-list');
                $(this).parent().children('.sub-menu').addClass('active-list');
                TweenMax.to(body, 0, {
                    delay: 0.3,
                    onComplete: () => {
                        animItems(navigation.find('.active-list').children().children('a'));
                    }
                });
            });
            menuItemBack.children('a').on('click', function (e) {
                e.preventDefault();
                let $this = $(this);
                hideItems(navigation.find('.active-list').children().children('a'));
                navigation.find('.active-list').removeClass('active-list');
                $(this).closest('.sub-menu').parent().parent().addClass('active-list');
                TweenMax.to(body, 0, {
                    delay: 0.5,
                    onComplete: () => {
                        animItems(navigation.find('.active-list').children().children('a'));
                    }
                });
            });
        }

        init() {
            this._subMenu();
            this._searchForm();
        }
    }

    // - Tabs [Interface]
    class TABS {
        constructor() {
            this.tabsWrapper = $('.tabs-wrapper');
        }

        _showContent(item, type, body) {
            if (type === 'animation-type-1') {
                TweenMax.to(item, 1, {
                    opacity: 1,
                    transform: 'scale(1)',
                    ease: Expo.easeInOut
                });
            } else if (type === 'animation-type-2') {
                body.css('min-height', `${$(item).outerHeight(true)}px`);
                TweenMax.to(item, 0.75, {
                    opacity: 1,
                    ease: Expo.easeInOut
                });
            } else if (type === 'animation-type-3') {
            } else if (type === 'animation-type-4') {
            }
        }

        _hideContent(item, type) {
            if (type === 'animation-type-1') {
                TweenMax.to(item, 1, {
                    opacity: 0,
                    transform: 'scale(1.1)',
                    ease: Expo.easeInOut
                });
            } else if (type === 'animation-type-2') {
                TweenMax.to(item, 0.75, {
                    opacity: 0,
                    ease: Expo.easeInOut
                });
            } else if (type === 'animation-type-3') {
            } else if (type === 'animation-type-4') {
            }
        }

        _handler() {
            let showContent = this._showContent,
                hideContent = this._hideContent;
            $(this.tabsWrapper).each(function () {
                let $this = $(this),
                    tabsItems = $this.find('.tab-item'),
                    tabBody = $this.find('.tab-body'),
                    tabContent = $this.find('.tab-content'),
                    tabHeader = $this.find('.tab-header'),
                    timer;
                showContent($(tabContent[tabHeader.find('.active-item').index()]), $this.data('tab-animation-type'), tabBody);

                if ($this.data('tab-handler-type') === 'hover') {
                    tabsItems.on('mouseenter', function () {
                        timer = setTimeout(() => {
                            hideContent($(tabContent[tabHeader.find('.active-item').index()]), $this.data('tab-animation-type'));
                            tabsItems.removeClass('active-item');
                            $(this).addClass('active-item');
                            showContent($(tabContent[$(this).index()]), $this.data('tab-animation-type'));
                        }, 200);
                    }).on('mouseleave', function () {
                        clearTimeout(timer);
                    });
                } else if ($this.data('tab-handler-type') === 'click') {
                    tabsItems.on('click', function () {
                        hideContent($(tabContent[tabHeader.find('.active-item').index()]), $this.data('tab-animation-type'));
                        tabsItems.removeClass('active-item');
                        $(this).addClass('active-item');
                        showContent($(tabContent[$(this).index()]), $this.data('tab-animation-type'), tabBody);
                    });
                }
            });
        }

        init() {
            this._handler();
        }
    }

    /* 1.4 Create of general interfaces */
    const hero_slider_shape = new HERO_SLIDER_SHAPE(),
        hero_slider_full_width = new HERO_SLIDER_FULL_WIDTH(),
        hero_slider_multiple = new HERO_SLIDER_MULTIPLE(),
        hero_slider_parallax = new HERO_SLIDER_PARALLAX(),
        hero_split_carousel = new HERO_SPLIT_CAROUSEL(),
        hero_scene_image_hover_gallery = new HERO_SCENE_IMAGE_HOVER_GALLERY(),
        testimonials_slider_1 = new TESTIMONIALS_SLIDER_1(),
        testimonials_slider_2 = new TESTIMONIALS_SLIDER_2(),
        testimonials_slider_3 = new TESTIMONIALS_SLIDER_3(),
        testimonials_slider_4 = new TESTIMONIALS_SLIDER_4(),
        team_slider_1 = new TEAM_SLIDER_1(),
        team_slider_2 = new TEAM_SLIDER_2(),
        posts_slider_1 = new POSTS_SLIDER_TYPE_1(),
        posts_slider_2 = new POSTS_SLIDER_TYPE_2(),
        posts_slider_3 = new POSTS_SLIDER_TYPE_3(),
        posts_slider_4 = new POSTS_SLIDER_TYPE_4(),
        navigation_1 = new NAVIGATION_TYPE_1(),
        navigation_2 = new NAVIGATION_TYPE_2(),
        navigation_3 = new NAVIGATION_TYPE_3(),
        navigation_mobile = new NAV_TYPE_MOBILE(),
        tabs = new TABS();

    /* 1.5 Initializing of general functions / classes */
    // - before page loading
    navigationValidateInit();
    gridFixHeightInit();


    // - after page loading
    body.imagesLoaded({}, function () {
        wow.init();
        hero_slider_shape.init();
        hero_slider_full_width.init();
        hero_slider_multiple.init();
        hero_slider_parallax.init();
        hero_split_carousel.init();
        testimonials_slider_1.init();
        testimonials_slider_2.init();
        testimonials_slider_3.init();
        testimonials_slider_4.init();
        posts_slider_1.init();
        posts_slider_2.init();
        posts_slider_3.init();
        posts_slider_4.init();
        team_slider_1.init();
        team_slider_2.init();
        navigation_1.init();
        navigation_2.init();
        navigation_3.init();
        navigation_mobile.init();
        tabs.init();
        hero_scene_image_hover_gallery.init();
        pageLoaderHideInit();
        alertMessagesInit();
        modalVideoInit();
        likesToggleInit();
        pageLoaderHideInit();
        stickySidebarInit();
        ajaxContactFormInit();
        scrollTopButtonInit();
        pageProgressBarInit();
        particlesInit();
        isotopeGridInit();
        tiltInit();
        socialLinksLabelInit();
        navigationLanguageToggleInit();
        countersInit();
        typedTextInit();
        progressBarsInit();
        accordionInit();
        magnificPopupInit();
    });

});
