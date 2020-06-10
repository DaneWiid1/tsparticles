import type { IBubble } from "../../../Interfaces/Interactivity/Modes/IBubble";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { OptionsColor } from "../../OptionsColor";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
import { BubbleDiv } from "./BubbleDiv";

export class Bubble implements IBubble {
    public distance: number;
    public duration: number;
    public opacity?: number;
    public size?: number;
    public color?: SingleOrMultiple<OptionsColor>;
    public divs?: SingleOrMultiple<BubbleDiv>;

    constructor() {
        this.distance = 200;
        this.duration = 0.4;
    }

    public load(data?: RecursivePartial<IBubble>): void {
        if (data !== undefined) {
            if (data.distance !== undefined) {
                this.distance = data.distance;
            }

            if (data.duration !== undefined) {
                this.duration = data.duration;
            }

            if (data.opacity !== undefined) {
                this.opacity = data.opacity;
            }

            if (data.color !== undefined) {
                if (data.color instanceof Array) {
                    this.color = data.color.map((s) => OptionsColor.create(undefined, s));
                } else {
                    if (this.color instanceof Array) {
                        this.color = new OptionsColor();
                    }

                    this.color = OptionsColor.create(this.color, data.color);
                }
            }

            if (data.size !== undefined) {
                this.size = data.size;
            }

            if (data.divs !== undefined) {
                if (data.divs instanceof Array) {
                    this.divs = data.divs.map((s) => {
                        const tmp = new BubbleDiv();

                        tmp.load(s);

                        return tmp;
                    });
                } else {
                    if (this.divs instanceof Array || !this.divs) {
                        this.divs = new BubbleDiv();
                    }

                    this.divs.load(data.divs);
                }
            }
        }
    }
}
