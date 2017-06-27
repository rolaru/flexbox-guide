var flexbox = {
    currentSlide: 0,
    slides: null,

    getCookie: function (key) {
        var cookies = document.cookie.replace(' ', '').split(';');

        for (var i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf(key) > -1) {
                return cookies[i].replace(key + '=', '');
            }
        }

        return null;
    },

    navigateSlides: function (direction) {
        if (direction === 'next') {
            this.slides[this.currentSlide].classList.remove('shown');

            if (this.currentSlide === this.slides.length - 1) {
                this.currentSlide = 0;
            } else {
                this.currentSlide++;
            }

            this.slides[this.currentSlide].classList.add('shown');
        } else {
            this.slides[this.currentSlide].classList.remove('shown');

            if (this.currentSlide === 0) {
                this.currentSlide = this.slides.length - 1;
            } else {
                this.currentSlide--;
            }

            this.slides[this.currentSlide].classList.add('shown');
        }

        document.cookie = 'resumeSlide=' + this.currentSlide;
    },

    initPage: function () {
        var previousButton = document.querySelector('.previous-button'),
            nextButton = document.querySelector('.next-button'),
            
            resumeSlide = flexbox.getCookie('resumeSlide');
            
        flexbox.currentSlide = resumeSlide ? parseInt(resumeSlide) : 0;

        flexbox.slides = document.getElementsByClassName('flex-slide');
        flexbox.slides[flexbox.currentSlide].classList.add('shown');

        previousButton.addEventListener('click', flexbox.navigateSlides.bind(flexbox, 'previous'));
        nextButton.addEventListener('click', flexbox.navigateSlides.bind(flexbox, 'next'));
    }
};

window.addEventListener('load', flexbox.initPage);