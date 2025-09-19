import Gio from "gi://Gio?version=2.0";

import { Plugin } from "libvibe";
import { Section } from "libvibe/src/vibe";


export default class extends Plugin {
    constructor() {
        super({
            name: "Vibe Plugin",
            version: VIBE_PLUGIN_VERSION,
            description: "A nice plugin for the Vibe Music Player!",
            url: "https://github.com/retrozinndev/vibe-plugin",
            implements: {
                sections: true
            }
        });
    }

    getSections(_length?: number): Array<Section> | null {
        return [
            {
                title: "Section 1",
                description: "This section is pretty nice!",
                headerButtons: [{
                    label: "See developer's website",
                    onClicked: () => Gio.Subprocess.new([
                        "xdg-open",
                        "https://retrozinndev.github.io"
                    ], Gio.SubprocessFlags.NONE)
                }]
            },
            {
                title: "Section 2",
                description: "Looking nice, section 2!!"
            }
        ];
    }
}
