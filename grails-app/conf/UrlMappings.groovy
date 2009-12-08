class UrlMappings {
  static mappings = {
    "/app/$controller/$action/$id?" {
      constraints{
       controller(notEquals:"application")
      }
     }
    "/"(controller: "application")
    "500"(view: '/error')
  }
}
