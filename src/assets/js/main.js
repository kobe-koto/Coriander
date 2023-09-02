Array.prototype.toFormattedString = function () {
    return this.toString().replace(/,/gi, "\, ")
}

window.Coriander = {};
Coriander.CurrentDegree = 45;
Coriander.Current = {
        ColorArray: ["#91e9c3", "#eaaa8e"],
        LinearGradient: "linear-gradient(45deg, #91e9c3, #eaaa8e)"
    };
Coriander.gen = function (ColorCount, degree) {

    let ColorArray = [];
    for (let i = 0; i < ColorCount; i++) {
        ColorArray[i] = "#" + Math.floor( Math.random() * 0xffffff ).toString(16).padStart(6, "0");
    }

    return {
        ColorArray: ColorArray,
        LinearGradient: `linear-gradient(${degree || 0}deg, ${ColorArray.toFormattedString()})`
    };

}

Coriander.run = function (ColorCount, degree) {
    Coriander.Current = Coriander.gen(ColorCount, degree);

    document.dispatchEvent(new CustomEvent("Coriander_NewGradients"))
}

if (window.localStorage && window.localStorage.getItem("CorianderDatabase")) {
    Coriander.DB = JSON.parse(window.localStorage.getItem("CorianderDatabase"));
} else if (window.localStorage) {
    Coriander.DB = { main: [] }
}

Coriander.Push2DB = function (Obj) {
    let DateNow = new Date()
    Coriander.DB.main[Coriander.DB.main.length] = {
        Date: DateNow.toLocaleDateString() + " " + DateNow.toTimeString(),
        Obj: Obj
    }
    window.localStorage.setItem("CorianderDatabase", JSON.stringify(Coriander.DB))
}