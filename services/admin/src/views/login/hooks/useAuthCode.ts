export function useAuthCode() {
  const query = ref('')

  const code = computed(function () {
    return import.meta.env.VITE_APP_BASE_API + '/api/auth/code?t=' + query.value
  })

  function resetCode() {
    query.value = Date.now().toString()
  }

  return { code, resetCode }
}
