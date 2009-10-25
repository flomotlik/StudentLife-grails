""" pyrobocopy.py -

    Version: 1.0
    
    Report the difference in content
    of two directories, synchronize or
    update a directory from another, taking
    into account time-stamps of files etc.

    By Anand B Pillai 

    (This program is inspired by the windows
    'Robocopy' program.)

    Mod  Nov 11 Rewrote to use the filecmp module.
"""

import os, stat, sys
import time
import shutil
import filecmp

def usage():
    return """
Pyrobocopy: Command line directory diff, synchronization, update & copy

Author: Anand Pillai

Usage: %s  [Options] <sourcedir> <targetdir>

Main Options:\n
\t-d --diff         - Only report difference between sourcedir and targetdir
\t-s, --synchronize - Synchronize content between sourcedir and targetdir
\t-u, --update      - Update existing content between sourcedir and targetdir

Additional Options:\n
\t-p, --purge       - Purge files when synchronizing (does not purge by default).
\t-f, --force       - Force copying of files, by trying to change file permissions.
\t-n, --nodirection - Update files in source directory from target
\t                    directory (only updates target from source by default).
\t-c, --create      - Create target directory if it does not exist (By default,
\t                    target directory should exist.)
\t-m, --modtime     - Only compare file's modification times for an update (By default,
\t                    compares source file's creation time also).
\t-x, --excludeList - Comma-separated list of patterns to exclude. Patterns will
                      be applied to both directories and file names.
"""                   



class PyRobocopier:
    """ An advanced directory synchronization, updation
    and file copying class """

    prog_name = "pyrobocopy.py"
    
    def __init__(self, console=None):

        self.__dir1 = ''
        self.__dir2 = ''
        self.__dcmp = None
        self.__console = console
        
        self.__copyfiles = True
        self.__forcecopy = False
        self.__copydirection = 0
        self.__updatefiles = True
        self.__creatdirs = True
        self.__purge =False
        self.__maketarget =False
        self.__modtimeonly =False
        self.__mainfunc = None
        self.__xlist = []
        
        # stat vars
        self.__numdirs =0
        self.__numfiles =0
        self.__numdelfiles =0
        self.__numdeldirs =0     
        self.__numnewdirs =0
        self.__numupdates =0
        self.__starttime = 0.0
        self.__endtime = 0.0
        
        # failure stat vars
        self.__numcopyfld =0
        self.__numupdsfld =0
        self.__numdirsfld =0
        self.__numdelffld  =0
        self.__numdeldfld  =0

    def parse_args(self, arguments):
        """ Parse arguments """
        
        import getopt

        shortargs = "supncmx:"
        longargs = ["synchronize=", "update=", "purge=", "nodirection=", 
                    "create=", "modtime=", "excludeList="]

        try:
            optlist, args = getopt.getopt( arguments, shortargs, longargs )
        except getopt.GetoptError, e:
            print e
            return None

        allargs = []
        if len(optlist):
            allargs = [x for x in optlist]
            
        allargs.extend([(x,'') for x in args ])
        self.__setargs( allargs )
            
    def __setargs(self, argslist):
        """ Sets internal variables using arguments """
        
        for option, arg in argslist:
            if option.lower() in ('-s', '--synchronize'):
                self.__mainfunc = self.synchronize
            elif option.lower() in ('-u', '--update'):
                self.__mainfunc = self.update
            elif option.lower() in ('-d', '--diff'):
                self.__mainfunc = self.dirdiff
            elif option.lower() in ('-p', '--purge'):
                self.__purge = True
            elif option.lower() in ('-n', '--nodirection'):
                self.__copydirection = 2
            elif option.lower() in ('-f', '--force'):
                self.__forcecopy = True
            elif option.lower() in ('-c', '--create'):
                self.__maketarget = True
            elif option.lower() in ('-m', '--modtime'):
                self.__modtimeonly = True
            elif option.lower() in ('-x', '--excludeList'):
                self.__xlist.extend(arg.split(','))
            else:
                if self.__dir1=='':
                    self.__dir1 = option
                elif self.__dir2=='':
                    self.__dir2 = option
                
        if self.__dir1=='' or self.__dir2=='':
            sys.exit("Argument Error: Directory arguments not given!")
        if ((not os.path.isdir(self.__dir1)) and (not os.path.isfile(self.__dir1))):
            sys.exit("Argument Error: Source directory does not exist! %s" % self.__dir1)
        if not self.__maketarget and (not os.path.isdir(self.__dir2) or not os.path.isdir(os.path.dirname(self.__dir2))):
            sys.exit("Argument Error: Target directory %s does not exist! (Try the -c option)." % self.__dir2)
        if self.__mainfunc is None:
            sys.exit("Argument Error: Specify an action (Diff, Synchronize or Update) ")

        self.__dcmp = filecmp.dircmp(self.__dir1, self.__dir2, self.__xlist)

    def do_work(self):
        """ Do work """

        self.__starttime = time.time()
        
        if not os.path.isdir(self.__dir2):
            if self.__maketarget:
                self.__console.debug('Creating directory %s' % self.__dir2)
                try:
                    os.makedirs(self.__dir2)
                except Exception, e:
                    print e
                    return None

        # All right!
        self.__mainfunc()
        self.__endtime = time.time()
        
    def __dowork(self, dir1, dir2, copyfunc = None, updatefunc = None):
        """ Private attribute for doing work """
        
        # dir1 is a file?
        try:
            fmode1 = os.stat(dir1)
            fmode2 = os.stat(dir2)
        except os.error:
            return
        
        if (stat.S_ISREG(fmode1.st_mode)):
            # dir1 is file
            if (stat.S_ISREG(fmode2.st_mode)):
                # dir2 is also file
                if copyfunc: copyfunc(os.path.basename(dir1), os.path.dirname(dir1),dir2)
            else:
                # dir2 is dir, see if it contains a file "dir1"
                dir1rel = os.path.join(*(dir1.split(os.sep)[1:])) # HACK: strip root dir from dir1
                file2 = os.path.join(dir2, dir1rel)  # and construct path under dir2
                if (os.path.exists(file2) and os.path.isfile(file2)):
                    if updatefunc: updatefunc(os.path.basename(dir1), os.path.dirname(dir1), dir2)
                else:
                    if copyfunc: copyfunc(os.path.basename(dir1),os.path.dirname(dir1),dir2)
            return

        # dir1 is a directory
        self.__console.debug('Source directory:  %s:' % dir1)

        self.__numdirs += 1
        self.__dcmp = filecmp.dircmp(dir1, dir2)
        
        # Files & directories only in target directory
        if self.__purge:
            for f2 in self.__dcmp.right_only:
                fullf2 = os.path.join(dir2, f2)
                self.__console.debug('Deleting %s' % fullf2)
                try:
                    if os.path.isfile(fullf2):
                        
                        try:
                            os.remove(fullf2)
                            self.__numdelfiles += 1
                        except OSError, e:
                            print e
                            self.__numdelffld += 1
                    elif os.path.isdir(fullf2):
                        try:
                            shutil.rmtree( fullf2, True )
                            self.__numdeldirs += 1
                        except shutil.Error, e:
                            print e
                            self.__numdeldfld += 1
                                
                except Exception, e: # of any use ?
                    print e
                    continue


        # Files & directories only in source directory
        for f1 in self.__dcmp.left_only:
            if f1 in self.__xlist:
                continue

            try:
               st = os.stat(os.path.join(dir1, f1))
            except os.error:
                continue

            if stat.S_ISREG(st.st_mode):
                if copyfunc: copyfunc(f1, dir1, dir2)
            elif stat.S_ISDIR(st.st_mode):
                fulld1 = os.path.join(dir1, f1)
                fulld2 = os.path.join(dir2, f1)
                
                if self.__creatdirs:
                    try:
                        # Create tree
                        self.__console.debug('Creating new directory %s' % fulld2)
                        #shutil.copytree(fulld1, fulld2)
                        os.mkdir(fulld2)
                        self.__dcmp.common.append(f1)
                        self.__numnewdirs += 1
                    except os.error, e:
                        print e
                        self.__numdirsfld += 1
                        
                        # jump to next file/dir in loop since this op failed
                        continue

                # Call tail recursive
                # if os.path.exists(fulld2):
                #    self.__dowork(fulld1, fulld2, copyfunc, updatefunc)

        # common files/directories
        for f1 in self.__dcmp.common:
            try:
                st = os.stat(os.path.join(dir1, f1))
            except os.error:
                continue

            if stat.S_ISREG(st.st_mode):
                if updatefunc: updatefunc(f1, dir1, dir2)
            elif stat.S_ISDIR(st.st_mode):
                fulld1 = os.path.join(dir1, f1)
                fulld2 = os.path.join(dir2, f1)
                # Call tail recursive
                self.__dowork(fulld1, fulld2, copyfunc, updatefunc)
                

    def __copy(self, filename, dir1, dir2):
        """ Private function for copying a file """

        # NOTE: dir1 is source & dir2 is target
        if self.__copyfiles:

            self.__console.debug('Copying file %s %s %s' % (filename, dir1, dir2))
            try:
                if self.__copydirection== 0 or self.__copydirection == 2:  # source to target
                    
                    if not os.path.exists(dir2):
                        if self.__forcecopy:
                            os.chmod(os.path.dirname(dir2), 0777)
                        try:
                            os.makedirs(dir1)
                        except OSError, e:
                            print e
                            self.__numdirsfld += 1
                        
                    if self.__forcecopy:
                        os.chmod(dir2, 0777)

                    sourcefile = os.path.join(dir1, filename)
                    try:
                        shutil.copy(sourcefile, dir2)
                        self.__numfiles += 1
                    except (IOError, OSError), e:
                        print e
                        self.__numcopyfld += 1
                    
                elif self.__copydirection==1 or self.__copydirection == 2: # target to source 

                    if not os.path.exists(dir1):
                        if self.__forcecopy:
                            os.chmod(os.path.dirname(dir1), 0777)

                        try:
                            os.makedirs(dir1)
                        except OSError, e:
                            print e
                            self.__numdirsfld += 1                          

                    targetfile = os.path.abspath(os.path.join(dir1, filename))
                    if self.__forcecopy:
                        os.chmod(dir1, 0777)

                    sourcefile = os.path.join(dir2, filename)
                    
                    try:
                        shutil.copy(sourcefile, dir1)
                        self.__numfiles += 1
                    except (IOError, OSError), e:
                        print e
                        self.__numcopyfld += 1
                    
            except Exception, e:
                self.__console.debug('Error copying  file %s %s' % (filename, repr(e)))

    def __cmptimestamps(self, filest1, filest2):
        """ Compare time stamps of two files and return True
        if file1 (source) is more recent than file2 (target) """

        return ((filest1.st_mtime > filest2.st_mtime) or \
                   (not self.__modtimeonly and (filest1.st_ctime > filest2.st_mtime)))
    
    def __update(self, filename, dir1, dir2):
        """ Private function for updating a file based on
        last time stamp of modification """

        self.__console.debug('Updating file %s' % filename)
        
        # NOTE: dir1 is source & dir2 is target        
        if self.__updatefiles:

            file1 = os.path.join(dir1, filename)
            file2 = os.path.join(dir2, filename)

            try:
                st1 = os.stat(file1)
                st2 = os.stat(file2)
            except os.error:
                return -1

            # Update will update in both directions depending
            # on the timestamp of the file & copy-direction.

            if self.__copydirection==0 or self.__copydirection == 2:

                # Update file if file's modification time is older than
                # source file's modification time, or creation time. Sometimes
                # it so happens that a file's creation time is newer than it's
                # modification time! (Seen this on windows)
                if self.__cmptimestamps( st1, st2 ):
                    self.__console.debug('Updating file  %s' % file2) # source to target)
                    try:
                        if self.__forcecopy:
                            os.chmod(file2, 0666)

                        try:
                            shutil.copy(file1, file2)
                            self.__numupdates += 1
                            return 0
                        except (IOError, OSError), e:
                            print e
                            self.__numupdsfld += 1
                            return -1

                    except Exception, e:
                        print e
                        return -1

            elif self.__copydirection==1 or self.__copydirection == 2:

                # Update file if file's modification time is older than
                # source file's modification time, or creation time. Sometimes
                # it so happens that a file's creation time is newer than it's
                # modification time! (Seen this on windows)
                if self.__cmptimestamps( st2, st1 ):
                    self.__console.debug('Updating file  %s' % file1) # target to source)
                    try:
                        if self.__forcecopy:
                            os.chmod(file1, 0666)

                        try:
                            shutil.copy(file2, file1)
                            self.__numupdates += 1
                            return 0
                        except (IOError, OSError), e:
                            print e
                            self.__numupdsfld += 1
                            return -1
                        
                    except Exception, e:
                        print e
                        return -1

        return -1

    def __dirdiffandcopy(self, dir1, dir2):
        """ Private function which does directory diff & copy """
        self.__dowork(dir1, dir2, self.__copy)

    def __dirdiffandupdate(self, dir1, dir2):
        """ Private function which does directory diff & update  """        
        self.__dowork(dir1, dir2, None, self.__update)

    def __dirdiffcopyandupdate(self, dir1, dir2):
        """ Private function which does directory diff, copy and update (synchro) """               
        self.__dowork(dir1, dir2, self.__copy, self.__update)

    def __dirdiff(self):
        """ Private function which only does directory diff """

        if self.__dcmp.left_only:
            self.__console.debug('Only in %s' % self.__dir1)
            for x in self.__dcmp.left_only:
                self.__console.debug('>> %s' % x)

        if self.__dcmp.right_only:
            self.__console.debug('Only in %s' % self.__dir2)
            for x in self.__dcmp.right_only:
                self.__console.debug('<< %s' % x)

        if self.__dcmp.common:
            self.__console.debug('Common to %s and %s', (self.__dir1,self.__dir2))
            print
            for x in self.__dcmp.common:
                self.__console.debug('-- %s' % x)
        else:
            self.__console.debug('No common files or sub-directories!')

    def synchronize(self):
        """ Synchronize will try to synchronize two directories w.r.t
        each other's contents, copying files if necessary from source
        to target, and creating directories if necessary. If the optional
        argument purge is True, directories in target (dir2) that are
        not present in the source (dir1) will be deleted . Synchronization
        is done in the direction of source to target """

        self.__copyfiles = True
        self.__updatefiles = True
        self.__creatdirs = True
        self.__copydirection = 0

        self.__console.debug('Synchronizing directory %s with %s' % (self.__dir2, self.__dir1))
        self.__dirdiffcopyandupdate(self.__dir1, self.__dir2)

    def update(self):
        """ Update will try to update the target directory
        w.r.t source directory. Only files that are common
        to both directories will be updated, no new files
        or directories are created """

        self.__copyfiles = False
        self.__updatefiles = True
        self.__purge = False
        self.__creatdirs = False

        self.__console.debug('Updating directory %s from %s' % (self.__dir2, self.__dir1))
        self.__dirdiffandupdate(self.__dir1, self.__dir2)

    def dirdiff(self):
        """ Only report difference in content between two
        directories """

        self.__copyfiles = False
        self.__updatefiles = False
        self.__purge = False
        self.__creatdirs = False
        self.__updatefiles = False
        
        self.__console.debug('Difference of directory  %s from %s' % (self.__dir2, self.__dir1))
        self.__dirdiff()
        
    def report(self):
        """ Print report of work at the end """

        # We need only the first 4 significant digits
        tt = (str(self.__endtime - self.__starttime))[:4]
        
        self.__console.debug('Python robocopier finished in %s seconds.' % tt)
        self.__console.debug('%d directories parsed, %d files copied.' % (self.__numdirs, self.__numfiles))
        if self.__numdelfiles:
            self.__console.debug('%d files were purged.' % self.__numdelfiles, )
        if self.__numdeldirs:
            self.__console.debug('%d directories were purged.' % self.__numdeldirs, )
        if self.__numnewdirs:
            self.__console.debug('%d directories were created.' % self.__numnewdirs, )
        if self.__numupdates:
            self.__console.debug('%d files were updated by timestamp.' % self.__numupdates, )

        # Failure stats
        self.__console.debug('\n')
        if self.__numcopyfld:
            self.__console.debug('%d files could not be copied.' % self.__numcopyfld, )
        if self.__numdirsfld:
            self.__console.debug('%d directories could not be created.' % self.__numdirsfld, )
        if self.__numupdsfld:
            self.__console.debug('%d files could not be updated.' % self.__numupdsfld, )
        if self.__numdeldfld:
            self.__console.debug('%d directories could not be purged.' % self.__numdeldfld, )
        if self.__numdelffld:
            self.__console.debug('%d files could not be purged.' % self.__numdelffld, )
        
if __name__=="__main__":
    import sys

    if len(sys.argv)<2:
        sys.exit( usage() % PyRobocopier.prog_name )

    copier = PyRobocopier()
    copier.parse_args(sys.argv[1:])
    copier.do_work()

    # print report at the end
    copier.report()
