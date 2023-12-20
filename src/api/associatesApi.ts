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

interface DocumentType {
  id: number;
  name: string;
  content: string;
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
  maritalStatusEnum: string;
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

const API_BASE_URL = 'https://sindy-backend-6b4fc1002f6c.herokuapp.com/api/v1/associates';

function getAuthToken(): string | null {
  const tokenCookie = document.cookie
    .split(';')
    .map(cookie => cookie.trim())
    .find(cookie => cookie.startsWith('token='));

  if (tokenCookie) {
    return tokenCookie.split('=')[1];
  }

  return null;
}

async function apiRequest<T>(url: string, method: string, data?: any): Promise<ApiResponse<T>> {
  const apiUrl = `${API_BASE_URL}${url}`;
  const authToken = getAuthToken();

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios({
      method,
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      data,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<T>>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data.message || 'Error in the request');
    } else {
      console.error('Error in the request:', error);
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
async function getAllAssociates(searchText?: string): Promise<ApiResponse<Associate[]>> {
  let queryParams: string[] = [];

  if (searchText) {
    // Verificar se searchText é um CPF (sem pontuações)
    if (/^\d{11}$/.test(searchText)) {
      queryParams.push(`cpf=${encodeURIComponent(searchText)}`);
    } else if (!isNaN(parseInt(searchText))) {
      // Se não for um CPF, mas for um número, pesquisar por unionCard
      queryParams.push(`unionCard=${parseInt(searchText)}`);
    } else {
      // Se não for nem CPF nem número, pesquisar por nome
      queryParams.push(`name=${encodeURIComponent(searchText)}`);
    }
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  return apiRequest<Associate[]>(queryString, 'GET');
}

// POST /api/v1/associates
async function saveAssociate(data: any): Promise<ApiResponse<Associate>> {
  return apiRequest<Associate>('', 'POST', data);
}

// GET /api/v1/associates/{associateId}/profile-picture
async function getAssociateProfilePictureById(associateId: number): Promise<ApiResponse<AssociatePhoto>> {
  return apiRequest<AssociatePhoto>(`/${associateId}/profile-picture`, 'GET');
}

// POST /api/v1/associates/{associateId}/profile-picture
async function uploadAssociatePhoto(associateId: number, data: any): Promise<ApiResponse<AssociatePhoto>> {
  return apiRequest<AssociatePhoto>(`/${associateId}/profile-picture`, 'POST', data);
}

// DELETE /api/v1/associates/{associateId}/profile-picture
async function deleteAssociatePhoto(associateId: number): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${associateId}/profile-picture`, 'DELETE');
}

// GET /api/v1/associates/{associateId}/documents
async function getAssociateDocumentById(associateId: number, documentId: number): Promise<ApiResponse<DocumentType>> {
  return apiRequest<DocumentType>(`/${associateId}/documents/${documentId}`, 'GET');
}

// POST /api/v1/associates/{associateId}/documents
async function uploadAssociateDocument(associateId: number, data: any): Promise<ApiResponse<DocumentType>> {
  return apiRequest<DocumentType>(`/${associateId}/documents`, 'POST', data);
}

// DELETE /api/v1/associates/{associateId}/documents/{documentId}
async function deleteAssociateDocumentById(associateId: number, documentId: number): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${associateId}/documents/${documentId}`, 'DELETE');
}

// GET /api/v1/associates/{id}/export/pdf
async function exportAssociateToPdf(id: number): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${id}/export/pdf`, 'GET');
}

// GET /api/v1/associates/birthdays
async function getAllBirthdayAssociates(): Promise<ApiResponse<Associate[]>> {
  return apiRequest<Associate[]>('/birthdays', 'GET');
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
  getAssociateProfilePictureById,
  uploadAssociatePhoto,
  deleteAssociatePhoto,
  getAssociateDocumentById,
  uploadAssociateDocument,
  deleteAssociateDocumentById,
  exportAssociateToPdf,
  getAllBirthdayAssociates,
  getAllAssociatesPhotos,
  getAssociatePhoto
};
