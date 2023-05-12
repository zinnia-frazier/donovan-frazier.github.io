var darkMode = sessionStorage.getItem('darkMode') && sessionStorage.getItem('darkMode') === 'true'
if (darkMode) {
    document.documentElement.dataset.mode = 'dark'
}

sessionStorage.setItem('darkMode', false)


if (sessionStorage.getItem('darkMode') = false) 
    console.log('hello there');
