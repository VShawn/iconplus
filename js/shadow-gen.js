var pad = function (a, b) {
    for (a += ""; a.length < b;) a = "0" + a;
    return a
},
    changeColor = function (a, b, d) {
        a = a.replace(/^\s*|\s*$/, "");
        a = a.replace(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i, "#$1$1$2$2$3$3");
        b = Math.round(256 * b) * (d ? -1 : 1);
        var e = a.match(/^rgba?\(\s*(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])\s*,\s*(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])\s*,\s*(\d|[1-9]\d|1\d{2}|2[0-4][0-9]|25[0-5])(?:\s*,\s*(0|1|0?\.\d+))?\s*\)$/i),
            c = e && null != e[4] ? e[4] : null;
        a = e ? [e[1], e[2], e[3]] : a.replace(/^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            function (a, b, c, d) {
                return parseInt(b, 16) + "," + parseInt(c, 16) + "," + parseInt(d, 16)
            }).split(/,/);
        return e ? "rgb" + (null !== c ? "a" : "") + "(" + Math[d ? "max" : "min"](parseInt(a[0], 10) + b, d ? 0 : 255) + ", " + Math[d ? "max" : "min"](parseInt(a[1], 10) + b, d ? 0 : 255) + ", " + Math[d ? "max" : "min"](parseInt(a[2], 10) + b, d ? 0 : 255) + (null !== c ? ", " + c : "") + ")" : ["#", pad(Math[d ? "max" : "min"](parseInt(a[0], 10) + b, d ? 0 : 255).toString(16), 2), pad(Math[d ? "max" : "min"](parseInt(a[1], 10) + b, d ? 0 : 255).toString(16), 2), pad(Math[d ? "max" : "min"](parseInt(a[2], 10) + b, d ? 0 :
            255).toString(16), 2)].join("")
    },
    lighterColor = function (a, b) {
        return changeColor(a, b, !1)
    },
    darkerColor = function (a, b) {
        return changeColor(a, b, !0)
    };

function hexToR(a) {
    return parseInt(cutHex(a).substring(0, 2), 16)
}

function hexToG(a) {
    return parseInt(cutHex(a).substring(2, 4), 16)
}

function hexToB(a) {
    return parseInt(cutHex(a).substring(4, 6), 16)
}

function cutHex(a) {
    return "#" == a.charAt(0) ? a.substring(1, 7) : a
}
var bodyBackColor = "#E9E9E9",
    boxBackColor = "#1A84CC",
    boxshadowStyle = genShadow(bodyBackColor, 120, 1, 20, "D"),
    style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".box-shadow { box-shadow : " + boxshadowStyle + ";transition:0.2s ease; }";
document.getElementsByTagName("head")[0].appendChild(style);
$("#box").addClass("box-shadow");
var textshadowStyle = genShadow(boxBackColor, 120, 1, 10, "D"),
    style = document.createElement("style");
style.type = "text/css";
style.innerHTML = ".text-shadow { text-shadow : " + textshadowStyle + ";transition:0.2s ease; }";
document.getElementsByTagName("head")[0].appendChild(style);
$("#text").addClass("text-shadow");

function genShadow(a, b, d, e, c) {
    b = parseInt(b);
    d = parseInt(d);
    e = parseInt(e) / 100;
    var f = [],
        h = "",
        k = "rgb(" + hexToR(a) + ", " + hexToG(a) + ", " + hexToB(a) + ")";
    console.log(k);
    for (var g = 0; g < b; g++) 1 == d ? f.push(e / b * g) : f.push(e);
    f.sort(function (a, b) {
        return b - a
    });
    d = f.length - 1;
    for (g = 0; g < b; g++) a = darkerColor(k, f[g]), e = g * b / 100, d--, "D" == c ? h = 0 == g ? h + "" + g + "px " + g + "px 0px " + a : h + " ," + g + "px " + g + "px 0px " + a : (c = parseFloat(c), h = 0 == g ? h + Math.sin(0 + c) * e + "px " + Math.cos(0 + c) * e + "px 0px " + a : h + " ," + Math.sin(0 + c) * e + "px " + Math.cos(0 + c) * e + "px 0px " +
        a);
    return h
}
$("#bx-back-color").on("blur", function () {
    var a = $(this).val();
    if (0 == /^#[0-9A-F]{6}$/i.test(a) && "" != a) return alert("Please eneter correct color code. E.g : #8e44ad"), $(this).val(""), !1;
    $("body").css("background-color", a);
    changedBox()
});
$("#bx-fade-flag").on("change", function () {
    changedBox()
});
$("input[type=radio][name=bx-shape]").on("change", function () {
    var a = $(this).val();
    $("#box").css("border-radius", a + "px")
});
$("#bx-shadow-length").on("input", function () {
    changedBox()
});
$("#bx-opacity").on("input", function () {
    changedBox()
});
$("#bx-rotation").on("change", function () {
    changedBox()
});
$("#outline").on("change", function () {
    1 == $(this).prop("checked") ? ($("#text").addClass("stroke"), $("#text").css("color", $("#box").css("background-color"))) : ($("#text").removeClass("stroke"), $("#text").css("color", "#ffffff"))
});
$("#text-back-color").on("blur", function () {
    var a = $(this).val();
    if (0 == /^#[0-9A-F]{6}$/i.test(a) && "" != a) return alert("Please eneter correct color code. E.g : #8e44ad"), $(this).val(""), !1;
    $("#box").css("background-color", a);
    changedText()
});
$("#text-fade-flag").on("change", function () {
    changedText()
});
$("#text-shadow-length").on("input", function () {
    changedText()
});
$("#text-opacity").on("input", function () {
    changedText()
});
$("#text-rotation").on("change", function () {
    changedText()
});

function changedBox() {
    var a = $("#bx-back-color").val();
    "" == a && (a = bodyBackColor);
    var b = $("#bx-fade-flag").prop("checked"),
        b = 1 == b ? 1 : 0,
        d = $("#bx-shadow-length").val(),
        e = $("#bx-opacity").val(),
        c = $("#bx-rotation").val(),
        a = genShadow(a, d, b, e, c);
    console.log(a);
    $(".box-shadow").css("box-shadow", a)
}

function changedText() {
    var a = $("#text-back-color").val();
    "" == a && (a = boxBackColor);
    var b = $("#text-fade-flag").prop("checked"),
        b = 1 == b ? 1 : 0,
        d = $("#text-shadow-length").val(),
        e = $("#text-opacity").val(),
        c = $("#text-rotation").val(),
        a = genShadow(a, d, b, e, c);
    console.log(a);
    $(".text-shadow").css("text-shadow", a)
}
$("#downloadimage").on("click", function () {
    var a = $("#dynamic-text").val();
    if (1 == -1 < a.indexOf("class=")) return alert("Sorry font awesome icons cant be exported right now. If you want to help me to implement this please fork me!!"), !1;
    "" == a && (a = "Fs");
    var a = '<div class="box-shadow"><div class="text-shadow">' + a + "</div></div>",
        b = $("#box").width(),
        d = $("#box").height(),
        e = $("input[type=radio][name=bx-shape]:checked").val(),
        c = $("#text-back-color").val();
    "" == c && (c = "#1A84CC");
    e = ".box-shadow{width:" + b + "px;height:" +
        d + "px;overflow : hidden;display: table;margin: 0 auto;border-radius:" + e + "px;background-color : " + c + ";}";
    c = $("#font-color").val();
    "" == c && (c = "#ffffff");
    var f = $("#fontsize").val(),
        h = $("input[type=radio][name=fontweight]:checked").val();
    "undefined" == typeof h && (h = "bold");
    var k = $("#outline").prop("checked");
    1 == k ? (k = "2px", c = $("#box").css("background-color")) : k = "0px";
    var g = $("#text-back-color").val();
    "" == g && (g = boxBackColor);
    var m = $("#text-fade-flag").prop("checked"),
        m = 1 == m ? 1 : 0,
        l = $("#text-shadow-length").val(),
        n = $("#text-opacity").val(),
        p = $("#text-rotation").val(),
        g = genShadow(g, l, m, n, p),
        c = '.text-shadow{font-family: "Roboto", sans-serif;color: ' + c + ";font-size: " + f + "px;font-weight: " + h + ";-webkit-text-stroke: " + k + " #FFFFFF;-moz-text-stroke: " + k + " #FFFFFF;-o-text-stroke: " + k + " #FFFFFF;-webkit-text-stroke: " + k + " #FFFFFF;width: 100%;height: 100%;text-align: center;letter-spacing : 5px;line-height: 1;display: table-cell;vertical-align: middle;text-shadow:" + g + ";}";
    $("#html-code").text(a);
    $("#css-code").text(e +
        c);
    b = '<svg xmlns="http://www.w3.org/2000/svg" width="' + b + '" height="' + d + '"><foreignObject width="100%" height="100%">';
    b += '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />';
    b = b + "<style>body{margin: 0px;}" + e + c + "</style>";
    b += "<body xmlns='http://www.w3.org/1999/xhtml'>";
    b = b + "" + a;
    b += "</body>";
    b += "</foreignObject>";
    b += "</svg>";

    // a = document.createElement("a");
    // a.href = "data:image/svg+xml;utf8," + unescape(b);
    // a.download = "plot.svg";
    // a.target = "_blank";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a)

    var export_blob = new Blob([b]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    var urlObject = window.URL || window.webkitURL || window;
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = "plot.svg";
    save_link.click();
});