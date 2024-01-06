import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

// const TOKEN_HEADER = 'Authorization';

export const authInterceptor: HttpInterceptorFn=(req,next)=>{
    
    console.log('interceptor called');
        // add the jwt token (localStorag) request
        let authReq = req;
        const token = localStorage.getItem("token");
        if (token != null) {
            console.log("token");
            console.log(token);
            authReq = authReq.clone({
                setHeaders: { 
                    'Content-Type':'application/json',
                    Authorization: "Bearer "+token 
                },
            })
        }
        return next(authReq);
};
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private loginService: LoginService) {  }

//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//           console.log('interceptor called');
//         // add the jwt token (localStorag) request
//         let authReq = req;
//         const token = this.loginService.getToken();
//         if (token != null) {
//             console.log("token");
//             console.log(token);
//             authReq = authReq.clone({
//                 setHeaders: { 
//                     'Content-Type':'application/json',
//                     Authorization: "Bearer "+token 
//                 },
//             })
//         }
//         return next.handle(authReq);
//     }

// }

// export const authInterceptorProviders=[
//     {
//         provide :HTTP_INTERCEPTORS,
//         useClass: AuthInterceptor,
//         multi:true,
//     },
// ];