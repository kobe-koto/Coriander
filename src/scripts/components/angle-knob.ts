class AngleKnob extends HTMLElement {
    constructor() {
        super();
    }

    private mousedown = false;
    private rawAngle = 45;
    
    set angle (value: number) {
        this.updateAngle(value);
    }
    get angle (): number {
        return this.rawAngle;
    }

    private childElements: {
        input: HTMLInputElement;
        cursor: HTMLElement;
    };

    private updateAngle (rawAngle: number) {
        const roundedAngle = Math.round(rawAngle);

        this.childElements.cursor.style.setProperty("--Angle", `${rawAngle}deg`);

        const InputElement = this.childElements.input;
        if (document.activeElement !== InputElement) {
            InputElement.value = `${roundedAngle}`;
        }

        this.rawAngle = rawAngle;

        // dispatch event
        this.dispatchEvent(new CustomEvent("angle-change", {
            detail: {
                angle: rawAngle
            }
        }));
    }

    connectedCallback() {
        // register child elements
        this.childElements = {
            input: this.querySelector<HTMLInputElement>("#angle-value")!,
            cursor: this.querySelector<HTMLElement>(".cursor")!
        }

        // initialize 
        this.childElements.cursor.style.setProperty("--Angle", `${this.angle}deg`);
        this.childElements.input.value = `${this.angle}`;

        this.addEventListener("mousemove", this.__onMouseMove);

        this.addEventListener("mousedown", this.__onMouseToggle);
        this.addEventListener("mouseup", this.__onMouseToggle);

        this.childElements.input.addEventListener("input", this.__onInputChange);
    }
    disconnectedCallback() {
        this.removeEventListener("mousemove", this.__onMouseMove);

        this.removeEventListener("mousedown", this.__onMouseToggle);
        this.removeEventListener("mouseup", this.__onMouseToggle);

        this.childElements.input.removeEventListener("input", this.__onInputChange);
    }
    
    private __onInputChange = (event: InputEvent) => {
        const input = event.target as HTMLInputElement;
        
        let angle = parseInt(input.value);
        if (isNaN(angle)) angle = 0;
        if (angle > 180) angle = 180;
        if (angle < -180) angle = -180;

        this.angle = angle;
    }
    private __onMouseMove = (event: MouseEvent) => {
        if (!this.mousedown) return;

        let centerX = this.offsetHeight / 2;
        let centerY = this.offsetWidth / 2;
        let radians = Math.atan2(event.offsetX - centerX, event.offsetY - centerY);
        let rawAngle = (radians * (180 / Math.PI) * -1) + 180;
        if (rawAngle > 180) {
            rawAngle = - (360 - rawAngle);
        }

        this.angle = rawAngle;
    }
    private __onMouseToggle = (event: MouseEvent) => {
        if (event.target !== this) return;
        if (event.type === "mousedown") {
            this.mousedown = true;
        } else if (event.type === "mouseup") {
            this.mousedown = false;
        }
    }
}
customElements.define("angle-knob", AngleKnob);
console.log("AngleKnob component loaded.");
