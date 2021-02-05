// *
window.onload = function () {
    setTimeout(window.scroll(0,0),10);
}
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod'
    ];  
    var flag = true;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) != -1) {
            flag = false;
            break;
        }
    }
    return flag;
}

function IsiPad() {
    var userAgentInfo = navigator.userAgent;
    var Agents = 'iPad';
    var flag = false;
    if (userAgentInfo == Agents)
        flag = true;
    return flag;
}

//cover效果
var canSlide = false;
let mbClickLogo = document.getElementsByClassName("mbClickLogo")[0];
mbClickLogo.addEventListener("touchend",function () {
    mbClickLogo.style.animation = 'mbLogoRotate 1s';
    mbClickLogo.style.transform = 'rotate(35deg)  scale(1.3)';
    setTimeout(function () {
        var firstText = document.getElementsByClassName('introduce')[0];
        firstText.style.animation = 'moveRight 3s ease 1.3s forwards';
        box2.style.transform = 'translateY(-100vh)';
        canSlide = true;
        box.requestFullscreen();
    },1000);
});

//屏幕大小判断
window.addEventListener('fullscreenchange',function () {
    setTimeout(function () {
        var deviceWidth = document.getElementsByTagName('body')[0].clientHeight;
        document.getElementsByTagName('html')[0].style.fontSize = (deviceWidth / 50.75) / 4 + "px";
    },1000);
});
window.addEventListener('orientationchange',function () {
    setTimeout(function () {
        var deviceWidth = document.getElementsByTagName('body')[0].clientHeight;
        document.getElementsByTagName('html')[0].style.fontSize = (deviceWidth / 50.75) / 4 + "px";
    },1000);
});
window.addEventListener('load',function () {
    var deviceWidth = document.getElementsByTagName('body')[0].clientHeight;
    document.getElementsByTagName('html')[0].style.fontSize = (deviceWidth / 50.75) / 4 + "px";
});
window.addEventListener('resize',function () {
    setTimeout(function () {
        var deviceWidth = document.getElementsByTagName('body')[0].clientHeight;
        document.getElementsByTagName('html')[0].style.fontSize = (deviceWidth / 50.75) / 4 + "px";
    },10);
});

// 页面滑动效果

    //锚点跳转
    var pageIndex = 1;
    let mbIndexAList = document.getElementsByClassName('mbIndexA');
    for (var i = 0; i < 2; i++) {
        mbIndexAList[i].addEventListener('touchstart',function (event) {
            event.preventDefault();
        });
    }
    let mbArrowLogo = document.getElementsByClassName('mbArrowLogo');

    var box2 = document.getElementById('wrap2');
    mbIndexAList[0].addEventListener('touchend',function () {
        canSlide = true;
        pageIndex = 1;
        box2.style.transform = 'translateY(-200vh)';
    });
    mbIndexAList[1].addEventListener('touchend',function () {
        canSlide = true;
        pageIndex = 4;
        box2.style.transform = 'translateY(-400vh)';
    });

    //禁止最后一页滑动
    document.getElementById('mbfourth').addEventListener('touchstart',function () {
        return;
    },false);
    document.getElementById('mbfourth').addEventListener('touchmove',function () {
        return;
    },false);
    document.getElementById('mbfourth').addEventListener('touchend',function () {
        return;
    },false);

    //滑动效果主体
    document.body.addEventListener('touchmove', function (event) {
        event = event ? event : window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }, false);
    var box = document.getElementById('wrap');
    var box2 = document.getElementById('wrap2');
    var len = 4;
    var startY, moveY, cliH;
    var getH = function () {
        cliH = document.body.clientHeight;
    };
    getH();
    window.addEventListener('resize', getH, false);
    var theAddTransition = function () {
        box2.style.transition = "all 1s ease";
    }
    var touchstart = function (event) {
        if (!event.touches.length) {
            return;
        }
        startY = event.touches[0].pageY;
        moveY = 0;
    };
    var touchmove = function (event) {
        if (!event.touches.length) {
            return;
        }
        moveY = event.touches[0].pageY - startY;
    };
    var touchend = function () {
        if (moveY < -100) pageIndex++;
        if (moveY > 100) pageIndex--;
        if (pageIndex < 1) pageIndex = 1;
        if (pageIndex > len) pageIndex = len;
        if (Math.abs(moveY) > 50 && canSlide)
            box2.style.transform = 'translateY(' + (-pageIndex * 100) + 'vh)';
    };
    box.addEventListener("touchstart", function (event) {
        touchstart(event);
    }, false);
    box.addEventListener("touchmove", function (event) {
        touchmove(event);
    }, false);
    box.addEventListener("touchend", function (event) {
        theAddTransition();
        touchend();
    }, false);

    // 第一屏菜单
    let mbListContent = document.getElementsByClassName('mblist')[0];
    let mbList = document.getElementsByClassName('burger')[0];
    let mbFlag  = 0;
    let theMore = document.getElementsByClassName('more')[0];
    theMore.addEventListener('touchend',function () {
        if (Math.abs(moveY) <= 30) {
            canSlide = true;
            pageIndex = 2;
            box2.style.transform = 'translateY(-200vh)';
        }
    });
    let mbTitle = document.getElementsByClassName('tittle')[0];

    mbList.addEventListener('touchstart', () => {
        mbTitle.style.borderRadius = '10px 10px 0 0';
        mbTitle.style.borderBottom = '2.5px solid #FC8A8D';
        mbListContent.style.height = "14vh";
        mbTitle.style.transition = 'none';
        mbListContent.style.border = "2.5px solid #FC8A8D";
        mbListContent.style.borderStyle = "none solid solid solid";
        setTimeout(() => {
            mbFlag = 1;
        }, 300);
    }, false);
    let mbFirst = document.getElementById('mbfirst');
    mbFirst.addEventListener('touchstart', (event) => {
        if (event.target != mbListContent&&mbFlag==1) {
            mbTitle.style.transition = 'all .3s ease .2s';
            mbTitle.style.borderRadius = '10px';
            mbTitle.style.borderBottom = '2.5px solid #FC8A8D';
            mbListContent.style.height = "0vh";
            mbListContent.style.border = "none";
            setTimeout(() => {
                mbFlag = 0;
            }, 300);
        }
    });

//第三屏banner

    let mbBannerBody = document.querySelector('.mbBannerBody');
    let mbLeaderCircle = document.querySelectorAll('.mbLeaderCircle');
    let windowWidth = document.getElementsByClassName("mbBannerElement")[0].clientWidth;

    //二三屏箭头跳转
    let mbLogoA = document.getElementsByClassName('mbLogoA');
    let bannerIndex = 0;//banner index初始化
    var Offset = 30;//防止滑动误触最小检测量

    mbArrowLogo[0].addEventListener('touchend',function () {
        if (Math.abs(moveY) <= Offset) {
            pageIndex = 3;
            box2.style.transform = 'translateY(-300vh)';
        }
    });
    mbArrowLogo[1].addEventListener('touchend',function () {
        if (Math.abs(moveY) <= Offset) {
            pageIndex = 4;
            box2.style.transform = 'translateY(-400vh)';
        }
    });

    //banner第二屏跳转
    mbLogoA[0].addEventListener('touchend',function () {
        if (Math.abs(moveY) <= Offset) {
            mbBannerBody.style.transition = 'all .4s ease .7s';
            pageIndex = 4;
            bannerIndex = 0;
            mbBannerBody.style.transform = "translateX(0rem)";
            box2.style.transform = 'translateY(-300vh)';
            setTimeout(() => {
                setPointS(0);
            }, 700);
        }
    });

    mbLogoA[1].addEventListener('touchend',function () {
        if (Math.abs(moveY) <= Offset) {
            mbBannerBody.style.transition = 'all .4s ease .7s';
            pageIndex = 4;
            bannerIndex = 1;
            mbBannerBody.style.transform = "translateX(-19.5rem)";
            box2.style.transform = 'translateY(-300vh)';
            setTimeout(() => {
                setPointS(1);
            }, 700);
        }
    });

    mbLogoA[2].addEventListener('touchend',function () {
        if (Math.abs(moveY) <= Offset) {
            mbBannerBody.style.transition = 'all .4s ease .7s';
            pageIndex = 4;
            bannerIndex = 2;
            mbBannerBody.style.transform = "translateX(-39rem)";
            box2.style.transform = 'translateY(-300vh)';
            setTimeout(() => {
                setPointS(2);
            }, 700);
        }
    });

    mbLogoA[3].addEventListener('touchend',function () {
        if (Math.abs(moveY) <= Offset) {
            mbBannerBody.style.transition = 'all .4s ease .7s';
            pageIndex = 4;
            bannerIndex = 3;
            mbBannerBody.style.transform = "translateX(-58.5rem)";
            box2.style.transform = 'translateY(-300vh)';
            setTimeout(() => {
                setPointS(3);
            }, 700);
        }
    });

    mbLogoA[4].addEventListener('touchend',function () {
        if (Math.abs(moveY) <= Offset) {
            mbBannerBody.style.transition = 'all .4s ease .7s';
            pageIndex = 4;
            bannerIndex = 4;
            mbBannerBody.style.transform = "translateX(-78rem)";
            box2.style.transform = 'translateY(-300vh)';
            setTimeout(() => {
                setPointS(4);
            }, 700);
        }
    });

    // banner主体
    let startX = 0;
    let distanceX = 0;
    let isMove = false;
    var addTransition = function () {
        mbBannerBody.style.transition = "all .3s ease";
    }
    var removeTransition = function () {
        mbBannerBody.style.transition = "none";
    }
    function setPointS(i) {
        for (var j = 0; j < mbLeaderCircle.length; j++) {
            mbLeaderCircle[j].style.transition = 'none';
            mbLeaderCircle[j].classList.remove("mbActive");
        }
        mbLeaderCircle[bannerIndex].style.transition = '.3s all ease';
        mbLeaderCircle[i].classList.add("mbActive");
    }
    function setPoint(i){
        for (var j = 0; j < mbLeaderCircle.length; j++) {
            mbLeaderCircle[j].style.transition = 'none';
            mbLeaderCircle[j].classList.remove("mbActive");
        }
        mbLeaderCircle[bannerIndex].style.transition = '.3s all ease';
        mbLeaderCircle[i].classList.add("mbActive");
    }
    mbBannerBody.addEventListener('touchstart',function (e) {
        startX = e.touches[0].clientX;
    });
    mbBannerBody.addEventListener('touchmove',function (e) {
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
        var transformX = distanceX;
        var plus = '';
        if (transformX > 0){
            plus = " + ";
        }
        else{
            plus = " - ";
        }
        if (Math.abs(transformX) > windowWidth / 5) {
            if (transformX > 0){
                plus = " + ";
                if (bannerIndex == 0)
                    transformX = windowWidth / 5;
            }
            else{
                plus = " - ";
                if (bannerIndex == 4){
                    transformX = -windowWidth / 5;
                }
            }
        }
        removeTransition();
        var theNumStr = -bannerIndex * 19.5 + 'rem';
        var theStr = "translateX(calc(" + theNumStr + plus + Math.abs(transformX) + 'px))';
        mbBannerBody.style.transform = theStr;
    });

    mbBannerBody.addEventListener('touchend',function (e) {
        addTransition();
        if (isMove && Math.abs(distanceX) > windowWidth / 4) {
            if (distanceX < 0) {
                if(++bannerIndex == 5){
                    bannerIndex = 4;
                }
            }
            else{
                if(--bannerIndex == -1){
                    bannerIndex = 0;
                }
            }
            setPoint(bannerIndex);
        }
        var theNum = -bannerIndex * 19.5;
        mbBannerBody.style.transform = "translateX(" + theNum + 'rem)';
        distanceX = 0;
    });
