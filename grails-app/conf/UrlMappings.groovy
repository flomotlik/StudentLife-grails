class UrlMappings {
  static mappings = {
    "/$controller/$action?/$country?/$state?/$city?/$university?/$course?" {
    }
    "/"(controller: "application")
    "500"(view: '/error')
  }
}
