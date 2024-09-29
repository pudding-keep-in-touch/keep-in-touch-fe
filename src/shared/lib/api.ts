import apiClient from './apiClient'

export const getHome = async (userId: number | null) => {
  try {
    const response = await apiClient(`v1/users/${userId}/home`)
    return response
  } catch (error) {
    console.error(error)
  }
}
