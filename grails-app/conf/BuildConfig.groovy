grails.project.dependency.resolution = {
  inherits "global"
  log "warn"
  repositories {
    grailsHome()
    mavenCentral()
    mavenRepo "http://oss.sonatype.org/content/repositories/googlecode-snapshots/"
  }
  dependencies {
    compile 'com.google.code.facebookapi:facebook-java-api:3.0.3-SNAPSHOT'  
    runtime 'postgresql:postgresql:8.4-701.jdbc4'
  }
}