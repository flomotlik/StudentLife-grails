package org.lecturious

class UniversityController {

  def index = {
    [user: Student.get(session.user)]
  }

  def search = {
    def qString = params.q;
    log.debug("Search for '${qString}'");
    if (qString.size() == 0) {
      qString = "%"
    }
    else {
      qString = "%" + qString + "%"
    }
    def universities = University.findAllByNameIlike(qString, [max: 15]);
    log.debug("Found universities:" + universities)
    render(template: "/university/searchResults", model: [universities: universities])
  }
}
