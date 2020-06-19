"use strict";

(function (window, document, navigator) {

    var element = {
        body: document.body,
        postTitle: "cb_post_title_url",
        postBody: "cnblogs_post_body",
        postCategory: "BlogPostCategory",
        postTagList: "EntryTag",
        toc: "table_of_content_warp",
        digg: "div_digg",
        sideBar: "sideBar",
    };

    function $id(id) {
        return $("#" + id);
    }

    function showFixedBarCore() {
        var fixedBar = [];
        fixedBar.push('<div class="fixed-bar-warp">');
        fixedBar.push('<div class="fixed-bar">');

        if ($id(element.postBody).length) {
            fixedBar.push('<a class="item toc" href="javascript:lnh.toc.toggle();" title="目录"><i class="fa fa-hashtag"></i></a>');
            fixedBar.push('<a class="item comments" href="#comment_form_container" title="评论列表"><i class="fa fa-comments"></i></a>');
            fixedBar.push('<a class="item comment" href="#comment_form" title="写评论"><i class="fa fa-pencil"></i></a>');
        }

        fixedBar.push('<a class="item top" href="javascript:scroll(0,0);" title="返回顶部"><i class="fa fa-arrow-circle-up"></i></a>');
        fixedBar.push('</div>');
        fixedBar.push('</div>');

        var fixedBarHtml = fixedBar.join('');

        $(element.body).append(fixedBarHtml)
    }

    function moveDiggCore() {
        var $sideBar = $id(element.sideBar);
        if ($sideBar.find(element.digg).length) {
            return true;
        }

        var $digg = $id(element.digg);
        if ($digg.length) {
            $sideBar.append($digg);
            return true;
        }
    }

    function copyCategoryAndTagCore() {
        var categotyHtml = $id(element.postCategory).html();
        var entryTagListHtml = $id(element.postTagList).html();

        if (categotyHtml) {
            var html = "<div class='post-categoty-tags'>";
            html += "<div class='post-categoty'>";
            html += categotyHtml;
            html += "</div>";
            html += "<div class='post-tags'>";
            html += entryTagListHtml;
            html += "</div>";
            html += "</div>";
            $(html).insertBefore("#topics .postBody");
            return true;
        }
    }

    function getPostTitleCore() {
        return $id(element.postTitle).text();
    }

    function getPostBodyHeaderListCore() {
        var headerList = [];

        $id(element.postBody).find(":header").each(function (index, header) {
            var $header = $(header);
            var tagName = header.tagName.toLowerCase();
            if (tagName === 'h1' ||
                tagName === 'h2' ||
                tagName === 'h3') {
                if (!header.id) {
                    header.id = "auto_id_" + index;
                }

                headerList.push({
                    id: header.id,
                    text: $header.text(),
                    tagName: tagName,
                    offsetTop: parseInt($header.offset().top, 10)
                });
            }
        });

        return headerList;
    }

    function buildTableOfContentsHtmlCore() {
        var headerList = getPostBodyHeaderListCore();
        var tableOfContentsHtml = [];

        if (headerList.length) {
            tableOfContentsHtml.push('<div id="' + element.toc + '" class="lnh_toc_warp">');
            tableOfContentsHtml.push('<div class="title"># ' + getPostTitleCore() + '</div>');
            tableOfContentsHtml.push('<div class="toc">');
            for (var i = 0; i < headerList.length; i++) {
                var header = headerList[i];
                var tableOfContentsItemHtml = "<a" +
                    " href='#" + header.id + "'" +
                    " id='toc_" + header.id + "'" +
                    " class='item item-" + header.tagName + "'" +
                    " title='" + header.text + "'" +
                    ">" +
                    header.text +
                    "</a>";

                tableOfContentsHtml.push(tableOfContentsItemHtml);
            }
            tableOfContentsHtml.push('</div>');
            tableOfContentsHtml.push('</div>');
        }

        return tableOfContentsHtml.join('');
    }

    function toggleTableOfContentsCore() {
        var $body = $(element.body);
        var $toc = $id(element.toc);

        if ($toc.length === 0) {
            var tocHtml = buildTableOfContentsHtmlCore();
            if (tocHtml) {
                $body.append(tocHtml);
                $toc = $id(element.toc);
            }
            if ($toc) {
                show($toc, $body);
            }
            return;
        }

        if ($toc.css("display") === "none") {
            show($toc, $body);
        } else {
            hide($toc, $body);
        }

        function show($toc, $body) {
            var width = $toc.width();
            if (width > 320) {
                width = 320;
            }
            $toc.css("display", "inline-block");
            $body.css("padding-left", width + "px");
        }

        function hide($toc, $body) {
            $toc.css("display", "none");
            $body.css("padding-left", 0);
        }
    }

    function selectedTableOfContentsItemCore(headerId) {
        var $items = $id(element.toc).find(".item");
        var $current = $("#toc_" + headerId);
        if (!$current.hasClass("current")) {
            $items.removeClass("current");
            $current.addClass("current");
        }
    }

    function watchWindowScrollCore() {
        var headerList = getPostBodyHeaderListCore();
        var scrollTop = $(window).scrollTop() + 80;
        for (var i = 0; i < headerList.length; i++) {
            var current = headerList[i];
            var next = headerList[i + 1];
            if (scrollTop > current.offsetTop) {
                if (next && (scrollTop >= next.offsetTop)) {
                    continue;
                }
                selectedTableOfContentsItemCore(current.id);
                break;
            }
        }
    }

    window.lnh = {
        fixedBar: {
            show: showFixedBarCore
        },
        digg: {
            move: moveDiggCore
        },
        post: {
            copyCategoryAndTag: copyCategoryAndTagCore,
        },
        toc: {
            buildId: getPostBodyHeaderListCore,
            toggle: toggleTableOfContentsCore,
            watchWindowScroll: function () {
                $(window).scroll(watchWindowScrollCore);
            }
        },
        run: function () {
            var functionList = Array.prototype.slice.apply(arguments);

            var intervalCoreHandler = setInterval(intervalCore, 500);

            function intervalCore() {
                var length = functionList.length;
                for (var i = 0; i < length; i++) {
                    var functionHandler = functionList[i];
                    if (functionHandler) {
                        var result = functionHandler();
                        if (result) {
                            functionList.splice(i, 1);
                            i--;
                            length--;
                        }
                    }
                }
                if (functionList.length === 0) {
                    clearInterval(intervalCoreHandler);
                }
            };
        }
    };

    window.lnh.isMobile = function () {
        return navigator.userAgent.match(/.*Mobile.*/);
    };

    window.lnh.addMobileCss = function () {
        $id("home").before('<link href="//files.cnblogs.com/files/linianhui/lnh.cnblogs.mobile.css" rel="stylesheet">');
    };

})(window, document, navigator);

if (lnh.isMobile()) {
    lnh.addMobileCss();
    lnh.toc.buildId();
    lnh.run(lnh.post.copyCategoryAndTag);
} else {
    lnh.fixedBar.show();
    lnh.toc.toggle();
    lnh.toc.watchWindowScroll();
    lnh.run(lnh.digg.move, lnh.post.copyCategoryAndTag);
}