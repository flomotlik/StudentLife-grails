#!/usr/bin/env python

################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2008 - 2009 1&1 Internet AG, Germany, http://www.1und1.de
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Fabian Jakobs (fjakobs)
#    * Andreas Ecker (ecker)
#
################################################################################

import re, os, sys, optparse, shutil, errno, stat, codecs
from string import Template

import qxenviron
from generator.runtime.Log import Log
from misc import Path


SCRIPT_DIR    = qxenviron.scriptDir
FRAMEWORK_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, os.pardir, os.pardir))
SKELETON_DIR  = unicode(os.path.normpath(os.path.join(FRAMEWORK_DIR, "component", "skeleton")))
APP_TYPES     = [x for x in os.listdir(SKELETON_DIR) if not re.match(r'^\.',x)]

R_ILLEGAL_NS_CHAR = re.compile(r'(?u)[^\.\w]')  # allow unicode, but disallow $


def createApplication(options):
    out = options.out
    if sys.platform == 'win32' and re.match( r'^[a-zA-Z]:$', out):
        out = out + '\\'
    else:
        out = os.path.expanduser(out)

    if not os.path.isdir(out):
        if os.path.isdir(normalizePath(out)):
            out = normalizePath(out)
        else:
            console.error("Output directory '%s' does not exist" % out)
            sys.exit(1)


    outDir = os.path.join(out, options.name)
    copySkeleton(options.skeleton_path, options.type, outDir, options.namespace)

    if options.type == "contribution":
        patchSkeleton(os.path.join(outDir, "trunk"), FRAMEWORK_DIR, options)
    else:
        patchSkeleton(outDir, FRAMEWORK_DIR, options)

    return


def copySkeleton(skeleton_path, app_type, dir, namespace):
    console.log("Copy skeleton into the output directory: %s" % dir)

    def rename_folders(root_dir):
        # rename name space parts of paths

        # rename in class path
        source_dir = os.path.join(root_dir, "source", "class", "custom")
        out_dir    = os.path.join(root_dir, "source", "class")
        expand_dir(source_dir, out_dir, namespace)

        # rename in resource path
        resource_dir = os.path.join(root_dir, "source", "resource", "custom")
        out_dir      = os.path.join(root_dir, "source", "resource")
        expand_dir(resource_dir, out_dir, namespace)

    template = os.path.join(skeleton_path, app_type)
    if not os.path.isdir(template):
        console.error("Unknown application type '%s'." % app_type)
        sys.exit(1)

    try:
        shutil.copytree(template, dir)
    except OSError:
        console.error("Failed to copy skeleton, maybe the directory already exists")
        sys.exit(1)

    if app_type == "contribution":
        app_dir = os.path.join(dir, "trunk")
    else:
        app_dir = dir

    rename_folders(app_dir)
    if app_type == "contribution":
        rename_folders(os.path.join(app_dir, "demo", "default"))

    #clean svn directories
    for root, dirs, files in os.walk(dir, topdown=False):
        if ".svn" in dirs:
            filename = os.path.join(root, ".svn")
            shutil.rmtree(filename, ignore_errors=False, onerror=handleRemoveReadonly)


def expand_dir(indir, outroot, namespace):
    "appends namespace parts to outroot, and renames indir to the last part"
    if not (os.path.isdir(indir) and os.path.isdir(outroot)):
        return
    ns_parts = namespace.split('.')
    target   = outroot
    for part in ns_parts:
        target = os.path.join(target, part)
        if part == ns_parts[-1]: # it's the last part
            os.rename(indir, target)
        else:
            os.mkdir(target)

def patchSkeleton(dir, framework_dir, options):
    absPath = normalizePath(framework_dir)
    if absPath[-1] == "/":
        absPath = absPath[:-1]

    if sys.platform == 'cygwin':
        if re.match( r'^\.{1,2}\/', dir ):
            relPath = Path.rel_from_to(normalizePath(dir), framework_dir)
        elif re.match( r'^/cygdrive\b', dir):
            relPath = Path.rel_from_to(dir, framework_dir)
        else:
            relPath = Path.rel_from_to(normalizePath(dir), normalizePath(framework_dir))
    else:
        relPath = Path.rel_from_to(normalizePath(dir), normalizePath(framework_dir))

    relPath = re.sub(r'\\', "/", relPath)
    if relPath[-1] == "/":
        relPath = relPath[:-1]

    if not os.path.isdir(os.path.join(dir, relPath)):
        console.error("Relative path to qooxdoo directory is not correct: '%s'" % relPath)
        sys.exit(1)

    if options.type == "contribution":
        # TODO: in a final release the following "trunk" would need to be changed 
        # to an actual version number like "0.8.3"
        relPath = os.path.join(os.pardir, os.pardir, "qooxdoo", "0.8.3")
        relPath = re.sub(r'\\', "/", relPath)

    for root, dirs, files in os.walk(dir):
        for file in files:
            split = file.split(".")
            if len(split) >= 3 and split[1] == "tmpl":
                outFile = os.path.join(root, split[0] + "." + ".".join(split[2:]))
                inFile = os.path.join(root, file)
                console.log("Patching file '%s'" % outFile)

                config = Template(open(inFile).read())
                out = open(outFile, "w")
                out.write(
                    config.substitute({
                        "Name": options.name,
                        "Namespace": options.namespace,
                        "REL_QOOXDOO_PATH": relPath,
                        "ABS_QOOXDOO_PATH": absPath,
                        "QOOXDOO_VERSION": "0.8.3",
                        "Cache" : options.cache,
                    }).encode('utf-8')
                )
                out.close()
                os.remove(inFile)

    for root, dirs, files in os.walk(dir):
        for file in [file for file in files if file.endswith(".py")]:
            os.chmod(os.path.join(root, file), (stat.S_IRWXU
                                               |stat.S_IRGRP |stat.S_IXGRP
                                               |stat.S_IROTH |stat.S_IXOTH)) # 0755



def handleRemoveReadonly(func, path, exc):
# For Windows the 'readonly' must not be set for resources to be removed
    excvalue = exc[1]
    if func in (os.rmdir, os.remove) and excvalue.errno == errno.EACCES:
        os.chmod(path, stat.S_IRWXU| stat.S_IRWXG| stat.S_IRWXO) # 0777
        func(path)
    else:
        raise


def normalizePath(path):
# Fix Windows annoyance to randomly return drive letters uppercase or lowercase.
# Under Cygwin the user could also supply a lowercase drive letter. For those
# two systems, the drive letter is always converted to uppercase, the remaining
# path to lowercase

    if not sys.platform == 'win32' and not sys.platform == 'cygwin':
        return path

    path = re.sub(r'\\+', "/", path)

    if sys.platform == 'cygwin':
        search = re.match( r'^/cygdrive/([a-zA-Z])(/.*)$', path)
        if search:
            return search.group(1).upper() + ":" + search.group(2).lower()

    search = re.match( r'^([a-zA-Z])(:.*)$', path )
    if search:
        return search.group(1).upper() + search.group(2).lower()

    return path


def main():
    parser = optparse.OptionParser()

    parser.set_usage('''\
%prog --name APPLICATIONNAME [--out DIRECTORY]
                             [--namespace NAMESPACE] [--type TYPE]
                             [-logfile LOGFILE] [--skeleton-path PATH]

Script to create a new qooxdoo application.

Example: For creating a regular GUI application \'myapp\' you could execute:
  %prog --name myapp''')

    parser.add_option(
        "-n", "--name", dest="name", metavar="APPLICATIONNAME",
        help="Name of the application. An application folder with identical name will be created. (Required)"
    )
    parser.add_option(
        "-o", "--out", dest="out", metavar="DIRECTORY", default=".",
        help="Output directory for the application folder. (Default: %default)"
    )
    parser.add_option(
        "-s", "--namespace", dest="namespace", metavar="NAMESPACE", default=None,
        help="Applications's top-level namespace. (Default: APPLICATIONNAME)"
    )
    parser.add_option(
        "-t", "--type", dest="type", metavar="TYPE", default="gui",
        help="Type of the application to create, one of: "+str(APP_TYPES)+"." +
          "'gui' builds a standard qooxdoo GUI application, " +
          "'inline' builds a inline qooxdoo GUI application, " +
          "'migration' should " +
          "be used to migrate qooxdoo 0.7 applications and " +
          "'bom' can be used " +
          "to build low-level qooxdoo applications. (Default: %default)"
     )
    parser.add_option(
        "-l", "--logfile", dest="logfile", metavar="LOGFILE",
        default=None, type="string", help="Log file"
    )
    parser.add_option(
        "-p", "--skeleton-path", dest="skeleton_path", metavar="PATH", default=SKELETON_DIR,
        help="(Advanced) Path where the script looks for skeletons. " +
          "The directory must contain sub directories named by " +
          "the application types. (Default: %default)"
    )
    parser.add_option(
        "--cache", dest="cache", metavar="PATH", default="${TMPDIR}/cache",
        help="Path to the cache directory; will be entered into config.json's CACHE macro (Default: %default)"
    )

    (options, args) = parser.parse_args(sys.argv[1:])

    if not options.name:
        parser.print_help()
        sys.exit(1)
    else:
        options.name = options.name.decode('utf-8')

    # Initialize console
    global console
    console = Log(options.logfile, "info")

    if not options.namespace:
        options.namespace = options.name.lower()
    else:
        options.namespace = options.namespace.decode('utf-8')

    if R_ILLEGAL_NS_CHAR.search(options.namespace):
        convertedNamespace = R_ILLEGAL_NS_CHAR.sub("_", options.namespace)
        console.log("WARNING: Converted illegal characters in namespace (from %s to %s)" % (options.namespace, convertedNamespace))
        options.namespace = convertedNamespace

    createApplication(options)

    console.log("DONE")


if __name__ == '__main__':
    try:
        main()

    except KeyboardInterrupt:
        print
        print "Keyboard interrupt!"
        sys.exit(1)
