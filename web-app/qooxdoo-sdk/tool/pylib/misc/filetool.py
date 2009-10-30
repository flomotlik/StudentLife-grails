#!/usr/bin/env python
################################################################################
#
#  qooxdoo - the new era of web development
#
#  http://qooxdoo.org
#
#  Copyright:
#    2006-2008 1&1 Internet AG, Germany, http://www.1und1.de
#
#  License:
#    LGPL: http://www.gnu.org/licenses/lgpl.html
#    EPL: http://www.eclipse.org/org/documents/epl-v10.php
#    See the LICENSE file in the project's top-level directory for details.
#
#  Authors:
#    * Sebastian Werner (wpbasti)
#
################################################################################

import os, codecs, cPickle, sys, re, time
import gzip as sys_gzip
import textutil

if sys.platform == "win32":
    import msvcrt
else:
    import fcntl

def gzip(filePath, content, encoding="utf-8"):
    if not filePath.endswith(".gz"):
        filePath = filePath + ".gz"
    
    content = unicode(content).encode(encoding)
    
    outputFile = sys_gzip.open(filePath, "wb", 9)
    outputFile.write(content)
    outputFile.close()


def gunzip(filePath, encoding="utf-8"):
    if not filePath.endswith(".gz"):
        filePath = filePath + ".gz"

    inputFile = sys_gzip.open(filePath, "rb")
    content = inputFile.read()
    
    return textutil.any2Unix(unicode(content))


def remove(filePath):
    # Normalize
    filePath = normalize(filePath)

    # Removing file
    try:
        if os.path.exists(filePath):
            os.remove(filePath)

    except IOError, (errno, strerror):
        print "  * I/O error(%s): %s" % (errno, strerror)
        sys.exit(1)

    except:
        print "  * Unexpected error:", sys.exc_info()[0]
        sys.exit(1)


def save(filePath, content="", encoding="utf-8"):
    # Normalize
    filePath = normalize(filePath)

    # Create directory
    directory(os.path.dirname(filePath))

    # Writing file
    try:
        outputFile = codecs.open(filePath, encoding=encoding, mode="w", errors="replace")
        outputFile.write(content)

    except IOError, (errno, strerror):
        print "  * I/O error(%s): %s" % (errno, strerror)
        sys.exit(1)

    except UnicodeDecodeError:
        print "  * Could not decode result to %s" % encoding
        sys.exit(1)

    except:
        print "  * Unexpected error:", sys.exc_info()[0]
        sys.exit(1)

    outputFile.flush()
    outputFile.close()


def directory(dirname):
    # Normalize
    dirname = normalize(dirname)

    # Check/Create directory
    if dirname != "" and not os.path.exists(dirname):
        os.makedirs(dirname)


def normalize(filename):
    return os.path.normpath(filename)


def read(filePath, encoding="utf_8"):
    try:
        ref = codecs.open(filePath, encoding=encoding, mode="r")
        content = ref.read()
        ref.close()

        return textutil.any2Unix(unicode(content))

    except IOError, (errno, strerror):
        print "  * I/O error(%s): %s (%s)" % (errno, strerror, filePath)
        sys.exit(1)

    except ValueError:
        print "  * Invalid Encoding. Required encoding %s in %s" % (encoding, filePath)
        sys.exit(1)

    except:
        print "  * Unexpected error:", sys.exc_info()[0], " (%s)" % filePath
        sys.exit(1)


def root():
    modulepath = unicode(__file__)
    
    miscfolder = os.path.dirname(modulepath)
    toolfolder = os.path.dirname(miscfolder)
    
    root = os.path.abspath(toolfolder)

    # Try to remove bytecode
    if modulepath.endswith(".py"):
        modulepath = modulepath[:-2] + "pyc"
        
    try:
        os.remove(modulepath)
    except OSError:
        pass
    
    return root


def find(rootpath, pattern=None):
    dirwalker = os.walk(rootpath)
    alwaysSkip = re.compile(r'(?:\.svn)',re.I)

    for (path, dirlist, filelist) in dirwalker:
        # correct dirlist (only with 'while' you can change it in place)
        i,j = 0,len(dirlist)
        while i<j:
            if re.search(alwaysSkip, dirlist[i]):
                del dirlist[i]
                j -= 1
            i += 1

        ## go through files
        for filename in filelist:
            if re.search(alwaysSkip, filename):
                continue
            if (pattern and not re.search(pattern, filename)):
                continue

            yield os.path.join(path,filename)


def findYoungest(rootpath, pattern=None):
    # find the node with the most recent modified date

    def lastModified(path):
        return os.stat(path).st_mtime

    youngest = rootpath
    ymodified= lastModified(rootpath)

    for path in find(rootpath, pattern):
        m = lastModified(path)
        if m > ymodified:
            ymodified = m
            youngest  = path

    return (youngest, ymodified)


def lockFileName(path):
    return '.'.join((path, "lock"))


def lock1(path, id=None, timeout=None):
    # create a lock file and return when we can safely access path

    def timeIsOut():
        now = time.time()
        if now - starttime > timeout:
            return True
        else:
            return False

    starttime = time.time()
    lockfile  = lockFileName(path)
    if not id:
        id = os.getpid()
    
    while True:
        # check timeout
        if timeout and timeIsOut():
            return False

        # wait for non-existence
        if os.path.exists(lockfile):
            time.sleep(0.05)
            continue

        # create file and write pid
        open(lockfile,"w").write(repr(id))

        # re-open and read contents, compare with pid
        c = open(lockfile,"r").read()
        c = int(c)
        if c == pid:
            break

    return True


def unlock1(path):
    lockfile = lockFileName(path)
    if os.path.exists(lockfile) and os.path.isFile(lockfile):
        os.path.unlink(lockfile)
        return True
    else:
        return False


def lock2(fd, write=False):
    if sys.platform == "win32":
        if write:
            flag = msvcrt.LK_RLCK
        else:
            flag = msvcrt.LK_LOCK
        msvcrt.locking(fd, flag, 10)  # assuming the first 10 bytes; throws IOError after 10secs
        os.lseek(fd, 0, 0)  # make sure we're at the beginning
    
    else:  # some *ix system
        fcntl.flock(fd, fcntl.LOCK_EX) # blocking

    return


def unlock2(fd):
    if sys.platform == "win32":
        os.lseek(fd, 0, 0)  # make sure we're at the beginning
        msvcrt.locking(fd, msvcrt.LK_UNLCK, 10) # assuming first 10 bytes!
    else:
        fcntl.flock(fd, fcntl.LOCK_UN)

    return

def lock(path, retries=4, timeout=0.5):
    #print "xxx creating file lock on: %r" % path
    lockfile = lockFileName(path)
    retry    = 0
    while True:
        try:
            fd = os.open(lockfile, os.O_CREAT|os.O_EXCL|os.O_RDWR)
        except:
            #print "xxx cache lock collision (%d)" % retry
            retry += 1
            if retry > retries:
                return None
            else:
                time.sleep(timeout)
                continue
        if fd:
            os.close(fd)
            return lockfile
        else:
            return None

def unlock(path):
    lockfile = lockFileName(path)
    if lockfile and os.path.exists(lockfile):
        #print "xxx releasing file lock on: %r" % path
        os.unlink(lockfile)
