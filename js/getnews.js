function successpann(responseText) {
    Array.from(responseText.getElementsByClassName("post_wrap")[0].children).forEach(
        function (item) {
            var href = item.getElementsByTagName("dt")[0].getElementsByTagName("a")[0].href;
            var title = item.getElementsByTagName("dt")[0].getElementsByTagName("a")[0].text;
            var time = "";
            if (checkkeywords(title) != 0) {
                insertNode(title, href, time, "pann",checkkeywords(title));
            }
        }
    )
}

function successinstiz(responseText) {
    Array.from(responseText.getElementById("mainboard").getElementsByClassName("listsubject")).forEach(
        function (item) {
            var href = item.getElementsByTagName("a")[0].href;
            var title = item.textContent;
            var time = item.nextElementSibling.nextElementSibling.textContent;
            if (checkkeywords(title) != 0) {
                insertNode(title, href, time, "instiz",checkkeywords(title));
            }
        }
    )
}

function successtheqoo(responseText) {
    Array.from(responseText.getElementsByClassName("hide_notice")[0].getElementsByClassName("title")).forEach(
        function (item) {
            var href = item.getElementsByTagName("a")[0].href;
            var title = item.textContent.trim();
            var time = item.nextElementSibling.textContent.trim();
            insertNode(title, href, time, "theqoo",checkkeywords(title));
        }
    )
}

function insertNode(title, href, time, source, keyword) {

    if(keyword==1){
        var newNode = document.createElement("div");
        newNode.class = "post-entry";
        newNode.innerHTML = ['<a href="#" class="list-group-item list-group-item-danger" data-href="' + href + '"onclick="newsitemclicked(this)" class="list-group-item list-group-item-action">',
        '<p class="mb-1">' + title + '</p>',
        '<small>' + time + '</small></a>'
        ].join('');
        document.getElementById("title-list-" + source).insertBefore(newNode,document.getElementById("title-list-" + source).firstChild);
    }
    else if(keyword==2){
        var newNode = document.createElement("div");
        newNode.class = "post-entry";
        newNode.innerHTML = ['<a href="#" data-href="' + href + '"onclick="newsitemclicked(this)" class="list-group-item list-group-item-action">',
        '<p class="mb-1">' + title + '</p>',
        '<small>' + time + '</small></a>'
        ].join('');
        document.getElementById("title-list-" + source).appendChild(newNode);
    }
    
}

function fail(code) {
    alert(code);
}


function checkkeywords(title) {
    var keywords = [
        ["BTS", "JIN"],
        ["BTS", "진"],
        ["방탄소넌단", "JIN"],
        ["방탄소넌단", "진"],
        ["방탄", "JIN"],
        ["방탄", "진"]
    ];

    if (title.includes("김석진") || title.includes("석진"))
        return 1;

    for (let keyword of keywords) {
        if (title.includes(keyword[0]) && title.includes(keyword[1]))
            return 1;
    }
    for (let keyword of keywords) {
        if (title.includes(keyword[0]) || title.includes(keyword[1]))
            return 2;
    }
    return 0;
}

function createhttprequest(url) {
    var request = new XMLHttpRequest();
    request.responseType = "document";
    request.open('GET', url);
    request.onreadystatechange = function requeststatechange() {
        if (request.readyState === 4) {
            if (request.status === 200) {
                if (url.includes("pann")) {
                    return successpann(request.response);
                } else if (url.includes("instiz")) {
                    return successinstiz(request.response);
                } else {
                    return successtheqoo(request.response);
                }
            } else {

            }
        } else {

        }
    }
    request.send();
}

function initializetitle() {
    //初始化instiz目录下的标题
    var baseurl = "https://www.instiz.net/bbs/list.php?id=pt&page=";
    for (let page = 1; page < 6; page++) {
        createhttprequest(baseurl + page + "&srt=3&k=&srd=1");
    }
    $(document).ready(function(){ 
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
        // 选择目标节点
        var target = document.querySelector('#title-list-instiz');
        // 创建观察者对象
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                document.querySelector('webview').src = document.getElementById("title-list-instiz").children[0].getElementsByTagName("a")[0].getAttribute("data-href");
                // 随后,你还可以停止观察
                observer.disconnect();
            });
        });
        // 配置观察选项:
        var config = {
            childList: true
        };
        // 传入目标节点和观察选项
        observer.observe(target, config);
    });
    
    


   


    //初始化pann目录下的标题
    var pannurls = ["https://pann.nate.com/talk/ranking",
        "https://pann.nate.com/talk/ranking?rankingType=total&page=2",
        "https://pann.nate.com/talk/ranking/d",
        "https://pann.nate.com/talk/ranking/d?stdt=20190330&page=2",
        "https://pann.nate.com/talk/ranking/w"
    ];
    for (let url of pannurls) {
        createhttprequest(url);
    }

    //初始化theqoo目录下的标题
    var baseurl = "https://theqoo.net/index.php?mid=hot&page=";
    for (let page = 1; page < 5; page++) {
        createhttprequest(baseurl + page);
    }
}

initializetitle();