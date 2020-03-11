!function () {
    setTimeout(function () {
        siteLoading.classList.remove('active')
    }, 1000)//setTimeout是延迟1s后移除active

    window.onscroll = function () {
        if (window.scrollY > 20) {
            topNavBar.classList.add('sticky')
            ulColor.classList.add('acolor')
        } else {
            topNavBar.classList.remove('sticky')
            ulColor.classList.remove('acolor')
        }
        let specialTags = document.querySelectorAll('[data-x]')
        let minIdex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIdex].offsetTop - window.scrollY)) {
                minIdex = i
            }
        }
        let id = specialTags[minIdex].id
        let a = document.querySelector('a[href="#' + id + '"]')
        let li = a.parentNode
        let brotherAndme = li.parentNode.children
        for (let i = 0; i < brotherAndme.length; i++) {
            brotherAndme[i].classList.remove('highlight')
        }
        li.classList.add('highlight')
    }

    let liTags = document.querySelectorAll('.menu > ul > li')//给选择器，让他找menu下面所有的li
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (aa) {
            aa.currentTarget.classList.add('active')//currenttarget表示当前监听的东西
        }
        liTags[i].onmouseleave = function (aa) {
            aa.currentTarget.classList.remove('active')
        }
    }
}.call()