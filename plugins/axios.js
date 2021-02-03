export default function ({ $axios, redirect, store ,app}) {

    $axios.onRequest(config => {     
        // if (store.$auth.getToken('local')) 
        // config.headers.common['uuid_use'] = `ASD44564687554154asdasd`
        // config.headers.common['build_name'] = `N24`
    
    })

    $axios.onError(error => {
        if(error){   
            //redirect("/")
        }
      
    })
}