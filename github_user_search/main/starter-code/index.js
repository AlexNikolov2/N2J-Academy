const themeChanger = document.querySelectorAll('header .right')
Array.from(themeChanger).forEach(el => el.addEventListener('click', toggleTheme))

function toggleTheme(e) {

    const head = document.head;
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    head.appendChild(link);

    
    if (Array.from(e.target.parentElement.classList).includes('white')) {
        link.href = './style-dark.css';

    } else {
        link.href = './style-light.css';
    }
}