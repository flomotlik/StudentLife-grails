#!/usr/bin/env python
# -*- coding: utf-8 -*-
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
#    * Sebastian Werner (wpbasti)
#
################################################################################

##
##

import sys, codecs


class Log:
    _indent = 0
    _levels = {
      "debug" : 10,         # STDOUT
      "info" : 20,          # STDOUT
      "warning" : 30,       # STDERR
      "error" : 40,         # STDERR
      "fatal" : 50          # STDERR
    }


    def __init__(self, logfile=None, level="info"):
        self.setLevel(level)

        if logfile != None:
            self.logfile = codecs.open(logfile, encoding="utf-8", mode="w")
        else:
            self.logfile = False


    def setLevel(self, level):
        self._level = level


    def getLevel(self):
        return self._level


    def inDebugMode(self):
        return self._levels[self._level] < self._levels["info"]


    def indent(self):
        self._indent += 1


    def outdent(self):
        if self._indent > 0:
            self._indent -= 1


    def head(self, msg, main=False):
        if main:
            line = "=" * 76
        else:
            line = "-" * 76

        self.write("", "info")
        self.write(line, "info")
        self.write("    %s" % msg.upper(), "info")
        self.write(line, "info")


    def write(self, msg, level="info", feed=True):
        # Always add a line feed in debug mode
        if self._levels[self._level] < self._levels["info"]:
            feed = True

        msg = msg.encode('utf-8')
        # Standard streams
        if self._levels[level] >= self._levels[self._level]:  # filter msg according to level
            # select stream
            if self._levels[level] < self._levels["warning"]:
                stream = sys.stdout
            else:
                stream = sys.stderr

            if feed:
                msg += '\n'
            stream.write(msg)
            stream.flush()

            # Log file
            if self.logfile:
                self.logfile.write(msg)
                self.logfile.flush()


    def log(self, msg, level="info", feed=True):
        # add prefix
        if msg == "":
            prefix = ""
        elif self._indent == 0:
            prefix = ">>> "
        elif self._indent > 0:
            prefix = ("  " * self._indent) + "- "

        self.write(prefix + msg, level, feed)


    def debug(self, msg, feed=True):
        self.log(msg, "debug", feed)


    def info(self, msg, feed=True):
        self.log(msg, "info", feed)


    def warn(self, msg, feed=True):
        self.log(msg, "warning", feed)


    def error(self, msg, feed=True):
        self.write("!!! %s" % msg, "error", feed)


    def fatal(self, msg, feed=True):
        self.log(msg, "fatal", "fatal", feed)


    def progress(self, pos, length):
        if self._levels[self._level] > self._levels["info"]:
            return

        # starts normally at null, but this is not useful here
        # also the length is normally +1 the real size
        pos += 1

        thisstep = 10 * pos / length
        prevstep = 10 * (pos-1) / length

        if thisstep != prevstep:
            sys.stdout.write(" %s%%" % (thisstep * 10))
            sys.stdout.flush()

        if pos == length:
            sys.stdout.write("\n")
            sys.stdout.flush()
