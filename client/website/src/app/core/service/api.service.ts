import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { ApiResponse } from '../models/apiResponse';
import { env } from '../../../environment/env';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiOptions = {
    showToaster: false,
    showLoader: false,
    useToken: false,
  };

  constructor(
    private loader: LoaderService,
    private http: HttpClient,
    private toast: ToastService,
  ) {}

  async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endPoint: string,
    body?: any,
    params?: any,
    apiOption: Partial<typeof this.apiOptions> = this.apiOptions,
  ): Promise<ApiResponse<T>> {
    const apiUrl = `${env.API_BASE_URL}/${endPoint}`;

    const mergedOption = { ...this.apiOptions, ...apiOption };

    if (mergedOption.showLoader) {
      this.loader.show();
    }

    let token: string | null = '';
    if (mergedOption.useToken) {
      token = localStorage.getItem('TOKEN');
    }

    console.log(token);
    
    const isFormData = body instanceof FormData;
    const headersObj: any = {
      'Cache-Control': 'no-cache',
    };
    if (!isFormData) {
      headersObj['Content-Type'] = 'application/json';
    }
    if (token) {
      headersObj['Authorization'] = `Bearer ${token}`;
    }
    const headers = new HttpHeaders(headersObj);
    // console.log(headers);
    
    let response: any;
    try {
      switch (method) {
        case 'GET':
          response = await lastValueFrom(
            this.http.get<ApiResponse<T>>(apiUrl, { headers, params }),
          );
          break;
        case 'POST':
          response = await lastValueFrom(this.http.post<ApiResponse<T>>(apiUrl, body, { headers }));
          break;
        case 'PUT':
          response = await lastValueFrom(this.http.put<ApiResponse<T>>(apiUrl, body, { headers }));
          break;
        case 'DELETE':
          response = await lastValueFrom(this.http.delete<ApiResponse<T>>(apiUrl, { headers }));
          break;
        default:
          throw new Error('Invalid Methd');
      }

      let resp: any = {
        message: response.message,
        code: response.code,
        status: response.status,
        data: response.data,
        error: response.error,
        token: response.token,
        count: response.count,
      };
      if (mergedOption.showToaster) {
        this.toast.success(response.message);
      }
      return resp;
    } catch (error: any) {
      const fieldErrors = error.error;
      // console.log(fieldErrors);
      if (fieldErrors?.error) {
        this.toast.error(fieldErrors?.error);
        throw error;
      }
      // console.log(fieldErrors );
     
      
      this.toast.error(fieldErrors.message  || 'Netwok Error');

      throw {
        message: fieldErrors.message,
        code: error.status,
        status: false,
      };


    } finally {
      if (mergedOption.showLoader) {
        this.loader.hide();
      }
    }
  }
}
