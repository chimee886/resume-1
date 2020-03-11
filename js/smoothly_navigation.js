!function () {
    let aTags = document.querySelectorAll('.menu > ul > li > a')
    function animate(time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }
    requestAnimationFrame(animate);
    for (let i = 0; i < aTags.length; i++) {
        aTags[i].onclick = function (skipAction) {
            skipAction.preventDefault()
            let a = skipAction.currentTarget
            let ahref = a.getAttribute('href')
            let element = document.querySelector(ahref)
            let top = element.offsetTop

            let currentTop = window.scrollY
            let targetTop = top - 70
            let distance = targetTop - currentTop
            const coords = { y: currentTop };
            var t = Math.abs((distance / 100) * 300)
            if (t > 500) { t = 500 }
            const tween = new TWEEN.Tween(coords)
                .to({ y: targetTop }, 500)
                .easing(TWEEN.Easing.Quadratic.In)
                .onUpdate(() => {
                    window.scrollTo(0, coords.y)
                })
                .start();
        }
    }
}.call()
