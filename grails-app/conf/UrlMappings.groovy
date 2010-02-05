class UrlMappings {
  static mappings = {
    "/$controller/$action/$id?"()
    "/"(controller: "application")
    "500"(view: '/error')
  }
}
