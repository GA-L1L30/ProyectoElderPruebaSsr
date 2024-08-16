import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Data, RequestData } from '../interfaces/data.interface';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environments.prod';

@Injectable({ providedIn: 'root' })
export class DataService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData(): Observable<Data[]> {
    return this.http.get<Data[]>(`${this.baseUrl}/posts`);
  }

  getDataById(id: number): Observable<Data> {
    return this.http.get<Data[]>(`${this.baseUrl}/posts`).pipe(
      map((dataArray: Data[]) => {
        return dataArray.find((data) => data.id === id) as Data;
      })
    );
  }

  addData(data: RequestData): Observable<Data> {
    return this.http.post<Data>(`${this.baseUrl}/posts`, data);
  }

  updateData(data: Data): Observable<RequestData> {
    if (!data.userId) throw Error('UserData id es requerido!');
    return this.http.put<Data>(`${this.baseUrl}/posts/${data.userId}`, data);
  }
}
