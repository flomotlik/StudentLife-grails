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
}
