<%=packageName ? "package ${packageName}\n\n" : ''%>import com.google.appengine.api.datastore.*
class ${className}Controller {

	def persistenceManager
    
    def index = { redirect(action:list,params:params) }

    // the delete, save and update actions only accept POST requests
    static allowedMethods = [delete:'POST', save:'POST', update:'POST']

    def list = {
        params.max = Math.min( params.max ? params.max.toInteger() : 10,  100)
		def query = persistenceManager.newQuery( ${className} )
		def  ${propertyName}List = query.execute()
		def total = 0
		if(  ${propertyName}List &&  ${propertyName}List.size() > 0){
			total =  ${propertyName}List.size()
		}
		[  ${propertyName}List :  ${propertyName}List,  ${propertyName}Total: total ]
    }

    def show = {
	    def ${propertyName} = persistenceManager.getObjectById( ${className}.class, Long.parseLong( params.id )  )
        if(!${propertyName}) {
            flash.message = "${className} not found with id \${params.id}"
            redirect(action:list)
        }
        else { return [ ${propertyName} : ${propertyName} ] }
    }

    def delete = {
	    def ${propertyName} = persistenceManager.getObjectById( ${className}.class, Long.parseLong( params.id )  )
        if(${propertyName}) {
            try {
                persistenceManager.deletePersistent(${propertyName})
                flash.message = "${className} \${params.id} deleted"
                redirect(action:list)
            }
            catch(Exception e) {
                flash.message = "${className} \${params.id} could not be deleted"
                redirect(action:show,id:params.id)
            }
        }
        else {
            flash.message = "${className} not found with id \${params.id}"
            redirect(action:list)
        }
    }

    def edit = {
	    def ${propertyName} = persistenceManager.getObjectById( ${className}.class, Long.parseLong( params.id )  )
		if(!${propertyName}) {
            flash.message = "${className} not found with id \${params.id}"
            redirect(action:list)
        }
        else {
			${propertyName} = persistenceManager.detachCopy( ${propertyName} )    
        	return [ ${propertyName} : ${propertyName} ]
        }
    }

    def update = {
	 	def ${propertyName} = persistenceManager.getObjectById( ${className}.class, Long.parseLong( params.id )  )
    
    	if(${propertyName}) {
            ${propertyName}.properties = params
            if(!${propertyName}.hasErrors()){
	
				try{
					persistenceManager.makePersistent(${propertyName})
				} catch( Exception e ){
				   	render(view:'edit',model:[${propertyName}:${propertyName}])
				}finally{
					flash.message = "${className} \${params.id} updated"
	                redirect(action:show,id:${propertyName}.id)
				}        
 			}
            else {
                render(view:'edit',model:[${propertyName}:${propertyName}])
            }
        }
        else {
            flash.message = "${className} not found with id \${params.id}"
            redirect(action:list)
        }
    }

    def create = {
        def ${propertyName} = new ${className}()
        ${propertyName}.properties = params
        return ['${propertyName}':${propertyName}]
    }

    def save = {
        def ${propertyName} = new ${className}(params)
		if(!${propertyName}.hasErrors() ) {
			try{
				persistenceManager.makePersistent(${propertyName})
			} finally{
				flash.message = "${className} \${${propertyName}.id} created"
				redirect(action:show,id:${propertyName}.id)	
			}
		}
   
		render(view:'create',model:[${propertyName}:${propertyName}])
        
    }
}
