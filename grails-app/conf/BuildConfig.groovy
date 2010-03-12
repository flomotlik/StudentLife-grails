grails.project.dependency.resolution = {
  inherits "global"
  log "warn"
  repositories {
    grailsHome()
    mavenCentral()
  }
  dependencies {
    //    compile 'com.google.code.facebookapi:facebook-java-api:3.0.2'  
    compile 'postgresql:postgresql:8.4-701.jdbc4'
  }
}