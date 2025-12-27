class GradientPreview extends HTMLElement {
    constructor () {
        super();
    }
    
    connectedCallback () {
        const generator = document.querySelector("coriander-generator");
        generator.addEventListener("gradient-change", this.__onGradientChange);

        // trigger update manually on load
        this.style.setProperty("--gradient", generator.gradientCode);
    }
    disconnectedCallback () {
        const generator = document.querySelector("coriander-generator");
        generator.removeEventListener("gradient-change", this.__onGradientChange);
    }

    private __onGradientChange = (event: CustomEvent) => {
        this.style.setProperty("--gradient", event.detail.CSSCode);
    }
}

customElements.whenDefined("coriander-generator").then(() => {
    customElements.define("gradient-preview", GradientPreview);
    console.log("GradientPreview component loaded.");
});