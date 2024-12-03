import apiClient from '../../auth/api/apiClient'

export const getQuestionList = async (userId: number | null) => {
  try {
    const response = await apiClient(`v2/users/${userId}/questions`)
    return response
  } catch (error) {
    console.error(error)
  }
}
