import Gio from "gi://Gio?version=2.0";
import { Plugin } from "../lib";
import { Section } from "../lib/src/vibe";

export default class VibePlugin extends Plugin {
    get name(): string {
        return "Vibe Plugin";
    }

    description: string = "A nice plugin for the Vibe Music Player!";
    get url(): string {
        return "https://github.com/retrozinndev/vibe-plugin"
    }
    get version(): string {
        return VIBE_PLUGIN_VERSION; // will be replaced to the version defined in package.json, at compile-time
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
        ]
    }
}
