import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CallerService {

  URL_READ: string = 'http://3.22.195.65:5000/api/integracion/table/read';
  URL_INSERT: string = 'http://3.22.195.65:5000/api/integracion/table/insert';
  URL_UPDATE: string = 'http://3.22.195.65:5000/api/integracion/table/update';
  URL_DELETE: string = 'http://3.22.195.65:5000/api/integracion/table/delete';

  httpOptions: any = {
      headers: new HttpHeaders({
        'Content-Type':  "text/plain"
      })
    };


  codeSaved:any = false;

  constructor(private http: HttpClient) { }

  public async login(user: string, password: string) {
    
    let body  = {"tabla" : "integracion_claves_recolectores",
    "operador": "and",
    "columnas" : ["nombre"],
    "condiciones" : [
      {
        "columna" : "user",
        "comparador" : "==",
        "valor" : user
      },
      {
        "columna" : "pass",
        "comparador" : "==",
        "valor" : password
      }
      ]
    };

    let result = await this.http.post(
      this.URL_READ,
      JSON.stringify(body),
      this.httpOptions).toPromise();

    return result;

  }

  public searchUser(cardId: string) {
    let body = {"tabla" : "integracion_usuario",
    "operador": "and",
    "columnas" : ["telefono_id"],
    "condiciones" : [
      {
        "columna" : "cedula",
        "comparador" : "==",
        "valor" : cardId
      }
      ]
    }

    return this.http.post(
      this.URL_READ,
      JSON.stringify(body),
      this.httpOptions);

  }


  public async registerUser(cardId: string, email: string) {
    
    let body1 = {"tabla" : "integracion_claves_app",
      "operador": "and",
      "columnas" : ["app_id"],
      "condiciones" : [
        {
          "columna" : "en_uso",
          "comparador" : "==",
          "valor" : 0
        }
        ]
    }

    
    let promesa1:any = await this.http.post(
      this.URL_READ,
      JSON.stringify(body1),
      this.httpOptions).toPromise()
    
    let code = promesa1 ? promesa1.data[0].app_id : null;

    if(code) {

      let body2 = {"tabla" : "integracion_usuario",
        "datos":[ {
          "cedula":cardId,
          "telefono_id": code,
          "correo": email
        }]
        
      };


      let promesa2:any = await  this.http.post(
            this.URL_INSERT,
            JSON.stringify(body2),
            this.httpOptions).toPromise();

      let resultado = promesa2 ? promesa2.data[0].cedula : null;

      
      if(resultado) {

         let body3 = {"tabla": "integracion_claves_app",
            "operador": "and",
            "valores": {
              "en_uso":1
            },
            "condiciones": [
              {
                "columna": "app_id",
                "comparador": "==",
                "valor": code
              }
            ]
          }

  
          let actualizado:any = await this.http.post(
                        this.URL_UPDATE,
                        JSON.stringify(body3),
                        this.httpOptions).toPromise();

          if(actualizado.data.rows_updated)              
            return {code: code};
      }
    }

    return null
  }

  public async checkTestCode(testCode: string) {
    let body = {"tabla" : "integracion_pruebas",
      "operador": "and",
      "columnas" : ["app_id"],
      "condiciones" : [
        {
          "columna" : "muestra_id",
          "comparador" : "==",
          "valor" : testCode
        }
      ]
    }

    let promesa:any = await this.http.post(
      this.URL_READ,
      JSON.stringify(body),
      this.httpOptions).toPromise();

    if(promesa.data.length > 0) {
      return { exists: true }
    }

    return { exists: false}
  }

  public async registerTest(cardId: string, testCode: string, reference: string, currentDate: string) {
    
    let body = {"tabla" : "integracion_usuario",
      "operador": "and",
      "columnas" : ["telefono_id"],
      "condiciones" : [
        {
          "columna" : "cedula",
          "comparador" : "==",
          "valor" : cardId
        }
      ]
    }

    let promesa:any = await this.http.post(
      this.URL_READ,
      JSON.stringify(body),
      this.httpOptions).toPromise();

    if(promesa) {
      let code = promesa.data[0].telefono_id;
      
      let body2 = {"tabla" : "integracion_pruebas",
        "datos":[ {
          "muestra_id":testCode,
          "lab_id": "001",
          "cedula" : cardId,
          "user_lab": "laboCOVID1", 
          "recolector_id": "recoCOVID1", 
          "app_id": code,
          "estado" : 0, 
          "resultado": -1, 
          "fecha_recoleccion": currentDate,
          "referencia": reference
        }]
	    }

      

      let promesa2:any = await this.http.post(
        this.URL_INSERT,
        JSON.stringify(body2),
        this.httpOptions).toPromise();
      

      if(promesa2) {
        return {saved : true}
      }

    }

    return null;
    
  }
}