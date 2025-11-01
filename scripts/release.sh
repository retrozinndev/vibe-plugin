plugin_name=`cat ./package.json | jq -r .name`

while getopts o:r:hg args; do
    case "$args" in 
        o)
            outdir=${OPTARG}
            ;;
        g)
            compile_gresource=true
            ;;
        r)
            gresource_file=${OPTARG}
            ;;
        ? | h)
            echo "\
Vibe plugin's automated release-build script.

help:
  default: argument's default value, they're used if none are provided.

options:
  -g: compile gresource together with the bundled plugin.
  -r \$file: gresource's target path (supports environ, default: 
      \`\\\$XDG_CONFIG_HOME/vibe/plugins/\$plugin-name/resources.gresource\`).
  -o \$path: build output path (default: \`./build/release\`).
  -h: show this help message."
            exit 0
            ;;
    esac
done


sh ./scripts/build.sh -o "${outdir:-./build/release}" \
    `[[ -z $gresource_file ]] && echo -n "-r '${gresource_file}'"` \
    `[[ "$compile_gresource" ]] && echo -n "-g"`

