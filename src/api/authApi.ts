import axios, { AxiosResponse, AxiosError } from 'axios';

interface ApiResponse<T> {
  message: string;
  status: number;
  errors?: { message: string; field: string }[];
  timestamp: string;
    data?: T;
  token?: string;
}

const API_BASE_URL = 'https://educampo.onrender.com/api/v1/users/auth';

async function apiRequest<T>(url: string, method: string, data?: any): Promise<ApiResponse<T>> {
  const apiUrl = `${API_BASE_URL}${url}`;

  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios({
      method,
      url: apiUrl,
      headers: {
        'Content-Type': 'application/json',
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

// POST /api/v1/users/auth/validate
async function validateToken(token: string): Promise<ApiResponse<void>> {
  return apiRequest<void>('/validate', 'POST', { token });
}

// POST /api/v1/users/auth/register
async function registerUser(username: string, email: string, password: string): Promise<ApiResponse<{ id: number; username: string; email: string }>> {
  return apiRequest<{ id: number; username: string; email: string }>('/register', 'POST', { username, email, password });
}

// POST /api/v1/users/auth/login
async function loginUser(username: string, password: string): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await apiRequest<{ token: string }>('/login', 'POST', { username, password });
  
      // Verificar se a resposta contém o token
      if ( response.token) {
        // Salvar o token JWT em um cookie chamado "jwtToken"
        document.cookie = `token=${response.token}; path=/;`;
  
        return response;
      } else {
        // Tratar o caso em que o token não está presente na resposta
        throw new Error('Token não encontrado na resposta da API');
      }
    } catch (error) {
      // Tratar outros erros, se necessário
      throw error;
    }
  }
  

export {
  validateToken,
  registerUser,
  loginUser,
};
