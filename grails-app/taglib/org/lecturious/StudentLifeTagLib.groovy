package org.lecturious

class StudentLifeTagLib {
  static namespace = "sl"
  
  def subString = {attr ->
    def value = attr.value
    def attach = attr.attach?: ''
    def max = attr.max.toInteger()
    def valueSize = value.size()
    def maxIndex = Math.min (value.size(), max)
    out << value.substring (0, maxIndex)
    if(max < valueSize){
      out << attach
    }
  }
  
  def facebookProfileLink = { attr ->
      def facebookId = attr.facebookId
      def text = attr.text
      def facebookProfileURL = g.message(code:"facebookProfileURL")
      out << "<a href=\"$facebookProfileURL$facebookId\" target=\"_blank\">$text</a>"
  }
}
