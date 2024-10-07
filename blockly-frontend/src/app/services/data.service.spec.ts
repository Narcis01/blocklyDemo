import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

const mockError = [
  {
    id: 1,
    description: "error_1"
  },
  {
    id: 2,
    description: "error_2"
  }]

const mockMachine = {
  id: 1,
  name: 'Test Machine',
  errors: mockError
}

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DataService
      ]
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Categories', () => {
    const mockResponseCategory = [{
      id: 1,
      name: "Machine",
      machine: []
    },
    {
      id: 2,
      name: "Machine 2",
      machine: []
    }];

    service.getCategories().subscribe(response => {
      expect(response).toBeTruthy();
      expect(response).toEqual(mockResponseCategory);

    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/categories');
    expect(req.request.method).toEqual("GET");
    req.flush(mockResponseCategory)
  });

  it('should get Workspaces', () => {
    const mockResponse = [{
      id: 1,
      content: "content",
      title: "title"
    },
    {
      id: 2,
      content: "content",
      title: "title"
    }];

    service.getWorkspaces().subscribe(response => {
      expect(response).toBeTruthy();
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/workspace');
    expect(req.request.method).toEqual("GET");
    req.flush(mockResponse);
  });

  it('should save a workspace', () => {
    const mockWorkspace = {
      id: 1,
      content: "content",
      title: "title"
    };

    service.saveWorkspace(mockWorkspace).subscribe(response => {
      expect(response).toBeTruthy();
      expect(response).toEqual(mockWorkspace);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/workspace');
    expect(req.request.method).toEqual("POST");
    req.flush(mockWorkspace);
  });

  it('should get response from backend', () => {
    const response = service.getWorkspaceResponse(mockMachine);
    const expectResponse = 'Parent Test Machine with errors: error_1 error_2 ';
    expect(response).toEqual(expectResponse);
  })
});
