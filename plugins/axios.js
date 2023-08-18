export default function ({ $axios, redirect, store ,app}) {

    $axios.defaults.timeout = 20000

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