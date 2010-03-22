dataSource {
  pooled = true
}
hibernate {
  cache.use_second_level_cache=true
  cache.use_query_cache=true
  cache.provider_class='com.opensymphony.oscache.hibernate.OSCacheProvider'
}
// environment specific settings
environments {
  development {
    dataSource {
      dbCreate = "create-drop" // one of 'create', 'create-drop','update'
      url = "jdbc:hsqldb:mem:devDB"
      driverClassName = "org.hsqldb.jdbcDriver"
      username = "sa"
      password = ""
      }
  }
  test {
    dataSource {
      dbCreate = "update"
      url = "jdbc:hsqldb:file:database/testDb"
      driverClassName = "org.hsqldb.jdbcDriver"
      username = "sa"
      password = ""
    }
  }
  production {
    dataSource {
      driverClassName = "org.postgresql.Driver"
      dialect = org.hibernate.dialect.PostgreSQLDialect
      dbCreate = "update"
      url="jdbc:postgresql://localhost:5432/studentlife"
    }
  }
}