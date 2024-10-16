module.exports = (function () {

    var tarStream = require('tar-stream');
    var streamx = require('streamx');
    var pakoGzip = require('pako');
    let pathUtil = require('path')
    const buffer = require('buffer')

    const monacoExtMap = {
        "txt": "plaintext",
        "abap": "abap",
        "cls": "apex",
        "azcli": "azcli",
        "bat": "bat",
        "cmd": "bat",
        "bicep": "bicep",
        "mligo": "cameligo",
        "clj": "clojure",
        "cljs": "clojure",
        "cljc": "clojure",
        "edn": "clojure",
        "coffee": "coffeescript",
        "c": "c",
        "h": "c",
        "cpp": "cpp",
        "cc": "cpp",
        "cxx": "cpp",
        "hpp": "cpp",
        "hh": "cpp",
        "hxx": "cpp",
        "cs": "csharp",
        "csx": "csharp",
        "cake": "csharp",
        "css": "css",
        "cypher": "cypher",
        "cyp": "cypher",
        "dart": "dart",
        "dockerfile": "dockerfile",
        "ecl": "ecl",
        "ex": "elixir",
        "exs": "elixir",
        "flow": "flow9",
        "ftl": "freemarker2",
        "ftlh": "freemarker2",
        "ftlx": "freemarker2",
        "fs": "fsharp",
        "fsi": "fsharp",
        "ml": "fsharp",
        "mli": "fsharp",
        "fsx": "fsharp",
        "fsscript": "fsharp",
        "go": "go",
        "graphql": "graphql",
        "gql": "graphql",
        "handlebars": "handlebars",
        "hbs": "handlebars",
        "tf": "hcl",
        "tfvars": "hcl",
        "hcl": "hcl",
        "html": "html",
        "htm": "html",
        "shtml": "html",
        "xhtml": "html",
        "mdoc": "html",
        "jsp": "html",
        "asp": "html",
        "aspx": "html",
        "jshtm": "html",
        "ini": "ini",
        "properties": "ini",
        "gitconfig": "ini",
        "java": "java",
        "jav": "java",
        "js": "javascript",
        "es6": "javascript",
        "jsx": "javascript",
        "mjs": "javascript",
        "cjs": "javascript",
        "json": "json",
        "bowerrc": "json",
        "jshintrc": "json",
        "jscsrc": "json",
        "eslintrc": "json",
        "babelrc": "json",
        "har": "json",
        "jl": "julia",
        "kt": "kotlin",
        "kts": "kotlin",
        "less": "less",
        "lex": "lexon",
        "liquid": "liquid",
        "html.liquid": "liquid",
        "lua": "lua",
        "m3": "m3",
        "i3": "m3",
        "mg": "m3",
        "ig": "m3",
        "md": "markdown",
        "markdown": "markdown",
        "mdown": "markdown",
        "mkdn": "markdown",
        "mkd": "markdown",
        "mdwn": "markdown",
        "mdtxt": "markdown",
        "mdtext": "markdown",
        "mdx": "mdx",
        "s": "mips",
        "dax": "msdax",
        "msdax": "msdax",
        "m": "objective-c",
        "pas": "pascal",
        "p": "pascal",
        "pp": "pascal",
        "ligo": "pascaligo",
        "pl": "perl",
        "pm": "perl",
        "php": "php",
        "php4": "php",
        "php5": "php",
        "phtml": "php",
        "ctp": "php",
        "pla": "pla",
        "dats": "postiats",
        "sats": "postiats",
        "hats": "postiats",
        "pq": "powerquery",
        "pqm": "powerquery",
        "ps1": "powershell",
        "psm1": "powershell",
        "psd1": "powershell",
        "proto": "proto",
        "jade": "pug",
        "pug": "pug",
        "py": "python",
        "rpy": "python",
        "pyw": "python",
        "cpy": "python",
        "gyp": "python",
        "gypi": "python",
        "qs": "qsharp",
        "r": "r",
        "rhistory": "r",
        "rmd": "r",
        "rprofile": "r",
        "rt": "r",
        "cshtml": "razor",
        "redis": "redis",
        "rst": "restructuredtext",
        "rb": "ruby",
        "rbx": "ruby",
        "rjs": "ruby",
        "gemspec": "ruby",
        "pp": "ruby",
        "rs": "rust",
        "rlib": "rust",
        "sb": "sb",
        "scala": "scala",
        "sc": "scala",
        "sbt": "scala",
        "scm": "scheme",
        "ss": "scheme",
        "sch": "scheme",
        "rkt": "scheme",
        "scss": "scss",
        "sh": "shell",
        "bash": "shell",
        "sol": "sol",
        "aes": "aes",
        "rq": "sparql",
        "sql": "sql",
        "st": "st",
        "iecst": "st",
        "iecplc": "st",
        "lc3lib": "st",
        "TcPOU": "st",
        "TcDUT": "st",
        "TcGVL": "st",
        "TcIO": "st",
        "swift": "swift",
        "sv": "systemverilog",
        "svh": "systemverilog",
        "v": "verilog",
        "vh": "verilog",
        "tcl": "tcl",
        "twig": "twig",
        "ts": "typescript",
        "tsx": "typescript",
        "cts": "typescript",
        "mts": "typescript",
        "tsp": "typespec",
        "vb": "vb",
        "wgsl": "wgsl",
        "xml": "xml",
        "xsd": "xml",
        "dtd": "xml",
        "ascx": "xml",
        "csproj": "xml",
        "config": "xml",
        "props": "xml",
        "targets": "xml",
        "wxi": "xml",
        "wxl": "xml",
        "wxs": "xml",
        "xaml": "xml",
        "svg": "xml",
        "svgz": "xml",
        "opf": "xml",
        "xslt": "xml",
        "xsl": "xml",
        "yaml": "yaml",
        "yml": "yaml",

        /* handmade software is the best */
        "html": "html",
        "js": "javascript",
        "cjs": "javascript",
        "mjs": "javascript",
        "md": "markdown",
        "json": "json",
        "txt": "text",
        "css": "css",
        "yaml": "yaml",
        "yml": "yaml",
        "svg": "xml",
        "xml": "xml",
        "ts": "typescript",
        "sql": "sql",


        /* binary formats are encoded in base64 */
        "png": "base64",
        "tiff": "base64",
        "tif": "base64",
        "jpg": "base64",
        "jpeg": "base64",
        "bin": "base64",
        "bmp": "base64",
        "gif": "base64",
        "woff2": "base64",
        "woff": "base64",
        "ttf": "base64",
        "mov": "base64",
        "ico": "base64",
        "eot": "base64",
    }

    /*
     * there is no indication in a tar file of whether a file is binary or textual.
     * we can only make a guess by the extension of the filename.
     ***/
    var computeFormat = (filename) => {
        let ext = pathUtil.extname(filename).substr(1).toLowerCase()

        return monacoExtMap[ext] || "text";
    }

    var convertTarFile = (RED, tgzData, onFinish, onError) => {
        const extract = tarStream.extract()

        var allFiles = [];

        extract.on('entry', function (header, stream, next) {
            // header is the tar header
            // stream is the content body (might be an empty stream)
            // call next when you are done with this entry

            var buffer = [];

            stream.on('data', function (data) {
                buffer.push(data)
            });

            stream.on('end', function () {
                let filenameWithPath = header.name.replace(/^package\//, '')
                let filename = pathUtil.basename(filenameWithPath)
                let frmt = computeFormat(filename);

                allFiles.push({
                    id: RED.util.generateId(),
                    type: "PkgFile",
                    name: filename,
                    filename: filenameWithPath,
                    dirname: pathUtil.dirname(filenameWithPath),
                    template: Buffer.concat(buffer).toString(frmt == "base64" ? 'base64' : 'utf8'),
                    syntax: filename == "package.json" ? "mustache" : "plain",
                    format: frmt,
                    output: "str",
                    x: 0,
                    y: 0,
                    wires: [[]]
                })

                next() // ready for next entry
            })

            stream.resume() // just auto drain the stream
        })

        extract.on('finish', function () {
            allFiles = allFiles.sort((a, b) => { return a.dirname < b.dirname ? -1 : (a.dirname >  b.dirname ? 1 : 0) } )

            for (var idx = 0; idx < allFiles.length; idx++) {
                allFiles[idx].x = 250 * Math.floor(idx / 40)
                allFiles[idx].y = 50 * (idx % 40)
                allFiles[idx].wires = allFiles[idx + 1] ? [[allFiles[idx + 1].id]] : [[]]
            }

            onFinish(allFiles)
        })

        extract.on('error', onError );

        try {
            if (buffer.Buffer.isBuffer(tgzData)) {
                import('file-type').then(module => {
                    module.fileTypeFromBuffer(tgzData).then(filetype => {

                        try {
                            if (filetype && filetype.ext == "tar") {
                                var stream = streamx.Readable.from(tgzData)
                                stream.pipe(extract)
                            } else {
                                var stream = streamx.Readable.from(Buffer.from(pakoGzip.inflate(new Uint8Array(tgzData))))
                                stream.pipe(extract)
                            }
                        } catch (ex) {
                            onError(ex)
                        }

                    }).catch(err => {
                        try {
                            var stream = streamx.Readable.from(Buffer.from(pakoGzip.inflate(new Uint8Array(tgzData))))
                            stream.pipe(extract).catch(onError);
                        } catch (ex) { onError(ex) }
                    })
                }).catch(e => {
                    try {
                        var stream = streamx.Readable.from(Buffer.from(pakoGzip.inflate(new Uint8Array(tgzData))))
                        stream.pipe(extract).catch(onError);
                    } catch (ex) { onError(ex) }
                })
            } else {
                try {
                    var stream = streamx.Readable.from(Buffer.from(pakoGzip.inflate(new Uint8Array(tgzData))))
                    stream.pipe(extract).catch(onError);
                } catch (ex) { onError(ex) }
            }
        } catch (ex) {
            onError(ex)
        }
    }

    let exports = {
        computeFormat: computeFormat,
        convertTarFile: convertTarFile
    }
    
    return exports;
})();
