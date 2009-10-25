#!/usr/bin/env python

################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2006-2009 1&1 Internet AG, Germany, http://www.1und1.de
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Thomas Herchenroeder (thron7)
#
################################################################################

import os, sys, string, types, re, zlib
import urllib, urlparse, optparse
import simplejson
from generator.action.ImageInfo import ImageInfo, ImgInfoFmt
from generator.config.Lang import Lang
from ecmascript import compiler
from misc import filetool, Path
from misc.ExtMap import ExtMap
from misc.Path import OsPath, Uri
        

console = None

class CodeGenerator(object):

    def __init__(self, cache, console_, config, job, settings, locale, resourceHandler, classes):
        global console
        self._cache   = cache
        self._console = console_
        self._config  = config
        self._job     = job
        self._settings     = settings
        self._locale     = locale
        self._resourceHandler = resourceHandler
        self._classes = classes

        console = console_



    def runCompiled(self, script, treeCompiler):

        def getAppName(memo={}):
            if not 'appname' in memo:
                appname = self._job.get("let/APPLICATION")
                if not appname:
                    raise RuntimeError, "Need an application name in config (key let/APPLICATION)"
                else:
                    memo['appname'] = appname
            return memo['appname']

        def getOutputFile():
            filePath = compConf.get("paths/file")
            if not filePath:
                filePath = os.path.join("build", "script", getAppName() + ".js")
            return filePath

        def getFileUri(scriptUri):
            appfile = os.path.basename(fileRelPath)
            fileUri = os.path.join(scriptUri, appfile)  # make complete with file name
            fileUri = Path.posifyPath(fileUri)
            return fileUri

        def generateBootScript(bootPackage=""):

            def packagesOfFiles(fileUri, packages):
                # returns list of lists, each containing destination file name of the corresp. part
                # npackages = [['script/gui-0.js'], ['script/gui-1.js'],...]
                npackages = []
                file = os.path.basename(fileUri)
                for packageId in range(len(packages)):
                    packageFileName = self._resolveFileName(file, variants, settings, packageId)
                    npackages.append((packageFileName,))
                return npackages

            self._console.info("Generating boot script...")
            bootBlocks = []

            # For resource list
            resourceUri = compConf.get('uris/resource', 'resource')
            resourceUri = Path.posifyPath(resourceUri)

            globalCodes = self.generateGlobalCodes(libs, translationMaps, settings, variants, format, resourceUri, scriptUri)

            filesPackages = packagesOfFiles(fileUri, packages)
            bootBlocks.append(self.generateBootCode(parts, filesPackages, boot, variants, settings, bootPackage, globalCodes, "build", format))

            if format:
                bootContent = "\n\n".join(bootBlocks)
            else:
                bootContent = "".join(bootBlocks)

            return bootContent

        def writePackages(compiledPackages, startId=0):
            for packageId, content in enumerate(compiledPackages):
                writePackage(content, startId + packageId)
            return

        def writePackage(content, packageId=""):
            # Construct file name
            resolvedFilePath = self._resolveFileName(filePath, variants, settings, packageId)

            # Save result file
            filetool.save(resolvedFilePath, content)

            if compConf.get("paths/gzip"):
                filetool.gzip(resolvedFilePath, content)

            self._console.debug("Done: %s" % self._computeContentSize(content))
            self._console.debug("")

            return

        # ----------------------------------------------------------------------

        if not self._job.get("compile-dist", False):
            return

        packages   = script.packages
        parts      = script.parts
        boot       = script.boot
        variants   = script.variants
        classList  = script.classes

        self._treeCompiler = treeCompiler
        self._classList    = classList

        compConf = ExtMap(self._job.get("compile-dist"))

        # Read in base file name
        fileRelPath = getOutputFile()
        filePath    = self._config.absPath(fileRelPath)

        # Read in uri prefixes
        scriptUri = compConf.get('uris/script', 'script')
        scriptUri = Path.posifyPath(scriptUri)
        fileUri = getFileUri(scriptUri)

        # Read in compiler options
        optimize = compConf.get("code/optimize", [])
        self._treeCompiler.setOptimize(optimize)

        # Whether the code should be formatted
        format = compConf.get("code/format", False)

        # Read in settings
        settings = self.getSettings()

        # Get translation maps
        locales = compConf.get("code/locales", [])
        translationMaps = self.getTranslationMaps(packages, variants, locales)

        libs = self._job.get("library", [])

        # Generating packages
        self._console.info("Generating packages...")
        self._console.indent()

        bootPackage = ""
        compiledPackages = []
        for packageId, classes in enumerate(packages):
            self._console.info("Compiling package #%s:" % packageId, False)
            self._console.indent()

            # Compile file content
            compiledContent = self._treeCompiler.compileClasses(classes, variants, optimize, format)
            compiledPackages.append(compiledContent)

            self._console.debug("Done: %s" % self._computeContentSize(compiledContent))
            self._console.outdent()

        self._console.outdent()

        # Generating boot script
        if not len(compiledPackages):
            raise RuntimeError("No valid boot package generated.")

        if self._job.get("packages/loader-with-boot", True):
            content = generateBootScript(compiledPackages[0])
            writePackage(content)
            writePackages(compiledPackages[1:], 1)
        else:
            content = generateBootScript()
            writePackage(content)
            writePackages(compiledPackages)

        return


    def runSource(self, script, libs, classes):
        if not self._job.get("compile-source/file"):
            return

        self._console.info("Generate source version...")
        self._console.indent()

        packages   = script.packages
        parts      = script.parts
        boot       = script.boot
        variants   = script.variants
        classList  = script.classes

        self._classList = classList
        self._libs      = libs
        self._classes   = classes

        # Read in base file name
        filePath = self._job.get("compile-source/file")
        #if variants:
        #    filePath = self._makeVariantsName(filePath, variants)
        filePath = self._config.absPath(filePath)

        # Whether the code should be formatted
        format = self._job.get("compile-source/format", False)

        # The place where the app HTML ("index.html") lives
        self.approot = self._config.absPath(self._job.get("compile-source/root", ""))

        # Read in settings
        settings = self.getSettings()

        # Get resource list
        libs = self._job.get("library", [])

        # Get translation maps
        locales = self._job.get("compile-source/locales", [])
        translationMaps = self.getTranslationMaps(packages, variants, locales)

        # Add data from settings, variants and packages
        sourceBlocks = []
        globalCodes = self.generateGlobalCodes(libs, translationMaps, settings, variants, format)
        #sourceBlocks.append(self.generateSourcePackageCode(parts, packages, boot, globalCodes, format))
        sourceBlocks.append(self.generateBootCode(parts, packages, boot, variants={}, settings={}, bootCode=None, globalCodes=globalCodes, format=format))

        # TODO: Do we really need this optimization here. Could this be solved
        # with less resources just through directly generating "good" code?
        self._console.info("Generating boot loader...")
        if format:
            sourceContent = "\n\n".join(sourceBlocks)
        else:
            sourceContent = "".join(sourceBlocks)

        # Construct file name
        resolvedFilePath = self._resolveFileName(filePath, variants, settings)

        # Save result file
        filetool.save(resolvedFilePath, sourceContent)

        if self._job.get("compile-source/gzip"):
            filetool.gzip(resolvedFilePath, sourceContent)

        self._console.outdent()
        self._console.debug("Done: %s" % self._computeContentSize(sourceContent))
        self._console.outdent()


    def runPrettyPrinting(self, classes, treeLoader):
        "Gather all relevant config settings and pass them to the compiler"

        if not isinstance(self._job.get("pretty-print", False), types.DictType):
            return

        self._console.info("Pretty-printing code...")
        self._console.indent()
        ppsettings = ExtMap(self._job.get("pretty-print"))  # get the pretty-print config settings

        # init options
        parser  = optparse.OptionParser()
        compiler.addCommandLineOptions(parser)
        (options, args) = parser.parse_args([])

        # modify according to config
        setattr(options, 'prettyPrint', True)  # turn on pretty-printing
        if ppsettings.get('general/indent-string',False):
            setattr(options, 'prettypIndentString', ppsettings.get('general/indent-string'))
        if ppsettings.get('comments/trailing/keep-column',False):
            setattr(options, 'prettypCommentsTrailingKeepColumn', ppsettings.get('comments/trailing/keep-column'))
        if ppsettings.get('comments/trailing/comment-cols',False):
            setattr(options, 'prettypCommentsTrailingCommentCols', ppsettings.get('comments/trailing/comment-cols'))
        if ppsettings.get('comments/trailing/padding',False):
            setattr(options, 'prettypCommentsInlinePadding', ppsettings.get('comments/trailing/padding'))
        if ppsettings.get('blocks/align-with-curlies',False):
            setattr(options, 'prettypAlignBlockWithCurlies', ppsettings.get('blocks/align-with-curlies'))
        if ppsettings.get('blocks/open-curly/newline-before',False):
            setattr(options, 'prettypOpenCurlyNewlineBefore', ppsettings.get('blocks/open-curly/newline-before'))
        if ppsettings.get('blocks/open-curly/indent-before',False):
            setattr(options, 'prettypOpenCurlyIndentBefore', ppsettings.get('blocks/open-curly/indent-before'))

        self._console.info("Pretty-printing files: ", False)
        numClasses = len(classes)
        for pos, classId in enumerate(classes):
            self._console.progress(pos, numClasses)
            tree = treeLoader.getTree(classId)
            compiled = compiler.compile(tree, options)
            filetool.save(self._classes[classId]['path'], compiled)

        self._console.outdent()

        return


    def getSettings(self):
        # TODO: Runtime settings support is currently missing
        settings = {}
        settingsConfig = self._job.get("settings", {})
        settingsRuntime = self._settings

        for key in settingsConfig:
            settings[key] = settingsConfig[key]

        for key in settingsRuntime:
            settings[key] = settingsRuntime[key]

        return settings


    def _resolveFileName(self, fileName, variants=None, settings=None, packageId=""):
        if variants:
            for key in variants:
                pattern = "{%s}" % key
                fileName = fileName.replace(pattern, str(variants[key]))

        if settings:
            for key in settings:
                pattern = "{%s}" % key
                fileName = fileName.replace(pattern, str(settings[key]))

        if packageId != "":
            fileName = fileName.replace(".js", "-%s.js" % packageId)

        return fileName


    def _computeContentSize(self, content):
        # Convert to utf-8 first
        content = unicode(content).encode("utf-8")

        # Calculate sizes
        origSize = len(content)
        compressedSize = len(zlib.compress(content, 9))

        return "%sKB / %sKB" % (origSize/1024, compressedSize/1024)


    def _computeResourceUri(self, lib, resourcePath, rType="class", appRoot=None):
        '''computes a complete resource URI for the given resource type rType, 
           from the information given in lib and, if lib doesn't provide a
           general uri prefix for it, use appRoot and lib path to construct
           one'''

        if 'uri' in lib:
            libBaseUri = OsPath(lib['uri'])
        elif appRoot:
            libBaseUri = OsPath(Path.rel_from_to(self._config.absPath(appRoot), lib['path']))
        else:
            raise RuntimeError, "Need either lib['uri'] or appRoot, to calculate final URI"
        libBaseUri = Uri(libBaseUri.toUri())

        if rType in lib:
            libInternalPath = OsPath(lib[rType])
        else:
            raise RuntimeError, "No such resource type: \"%s\"" % rType

        # process the second part of the target uri
        uri = libInternalPath.join(resourcePath)
        uri = Uri(uri.toUri())

        libBaseUri.ensureTrailingSlash()
        uri = libBaseUri.join(uri)

        return uri


    def _makeVariantsName(self, pathName, variants):
        (newname, ext) = os.path.splitext(pathName)
        for key in variants:
            newname += "_%s:%s" % (str(key), str(variants[key]))
        newname += ext
        return newname


    def generateGlobalCodes(self, libs, translationMaps, settings, variants, format=False, resourceUri=None, scriptUri=None):
        # generate the global codes like qxlibraries, qxresources, ...
        # and collect them in a common structure

        def mergeTranslationMaps(transMaps):
            # translationMaps is a pair (po-data, cldr-data) per package:
            # translationMaps = [({'C':{},..},{'C':{},..}), (.,.), ..]
            # this function merges all [0] elements into a common dict, and
            # all [1] elements:
            # return = ({'C':{},..}, {'C':{},..})
            poData = {}
            cldrData = {}

            for pac_dat, loc_dat in transMaps:
                for loc in pac_dat:
                    if loc not in poData:
                        poData[loc] = {}
                    poData[loc].update(pac_dat[loc])
                for loc in loc_dat:
                    if loc not in cldrData:
                        cldrData[loc] = {}
                    cldrData[loc].update(loc_dat[loc])

            return (poData, cldrData)


        globalCodes  = {}

        globalCodes["Settings"] = simplejson.dumps(settings, ensure_ascii=False)

        variantInfo = self.generateVariantsCode(variants)
        globalCodes["Variants"] = simplejson.dumps(variantInfo,ensure_ascii=False)

        mapInfo = self.generateLibInfoCode(libs,format, resourceUri, scriptUri)
        globalCodes["Libinfo"] = simplejson.dumps(mapInfo,ensure_ascii=False)

        mapInfo = self.generateResourceInfoCode(settings, libs, format)
        globalCodes["Resources"] = simplejson.dumps(mapInfo,ensure_ascii=False)

        locData = mergeTranslationMaps(translationMaps)
        globalCodes["Translations"] = simplejson.dumps(locData[0],ensure_ascii=False) # 0: .po data
        globalCodes["Locales"]      = simplejson.dumps(locData[1],ensure_ascii=False) # 1: cldr data

        return globalCodes


    def generateVariantsCode(self, variants):
        variats = {}

        for key in variants:
            if key in Lang.META_KEYS:
                continue
            variats[key] = variants[key]

        return variats


    def getTranslationMaps(self, packages, variants, locales):
        if "C" not in locales:
            locales.append("C")

        self._console.info("Processing translation for %s locales..." % len(locales))
        self._console.indent()

        packageTranslation = []
        for pos, classes in enumerate(packages):
            self._console.debug("Package: %s" % pos)
            self._console.indent()

            # wpbasti: TODO: This code includes localization in every package. Bad idea.
            # This needs further work

            # Another thing: Why not generate both structures in different js-objects
            # It's totally easy in JS to build a wrapper.
            # [thron7] means: generate different data structs for locales and translations
            pac_dat = self._locale.generatePackageData(classes, variants, locales) # .po data
            loc_dat = self._locale.getLocalizationData(locales)  # cldr data
            packageTranslation.append((pac_dat,loc_dat))

            self._console.outdent()

        self._console.outdent()
        return packageTranslation


    def generateLibInfoCode(self, libs, format, forceResourceUri=None, forceScriptUri=None):
        qxlibs = {}

        for lib in libs:
            # add library key
            qxlibs[lib['namespace']] = {}

            # add resource root URI
            if forceResourceUri:
                resUriRoot = forceResourceUri
            else:
                resUriRoot = self._computeResourceUri(lib, OsPath(""), rType="resource", appRoot=self.approot)
                resUriRoot = resUriRoot.encodedValue()
                
            qxlibs[lib['namespace']]['resourceUri'] = "%s" % (resUriRoot,)
            
            # add code root URI
            if forceScriptUri:
                sourceUriRoot = forceScriptUri
            else:
                sourceUriRoot = self._computeResourceUri(lib, OsPath(""), rType="class", appRoot=self.approot)
                sourceUriRoot = sourceUriRoot.encodedValue()
            
            qxlibs[lib['namespace']]['sourceUri'] = "%s" % (sourceUriRoot,)
            
            # TODO: Add version, svn revision, maybe even authors, but at least homepage link, ...

            # add version info
            if 'version' in lib:
                qxlibs[lib['namespace']]['version'] = "%s" % lib['version']

        return qxlibs


    def generateResourceInfoCode(self, settings, libs, format=False):
        """Pre-calculate image information (e.g. sizes)"""
        data    = {}
        resdata = data
        imgpatt  = re.compile(r'\.(png|jpeg|jpg|gif)$', re.I)
        skippatt = re.compile(r'\.(meta|py)$', re.I)

        self._console.info("Analysing assets...")
        self._console.indent()

        self._imageInfo      = ImageInfo(self._console, self._cache)

        # some helper functions

        def replaceWithNamespace(imguri, liburi, libns):
            pre,libsfx,imgsfx = Path.getCommonPrefix(liburi, imguri)
            if imgsfx[0] == os.sep: imgsfx = imgsfx[1:]  # strip leading '/'
            imgshorturi = os.path.join("${%s}" % libns, imgsfx)
            return imgshorturi

        def extractAssetPart(libresuri, imguri):
            pre,libsfx,imgsfx = Path.getCommonPrefix(libresuri, imguri) # split libresuri from imguri
            if imgsfx[0] == os.sep: imgsfx = imgsfx[1:]  # strip leading '/'
            return imgsfx                # use the bare img suffix as its asset Id

        ##
        # calculate the uri of the clipped image, by taking the uri of the combined image,
        # "substracting" its asset id (the right end), taking what remains (the left
        # part), extracting the asset id of the clipped image, and pre-fixing it with the
        # left part of the combined image uri.
        # imageUri = (combinedUri - combinedAssetId) + imageAssetId
        #
        # @param uriFromMetafile |String| the path of the clipped image from when the meta file was generated,
        #                                 like: "./source/resource/qx/decoration/Modern/..."
        # @param trueCombinedUri |String| the uri of the combined image, as returned from
        #                                 the library scan and adapted for the current
        #                                 application, like: 
        #                                 "../../framework/source/resource/qx/decoration/Modern/panel-combined.png"
        # @param combinedUriFromMetafile |String| the path of the combined image, as
        #                                         recorded in the .meta file

        def normalizeImgUri(uriFromMetafile, trueCombinedUri, combinedUriFromMetafile):
            # normalize paths (esp. "./x" -> "x")
            (uriFromMetafile, trueCombinedUri, combinedUriFromMetafile) = map(os.path.normpath,
                                                    (uriFromMetafile, trueCombinedUri, combinedUriFromMetafile))
            # get the "wrong" left part of the combined image, as used in the .meta file (in mappedUriPrefix)
            trueUriPrefix, mappedUriPrefix, _ = Path.getCommonSuffix(trueCombinedUri, combinedUriFromMetafile)
            # ...and strip it from clipped image, to get a correct image id (in uriSuffix)
            _, _, uriSuffix = Path.getCommonPrefix(mappedUriPrefix, uriFromMetafile)
            # ...then compose the correct prefix with the correct suffix
            normalUri = os.path.normpath(os.path.join(trueUriPrefix, uriSuffix))
            return normalUri

        ##
        # - reads through the entries of a .meta file, which is the contents of a combined image
        # - for each contained image:
        #   - computes the image id ("short uri")
        #   - collects the list of interesting values (width, height, ..., combined image, ...)
        #   - and adds these as key:value to the general data map of images
        #
        # @param data |{imageId:[width, height, ...]}|  general map for qx.$$resource in loader
        # @param meta_fname |String| file path of the .meta file
        # @param combinedImageUri |String| uri of the combined image
        # @param combinedImageShortUri |String| short uri (image/asset id) of the combined image
        #                              these are necessary to compute the image id's of the contained imgs
        # @param combinedImageObject |ImgInfoFmt| an ImgInfoFmt wrapper object for the combined image
        #                             (interesting for the lib and type info)

        def processCombinedImg(data, meta_fname, combinedImageUri, combinedImageShortUri, combinedImageObject):
            # make sure lib and type info for the combined image are present
            assert combinedImageObject.lib, combinedImageObject.type

            # see if we have cached the contents (json) of this .meta file
            cacheId = "imgcomb-%s" % meta_fname
            imgDict = self._cache.read(cacheId, meta_fname)
            if imgDict == None:
                mfile = open(meta_fname)
                imgDict = simplejson.loads(mfile.read())
                mfile.close()
                self._cache.write(cacheId, imgDict)

            # now loop through the dict structure from the .meta file
            for imagePath, imageSpec_ in imgDict.items():
                # sort of like this: imagePath : [width, height, type, combinedUri, off-x, off-y]

                imageObject = ImgInfoFmt(imageSpec_) # turn this into an ImgInfoFmt object, to abstract from representation in .meta file and loader script

                # have to normalize the uri's from the meta file
                #imageUri = normalizeImgUri(imagePath, combinedImageUri, imageObject.mappedId)
                imageUri = imagePath

                ## replace lib uri with lib namespace in imageUri
                imageShortUri = extractAssetPart(librespath, imageUri)
                imageShortUri = Path.posifyPath(imageShortUri)

                # now put all elements of the image object together
                imageObject.mappedId = combinedImageShortUri        # correct the mapped uri of the combined image
                imageObject.lib      = combinedImageObject.lib
                imageObject.mtype    = combinedImageObject.type
                imageObject.mlib     = combinedImageObject.lib

                # and store it in the data structure
                data[imageShortUri]  = imageObject.flatten()  # this information takes precedence over existing

            return


        # -- main --------------------------------------------------------------

        resourceFilter= self._resourceHandler.getResourceFilterByAssets(self._classList)

        for lib in libs:
            #libresuri = self._computeResourceUri(lib, "", rType='resource', appRoot=self.approot)
            librespath = os.path.normpath(os.path.join(lib['path'], lib['resource']))
            resourceList = self._resourceHandler.findAllResources([lib], resourceFilter)
            # resourceList = [[file1,uri1],[file2,uri2],...]
            for resource in resourceList:
                ##assetId = replaceWithNamespace(imguri, libresuri, lib['namespace'])
                #assetId = extractAssetPart(libresuri, resource[1])
                assetId = extractAssetPart(librespath,resource)
                assetId = Path.posifyPath(assetId)

                if imgpatt.search(resource): # handle images
                    imgpath= resource
                    #imguri = resource[1]
                    imguri = resource
                    imageInfo = self._imageInfo.getImageInfo(imgpath, assetId)

                    # use an ImgInfoFmt object, to abstract from flat format
                    imgfmt = ImgInfoFmt()
                    imgfmt.lib = lib['namespace']
                    if not 'type' in imageInfo:
                        raise RuntimeError, "Unable to get image info from file: %s" % imgpath
                    imgfmt.type = imageInfo['type']

                    # check for a combined image and process the contained images
                    meta_fname = os.path.splitext(imgpath)[0]+'.meta'
                    if os.path.exists(meta_fname):  # add included imgs
                        processCombinedImg(data, meta_fname, imguri, assetId, imgfmt)

                    # add this image directly
                    # imageInfo = {width, height, filetype}
                    if not 'width' in imageInfo or not 'height' in imageInfo:
                        raise RuntimeError, "Unable to get image info from file: %s" % imgpath
                    imgfmt.width, imgfmt.height, imgfmt.type = (
                        imageInfo['width'], imageInfo['height'], imageInfo['type'])
                    # check if img is already registered as part of a combined image
                    if assetId in data:
                        x = ImgInfoFmt()
                        x.fromFlat(data[assetId])
                        if x.mappedId:
                            continue  # don't overwrite the combined entry
                    data[assetId] = imgfmt.flatten()

                elif skippatt.search(resource[0]):
                    continue

                else:  # handle other resources
                    resdata[assetId] = lib['namespace']


        # wpbasti: Image data is not part relevant yet.

        self._console.outdent()

        return resdata


    def generateBootCode(self, parts, packages, boot, variants, settings, bootCode, globalCodes, version="source", format=False):
        # returns the Javascript code for the initial ("boot") script as a string 

        def partsMap(parts):
            # create a map with part names as key and array of package id's and
            # return as string

            # <parts> is already a suitable map; just serialize it
            partData = simplejson.dumps(parts, ensure_ascii=False, separators=(',', ':'))

            return partData

        def fillTemplate(vals, template):
            # Fill the code template with various vals 
            templ  = MyTemplate(template)
            result = templ.safe_substitute(vals)

            return result

        def packageUrisToJS(packages, version):
            # Translate URI data to JavaScript
            
            allUris = []
            for packageId, package in enumerate(packages):
                packageUris = []
                for fileId in package:

                    if version == "build":
                        # TODO: gosh, the next is an ugly hack!
                        namespace= self._resourceHandler._genobj._namespaces[0]  # all name spaces point to the same paths in the libinfo struct, so any of them will do
                        relpath    = OsPath(fileId)
                    else:
                        namespace  = self._classes[fileId]["namespace"]
                        relpath    = OsPath(self._classes[fileId]["relpath"])

                    shortUri = Uri(relpath.toUri())
                    packageUris.append("%s:%s" % (namespace, shortUri.encodedValue()))
                allUris.append(packageUris)

            uriData = simplejson.dumps(allUris, ensure_ascii=False)

            return uriData

        def loadTemplate(bootCode):
            if bootCode:
                loaderFile = os.path.join(filetool.root(), os.pardir, "data", "generator", "loader-build.tmpl.js")
            else:
                loaderFile = os.path.join(filetool.root(), os.pardir, "data", "generator", "loader-source.tmpl.js")
            template = filetool.read(loaderFile)

            return template

        # ---------------------------------------------------------------

        if not parts:
            return ""

        result = ""
        vals   = {}
        vals.update(globalCodes)
        vals["Boot"] = '"%s"' % boot
        vals["BootPart"] = bootCode

        # Translate part information to JavaScript
        vals["Parts"] = partsMap(parts)

        # Translate URI data to JavaScript
        vals["Uris"] = packageUrisToJS(packages, version)
        
        # Locate and load loader basic script
        template = loadTemplate(bootCode)

        # Fill template gives result
        result = fillTemplate(vals, template)

        return result


# Helper class for string.Template, to overwrite the placeholder introducing delimiter
class MyTemplate(string.Template):
    delimiter = "%"



