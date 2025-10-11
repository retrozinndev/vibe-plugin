import * as Libvibe from "libvibe";

declare global {
    const libvibe: typeof Libvibe;
    const VIBE_PLUGIN_VERSION: string;
    const DEVEL: boolean;
    const GRESOURCES_FILE: string;
};
