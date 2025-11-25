// @ts-check
import Gio from "gi://Gio?version=2.0";

// This overrides the imports of the plugin output to the 
// same way as the app exports the library.
// See https://github.com/retrozinndev/vibe/blob/main/src/plugins/exports.ts


// js file is the first argument(1 because the first is the command line)
const file = Gio.File.new_for_path(ARGV[1] ?? "./build/plugin.js");

if(!file.query_exists(null))
    throw new Error(`file with path "${file.peek_path()}" doesn't exist or is not accessible`);

const inputStream = file.read(null);

const fileInfo = file.query_info("standard::*", Gio.FileQueryInfoFlags.NOFOLLOW_SYMLINKS, null);
const uintArray = inputStream.read_bytes(fileInfo.get_size(), null).toArray();


const content = new TextDecoder().decode(uintArray);

const finalContent = content.replace(
    /(import|export) (.*) from \"libvibe(\/.*)?\"/g, 
    (_, keyword, objects, path) => {
        objects = objects.trim();

        // ignore interfaces import, since it's just a type module (usually esbuild will already do this)
        if(path !== undefined && /interfaces/.test(path))
            return "";

        return `${keyword === "export" ? 
                "export "
            : ""
        }const ${objects} = libvibe${path !== undefined ? 
                path.replace('/', '.')
            : ".vibe"}`;
    }
);

file.replace_contents(
    new TextEncoder().encode(finalContent),
    null,
    false,
    Gio.FileCreateFlags.REPLACE_DESTINATION,
    null
);
