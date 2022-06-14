(()=> {
    function init() {
        const hamburger = document.querySelector('.header__hamburger');
        const nav = document.querySelector('.header__nav');
        const menuLi = document.querySelectorAll('.header__menu .menu__list');
        const scrollTopButton = document.querySelector('.scrollTopButton');
        var prevScrollpos = window.pageYOffset;
        
        activeForm();

        // Activating mobile hamburger menu
        hamburger.addEventListener('click', ()=> { hamburgerClickable(nav, hamburger, menuLi, scrollTopButton) });
        
        // Making menu fixed on desktop/tablet after scrolling
        window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
        nav.style.top = "0";
        nav.classList.add('navFixed')
        } else {
            nav.style.top = "-60px";
            nav.classList.remove('navFixed')
        }
        prevScrollpos = currentScrollPos;
        }

        document.body.onload = ()=> {
            let loading = document.querySelector('.loading');
            document.body.classList.add('loading');
            loading.classList.add('active')

            setTimeout(()=> {
                document.body.classList.remove('loading');
                loading.classList.remove('active');
            }, 2000)
        }

    }
    init();



    function hamburgerClickable(nav, hamburger, menuLi, scrollTopButton) {
        var x = window.matchMedia("(max-width: 767px)")
        nav.classList.toggle('active');
        hamburger.classList.toggle('active')

        // Desabling mobile hamburger when clicking on menu lists/items
        menuLi.forEach((e) => {
            e.addEventListener('click', () => {
                document.body.style.overflow = 'initial';
                scrollTopButton.style.display = 'initial';
                nav.classList.remove('active');
            });
        })

        // Desabling scrolling and scrollTopButton when hamburger is active and removing hamburger menu when the screen is > than 767px;
        function myFunction(x) {
            if (x.matches && hamburger.classList.contains('active')) { // If media query matches
                nav.classList.add('active');
                document.body.style.overflow = 'hidden';
                scrollTopButton.style.display = 'none'
            } else {
                document.body.style.overflow = 'initial';
                scrollTopButton.style.display = 'initial';
                nav.classList.remove('active');
            }
        }
        myFunction(x) // Call listener function at run time
        x.addListener(myFunction) // Attach listener function on state changes
    }

    function activeForm() {
        let body = document.body;
        let SendAMessage = document.querySelector('.contact__us > button')
        let contactButton = document.querySelectorAll('.company__employee > button');
        let formContainer = document.querySelector('.contact .contact__form')
        let form = formContainer.querySelector('.form');
        let closeForm = formContainer.querySelector('.form__close');

        
        //Activating form by send a message button
        SendAMessage.addEventListener('click', function(e) {
            e.preventDefault();
            activatingForm(formContainer, body, closeForm, form);


        })

        //Activating form by contact button
        contactButton.forEach((each)=> {
            each.addEventListener('click', ()=> {
                contactButtons(formContainer, body, closeForm, form);
            })
        })

        submitForm(form, formContainer, body);
        
    }

    function submitForm(form, formContainer, body, ) {
        let displayMessage = document.createElement('p');
        displayMessage.classList.add('form__submitMessage');
        form.appendChild(displayMessage);

        form.addEventListener('submit', (e)=> {
            e.preventDefault();
            
            form.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach((e) => {
                e.value = '';
            })
            displayMessage.innerText = 'Thanks! We will reach out soon!'
            
            setTimeout(()=> {
                displayMessage.innerText = '';
                formContainer.classList.remove('active');
                body.classList.remove('active');
                window.location.reload();
            }, 3000)
        })
    }

    function contactButtons(el, body, closeButton, form) {
        el.classList.add('active');
        body.classList.add('active');
        closeButton.focus();

        disablingForm(el, body, closeButton);

        focusTrap(form);
        
    }

    function activatingForm(el, body, closeButton, form) {
        el.classList.add('active');
        body.classList.add('active');
        closeButton.focus();

        //Focus trap for acessibility
        focusTrap(form);

        //Desabling form
        disablingForm(el, body, closeButton)
    }

    function disablingForm(el, body, closeButton) {
        
        //Disabling form by clicking out of form container or close element
        el.addEventListener('click', (e) => {
            if (e.target == el || e.target == closeButton) {
                el.classList.remove('active'); 
                body.classList.remove('active');
            }
        })
        
        //Disabling form by pressing enter on close element
        closeButton.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                el.classList.remove('active'); 
                body.classList.remove('active');
            }
        })
        
        // Disabling form by pressing ESC button when formContainer/body is active
        if (el.classList.contains('active') && body.classList.contains('active')) {
            body.addEventListener('keydown', (e) => {
                if (e.keyCode === 27) {
                    el.classList.remove('active'); 
                    body.classList.remove('active');
                }
            })
        }

    }

    //Focus trap for modal (accessibility)
    function focusTrap(modal) {
        const  focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

        const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

        document.addEventListener('keydown', function(e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
            if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus(); // add focus for the last focusable element
                e.preventDefault();
            }
        } else { // if tab key is pressed
            if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                firstFocusableElement.focus(); // add focus for the first focusable element
                e.preventDefault();
            }
        }
        });
    }
})();