<g:formRemote name="joinCourse" id="joinCourse"
  url="[controller:'user', action:'joinCourse']" update="[success:'content']">
  <select id="course" name="course" multiple="multiple">
    <g:each in="${courses}" var="eachCourse">
      <option value="${eachCourse.id}">${eachCourse.type} ${eachCourse.name} - ${eachCourse.professor} - ${eachCourse.university.name}</option>
    </g:each>
  </select>
  <input type="submit" value="Join Course" id="joinCourseSubmit" />
</g:formRemote>