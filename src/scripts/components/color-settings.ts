class ColorSettings extends HTMLElement {
    constructor() {
        super();
    }

    private childElements = {
        colorCountInput: this.querySelector("input#ColorCount") as HTMLInputElement,
    };

    set count(value: number) {
        this.childElements.colorCountInput.value = String(value);
    }
    get count() {
        return parseInt(this.childElements.colorCountInput.value);
    }

    connectedCallback() {
        document.querySelector("coriander-generator").addEventListener("gradient-change", this.__onGradientChange)
    }
    disconnectedCallback() {
        document.querySelector("coriander-generator").removeEventListener("gradient-change", this.__onGradientChange)
    }

    private __onGradientChange = (event: CustomEvent) => {
        const colors = event.detail.colors as string[];
        const container = this.querySelector(".Colors") as HTMLElement;
        const prototype = this.querySelector(".ColorPreview.prototype") as HTMLElement;

        container.innerHTML = "";
        for (let color of colors) {
            const colorPreview = prototype.cloneNode(true) as HTMLElement;
            colorPreview.classList.remove("prototype");
            const rect = colorPreview.querySelector("rect") as SVGRectElement;
            const span = colorPreview.querySelector("span") as HTMLElement;
            rect.style.backgroundColor = color;
            span.innerText = color;
            container.appendChild(colorPreview);
        };
    }
}

customElements.define("color-settings", ColorSettings);
console.log("ColorSettings component loaded.");
