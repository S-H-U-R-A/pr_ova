import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthServiceProvider  } from './auth-service';

describe('Prueba: Servicio de Autenticación', () => {

    let service: AuthServiceProvider;
    let httpMock: HttpTestingController;

    //Arrange
    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule,
        ],
        providers: [
            { provide: AuthServiceProvider, useClass: AuthServiceProvider },
        ]
        })
        service = TestBed.get( AuthServiceProvider );
        httpMock = TestBed.get( HttpTestingController );
    });

    it('Servicio Creado exitosamente', inject([AuthServiceProvider], (service: AuthServiceProvider) => {
        expect(service).toBeTruthy();
    }));

    it('Logeado Exitosamente', inject([AuthServiceProvider], (service: AuthServiceProvider) => {

        let dataError, dataResponse;

        // Act
        service.login("sandres9017@gmail.com", "Essa2010%%", 1)
        .then( ( data ) => {
            expect( data["NOMBRES"] ).toBe('Sergio Andrés ');
            expect( data["EMAIL"] ).toBe('sandres9017@gmail.com');
        },(error) => {
            dataError = error;
        });

        const req = httpMock.expectOne('https://fortmath.000webhostapp.com/login');
       
        // Assert
        expect( req.request.url ).toEqual('https://fortmath.000webhostapp.com/login');
        expect( req.request.method ).toEqual('POST');
        expect( dataError ).toBeUndefined();

    }));

});