// monthlyFeesApi.ts
import axios, { AxiosResponse, AxiosError } from 'axios';

interface Associate {
  id: number;
  name: string;
  unionCard: number;
  cpf: string;
  rg: string;
  profession: string;
  workplace: string;
  phone: string;
  email: string;
  nationality: string;
  birthAt: string;
  isLiterate: boolean;
  isVoter: boolean;
  isPaid: boolean;
  maritalStatusEnum: string;
  associationAt: string;
  deleted: boolean;
}

interface MonthlyFee {
  id: number;
  feeValue: number;
  registrationValue: number;
  totalFeeValue: number;
  initialDate: string;
  finalDate: string;
  totalMonthsPaid: number;
  associate: Associate;
  createdAt: string;
}

interface ApiResponse<T> {
  message: string;
  status: number;
  errors?: { message: string; field: string }[];
  timestamp: string;
  data?: T;
}

const API_BASE_URL = 'https://sindy-backend-6b4fc1002f6c.herokuapp.com/api/v1/monthly-fees';

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

// GET /api/v1/monthly-fees/{id}
async function getMonthlyFeeById(id: number): Promise<ApiResponse<MonthlyFee>> {
  return apiRequest<MonthlyFee>(`/${id}`, 'GET');
}

// PUT /api/v1/monthly-fees/{id}
async function updateMonthlyFee(id: number, data: any): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${id}`, 'PUT', data);
}

// DELETE /api/v1/monthly-fees/{id}
async function deleteMonthlyFee(id: number): Promise<ApiResponse<void>> {
  return apiRequest<void>(`/${id}`, 'DELETE');
}

// GET /api/v1/monthly-fees
async function getAllMonthlyFees(initialDate?: string, finalDate?: string, pageable?: any): Promise<ApiResponse<MonthlyFee[]>> {
  let queryParams: string[] = [];

  if (initialDate) {
    queryParams.push(`initialDate=${encodeURIComponent(initialDate)}`);
  }

  if (finalDate) {
    queryParams.push(`finalDate=${encodeURIComponent(finalDate)}`);
  }

  if (pageable) {
    queryParams.push(`pageable=${encodeURIComponent(JSON.stringify(pageable))}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  return apiRequest<MonthlyFee[]>(queryString, 'GET');
}

// POST /api/v1/monthly-fees
async function saveMonthlyFee(data: any): Promise<ApiResponse<MonthlyFee>> {
  return apiRequest<MonthlyFee>('', 'POST', data);
}

// GET /api/v1/monthly-fees/{id}/export/pdf
async function exportMonthlyFeeToPdf(id: number): Promise<ApiResponse<string[]>> {
  return apiRequest<string[]>(`/${id}/export/pdf`, 'GET');
}

// GET /api/v1/monthly-fees/associates/{associateId}
async function getAllMonthlyFeesByAssociateId(
  associateId: number,
  initialDate?: string,
  finalDate?: string,
  pageable?: any
): Promise<ApiResponse<MonthlyFee[]>> {
  let queryParams: string[] = [];

  if (initialDate) {
    queryParams.push(`initialDate=${encodeURIComponent(initialDate)}`);
  }

  if (finalDate) {
    queryParams.push(`finalDate=${encodeURIComponent(finalDate)}`);
  }

  if (pageable) {
    queryParams.push(`pageable=${encodeURIComponent(JSON.stringify(pageable))}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  return apiRequest<MonthlyFee[]>(`/associates/${associateId}${queryString}`, 'GET');
}

export {
  getMonthlyFeeById,
  updateMonthlyFee,
  deleteMonthlyFee,
  getAllMonthlyFees,
  saveMonthlyFee,
  exportMonthlyFeeToPdf,
  getAllMonthlyFeesByAssociateId,
};
