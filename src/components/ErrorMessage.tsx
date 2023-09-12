import { ReactElement, ReactNode } from "react"
import { JsxElement } from "typescript"

type ErrorMessagePropsType = {
    render?: () => ReactNode | JsxElement | ReactElement
    error: boolean
}

export function ErrorMessage({render, error = false}: ErrorMessagePropsType) : any {

    if(error){
        if(render){

            return (
                <>
                
                    {render()}
                </>
            )
        }
        else {
            return <p style={{color: 'red'}}>Something went wrong...</p>
        }
    }
    
  
    

  

}