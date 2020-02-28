document.addEventListener('keyup', (e) => {

    const ballElm = document.querySelector('.ball');
    const x = ballElm.getBoundingClientRect().left;
    const y = ballElm.getBoundingClientRect().top;
    
    switch (e.key) {
        case 'ArrowRight':
            ballElm.style.left = x < 480 ? x + 20 + 'px' : 480;
            break;
        case 'ArrowDown':
            ballElm.style.top = y < 480 ? y + 20 + 'px' : 480;
            break;
        case 'ArrowLeft':
            ballElm.style.left = x > 0 ? x - 20 + 'px' : 0;
            break;
        case 'ArrowUp':
            ballElm.style.top = y > 0 ? y - 20 + 'px' : 0;
            break;
    }

});