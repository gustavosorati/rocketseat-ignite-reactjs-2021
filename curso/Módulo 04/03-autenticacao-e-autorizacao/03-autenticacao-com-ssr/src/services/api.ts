import axios, { AxiosError } from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";

let isRefreshing = false;
let failedRequestQueue = [];

export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  })


  api.interceptors.response.use(response => {
    return response
  }, (error:AxiosError) => {
    if(error.response.status === 401){
      if(error.response.data?.code === 'token.expired'){
        // pausa todas as requisições que estão sendo feitas até o token estar atualizado 
        // e depois executar as atualizações pausadas com o novo token 

        // renovar o token
        cookies = parseCookies(ctx);

        const { 'nextauth.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;  // toda configuração original que foi feita ao backend

        if(!isRefreshing){
          isRefreshing = true;

          api.post('/refresh', { refreshToken }).then(response => {
            const {token} = response.data;

            setCookie(ctx, 'nextauth.token', token, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            });

            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 * 60 * 24 * 30,
              path: '/'
            });      
            
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            failedRequestQueue.forEach(request => request.onSuccess(token))
            failedRequestQueue = []
          }).catch(err => {
            failedRequestQueue.forEach(request => request.onFailure(err))
            failedRequestQueue = []

            // Verifica se o código está sendo executado no browser ou no servidor
            if(typeof window !== 'undefined'){
              destroyCookie(undefined, 'nextauth.token')
              destroyCookie(undefined, 'nextauth.refreshToken')
        
              Router.push('/')          
            }

          }).finally(() => {
            isRefreshing = false
          })
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
        // deslogar o usuario
        if(typeof window !== 'undefined'){

          destroyCookie(undefined, 'nextauth.token')
          destroyCookie(undefined, 'nextauth.refreshToken')

          Router.push('/')
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }

    return Promise.reject(error)
  });

  return api
}