import Gio from "gi://Gio?version=2.0";
import { Plugin } from "../lib";


const plugin = new Plugin({
    name: "Vibe Plugin",
    version: VIBE_PLUGIN_VERSION,
    description: "A nice plugin for the Vibe Music Player!",
    url: "https://github.com/retrozinndev/vibe-plugin",
    implementsSections: true
});

plugin.getSections = (_length?: number) => {
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
};

export default { plugin };
