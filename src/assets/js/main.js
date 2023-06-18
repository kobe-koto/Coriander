Array.prototype.toFormattedString = function () {
    return this.toString().replace(/,/gi, "\, ")
}

window.RGP = {};
RGP.CurrentDegree = 45;
RGP.Current = {
        ColorArray: ["#91e9c3", "#eaaa8e"],
        LinearGradient: "linear-gradient(45deg, #91e9c3, #eaaa8e)"
    };
RGP.gen = function (ColorCount, degree) {

    let ColorArray = [];
    for (let i = 0; i < ColorCount; i++) {
        ColorArray[i] = "#" + Math.floor( Math.random() * 0xffffff ).toString(16).padStart(6, "0");
    }

    return {
        ColorArray: ColorArray,
        LinearGradient: `linear-gradient(${degree || 0}deg, ${ColorArray.toFormattedString()})`
    };

}

RGP.run = function (ColorCount, degree) {
    RGP.Current = RGP.gen(ColorCount, degree);

    document.dispatchEvent(new CustomEvent("RGP_NewGradients"))
}

if (window.localStorage && window.localStorage.getItem("RGPDatabase")) {
    RGP.DB = JSON.parse(window.localStorage.getItem("RGPDatabase"));
} else if (window.localStorage) {
    RGP.DB = { main: [] }
}

RGP.Push2DB = function (Obj) {
    let DateNow = new Date()
    RGP.DB.main[RGP.DB.main.length] = {
        Date: DateNow.toLocaleDateString() + " " + DateNow.toTimeString(),
        Obj: Obj
    }
    window.localStorage.setItem("RGPDatabase", JSON.stringify(RGP.DB))
}