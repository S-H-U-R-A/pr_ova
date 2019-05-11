import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentOperationsProvider  } from './student-operations';

describe('Prueba: Servicio de Relacionar un PIN y Servicio de Registrar  Respuesta de un problema.', () => {

    let service: StudentOperationsProvider;
    let httpMock: HttpTestingController;

    //Arrange
    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            { provide: StudentOperationsProvider, useClass: StudentOperationsProvider },
        ]
        })
        service = TestBed.get( StudentOperationsProvider );
        httpMock = TestBed.get( HttpTestingController );
    });

    it('Servicio Creado exitosamente', inject([StudentOperationsProvider], (service: StudentOperationsProvider) => {
        expect(service).toBeTruthy();
    }));

    it('PIN relacionado Exitosamente', inject([StudentOperationsProvider], (service: StudentOperationsProvider) => {

        let dataError, dataResponse;

        // Act
        service.getProblema("28233304")
        .then( ( data ) => {
            expect( data["ID_USUARIO"] ).toBe('4');
            expect( data["ID"] ).toBe('29');
            console.log("PIN asociado");
        },(error) => {
            dataError = error;
        });

        const req = httpMock.expectOne('https://fortmath.000webhostapp.com/getStudentProblem');
       
        // Assert
        expect( req.request.url ).toEqual('https://fortmath.000webhostapp.com/getStudentProblem');
        expect( req.request.method ).toEqual('POST');
        expect( dataError ).toBeUndefined();

    }));

    it('Respuesta registrada Exitosamente', inject([StudentOperationsProvider], (service: StudentOperationsProvider) => {

        let dataError;

        // Act
        service.registerAnswerStudent("5","29","Las niñas tienen mas perros que los niños", "2","Anexo Polya")
        .then( ( data ) => {
            expect( data["message"] ).toBe('Operación realizada exitosamente.');
        },(error) => {
            dataError = error;
        });

        const req = httpMock.expectOne('https://fortmath.000webhostapp.com/registerStudentAnswer');
       
        // Assert
        expect( req.request.url ).toEqual('https://fortmath.000webhostapp.com/registerStudentAnswer');
        expect( req.request.method ).toEqual('POST');
        expect( dataError ).toBeUndefined();

    }));

});