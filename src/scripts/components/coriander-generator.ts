import { CorianderDB } from "@scripts/CorianderDB";
const DB = new CorianderDB();

class CorianderGenerator extends HTMLElement {
    constructor() {
        super();
    }

    get gradientCode () {
        return `linear-gradient(${this.depencencyElements.AngleKnob.angle}deg, ${this.gradientColors.join(", ")})`;
    }

    gradientColors: string[] = [];

    private depencencyElements: {
        AngleKnob: AngleKnob;
        ColorSettings: ColorSettings;
        ToastNotification: ToastNotification;
    };

    private childElements = {
        preview: this.querySelector(".preview") as HTMLElement,
        code: this.querySelector(".code code") as HTMLElement,
        generateButton: this.querySelector("[data-role='generate']") as HTMLButtonElement,
        copyButton: this.querySelector("[data-role='copy']") as HTMLButtonElement,
        addButton: this.querySelector("[data-role='add-favo']") as HTMLButtonElement,
    };

    private generateRandomColor (): string {
        // generate per R,G,B
        const randomValues = new Uint8Array(3);
        crypto.getRandomValues(randomValues);

        // convert to hex and pad with zeros if necessary
        let rHex = randomValues[0].toString(16).padStart(2, "0");
        let gHex = randomValues[1].toString(16).padStart(2, "0");
        let bHex = randomValues[2].toString(16).padStart(2, "0");

        return `#${rHex}${gHex}${bHex}`;
    }
    private generateGradient (colorCount: number) {
        this.gradientColors = [];
        while (this.gradientColors.length < colorCount) {
            this.gradientColors.push(this.generateRandomColor());
        }
    }
    connectedCallback () {
        // register depencency elements
        this.depencencyElements = {
            AngleKnob: document.querySelector("#angle angle-knob") as AngleKnob,
            ColorSettings: document.querySelector("#colors color-settings") as ColorSettings,
            ToastNotification: document.querySelector("toast-notification") as ToastNotification,
        };

        // add event listeners
        this.childElements.generateButton.addEventListener("click", this.__onGenerateClick);
        this.depencencyElements.AngleKnob.addEventListener("angle-change", this.updateGradientPreview);
        this.childElements.copyButton.addEventListener("click", this.__onCopyClick);
        this.childElements.addButton.addEventListener("click", this.__onAddFavoClick);

        // initial generation
        this.__onGenerateClick();
    }
    disconnectedCallback() {
        this.childElements.generateButton.removeEventListener("click", this.__onGenerateClick);
        this.depencencyElements.AngleKnob.removeEventListener("angle-change", this.updateGradientPreview);
        this.childElements.copyButton.removeEventListener("click", this.__onCopyClick);
        this.childElements.addButton.removeEventListener("click", this.__onAddFavoClick);
    }

    private __onCopyClick = () => {
        navigator.clipboard.writeText(this.gradientCode);
        this.depencencyElements.ToastNotification.new("iconoir:check-circle-solid", "Copied to clipboard");
    }

    private __onAddFavoClick = () => {
        DB.put({
            Degree: this.depencencyElements.AngleKnob.angle,
            ColorArray: this.gradientColors
        });
        this.depencencyElements.ToastNotification.new("iconoir:star-solid", "Added to favorites");
    }

    private __onGenerateClick = () => {
        this.generateGradient(this.depencencyElements.ColorSettings.count);
        this.updateGradientPreview();
    }

    private updateGradientPreview = () => {
        this.style.backgroundImage = this.gradientCode;
        this.childElements.code.innerText = `background-image: ${this.gradientCode};`;
        // dispatch event
        this.dispatchEvent(new CustomEvent("gradient-change", {
            detail: {
                angle: this.depencencyElements.AngleKnob.angle,
                colors: this.gradientColors,
                CSSCode: this.gradientCode,
            }
        }));
    }

}

// wait for all dependencies to be defined using promise
customElements.whenDefined("angle-knob").then(() => {
    customElements.whenDefined("color-settings").then(() => {
        customElements.define("coriander-generator", CorianderGenerator);
    });
});

console.log("CorianderGenerator component loaded.");
