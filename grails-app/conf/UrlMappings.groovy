class UrlMappings {
  static mappings = {
    "/$controller/$action?/$country?/$state?/$city?" {
    }
    "/"(controller: "application")
    "500"(view: '/error')
  }
}
