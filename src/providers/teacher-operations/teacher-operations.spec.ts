import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeacherOperationsProvider  } from './teacher-operations';

describe('Prueba: Servicio de registro de un problema', () => {

    let service: TeacherOperationsProvider;
    let httpMock: HttpTestingController;

    //Arrange
    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            { provide: TeacherOperationsProvider, useClass: TeacherOperationsProvider },
        ]
        })
        service = TestBed.get( TeacherOperationsProvider );
        httpMock = TestBed.get( HttpTestingController );
    });

    it('Servicio Creado exitosamente', inject([TeacherOperationsProvider], (service: TeacherOperationsProvider) => {
        expect(service).toBeTruthy();
    }));

    it('Problema registrado Exitosamente', inject([TeacherOperationsProvider], (service: TeacherOperationsProvider) => {

        let dataError, dataResponse;

        // Act
        service.registrarProblema("Problema de prueba TEST", "Descripcion de problema TEST ", "Pregunta TEST", "BASE64 TEST")
        .then( ( data ) => {
            console.log("Problema Registrado");
        },(error) => {
            dataError = error;
        });

        const req = httpMock.expectOne('https://fortmath.000webhostapp.com/registerProblems');
       
        // Assert
        expect( req.request.url ).toEqual('https://fortmath.000webhostapp.com/registerProblems');
        expect( req.request.method ).toEqual('POST');
        expect( dataError ).toBeUndefined();

    }));

});