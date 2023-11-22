// associatesApi.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

interface LocalOffice {
  id: number;
  name: string;
}

interface Address {
  id: number;
  street: string;
  city: string;
  number: string;
  complement: string;
  neighborhood: string;
  zipCode: string;
}

interface Dependents {
  id: number;
  spouse: string;
  minorChildren: number;
  maleChildren: number;
  femaleChildren: number;
  otherDependents: number;
}

interface Affiliation {
  id: number;
  fatherName: string;
  motherName: string;
}

interface PlaceOfBirth {
  id: number;
  city: string;
  state: string;
}

interface AssociatePhoto {
  id: number;
  archiveName: string;
  originalName: string;
  contentType: string;
  size: number;
  url: string;
}

interface WorkRecord {
  id: number;
  number: number;
  series: string;
}

interface Associate {
  id: number;
  name: string;
  unionCard: number;
  cpf: string;
  rg: string;
  profession: string;
  workplace: string;
  phone: string;
  nationality: string;
  birthAt: string;
  isLiterate: boolean;
  isVoter: boolean;
  maritalStatus: string;
  associationAt: string;
  deleted: boolean;
  localOffice: LocalOffice;
  address: Address;
  dependents: Dependents;
  affiliation: Affiliation;
  placeOfBirth: PlaceOfBirth;
  associatePhoto: AssociatePhoto;
  workRecord: WorkRecord;
}

interface ApiResponse<T> {
  message: string;
  status: number;
  errors?: { message: string; field: string }[];
  timestamp: string;
  data?: T;
}

const API_BASE_URL = 'https://educampo.onrender.com/api/v1/associates';

// Função genérica para realizar chamadas de API
async function apiRequest<T>(url: string, method: string, data?: any): Promise<ApiResponse<T>> {
  const apiUrl = `${API_BASE_URL}${url}`;

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios({
      method,
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        // ... outros headers necessários ...
      },
      data,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<T>>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data.message || 'Erro na requisição');
    } else {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }
}

// Funções específicas para operações da Associates API

// GET /api/v1/associates/{id}
async function getAssociateById(id: number): Promise<ApiResponse<Associate>> {
  return apiRequest<Associate>(`/${id}`, 'GET');
}

// PUT /api/v1/associates/{id}
async function updateAssociate(id: number, data: any): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${id}`, 'PUT', data);
}

// DELETE /api/v1/associates/{id}
async function deleteAssociate(id: number): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${id}`, 'DELETE');
}

// GET /api/v1/associates
async function getAllAssociates(query: string, pageable: any): Promise<ApiResponse<Associate[]>> {
  const queryParams = new URLSearchParams({ query, pageable: JSON.stringify(pageable) });
  return apiRequest<Associate[]>(`?${queryParams}`, 'GET');
}

// POST /api/v1/associates
async function saveAssociate(data: any): Promise<ApiResponse<Associate>> {
  return apiRequest<Associate>('', 'POST', data);
}

// GET /api/v1/associates/{associateId}/photos
async function getAssociatePhotoById(associateId: number): Promise<ApiResponse<AssociatePhoto>> {
  return apiRequest<AssociatePhoto>(`/${associateId}/photos`, 'GET');
}

// POST /api/v1/associates/{associateId}/photos
async function uploadAssociatePhoto(associateId: number, data: any): Promise<ApiResponse<AssociatePhoto>> {
  return apiRequest<AssociatePhoto>(`/${associateId}/photos`, 'POST', data);
}

// DELETE /api/v1/associates/{associateId}/photos
async function deleteAssociatePhoto(associateId: number): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${associateId}/photos`, 'DELETE');
}

// GET /api/v1/associates/{id}/export/pdf
async function exportAssociateToPdf(id: number): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${id}/export/pdf`, 'GET');
}

// GET /api/v1/associates/photos
async function getAllAssociatesPhotos(): Promise<ApiResponse<AssociatePhoto[]>> {
  return apiRequest<AssociatePhoto[]>('/photos', 'GET');
}

// GET /api/v1/associates/photos/{photoName}
async function getAssociatePhoto(photoName: string): Promise<ApiResponse<AssociatePhoto>> {
  return apiRequest<AssociatePhoto>(`/photos/${photoName}`, 'GET');
}

// ... outras funções para operações adicionais ...

export {
  getAssociateById,
  updateAssociate,
  deleteAssociate,
  getAllAssociates,
  saveAssociate,
  getAssociatePhotoById,
  uploadAssociatePhoto,
  deleteAssociatePhoto,
  exportAssociateToPdf,
  getAllAssociatesPhotos,
  getAssociatePhoto
};
