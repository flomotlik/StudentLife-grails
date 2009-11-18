class UrlMappings {
  static mappings = {
    "/app/$controller/$action?/$country?/$state?/$city?/$university?/$course?" {
      constraints{
       controller(notEquals:"application")
      }
     }
    "/appEngineReload/index"(controller:"appEngineReload")
    "/"(controller: "application")
    "500"(view: '/error')
  }
}
